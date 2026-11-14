import React from 'react';
import { 
  Lock, Unlock, Sparkles, ShieldAlert, ShieldCheck, TrendingDown, 
  User, Building, Phone, MapPin, CheckCircle2, ArrowRight, Eye, AlertCircle
} from 'lucide-react';
import { calculateBusinessAudit } from '../utils/auditCalculator';

export function StepAuditUnlock({ formData, onChange, onUnlock, onDemo, onPrev }) {
  // Dastlabki hisob-kitob (prevyu uchun)
  const preview = calculateBusinessAudit(formData);

  // Telefon raqamdan faqat 9 ta raqamni ajratib olish
  const extractRawDigits = (val) => {
    if (!val) return '';
    let digits = val.replace(/\D/g, '');
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
  const isFormValid = formData.fullName?.trim() && formData.businessName?.trim() && isPhoneComplete;

  const handleUnlockClick = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onUnlock();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          6-Bosqich: Natija Prevyusi & VIP Qulfni Ochish
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          🎉 Dastlabki Biznes Diagnostikangiz Tayyor!
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Hech qanday kontakt kiritmasdan, kiritilgan javoblaringiz asosida dastlabki salomatlik indeksi hisoblandi:
        </p>
      </div>

      {/* 1. BEPUL OCHIQ PREVYU (Biznes Salomatlik Indeksi) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Dastlabki Biznes Salomatlik Indeksi
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {preview.scores.overall}
              </span>
              <span className="text-slate-500 font-semibold text-lg">/100</span>
              <span className={`ml-2 px-2.5 py-0.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${
                preview.scores.overall < 45
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : preview.scores.overall < 70
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                {preview.riskLevel}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/40 text-right sm:text-right">
            <div className="text-[11px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1 sm:justify-end">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Aniqlangan Oylik Yo'qotish Rezervi:</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-red-400 mt-0.5">
              ~${preview.totalMonthlyLoss.toLocaleString()} <span className="text-xs font-normal text-slate-400">/oy</span>
            </div>
          </div>
        </div>

        {/* 3 ta Mini Shkala */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Tizim & Dastur:</span>
              <span className="text-purple-400 font-bold">{preview.scores.system}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${preview.scores.system}%` }} />
            </div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Sotuv Voronkasi:</span>
              <span className="text-indigo-400 font-bold">{preview.scores.sales}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${preview.scores.sales}%` }} />
            </div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Marketing:</span>
              <span className="text-cyan-400 font-bold">{preview.scores.marketing}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${preview.scores.marketing}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. VIP QULFNI OCHISH FORMASI */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-lg shadow-amber-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Eksklyuziv Resurslar & Chuqur Xulosa
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-snug">
              To'liq 360° Moliyaviy Rentgen, Sohangiz Benchmarki, Tayyor Sotuv/Nasiya Skriptlari, Xodimlar KPI jadvali va A4 PDF Xulosani bepul ochish:
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Ma'lumotlaringiz xolis auditorlik xulosasida va A4 PDF hujjatida ko'rsatilishi uchun profilingizni tasdiqlang:
            </p>
          </div>
        </div>

        <form onSubmit={handleUnlockClick} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Ism familiya */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Ism va Familiyangiz:</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Masalan: Alisher Qodirov"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Biznes nomi */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>Biznes / Do'kon / Brend nomi:</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.businessName || ''}
                onChange={(e) => onChange({ businessName: e.target.value })}
                placeholder="Masalan: Safia Cafe, TexnoMarket"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Telefon raqam */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Telefon raqamingiz:</span>
                  <span className="text-red-400">*</span>
                </span>
                <span className={`text-[10px] font-medium flex items-center gap-1 ${isPhoneComplete ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isPhoneComplete ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Tayyor
                    </>
                  ) : (
                    `9 ta raqam (${rawPhoneDigits.length}/9)`
                  )}
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-semibold text-xs sm:text-sm border-r border-slate-700/80 pr-2.5 my-1.5">
                  +998
                </div>
                <input
                  type="tel"
                  required
                  value={rawPhoneDigits ? formatPhoneDisplay(rawPhoneDigits) : ''}
                  onChange={handlePhoneInputChange}
                  placeholder="90 123 45 67"
                  maxLength={12}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-20 pr-4 py-2.5 text-white font-mono text-xs sm:text-sm tracking-wide focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-600"
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
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                isFormValid
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/25 transform hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Unlock className="w-5 h-5 shrink-0" />
              <span>Barcha Yopiq Tahlillar va Skriptlarni Ochish (Bepul) 🔓</span>
            </button>

            {/* Demo / Cheklangan ko'rish varianti */}
            <div className="flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={onDemo}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1 px-3 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Kontakt kiritmasdan Demo ko'rish (Cheklangan) &rarr;</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Orqaga tugmasi */}
      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all cursor-pointer"
        >
          &larr; Orqaga (Moliyaviy reja)
        </button>
      </div>
    </div>
  );
}
