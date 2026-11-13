import React from 'react';
import { User, Building, Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

export function StepPersonalContact({ formData, onChange, onNext }) {
  const isFormValid = formData.fullName?.trim() && formData.businessName?.trim() && formData.phone?.trim();

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

        {/* Telefon raqam */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-emerald-400" />
            Telefon raqamingiz: <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+998 90 123 45 67"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
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
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          Diagnostikani boshlash &rarr;
        </button>
      </div>
    </div>
  );
}

