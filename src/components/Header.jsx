import React from 'react';
import { Activity, ShieldCheck, RotateCcw, Lock } from 'lucide-react';

export function Header({ currentStep, totalSteps, isSubmitted, onReset, leadsCount = 0, onOpenAdmin }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                BiznesAudit<span className="text-blue-500">.uz</span>
              </h1>
              <span className="text-[10px] uppercase font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                PRO 4.0 • AI & CFO
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Xolis Biznes-Laboratoriya & Mustaqil Yechimlar Markazi
            </p>
          </div>
        </div>

        {/* Right Actions: Yangilash + Admin Lead Base + Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Yangilash tugmasi (Doimiy yuqorida turadi) */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Barcha ma'lumotlarni tozalab, auditni eng boshidan boshlash"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Yangilash</span>
          </button>

          {/* Admin Leads Button (Protected with Password) */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Faqat tizim ma'muri uchun (Parol bilan)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Admin Baza:</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-bold">
              {leadsCount}
            </span>
          </button>

          {!isSubmitted ? (
            <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="hidden sm:inline">Bosqich</span>
              <span>{currentStep}/{totalSteps}</span>
            </div>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Audit tayyor
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar for Questionnaire */}
      {!isSubmitted && (
        <div className="w-full bg-slate-800/50 h-1">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-1 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
}
