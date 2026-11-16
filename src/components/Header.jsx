import React from 'react';
import { Activity, ShieldCheck, RotateCcw } from 'lucide-react';

export function Header({ currentStep, totalSteps, isSubmitted, onReset, theme = 'dark', onToggleTheme }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white font-bold">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                BiznesTahlili<span className="text-cyan-400">.uz</span>
              </h1>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-full shadow-sm">
                PRO 5.0 • 360° RENTGEN & ANTI-FRAUD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium hidden sm:block">
              Xolis Biznes-Laboratoriya & Mustaqil Yechimlar Markazi
            </p>
          </div>
        </div>

        {/* Right Actions: Kungi/Tungi + Yangilash + Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Tungi / Kungi rejim tugmasi */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 text-xs sm:text-sm font-bold text-white transition-all shadow-sm cursor-pointer"
            title={theme === 'dark' ? "Kungi rejimga o'tish (yorqin fon, to'q yozuvlar)" : "Tungi rejimga o'tish (qora fon)"}
          >
            {theme === 'dark' ? (
              <>
                <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                  <path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
                <span className="hidden sm:inline">Kungi</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                <span className="hidden sm:inline">Tungi</span>
              </>
            )}
          </button>

          {/* Yangilash tugmasi (Doimiy yuqorida turadi) */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 text-xs sm:text-sm font-bold text-white transition-all shadow-sm cursor-pointer"
            title="Barcha ma'lumotlarni tozalab, auditni eng boshidan boshlash"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Yangilash</span>
          </button>

          {!isSubmitted ? (
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="hidden sm:inline text-slate-300">Bosqich</span>
              <span className="text-cyan-300 font-extrabold">{currentStep}/{totalSteps}</span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Audit tayyor
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar for Questionnaire */}
      {!isSubmitted && (
        <div className="w-full bg-slate-800/60 h-1.5">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-1.5 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
}
