import React from 'react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';
import { Store, Apple, Truck, Coffee, Factory, GraduationCap, Briefcase, Sparkles, User, UserCheck, AlertCircle } from 'lucide-react';

// Custom inline SVG icons for 100% build safety on all environments
function PillIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="m8.5 8.5 7 7"/>
    </svg>
  );
}

function HospitalIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v4"/>
      <path d="M14 8h-4"/>
      <path d="M18 18h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1"/>
      <path d="M6 18H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"/>
      <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
      <path d="M10 22v-4h4v4"/>
    </svg>
  );
}

const ICONS = {
  Pill: PillIcon,
  Hospital: HospitalIcon,
  Apple,
  Store,
  Truck,
  Coffee,
  Factory,
  GraduationCap,
  Briefcase,
  Sparkles
};

export function StepBusinessProfile({ formData, onChange, onNext, onPrev, errors = [], errorMessage = '' }) {
  const hasOwnerError = errors.includes('isOwner');
  const hasIndustryError = errors.includes('industry');

  const handleIndustrySelect = (id) => {
    onChange({ industry: id });
  };

  const handleRoleSelect = (role) => {
    onChange({ isOwner: role });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-bold mb-2">
          1-Bosqich: Soha va Faoliyat turi
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Biznesingiz qaysi yo'nalishda faoliyat yuritadi?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
          Har bir sohaning lid narxi, konversiyasi va dasturiy ehtiyoji har xil bo'ladi.
        </p>
      </div>

      {/* 1-QADAM: Sayt boshidagi ogohlantirish (Welcome Trust Alert Banner) */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border-2 border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 mt-0.5">
            <span className="text-xl">🎯</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-black text-white leading-snug">
              Hurmatli tadbirkor, to'g'ri tashxis — aniq raqamlardan boshlanadi!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Biznesingizdagi yashirin teshiklar, ombor holati va aniq yo'qotishlarni hisoblab berishimiz uchun quyidagi savollarga o'zingizning haqiqiy va taxminiy real raqamlaringiz bilan javob berishingizni so'raymiz. Ma'lumotlar qancha aniq kiritilsa, tizim shunchalik mukammal <strong className="text-cyan-300">"Moliyaviy Rentgen"</strong> va <strong className="text-blue-300">30 kunlik amaliy reja</strong> taqdim etadi. Barcha ma'lumotlar mutlaqo xavfsiz va konfidensial saqlanadi.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-[11px] sm:text-xs text-emerald-400 font-semibold">
              <span>🛡️ Xolis laboratoriya: reklama yoki dastur sotish majburiyati yo'q</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-savol: Boshqaruvdagi rol */}
      <div 
        data-error={hasOwnerError ? "true" : undefined}
        className={`rounded-2xl p-5 sm:p-6 shadow-lg transition-all ${
          hasOwnerError 
            ? 'bg-red-950/20 border-2 border-red-500 ring-2 ring-red-500/30' 
            : 'bg-slate-900/80 border border-slate-700/80'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-base font-bold text-white">
            1. Siz korxonada qanday lavozimdasiz?
          </label>
          {hasOwnerError && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Javob tanlang
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => handleRoleSelect('yes')}
            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
              formData.isOwner === 'yes'
                ? 'bg-blue-600/20 border-blue-400 text-white shadow-md ring-2 ring-blue-500/50'
                : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${formData.isOwner === 'yes' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300'}`}>
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white">Biznes egasi (Muassis / CEO)</div>
              <div className="text-xs sm:text-sm text-slate-300">Asosiy moliyaviy qarorlarni qabul qilaman</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('manager')}
            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
              formData.isOwner === 'manager'
                ? 'bg-blue-600/20 border-blue-400 text-white shadow-md ring-2 ring-blue-500/50'
                : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${formData.isOwner === 'manager' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300'}`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white">Rahbar / Boshqaruvchi / Direktor</div>
              <div className="text-xs sm:text-sm text-slate-300">Operatsion boshqaruv va sotuvga mas'ulman</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2-savol: Soha tanlash */}
      <div 
        data-error={hasIndustryError ? "true" : undefined}
        className={`rounded-2xl p-5 sm:p-6 shadow-lg transition-all ${
          hasIndustryError 
            ? 'bg-red-950/20 border-2 border-red-500 ring-2 ring-red-500/30' 
            : 'bg-slate-900/80 border border-slate-700/80'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-base font-bold text-white">
            2. Biznesingiz sohasini tanlang:
          </label>
          <div className="flex items-center gap-2">
            {hasIndustryError && (
              <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Soha tanlang
              </span>
            )}
            <span className="text-xs text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
              10 ta soha
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(INDUSTRY_BENCHMARKS).map((ind) => {
            const IconComponent = ICONS[ind.icon] || Sparkles;
            const isSelected = formData.industry === ind.id;
            const isHighlighted = ind.id === 'pharmacy' || ind.id === 'clinic_medical';
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => handleIndustrySelect(ind.id)}
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-400 text-white shadow-md ring-2 ring-blue-500/50'
                    : isHighlighted
                    ? 'bg-slate-800/50 border-cyan-500/50 text-slate-200 hover:border-cyan-400 hover:bg-slate-800'
                    : 'bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow' 
                    : ind.id === 'pharmacy'
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    : ind.id === 'clinic_medical'
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-slate-700/70 text-slate-300'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-bold text-white line-clamp-1">{ind.name}</div>
                  <div className="text-xs text-slate-400 truncate">
                    {ind.category === 'farmatsevtika' ? '💊 Seriya, srok godnosti va blister' :
                     ind.category === 'tibbiyot' ? '🏥 Shifokorlar, navbat va EMR' :
                     ind.tip ? ind.tip.slice(0, 48) + '...' : ''}
                  </div>
                </div>
                {isHighlighted && (
                  <span className="hidden sm:inline-block text-[10px] uppercase font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded">
                    Maxsus
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validatsiya xatolik ogohlantirishi */}
      {errorMessage && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-xl shadow-red-950/50 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={`flex items-center ${onPrev ? 'justify-between' : 'justify-end'} pt-2`}>
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800 text-sm font-semibold transition-all cursor-pointer"
          >
            &larr; Orqaga
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Keyingisi (Dastur & Kassa) &rarr;
        </button>
      </div>
    </div>
  );
}
