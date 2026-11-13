import React from 'react';
import { Database, BookOpen, AlertOctagon, CheckCircle2, AlertTriangle, XCircle, ShoppingCart, Coffee, GraduationCap, Briefcase } from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepAutomationSoftware({ formData, onChange, onNext, onPrev }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;
  const category = currentIndustry.category || 'savdo';
  const isHoreca = currentIndustry.id === 'horeca_cafe';
  const isEducation = currentIndustry.category === 'talim';
  const isServices = currentIndustry.category === 'xizmat' && !isHoreca;

  // Soha bo'yicha dinamik matnlar
  let question1Title = "1. Tovarlar qoldig'i (ostatka), ombor va kassa qanday yuritiladi?";
  let option1Software = "Savdo dasturi bor (POS / 1C)";
  let option1SoftwareDesc = "Shtrix-kod skaneri va kassa apparatiga ulangan maxsus dastur o'rnatilgan";
  let option1ExcelDesc = "Jadvallarga qo'lda yoziladi, lekin kassa va shtrix-kodga ulanmagan";
  let option1PaperDesc = "Umuman dastur yo'q, hamma hisob-kitoblar qo'lda daftarga qayd qilinadi";

  let question2Title = "2. Mijozlar va do'konlarning qarzlari (Nasiya) qanday yuritiladi?";
  let option2SoftwareDesc = "Har bir mijoz limiti, to'lov muddatlari va eslatmalari dasturda ko'rinadi";
  let option2Paper = "Qarz daftari bor (Qo'lda)";
  let option2PaperDesc = "Qarzlar daftarga yoziladi, lekin eslatish va qidirish ko'p vaqt oladi";

  if (isHoreca) {
    question1Title = "1. Oshxona tex-kartasi, mahsulot sarfi va kassa qanday yuritiladi?";
    option1Software = "Restoran / Kafe POS tizimi bor";
    option1SoftwareDesc = "Ofitsiantlar, oshxona va kassa cheki maxsus dasturda avtomatlashgan";
    option1ExcelDesc = "Xarajatlar va tushumlar faqat Excelda qo'lda yoziladi";
    option1PaperDesc = "Qog'oz cheklar va daftarda yuritiladi (oshxonada isrof xavfi bor)";

    question2Title = "2. Doimiy mijozlar bonusi va yetkazib berish qanday nazorat qilinadi?";
    option2SoftwareDesc = "Dastur orqali keshbek, bonuslar va yetkazib berish hisobi avtomatlashgan";
    option2Paper = "Qo'lda yozib boriladi";
    option2PaperDesc = "Mijozlar tarixi yo'q, qo'lda yoziladi";
  } else if (isEducation) {
    question1Title = "1. O'quvchilar hisobi, davomat va guruhlar qanday yuritiladi?";
    option1Software = "Ta'lim CRM tizimi mavjud";
    option1SoftwareDesc = "O'quvchilar ro'yxati, davomati va to'lovlari maxsus tizimda sozlangan";
    option1ExcelDesc = "Excel jadvallarida qo'lda kiritiladi";
    option1PaperDesc = "Qog'oz jurnal yoki daftarda yuritiladi";

    question2Title = "2. Oylik to'lovlar va qarzdor o'quvchilar nazorati qanday?";
    option2SoftwareDesc = "Muddati kelganda avtomatik SMS eslatma jo'natiladi";
    option2Paper = "Daftarda qayd qilinadi";
    option2PaperDesc = "Kim to'lagani, kim qarzdorligi daftardan qarab qidiriladi";
  } else if (isServices) {
    question1Title = "1. Mijozlar qabuli, navbat va xizmatlar hisobi qanday yuritiladi?";
    option1Software = "Elektron qabul & Xizmat dasturi bor";
    option1SoftwareDesc = "Mijozlar navbati va ustalar/mutaxassislar xizmat haqi dasturda hisoblanadi";
    option1ExcelDesc = "Excelda yoki telefondagi qaydnomada qo'lda";
    option1PaperDesc = "Qog'oz daftar yoki kundalikka qo'lda yoziladi";

    question2Title = "2. Mijozlar qarzlari, oldindan to'lov va abonent hisobi qanday?";
    option2SoftwareDesc = "Dasturda har bir mijoz balansi va to'lovlari to'liq ko'rinadi";
    option2Paper = "Qo'lda daftarga yoziladi";
    option2PaperDesc = "Qarzlar va oldindan to'lovlar daftarda yuritiladi";
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
          3-Bosqich: Dastur & Avtomatlashtirish
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Hisob-kitob, Kassa va Mijozlar intizomi
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Soha: <span className="text-white font-medium">{currentIndustry.name}</span>
        </p>
      </div>

      {/* 1. Kassa va tovar/xizmat hisobi */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          {question1Title}
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
              <span className="font-semibold text-sm">{option1Software}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              {option1SoftwareDesc}
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
              {option1ExcelDesc}
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
              {option1PaperDesc}
            </div>
          </button>
        </div>
      </div>

      {/* 2. Nasiya va qarzlar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          {question2Title}
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
              {option2SoftwareDesc}
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
              <span className="font-semibold text-sm">{option2Paper}</span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">
              {option2PaperDesc}
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
              Qarzdorlik yoki to'lovlar qat'iy nazorat qilinmaydi
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
