import React from 'react';
import { 
  DollarSign, Percent, Receipt, PieChart, Sparkles, Building, Landmark, Package, 
  Scale, FileSpreadsheet, CheckCircle2, AlertTriangle, XCircle, TrendingUp, AlertCircle
} from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepFinancialGoals({ formData, onChange, onNext, onPrev, errors = [], errorMessage = '' }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;

  const getInputStyle = (name) => {
    return errors.includes(name)
      ? 'border-2 border-red-500 ring-2 ring-red-500/40 bg-red-950/20'
      : 'border-slate-700/80 bg-slate-950';
  };

  const getCardStyle = (name) => {
    return errors.includes(name)
      ? 'border-2 border-red-500 ring-2 ring-red-500/40 bg-red-950/20'
      : 'border-slate-800 bg-slate-900/60';
  };

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
        <div 
          data-error={errors.includes('targetRevenue') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('targetRevenue')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Oylik DAROMAD (Tushum) maqsadi ($ da):
            </label>
            {errors.includes('targetRevenue') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * Musbat son ({'>'} 0)
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="100"
              step="500"
              value={formData.targetRevenue}
              onChange={(e) => onChange({ targetRevenue: e.target.value })}
              className={`w-full rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('targetRevenue')}`}
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
        <div 
          data-error={errors.includes('averageCheck') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('averageCheck')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-cyan-400" />
              O'rtacha chek qancha? ($ da):
            </label>
            {errors.includes('averageCheck') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * Musbat son ({'>'} 0)
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="1"
              value={formData.averageCheck}
              onChange={(e) => onChange({ averageCheck: e.target.value })}
              className={`w-full rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('averageCheck')}`}
              placeholder="Masalan: 60"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Bitta mijoz bir xaridda o'rtacha qancha pul to'laydi
          </p>
        </div>

        {/* 3. Sotuv Konversiyasi */}
        <div 
          data-error={errors.includes('conversionRate') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('conversionRate')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-amber-400" />
              Sotuv konversiyasi (% da):
            </label>
            {errors.includes('conversionRate') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * 1% - 100% oralig'ida
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min="1"
              max="100"
              value={formData.conversionRate}
              onChange={(e) => onChange({ conversionRate: e.target.value })}
              className={`w-full rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('conversionRate')}`}
              placeholder="Masalan: 25"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            100 ta qiziqqan xaridordan nechtasi sotib oladi?
          </p>
        </div>

        {/* 4. Sof Foyda Marjasi */}
        <div 
          data-error={errors.includes('netMargin') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('netMargin')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-purple-400" />
              Sof foyda marjasi (% da):
            </label>
            {errors.includes('netMargin') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * 1% - 100% oralig'ida
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min="1"
              max="100"
              value={formData.netMargin}
              onChange={(e) => onChange({ netMargin: e.target.value })}
              className={`w-full rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('netMargin')}`}
              placeholder="Masalan: 30"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Tannarxdan so'ng qoladigan sof daromad foizi
          </p>
        </div>

        {/* 5. Oylik doimiy xarajatlar (PRO 3.0) */}
        <div 
          data-error={errors.includes('fixedCosts') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('fixedCosts')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-rose-400" />
              Oylik DOIMIY xarajatlar ($ da):
            </label>
            {errors.includes('fixedCosts') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * Majburiy ({'>='} 0)
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="0"
              step="100"
              value={formData.fixedCosts !== undefined ? formData.fixedCosts : ''}
              onChange={(e) => onChange({ fixedCosts: e.target.value })}
              className={`w-full rounded-xl pl-8 pr-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('fixedCosts')}`}
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

        {/* 7. Xodimlar soni (PRO 5.0 Unit-Productivity) */}
        <div 
          data-error={errors.includes('employeesCount') ? "true" : undefined}
          className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('employeesCount')}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Jami xodimlar soni (nafar):
            </label>
            {errors.includes('employeesCount') && (
              <span className="text-[11px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                * Kamida 1 nafar
              </span>
            )}
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min="1"
              value={formData.employeesCount || ''}
              onChange={(e) => onChange({ employeesCount: e.target.value })}
              className={`w-full rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:outline-none transition-all ${getInputStyle('employeesCount')}`}
              placeholder="Masalan: 5"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            1 xodimga to'g'ri keladigan savdo va sof foyda hisobi uchun
          </p>
        </div>

        {/* 8. Bino / Do'kon / Ofis maydoni (PRO 5.0 Unit-Productivity) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-cyan-400" />
            Bino / Do'kon / Maydon hajmi (kv.m):
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              min="10"
              value={formData.businessAreaSqM || ''}
              onChange={(e) => onChange({ businessAreaSqM: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Masalan: 60"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            1 kv.m maydon rentabelligi ($/kv.m) hisobi uchun
          </p>
        </div>
      </div>

      {/* 7. Moliyaviy Balans va 3 ta Asosiy Hisobot (P&L, Cash Flow, Balans) (PRO 4.0) */}
      <div 
        data-error={errors.includes('financialReportsStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('financialReportsStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            7. Moliyaviy Balans va 3 ta Asosiy Hisobot (P&L, Cash Flow, Balans):
          </label>
          {errors.includes('financialReportsStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Kassadagi puldan tashqari, biznesingizning haqiqiy Balansini (Aktivlar, Nasiyalar, Sof Foyda - P&L) har oy yakunida ko'ra olasizmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ financialReportsStatus: 'full_reports' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.financialReportsStatus === 'full_reports'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-emerald-400">Ha, 3 ta hisobot bor</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">P&L (Foyda/Zarar), Cash Flow va Balans avtomatik shakllanadi (0% xavf)</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ financialReportsStatus: 'cash_only' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.financialReportsStatus === 'cash_only'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-amber-400">Faqat tushum/xarajat</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Kassani yozaman, lekin Balans hisobotim yo'q (+10% kassa uzilishi xavfi)</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ financialReportsStatus: 'blind' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.financialReportsStatus === 'blind'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-red-400">Kassada pul bo'lsa yetarli</span>
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Pulim qayerdaligini aniq bilmayman (Moliyaviy ko'rlik: 40% foyda muzlagan)</div>
          </button>
        </div>
      </div>

      {/* 8. Unit-Iqtisodiyot va Haqiqiy Sof Foyda (Tannarx tahlili) (PRO 4.0) */}
      <div 
        data-error={errors.includes('unitEconomicsStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('unitEconomicsStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            8. Unit-Iqtisodiyot va Tovar Rentabelligi (Haqiqiy Tannarx):
          </label>
          {errors.includes('unitEconomicsStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Ustiga qo'yilgan foizni emas, balki yo'l kira, brak, bonus va xarajatlardan so'ng qoladigan HAQIQIY SOF FOYDANI bilasizmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ unitEconomicsStatus: 'detailed' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.unitEconomicsStatus === 'detailed'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-emerald-400">Ha, to'liq rentabellik ko'rinadi</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Har bir tovar va partiya bo'yicha sof foyda 1C/POS tizimida aniq hisoblanadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ unitEconomicsStatus: 'markup_only' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.unitEconomicsStatus === 'markup_only'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-amber-400">Faqat ustama foizni (natsenka)</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Natsenkani bilaman, umumiy xarajatlarni esa faqat oy oxirida ko'zda tutaman</div>
          </button>
        </div>
      </div>

      {/* Validatsiya xatolik ogohlantirishi */}
      {errorMessage && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-xl shadow-red-950/50 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
          <span>{errorMessage}</span>
        </div>
      )}

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
