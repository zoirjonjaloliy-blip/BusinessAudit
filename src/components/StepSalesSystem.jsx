import React from 'react';
import { Database, Users, Clock, RefreshCw, CheckCircle2, AlertCircle, XCircle, Gift } from 'lucide-react';

export function StepSalesSystem({ formData, onChange, onNext, onPrev, errors = [], errorMessage = '' }) {
  const getCardStyle = (name) => {
    return errors.includes(name)
      ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20'
      : 'border border-slate-800 bg-slate-900/60';
  };
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
          4-Bosqich: Sotuv tizimi va Voronka
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Sotuv zanjiri va Mijozlarni ushlab qolish (LTV)
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Lidlarni xaridga aylantirish va ularni doimiy mijoz qilib saqlash tizimi.
        </p>
      </div>

      {/* 1. CRM Holati */}
      <div 
        data-error={errors.includes('hasCrm') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('hasCrm')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            1. Sizda CRM tizimi mavjudmi?
          </label>
          {errors.includes('hasCrm') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'yes' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.hasCrm === 'yes'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Ha, CRM bor</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              AmoCRM, Bitrix24 yoki maxsus CRM to'liq sozlangan
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'excel' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.hasCrm === 'excel'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Excel / Daftar</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">
              Qo'lda kiritiladi, avtomatik eslatmalar yo'q
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'no' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.hasCrm === 'no'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Umuman yo'q</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xs text-slate-400">
              Murojaatlar shunchaki chatda unutiladi
            </div>
          </button>
        </div>
      </div>

      {/* 2. Sotuv bo'limi */}
      <div 
        data-error={errors.includes('salesTeam') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('salesTeam')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            2. Alohida sotuv bo'limi (Menejerlar) bormi?
          </label>
          {errors.includes('salesTeam') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'pro_team' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.salesTeam === 'pro_team'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">To'liq jamoa + ROP</div>
            <div className="text-xs text-slate-400">Skriptlar va kunlik nazorat yo'lga qo'yilgan</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'junior' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.salesTeam === 'junior'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">1-2 ta sotuvchi bor</div>
            <div className="text-xs text-slate-400">Aniq skript va qattiq nazorat yetishmaydi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'owner_only' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.salesTeam === 'owner_only'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">Faqat o'zim sotaman</div>
            <div className="text-xs text-slate-400">Biznes egasi barcha qo'ng'iroqlarga o'zi qaraydi</div>
          </button>
        </div>
      </div>

      {/* 3. Javob berish tezligi */}
      <div 
        data-error={errors.includes('responseTime') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('responseTime')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            3. Reklamadan tushgan lidga odatda qancha vaqtda javob beriladi?
          </label>
          {errors.includes('responseTime') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ responseTime: 'fast' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.responseTime === 'fast'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-emerald-400">10-15 daqiqa ichida</div>
            <div className="text-[11px] text-slate-400 mt-1">Lid issiqligida darhol aloqa qilinadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ responseTime: 'slow' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.responseTime === 'slow'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-amber-400">1 dan 4 soatgacha</div>
            <div className="text-[11px] text-slate-400 mt-1">Vaqt topilganda javob beriladi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ responseTime: 'very_slow' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.responseTime === 'very_slow'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400">Kechqurun / Ertasi kuni</div>
            <div className="text-[11px] text-slate-400 mt-1">Ko'p lidlar sovuydi yoki boshqadan oladi</div>
          </button>
        </div>
      </div>

      {/* 4. Mijozlarni ushlab qolish: Bonus / Keshbek / Loyallik (PRO 3.0) */}
      <div 
        data-error={errors.includes('loyaltySystem') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('loyaltySystem')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Gift className="w-4 h-4 text-pink-400" />
            4. Mijozlarni ushlab qolish (Bonus / Keshbek / Loyallik tizimi):
          </label>
          {errors.includes('loyaltySystem') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Eski xaridorlar qayta sotib olishi uchun maxsus dasturiy rag'batlantirish bormi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ loyaltySystem: 'automated' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.loyaltySystem === 'automated'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">Avtomatlashgan Bonus / Bot</div>
            <div className="text-[11px] text-slate-400">Telegram bot yoki SMS orqali keshbek yig'iladi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ loyaltySystem: 'verbal' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.loyaltySystem === 'verbal'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">Faqat og'zaki chegirma</div>
            <div className="text-[11px] text-slate-400">Mijoz so'rasagina narx tushirib beriladi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ loyaltySystem: 'none' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.loyaltySystem === 'none'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">Tizim umuman yo'q</div>
            <div className="text-[11px] text-slate-400">Mijoz ketib qolsa qaytarish mexanizmi yo'q</div>
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
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          Keyingisi (Moliya & Maqsad) &rarr;
        </button>
      </div>
    </div>
  );
}
