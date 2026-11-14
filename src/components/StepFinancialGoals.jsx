import React from 'react';
import { DollarSign, Percent, Receipt, PieChart, Sparkles, Building, Landmark, Package } from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepFinancialGoals({ formData, onChange, onNext, onPrev }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;

  const handleApplyBenchmark = () => {
    onChange({
      averageCheck: currentIndustry.avgCheck,
      conversionRate: currentIndustry.avgConversion,
      netMargin: currentIndustry.avgMargin,
      fixedCosts: currentIndustry.typicalFixedCosts,
      inventoryCapital: currentIndustry.typicalInventory
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          5-Bosqich: Moliyaviy reja & Unit-iqtisodiyot
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Moliyaviy ko'rsatkichlar va Zararsizlik nuqtasi
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Haqiqiy raqamlar orqali oyning nechanchi kunidan foydaga kirishingiz va yo'qotishlar hisoblanadi.
        </p>
      </div>

      {/* Benchmark tavsiyasi */}
      <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-white">Soha bo'yicha tavsiya: </span>
          {currentIndustry.name} sohasida o'rtacha chek ~${currentIndustry.avgCheck}, konversiya ~{currentIndustry.avgConversion}%, marja ~{currentIndustry.avgMargin}%.
          <button
            type="button"
            onClick={handleApplyBenchmark}
            className="ml-2 underline text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
          >
            Standart raqamlarni to'ldirish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Oylik Daromad Maqsadi */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Oylik DAROMAD (Tushum) maqsadi ($ da):
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="100"
              step="500"
              value={formData.targetRevenue}
              onChange={(e) => onChange({ targetRevenue: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Masalan: 10000"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[5000, 10000, 20000, 50000].map((sum) => (
              <button
                key={sum}
                type="button"
                onClick={() => onChange({ targetRevenue: sum })}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                ${(sum / 1000)}k
              </button>
            ))}
          </div>
        </div>

        {/* 2. O'rtacha Chek */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-cyan-400" />
            O'rtacha chek qancha? ($ da):
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="1"
              value={formData.averageCheck}
              onChange={(e) => onChange({ averageCheck: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Masalan: 60"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Bitta mijoz bir xaridda o'rtacha qancha pul to'laydi
          </p>
        </div>

        {/* 3. Sotuv Konversiyasi */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Percent className="w-4 h-4 text-amber-400" />
            Sotuv konversiyasi (% da):
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              min="1"
              max="100"
              value={formData.conversionRate}
              onChange={(e) => onChange({ conversionRate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Masalan: 25"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            100 ta qiziqqan xaridordan nechtasi sotib oladi?
          </p>
        </div>

        {/* 4. Sof Foyda Marjasi */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-purple-400" />
            Sof foyda marjasi (% da):
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              min="5"
              max="95"
              value={formData.netMargin}
              onChange={(e) => onChange({ netMargin: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Masalan: 30"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Tannarxdan so'ng qoladigan sof daromad foizi
          </p>
        </div>

        {/* 5. Oylik doimiy xarajatlar (PRO 3.0) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-rose-400" />
            Oylik DOIMIY xarajatlar ($ da):
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="100"
              step="100"
              value={formData.fixedCosts || ''}
              onChange={(e) => onChange({ fixedCosts: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="Masalan: 1800"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Ijara, xodimlar oyligi, kommunal, soliq (Zararsizlik nuqtasi uchun)
          </p>
        </div>

        {/* 6. Ombor / aylanmadagi tovar qoldig'i (PRO 3.0) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-indigo-400" />
            Ombordagi tovar qoldig'i summasi ($ da):
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="500"
              step="1000"
              value={formData.inventoryCapital || ''}
              onChange={(e) => onChange({ inventoryCapital: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Masalan: 15000"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Hozirda javonlarda/omborda muzlab turgan umumiy tovar qiymati
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all cursor-pointer"
        >
          &larr; Orqaga
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Keyingisi: Diagnostika Natijasi &rarr;
        </button>
      </div>
    </div>
  );
}
