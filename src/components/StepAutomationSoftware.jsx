import React from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, BookOpen, AlertOctagon, 
  Package, Clock, ShieldAlert, Sparkles, BarChart3, BrainCircuit, Layers
} from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepAutomationSoftware({ formData, onChange, onNext, onPrev }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;
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
          2-Bosqich: Dastur & Avtomatlashtirish
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Hisob-kitob, Kassa va Operatsion Nazorat
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Soha: <span className="text-white font-medium">{currentIndustry.name}</span>
        </p>
      </div>

      {/* 1. Kassa va hisob tizimi */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          {question1Title}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ accountingSoftware: 'software' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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

      {/* 3. Ombor va Nelikvid holati (PRO 3.0) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-400" />
          3. Ombor va Nelikvid (Muzlagan tovarlar) holati qanday?
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Ombordagi tovarlar qanchalik tez pulga aylanadi va hisobi aniqmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ inventoryStatus: 'accurate' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.inventoryStatus === 'accurate'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">Qoldiqlar aniq & Tez aylanadi</div>
            <div className="text-[11px] text-slate-400">Kamomad yo'q, tovarlar muzlab qolmaydi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ inventoryStatus: 'estimated' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.inventoryStatus === 'estimated'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">Taxminan bilaman</div>
            <div className="text-[11px] text-slate-400">Bazi tovarlar qolib ketadi, aniq hisob yo'q</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ inventoryStatus: 'dead_stock' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.inventoryStatus === 'dead_stock'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">Nelikvid & Kamomad ko'p</div>
            <div className="text-[11px] text-slate-400">Oylab sotilmaydigan tovarlar aylanmani band qilgan</div>
          </button>
        </div>
      </div>

      {/* 4. Soliq, Markirovka (Asl Belgisi) integratsiyasi (PRO 3.0) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          4. Soliq, Markirovka (Asl Belgisi) va Kassa integratsiyasi:
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Soliq talablari va 2D skaner orqali markirovka tizimlashganmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ fiscalMarking: 'automated' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.fiscalMarking === 'automated'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">To'liq avtomatlashgan</div>
            <div className="text-[11px] text-slate-400">1C/POS ga ulangan, cheklar avtomat ketadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ fiscalMarking: 'partial' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.fiscalMarking === 'partial'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">Qisman (Qo'lda uriladi)</div>
            <div className="text-[11px] text-slate-400">Xatoliklar va kassa navbatlari bo'lib turadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ fiscalMarking: 'unorganized' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.fiscalMarking === 'unorganized'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">Tizimlashtirilmagan</div>
            <div className="text-[11px] text-slate-400">Markirovka qilinmaydi (katta jarima xavfi)</div>
          </button>
        </div>
      </div>

      {/* 5. Kunlik operatsionkaga ketadigan vaqt */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          5. Kunlik operatsionkaga (hisob-kitob, qoldiq tekshirish, nazorat) qancha shaxsiy vaqtingiz ketadi?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <button
            type="button"
            onClick={() => onChange({ dailyOperationalHours: 'low' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.dailyOperationalHours === 'low'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">Kuniga 1 soatdan kam</div>
            <div className="text-[11px] text-slate-400">Tizim ishlaydi, rahbar hisobotni ko'radi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ dailyOperationalHours: 'medium' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.dailyOperationalHours === 'medium'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">Kuniga 2 - 4 soat</div>
            <div className="text-[11px] text-slate-400">Doimiy nazorat va tekshirishlar talab qiladi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ dailyOperationalHours: 'high' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              formData.dailyOperationalHours === 'high'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">Kuniga 5+ soat</div>
            <div className="text-[11px] text-slate-400">Butunlay operatsionkaga bog'lanib qolganman</div>
          </button>
        </div>
      </div>

      {/* 6. Ombor va Tovarlar Analitikasi (ABC / XYZ tahlil) (PRO 4.0) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          6. Ombor va Tovarlar Analitikasi (ABC / XYZ tahlil):
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Qaysi 20% mahsulot 80% sof foyda keltirishini va qaysi tovarlar 60 kundan ortiq muzlab yotganini (Nelikvid) aniq bilasizmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ abcAnalysisStatus: 'automated' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.abcAnalysisStatus === 'automated'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-emerald-400">Dasturda avtomatik</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">1C/POS da ABC-tahlil va muzlagan tovarlar ro'yxati chiqadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ abcAnalysisStatus: 'approximate' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.abcAnalysisStatus === 'approximate'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-amber-400">Taxminan bilaman</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Ko'z bilan chamalab tovar buyurtma qilamiz (+12% yo'qotish)</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ abcAnalysisStatus: 'none' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.abcAnalysisStatus === 'none'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-red-400">Bilmayman / Qilinmaydi</span>
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">ABC-tahlil yo'q, faqat tugagan tovarni olaveramiz (+25% muzlash)</div>
          </button>
        </div>
      </div>

      {/* 7. Xarid va Ta'minotchilar Prognozi (Auto-Ordering) (PRO 4.0) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          7. Xarid va Ta'minotchilar Prognozi (Auto-Ordering / Min-Max):
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Yangi tovar xarid qilayotganda yoki xomashyo olayotganda miqdorni qanday belgilaysiz?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ autoOrderingStatus: 'automated' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.autoOrderingStatus === 'automated'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-emerald-400">Dasturiy prognoz (Min-Max)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Dastur oldingi savdo tezligiga qarab kerakli miqdorni o'zi hisoblaydi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ autoOrderingStatus: 'out_of_stock_risk' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.autoOrderingStatus === 'out_of_stock_risk'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-amber-400">Og'zaki / Tugasa keyin olinadi</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">Sotuvchi aytganda olinadi (A-toifa tovar tugab, 8-12% savdo boy beriladi)</div>
          </button>
        </div>
      </div>

      {/* 8. Sun'iy Intellekt (AI) va Avto-Hisobotlardan foydalanish (PRO 4.0) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          8. Sun'iy Intellekt (AI) va Avtomatik Telegram-bot Analitikasi:
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Biznesingizda Sun'iy Intellekt (AI) va avtomatik Telegram-bot analitikasidan foydalanasizmi?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ aiUsageStatus: 'integrated' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.aiUsageStatus === 'integrated'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-emerald-400">AI va Telegram bot ulangan</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">1C/POS ga AI ulangan: har kechqurun tahliliy xulosa keladi (+20 ball)</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ aiUsageStatus: 'basic_chat' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.aiUsageStatus === 'basic_chat'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-amber-400">Faqat oddiy chatda</span>
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">ChatGPT dan post yoki g'oyalar uchun foydalanaman, bazaga ulanmagan</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ aiUsageStatus: 'none' })}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              formData.aiUsageStatus === 'none'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs sm:text-sm text-red-400">Ishlatmayman</span>
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400">AI orqali savdo va omborni tahlil qilish mumkinligini bilmasdim</div>
          </button>
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
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          Keyingisi (Marketing & Trafik) &rarr;
        </button>
      </div>
    </div>
  );
}
