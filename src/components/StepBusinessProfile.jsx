import React from 'react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';
import { Store, Apple, Truck, Coffee, Factory, GraduationCap, Briefcase, Sparkles, User, UserCheck } from 'lucide-react';

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

export function StepBusinessProfile({ formData, onChange, onNext, onPrev }) {
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

      {/* 1-savol: Boshqaruvdagi rol */}
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-lg">
        <label className="block text-base font-bold text-white mb-3">
          1. Siz korxonada qanday lavozimdasiz?
        </label>
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
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-base font-bold text-white">
            2. Biznesingiz sohasini tanlang:
          </label>
          <span className="text-xs text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
            10 ta soha
          </span>
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
                    ? 'bg-gradient-to-r from-slate-800/80 to-slate-800/50 border-slate-600/90 text-slate-100 hover:border-cyan-500/60 hover:bg-slate-800'
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
