import React from 'react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';
import { Store, Apple, Truck, Coffee, Factory, GraduationCap, Briefcase, Sparkles, User, UserCheck } from 'lucide-react';

const ICONS = {
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
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
          2-Bosqich: Soha va Faoliyat turi
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Biznesingiz qaysi yo'nalishda faoliyat yuritadi?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Har bir sohaning lid narxi, konversiyasi va dasturiy ehtiyoji har xil bo'ladi.
        </p>
      </div>

      {/* 1-savol: Boshqaruvdagi rol */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          1. Siz korxonada qanday lavozimdasiz?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleRoleSelect('yes')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
              formData.isOwner === 'yes'
                ? 'bg-blue-600/15 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className={`p-2 rounded-lg ${formData.isOwner === 'yes' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Biznes egasi (Muassis / CEO)</div>
              <div className="text-xs text-slate-400">Asosiy moliyaviy qarorlarni qabul qilaman</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('manager')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
              formData.isOwner === 'manager'
                ? 'bg-blue-600/15 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className={`p-2 rounded-lg ${formData.isOwner === 'manager' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Rahbar / Boshqaruvchi / Direktor</div>
              <div className="text-xs text-slate-400">Operatsion boshqaruv va sotuvga mas'ulman</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2-savol: Soha tanlash */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          2. Biznesingiz sohasini tanlang:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Object.values(INDUSTRY_BENCHMARKS).map((ind) => {
            const IconComponent = ICONS[ind.icon] || Sparkles;
            const isSelected = formData.industry === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => handleIndustrySelect(ind.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm ring-1 ring-blue-500'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700/60 text-slate-400'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-medium line-clamp-2">{ind.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all"
        >
          &larr; Orqaga
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          Keyingisi (Dastur & Kassa) &rarr;
        </button>
      </div>
    </div>
  );
}
