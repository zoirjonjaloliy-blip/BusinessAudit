import React from 'react';
import { User, Building, Phone, MapPin, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function StepPersonalContact({ formData, onChange, onNext }) {
  // Telefon raqamdan faqat 9 ta raqamni ajratib olish (agar +998 bilan saqlangan bo'lsa)
  const extractRawDigits = (val) => {
    if (!val) return '';
    let digits = val.replace(/\D/g, '');
    if (digits.startsWith('998')) {
      digits = digits.slice(3);
    }
    return digits.slice(0, 9);
  };

  const rawPhoneDigits = extractRawDigits(formData.phone || '');

  // Raqamlarni chiroyli formatlash: 90 123 45 67
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

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Kirish: Biznes egasining profili
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Audit hisoboti kimning nomiga rasmiylashtiriladi?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Ushbu ma'lumotlar rasmiy auditorlik xulosasida va PDF hisobotda aks ettiriladi.
        </p>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        {/* Ism familiya */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-400" />
            Ism va Familiyangiz: <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName || ''}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Masalan: Alisher Qodirov"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Biznes nomi */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-400" />
            Biznes / Do'kon / Brend nomi: <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.businessName || ''}
            onChange={(e) => onChange({ businessName: e.target.value })}
            placeholder="Masalan: Safia Cafe, TexnoMarket, Arzon Mebel"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Telefon raqam (+998 qat'iy prefiks bilan va 9 ta raqam majburiy) */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              Telefon raqamingiz: <span className="text-red-400">*</span>
            </span>
            <span className={`text-[11px] font-medium flex items-center gap-1 ${isPhoneComplete ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isPhoneComplete ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Raqam to'liq
                </>
              ) : (
                `9 ta raqam kiritilishi shart (${rawPhoneDigits.length}/9)`
              )}
            </span>
          </label>
          
          <div className="relative flex items-center">
            {/* O'zgarmas +998 prefiksi */}
            <div className="absolute left-3.5 flex items-center gap-1.5 text-slate-200 font-bold text-sm select-none pointer-events-none">
              <span className="text-base">🇺🇿</span>
              <span>+998</span>
              <span className="text-slate-600 font-normal">|</span>
            </div>

            <input
              type="tel"
              required
              value={formatPhoneDisplay(rawPhoneDigits)}
              onChange={handlePhoneInputChange}
              placeholder="90 123 45 67"
              className={`w-full bg-slate-950 border rounded-xl pl-24 pr-4 py-2.5 text-white font-bold text-sm tracking-wide focus:outline-none transition-all ${
                isPhoneComplete 
                  ? 'border-emerald-500/80 focus:border-emerald-500 ring-1 ring-emerald-500/20' 
                  : rawPhoneDigits.length > 0 
                  ? 'border-amber-500/60 focus:border-amber-500' 
                  : 'border-slate-700/80 focus:border-blue-500'
              }`}
            />
          </div>

          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
            <span>Masalan: 90 123 45 67, 99 876 54 32</span>
            {!isPhoneComplete && rawPhoneDigits.length > 0 && (
              <span className="text-amber-400 font-medium">Yana {9 - rawPhoneDigits.length} ta raqam qoldi</span>
            )}
          </p>
        </div>

        {/* Shahar / Hudud */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            Shahar yoki Viloyat:
          </label>
          <input
            type="text"
            value={formData.city || ''}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="Masalan: Toshkent sh., Samarqand, Farg'ona"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Ma'lumotlar maxfiy saqlanadi
        </div>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`px-7 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            isFormValid
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          Diagnostikani boshlash &rarr;
        </button>
      </div>
    </div>
  );
}
