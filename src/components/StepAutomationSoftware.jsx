import React from 'react';
import { Database, BookOpen, AlertOctagon, CheckCircle2, AlertTriangle, XCircle, ShoppingCart } from 'lucide-react';

export function StepAutomationSoftware({ formData, onChange, onNext, onPrev }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
          3-Bosqich: Dastur & Avtomatlashtirish
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Hisob-kitob, Kassa va Nasiya (Qarzlar) holati
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Daftar yoki dasturda ishlash biznesingiz daromadiga qanday ta'sir qilishini ko'ramiz.
        </p>
      </div>

      {/* 1. Kassa va tovarlar hisobi qayerda yuritiladi? */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          1. Tovarlar qoldig'i (ostatka), ombor va kassa qanday yuritiladi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ accountingSoftware: 'software' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.accountingSoftware === 'software'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Savdo dasturi bor</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              1C, Billz, Jowi, Poster, iiko yoki shunga o'xshash POS dastur o'rnatilgan
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ accountingSoftware: 'excel' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.accountingSoftware === 'excel'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Excelda yuritiladi</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">
              Jadvallarga qo'lda yoziladi, lekin shtrix-kod va kassa apparatiga ulanmagan
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ accountingSoftware: 'paper' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.accountingSoftware === 'paper'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Daftarda / Qog'ozda</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xs text-slate-400">
              Umuman dastur yo'q, hamma hisob-kitoblar qo'lda daftarga qayd qilinadi
            </div>
          </button>
        </div>
      </div>

      {/* 2. Nasiya va qarzlar daftardami? */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          2. Mijozlar va sheriklarning qarzlari (Nasiya) qanday yuritiladi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ debtTracking: 'software' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.debtTracking === 'software'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Dasturda avtomatlashgan</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              Har bir mijoz limiti, to'lov muddatlari va eslatmalari dasturda ko'rinadi
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ debtTracking: 'paper' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.debtTracking === 'paper'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Qarz daftari bor (Qo'lda)</span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">
              Qarzlar daftarga yoziladi, lekin eslatish va qidirish ko'p vaqt oladi
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ debtTracking: 'no_tracking' })}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              formData.debtTracking === 'no_tracking'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm">Aniq hisob yo'q</span>
              <AlertOctagon className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xs text-slate-400">
              Qarzlar tarqoq, kim qancha qarzdorligini aniq aytish qiyin
            </div>
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
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
        >
          Keyingisi (Marketing & Trafik) &rarr;
        </button>
      </div>
    </div>
  );
}

