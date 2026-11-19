import React from 'react';
import { Activity, ShieldCheck, RotateCcw } from 'lucide-react';

export function Header({ 
  currentStep, 
  totalSteps, 
  isSubmitted, 
  onReset, 
  theme = 'dark', 
  onToggleTheme,
  lang = 'uz',
  onToggleLang,
  t = (s) => s
}) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        {/* Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer min-w-0" onClick={onReset}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white font-bold shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-lg font-extrabold text-white tracking-tight truncate">
                BiznesTahlili<span className="text-cyan-400">.uz</span>
              </h1>
              <span className="hidden lg:inline-flex text-[10px] uppercase font-extrabold bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                PRO 5.0 • 360° RENTGEN
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300 font-medium hidden md:block truncate">
              {t("Xolis Biznes-Laboratoriya & Mustaqil Yechimlar Markazi")}
            </p>
          </div>
        </div>

        {/* Right Actions: Lotin/Kirill + Kungi/Tungi + Yangilash + Status */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Lotin / Kirill (O'z | Ўз) almashtirgich */}
          <button
            onClick={onToggleLang}
            type="button"
            className="flex items-center justify-center px-2.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 text-xs font-black transition-all shadow-sm cursor-pointer shrink-0"
            title={lang === 'uz' ? "Ўзбекча кирилл ёзувига ўтиш" : "O'zbek lotin yozuviga o'tish"}
          >
            <span className={lang === 'uz' ? 'text-cyan-400' : 'text-slate-400'}>O'z</span>
            <span className="text-slate-500 mx-1 font-normal">|</span>
            <span className={lang === 'cyrl' ? 'text-cyan-400' : 'text-slate-400'}>Ўз</span>
          </button>

          {/* Tungi / Kungi rejim tugmasi */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 text-xs sm:text-sm font-bold text-white transition-all shadow-sm cursor-pointer shrink-0"
            title={theme === 'dark' ? "Kungi rejimga o'tish (yorqin fon, to'q yozuvlar)" : "Tungi rejimga o'tish (qora fon)"}
          >
            {theme === 'dark' ? (
              <>
                <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                  <path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
                <span className="hidden sm:inline text-xs">{t("Kungi")}</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                <span className="hidden sm:inline text-xs">{t("Tungi")}</span>
              </>
            )}
          </button>

          {/* Yangilash tugmasi (Doimiy yuqorida turadi) */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 text-xs font-bold text-white transition-all shadow-sm cursor-pointer shrink-0"
            title="Barcha ma'lumotlarni tozalab, auditni eng boshidan boshlash"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="hidden xs:inline sm:inline text-xs">{t("Yangilash")}</span>
          </button>

          {!isSubmitted ? (
            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0"></span>
              <span className="hidden sm:inline text-slate-300 text-xs">{t("Bosqich")}</span>
              <span className="text-cyan-300 font-extrabold whitespace-nowrap text-xs">{currentStep}/{totalSteps}</span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden xs:inline sm:inline text-xs">{t("Audit tayyor")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar for Questionnaire */}
      {!isSubmitted && (
        <div className="w-full bg-slate-800/60 h-1.5">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-1.5 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(5, (currentStep / totalSteps) * 100))}%` }}
          />
        </div>
      )}
    </header>
  );
}
