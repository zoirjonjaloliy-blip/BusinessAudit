import React, { useState } from 'react';
import { 
  Lock, Unlock, Sparkles, TrendingDown, 
  User, Building, Phone, MapPin, CheckCircle2, AlertCircle
} from 'lucide-react';
import { calculateBusinessAudit } from '../utils/auditCalculator';

export function StepAuditUnlock({ 
  formData = {}, 
  onChange, 
  onUnlock, 
  onPrev,
  errors = [],
  errorMessage = ''
}) {
  // Dastlabki hisob-kitob (prevyu uchun)
  const preview = calculateBusinessAudit(formData);
  const [localAlert, setLocalAlert] = useState(false);

  // Telefon raqamdan faqat 9 ta raqamni ajratib olish
  const extractRawDigits = (val) => {
    if (!val) return '';
    let digits = String(val).replace(/\D/g, '');
    if (digits.startsWith('998')) {
      digits = digits.slice(3);
    }
    return digits.slice(0, 9);
  };

  const rawPhoneDigits = extractRawDigits(formData.phone || '');

  // Raqamlarni formatlash: 90 123 45 67
  const formatPhoneDisplay = (digits) => {
    let res = '';
    if (digits.length > 0) res += digits.slice(0, 2);
    if (digits.length > 2) res += ' ' + digits.slice(2, 5);
    if (digits.length > 5) res += ' ' + digits.slice(5, 7);
    if (digits.length > 7) res += ' ' + digits.slice(7, 9);
    return res;
  };

  const handlePhoneInputChange = (e) => {
    const inputVal = e.target.value;
    const digitsOnly = inputVal.replace(/\D/g, '').slice(0, 9);
    const fullPhoneNumber = digitsOnly ? `+998 ${formatPhoneDisplay(digitsOnly)}` : '';
    onChange({ phone: fullPhoneNumber });
  };

  const isPhoneComplete = rawPhoneDigits.length === 9;
  const isFullNameValid = Boolean(formData.fullName?.trim() && formData.fullName.trim().length >= 3);
  const isBusinessNameValid = Boolean(formData.businessName?.trim() && formData.businessName.trim().length >= 2);
  const isFormValid = isFullNameValid && isBusinessNameValid && isPhoneComplete;

  const hasFullNameError = errors.includes('fullName');
  const hasBusinessNameError = errors.includes('businessName');
  const hasPhoneError = errors.includes('phone');

  const handleUnlockClick = (e) => {
    if (e) e.preventDefault();
    if (!isFormValid) {
      setLocalAlert(true);
      return;
    }
    setLocalAlert(false);
    onUnlock();
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn pb-24 sm:pb-8">
      {/* Sarlavha */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          6-Bosqich: Natija Prevyusi & Barcha Tahlillarni Ochish
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          🎉 Diagnostika Tayyor! Natijalarni Ochish
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Biznesingiz ko'rsatkichlari hisoblandi. Quyidagi tugma orqali to'liq hisobotni oching:
        </p>
      </div>

      {/* 1. KIXCHA VA QULAY PREVYU KARTASI */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Dastlabki Salomatlik Indeksi
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-white">
                {preview.scores?.overall || 50}
              </span>
              <span className="text-slate-500 font-semibold text-sm">/100</span>
              <span className={`ml-2 px-2 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
                (preview.scores?.overall || 50) < 45
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : (preview.scores?.overall || 50) < 70
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                {preview.riskLevel || 'Tahlil qilindi'}
              </span>
              <span className="ml-1.5 px-2 py-0.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider">
                BI & AI: {preview.scores?.bi || 50}%
              </span>
              <span className="ml-1 px-2 py-0.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider">
                Anti-Fraud: Faol
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-left sm:text-right">
            <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1 sm:justify-end">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Aniqlangan Oylik Yo'qotish Rezervi:</span>
            </div>
            <div className="text-base sm:text-lg font-black text-red-400 mt-0.5">
              ~${(preview.totalMonthlyLoss || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">/oy</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VIP QULFNI OCHISH FORMASI */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 relative shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 shadow-lg shadow-emerald-500/20">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase font-extrabold text-emerald-400 tracking-wider">
              Bepul Eksklyuziv Xulosa & Barcha Instrumentlar
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
              To'liq 360° Moliyaviy Rentgen, Benchmark, Tayyor Skriptlar va A4 PDF Xulosani ochish:
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Hisobot profilingiz nomiga rasmiylashtirilishi uchun ma'lumotlaringizni tasdiqlang:
            </p>
          </div>
        </div>

        <form onSubmit={handleUnlockClick} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Ism familiya */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ism va Familiyangiz:</span>
                  <span className="text-red-400">*</span>
                </label>
                {hasFullNameError && (
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2 py-0.2 rounded-full">
                    Kamida 3 ta harf
                  </span>
                )}
              </div>
              <input
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Masalan: Alisher Qodirov"
                className={`w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:outline-none transition-all placeholder:text-slate-600 ${
                  hasFullNameError
                    ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20 focus:border-red-500'
                    : 'border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                }`}
              />
            </div>

            {/* Biznes nomi */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Biznes / Do'kon / Brend nomi:</span>
                  <span className="text-red-400">*</span>
                </label>
                {hasBusinessNameError && (
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2 py-0.2 rounded-full">
                    Kamida 2 ta harf
                  </span>
                )}
              </div>
              <input
                type="text"
                required
                value={formData.businessName || ''}
                onChange={(e) => onChange({ businessName: e.target.value })}
                placeholder="Masalan: Malibu, Safia, TexnoMarket"
                className={`w-full bg-slate-950 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:outline-none transition-all placeholder:text-slate-600 ${
                  hasBusinessNameError
                    ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20 focus:border-red-500'
                    : 'border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                }`}
              />
            </div>

            {/* Telefon raqam */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Telefon raqamingiz:</span>
                  <span className="text-red-400">*</span>
                </label>
                <span className={`text-[10px] font-bold flex items-center gap-1 ${
                  hasPhoneError 
                    ? 'text-red-400 bg-red-950/80 border border-red-500/50 px-2 py-0.2 rounded-full' 
                    : isPhoneComplete 
                    ? 'text-emerald-400' 
                    : 'text-slate-400'
                }`}>
                  {hasPhoneError ? (
                    'To\'liq 9 ta raqam'
                  ) : isPhoneComplete ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Tayyor
                    </>
                  ) : (
                    `9 ta raqam (${rawPhoneDigits.length}/9)`
                  )}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-300 font-bold text-xs sm:text-sm border-r border-slate-700 pr-2.5 my-1.5">
                  +998
                </div>
                <input
                  type="tel"
                  required
                  value={rawPhoneDigits ? formatPhoneDisplay(rawPhoneDigits) : ''}
                  onChange={handlePhoneInputChange}
                  placeholder="90 123 45 67"
                  maxLength={12}
                  className={`w-full bg-slate-950 rounded-xl pl-20 pr-4 py-2.5 text-white font-mono text-xs sm:text-sm tracking-wide focus:outline-none transition-all placeholder:text-slate-600 ${
                    hasPhoneError
                      ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20 focus:border-red-500'
                      : 'border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                  }`}
                />
              </div>
            </div>

            {/* Shahar */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Shahar / Hudud (ixtiyoriy):</span>
              </label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => onChange({ city: e.target.value })}
                placeholder="Toshkent, Samarqand, Farg'ona..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Validatsiya xatolik ogohlantirishi */}
          {(errorMessage || (localAlert && !isFormValid)) && (
            <div className="p-3 rounded-xl bg-red-950/90 border-2 border-red-500 text-xs text-red-200 font-semibold flex items-center gap-2.5 shadow-lg shadow-red-950/40 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
              <span>{errorMessage || "⚠️ Iltimos, Ism, Biznes nomi va 9 ta raqamli telefon raqamingizni to'ldiring!"}</span>
            </div>
          )}

          {/* ⭐ ASOSIY HARAKAT TUGMASI (YORQIN, KATTA VA DOIM KO'RINADI) ⭐ */}
          <div className="pt-3 space-y-2">
            <button
              type="button"
              onClick={handleUnlockClick}
              className="w-full py-4 sm:py-4.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-500/40 ring-4 ring-emerald-500/20 transform hover:scale-[1.01] active:scale-[0.99] border border-emerald-300"
            >
              <Unlock className="w-5 h-5 text-slate-950 shrink-0" />
              <span>Barcha Tahlillarni Ko'rish & Skriptlarni Ochish (Bepul) 🔓</span>
            </button>
          </div>
        </form>
      </div>

      {/* Orqaga tugmasi */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          &larr; Orqaga (Moliyaviy reja)
        </button>

        <span className="text-[11px] text-slate-500">
          6 / 6-Bosqich
        </span>
      </div>

      {/* 📱 Mobil Qurilmalar Uchun Doimiy Ko'rinib Turuvchi Pastki Panel (Sticky Bar) 📱 */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-950/95 backdrop-blur-md border-t border-emerald-500/40 z-30 sm:hidden shadow-2xl">
        <button
          type="button"
          onClick={handleUnlockClick}
          className="w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95 transition-transform"
        >
          <Unlock className="w-4 h-4 text-slate-950 shrink-0" />
          <span>Barcha Tahlillarni Ko'rish 🔓</span>
        </button>
      </div>
    </div>
  );
}
