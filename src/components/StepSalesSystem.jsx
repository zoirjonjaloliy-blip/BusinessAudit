import React from 'react';
import { Database, Users, Clock, RefreshCw, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export function StepSalesSystem({ formData, onChange, onNext, onPrev }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-2">
          3-Bosqich: Sotuv & Konversiya
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Sotuv zanjiri va Mijozlarga xizmat ko'rsatish
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Lidlarni pulga aylantiradigan voronka qanchalik mustahkam?
        </p>
      </div>

      {/* 1. CRM Holati */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          1. Sizda CRM tizimi mavjudmi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'yes' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
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
              AmoCRM, Bitrix24 yoki maxsus tizim to'liq sozlangan
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'excel' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
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
              Qo'lda kiritiladi, lekin avtomatik eslatmalar yo'q
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ hasCrm: 'no' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
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
              Lidlar shunchaki chatda qolib ketadi
            </div>
          </button>
        </div>
      </div>

      {/* 2. Sotuv bo'limi */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          2. Alohida sotuv bo'limi (Menejerlar) bormi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'pro_team' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.salesTeam === 'pro_team'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">To'liq jamoa + ROP</div>
            <div className="text-xs text-slate-400">Skriptlar, rejalar va kunlik nazorat yo'lga qo'yilgan</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'junior' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.salesTeam === 'junior'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">1-2 ta menejer bor</div>
            <div className="text-xs text-slate-400">Biroq aniq skript va qattiq nazorat yetishmaydi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ salesTeam: 'owner_only' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.salesTeam === 'owner_only'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-sm mb-1">Yo'q, o'zim sotaman</div>
            <div className="text-xs text-slate-400">Biznes egasi barcha qo'ng'iroq va chatlarga o'zi qaraydi</div>
          </button>
        </div>
      </div>

      {/* 3. Javob berish tezligi */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          3. Reklamadan tushgan lidga odatda qancha vaqtda javob beriladi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ responseTime: 'fast' })}
            className={`p-3 rounded-xl border text-left transition-all ${
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
            className={`p-3 rounded-xl border text-left transition-all ${
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
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.responseTime === 'very_slow'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400">Kechqurun / Ertasi kuni</div>
            <div className="text-[11px] text-slate-400 mt-1">Ko'p lidlar kutishdan soviydi</div>
          </button>
        </div>
      </div>

      {/* 4. Qayta sotuvlar (Retention) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          4. Eski mijozlar bazasi bilan qayta sotuv (LTV) ishlari bormi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ retention: 'yes' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.retention === 'yes'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm">Ha, muntazam qayta sotuv bor</div>
            <div className="text-[11px] text-slate-400 mt-1">Eski mijozlarga takliflar yuboriladi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ retention: 'no' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.retention === 'no'
                ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm">Yo'q, faqat bir marta sotiladi</div>
            <div className="text-[11px] text-slate-400 mt-1">Har doim yangi mijoz qidiriladi</div>
          </button>
        </div>
      </div>

      {/* Navigation */}
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
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
        >
          Keyingisi (Moliya & Maqsad) &rarr;
        </button>
      </div>
    </div>
  );
}

