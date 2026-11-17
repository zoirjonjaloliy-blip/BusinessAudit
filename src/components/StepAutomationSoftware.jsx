import React from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, BookOpen, AlertOctagon, 
  Package, Clock, ShieldAlert, Sparkles, BarChart3, BrainCircuit, Layers, AlertCircle
} from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepAutomationSoftware({ formData, onChange, onNext, onPrev, errors = [], errorMessage = '' }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;
  const isHoreca = currentIndustry.id === 'horeca_cafe';
  const isEducation = currentIndustry.category === 'talim';
  const isServices = currentIndustry.category === 'xizmat' && !isHoreca;
  const isPharmacy = formData.industry === 'pharmacy';
  const isClinic = formData.industry === 'clinic_medical';

  const getCardStyle = (name) => {
    return errors.includes(name)
      ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20'
      : 'border border-slate-800 bg-slate-900/60';
  };

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

  if (isPharmacy) {
    question1Title = "1. Dorilar qoldig'i, seriyali hisob va kassa qanday yuritiladi?";
    option1Software = "Apteka POS / 1C Dorixona bor";
    option1SoftwareDesc = "2D Asl Belgisi skaneri, srok godnosti va blister bo'lish moduli sozlangan";
    option1ExcelDesc = "Excelda yuritiladi (muddati o'tgan dorilar va kassa cheki nazorati yo'q)";
    option1PaperDesc = "Daftarda yoziladi (katta kamomad va jarima xavfi bor)";

    question2Title = "2. Doimiy mijozlar va nasiyalar qanday yuritiladi?";
    option2SoftwareDesc = "Dastur orqali qarzlar va doimiy xaridorlar bonusi nazorat qilinadi";
    option2Paper = "Qarz daftarda";
    option2PaperDesc = "Dori nasiyalari daftarda yoziladi, kech qaytadi";
  } else if (isClinic) {
    question1Title = "1. Registratura, bemorlar navbati va to'lovlar qanday yuritiladi?";
    option1Software = "Klinika CRM / 1C Tibbiyot bor";
    option1SoftwareDesc = "Elektron navbat, kassa cheki va shifokorlar kabineti markaziy dasturga ulangan";
    option1ExcelDesc = "Faqat Excel va qog'oz jurnallarda (kassa chetlab o'tish xavfi bor)";
    option1PaperDesc = "Daftarda yoki og'zaki (tushumning 30% gacha qismi hisobsiz ketadi)";

    question2Title = "2. Shifokorlar va tashqi vrachlar (Napravitellar) bonusi qanday?";
    option2SoftwareDesc = "Har bir yo'llanma va ko'rsatilgan xizmat bo'yicha KPI avtomat hisoblanadi";
    option2Paper = "Qo'lda hisoblab chiqiladi";
    option2PaperDesc = "Oylik oxirida shifokorlar bilan tushunmovchiliklar bo'lib turadi";
  } else if (isHoreca) {
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
      <div 
        data-error={errors.includes('accountingSoftware') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('accountingSoftware')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            {question1Title}
          </label>
          {errors.includes('accountingSoftware') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('debtTracking') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('debtTracking')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            {question2Title}
          </label>
          {errors.includes('debtTracking') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('inventoryStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('inventoryStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-400" />
            3. Ombor va Nelikvid (Muzlagan tovarlar) holati qanday?
          </label>
          {errors.includes('inventoryStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('fiscalMarking') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('fiscalMarking')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            4. Soliq, Markirovka (Asl Belgisi) va Kassa integratsiyasi:
          </label>
          {errors.includes('fiscalMarking') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('dailyOperationalHours') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('dailyOperationalHours')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            5. Kunlik operatsionkaga (hisob-kitob, qoldiq tekshirish, nazorat) qancha shaxsiy vaqtingiz ketadi?
          </label>
          {errors.includes('dailyOperationalHours') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('abcAnalysisStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('abcAnalysisStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            6. Ombor va Tovarlar Analitikasi (ABC / XYZ tahlil):
          </label>
          {errors.includes('abcAnalysisStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('autoOrderingStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('autoOrderingStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            7. Xarid va Ta'minotchilar Prognozi (Auto-Ordering / Min-Max):
          </label>
          {errors.includes('autoOrderingStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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
      <div 
        data-error={errors.includes('aiUsageStatus') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('aiUsageStatus')}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            8. Sun'iy Intellekt (AI) va Avtomatik Telegram-bot Analitikasi:
          </label>
          {errors.includes('aiUsageStatus') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> Tanlang
            </span>
          )}
        </div>
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

      {/* 💊 DORIXONA UCHUN MAXSUS MIKRO-OPERATSION BLOK (PRO 5.0) */}
      {isPharmacy && (
        <div className="bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-500/20">
            <span className="text-xl">💊</span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">Dorixona & Farmatsevtika Maxsus Diagnostikasi</h3>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium">Srok godnosti, blister bo'linishi va Asl Belgisi 2D nazorati</p>
            </div>
          </div>

          {/* Srok godnosti */}
          <div 
            data-error={errors.includes('pharmacyExpiryTracking') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${errors.includes('pharmacyExpiryTracking') ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-white">
                1. Yaroqlilik muddati (Srok godnosti) va Seriyali hisob nazorati:
              </label>
              {errors.includes('pharmacyExpiryTracking') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> Tanlang
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange({ pharmacyExpiryTracking: 'automated' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.pharmacyExpiryTracking === 'automated'
                    ? 'bg-emerald-600/20 border-emerald-400 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-emerald-400 mb-1">✅ Dasturda qizil signal bilan ko'rinadi</div>
                <div className="text-xs text-slate-300">Muddati 3-6 oy qolgan dorilar avtomat aksiyalarga chiqadi (0% zarar)</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ pharmacyExpiryTracking: 'manual' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.pharmacyExpiryTracking === 'manual'
                    ? 'bg-red-600/20 border-red-400 text-white ring-1 ring-red-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-red-400 mb-1">⚠️ Provizorlar qo'lda tekshiradi</div>
                <div className="text-xs text-slate-300">Omborning 4-8% qismi muddati o'tib 'spisaniya'ga (zararga) ketadi!</div>
              </button>
            </div>
          </div>

          {/* Blister bo'linishi */}
          <div 
            data-error={errors.includes('pharmacyBlisterSplit') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${errors.includes('pharmacyBlisterSplit') ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-white">
                2. Dona / Pachka / Plastinka (Blister) bo'lib sotishda qoldiq aniqligi:
              </label>
              {errors.includes('pharmacyBlisterSplit') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> Tanlang
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange({ pharmacyBlisterSplit: 'automated' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.pharmacyBlisterSplit === 'automated'
                    ? 'bg-emerald-600/20 border-emerald-400 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-emerald-400 mb-1">✅ Avtomatik bo'linadi (1/2, 1/3)</div>
                <div className="text-xs text-slate-300">Dastur plastinkani ham, donani ham qoldiq va tannarxini to'g'ri olib boradi</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ pharmacyBlisterSplit: 'manual' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.pharmacyBlisterSplit === 'manual'
                    ? 'bg-amber-600/20 border-amber-400 text-white ring-1 ring-amber-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-amber-400 mb-1">⚠️ Qo'lda yoki daftarda chamalanadi</div>
                <div className="text-xs text-slate-300">Reviziyada doimiy peresort, tushunarsiz qoldiq va kamomad bo'ladi</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🏥 KLINIKA VA STOMATOLOGIYA UCHUN MAXSUS MIKRO-OPERATSION BLOK (PRO 5.0) */}
      {isClinic && (
        <div className="bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 pb-2 border-b border-cyan-500/20">
            <span className="text-xl">🏥</span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">Xususiy Klinika va Stomatologiya Maxsus Diagnostikasi</h3>
              <p className="text-xs sm:text-sm text-cyan-400 font-medium">Shifokorlar KPI, kassa chetlab o'tilishi va reaktivlar isrofi nazorati</p>
            </div>
          </div>

          {/* Vrach cho'ntagiga to'lov / Kassa chetlab o'tish */}
          <div 
            data-error={errors.includes('clinicCashBypass') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${errors.includes('clinicCashBypass') ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-white">
                1. Navbat va "Kassa chetlab o'tilishi" (Vrach cho'ntagiga to'lov xavfi):
              </label>
              {errors.includes('clinicCashBypass') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> Tanlang
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange({ clinicCashBypass: 'strict_cashier' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.clinicCashBypass === 'strict_cashier'
                    ? 'bg-emerald-600/20 border-emerald-400 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-emerald-400 mb-1">✅ Faqat markaziy kassa cheki bilan</div>
                <div className="text-xs text-slate-300">Shifokor qabuliga faqat kassa to'lovi yoki navbat kodi bilan kiriladi (100% shaffof)</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ clinicCashBypass: 'risk_bypass' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.clinicCashBypass === 'risk_bypass'
                    ? 'bg-red-600/20 border-red-400 text-white ring-1 ring-red-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-red-400 mb-1">🚨 Shifokor xonasida ham to'lov olinadi</div>
                <div className="text-xs text-slate-300">Kassa chetlab o'tilib, klinika tushumining 20-35% gacha qismi yo'qoladi!</div>
              </button>
            </div>
          </div>

          {/* Reaktivlar va sarf materiallari */}
          <div 
            data-error={errors.includes('clinicMaterialSpisanie') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${errors.includes('clinicMaterialSpisanie') ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-white">
                2. Laboratoriya reaktivlari va Tibbiy sarf materiallari (Spisaniya):
              </label>
              {errors.includes('clinicMaterialSpisanie') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> Tanlang
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange({ clinicMaterialSpisanie: 'automated' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.clinicMaterialSpisanie === 'automated'
                    ? 'bg-emerald-600/20 border-emerald-400 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-emerald-400 mb-1">✅ Xizmat bo'yicha avtomatik spisaniya</div>
                <div className="text-xs text-slate-300">Shprits, reaktiv, plomba normasi 1C da avtomat hisobdan chiqariladi</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ clinicMaterialSpisanie: 'untracked' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.clinicMaterialSpisanie === 'untracked'
                    ? 'bg-amber-600/20 border-amber-400 text-white ring-1 ring-amber-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-amber-400 mb-1">⚠️ Umumiy olinadi, aniq norma yo'q</div>
                <div className="text-xs text-slate-300">15-25% tibbiy sarf materiallari isrof bo'lishi yoki o'g'irlanishi mumkin</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛡️ ANTI-FRAUD & XAVFSIZLIK DETEKTORI: KASSA VA OMBOR O'G'RILIKLARINI TEKSHIRISH (BARCHA SOHALARGA) */}
      <div className="bg-gradient-to-b from-rose-950/30 via-slate-900 to-slate-900 border-2 border-rose-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 pb-2 border-b border-rose-500/20">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">Anti-Fraud & Kassa Xavfsizligi Detektori</h3>
            <p className="text-xs sm:text-sm text-rose-300 font-medium">Kassir va sotuvchilar tomonidan pul o'marilishi xavfini aniqlash</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Otmena/Vozvrat */}
          <div 
            data-error={errors.includes('fraudVoidPermission') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${
              errors.includes('fraudVoidPermission') 
                ? 'bg-red-950/40 border-2 border-red-500 ring-2 ring-red-500/30' 
                : 'bg-slate-950/60 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm font-bold text-white">1. Chekni bekor qilish:</div>
              {errors.includes('fraudVoidPermission') && (
                <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
              )}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onChange({ fraudVoidPermission: 'manager_only' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudVoidPermission === 'manager_only'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                ✅ Faqat rahbar/administrator paroli bilan
              </button>
              <button
                type="button"
                onClick={() => onChange({ fraudVoidPermission: 'cashier_allowed' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudVoidPermission === 'cashier_allowed'
                    ? 'bg-red-600/20 border-red-500 text-red-300 ring-1 ring-red-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🚨 Kassir o'zi bekor qila oladi ("Soxta vozvrat" xavfi!)
              </button>
            </div>
          </div>

          {/* Tarozi / Narx kiritish */}
          <div 
            data-error={errors.includes('fraudScaleIntegration') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${
              errors.includes('fraudScaleIntegration') 
                ? 'bg-red-950/40 border-2 border-red-500 ring-2 ring-red-500/30' 
                : 'bg-slate-950/60 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm font-bold text-white">2. Narx yoki vazn kiritish:</div>
              {errors.includes('fraudScaleIntegration') && (
                <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
              )}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onChange({ fraudScaleIntegration: 'direct_integrated' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudScaleIntegration === 'direct_integrated'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                ✅ Dasturga avtomat ulanadi (qo'lda o'zgarmaydi)
              </button>
              <button
                type="button"
                onClick={() => onChange({ fraudScaleIntegration: 'manual_entry' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudScaleIntegration === 'manual_entry'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                ⚠️ Sotuvchi qo'lda teradi (arzonroq urish xavfi)
              </button>
            </div>
          </div>

          {/* Prixod va Ustama */}
          <div 
            data-error={errors.includes('fraudPriceEntry') ? "true" : undefined}
            className={`p-3.5 rounded-xl transition-all ${
              errors.includes('fraudPriceEntry') 
                ? 'bg-red-950/40 border-2 border-red-500 ring-2 ring-red-500/30' 
                : 'bg-slate-950/60 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm font-bold text-white">3. Yangi tovar prixodini:</div>
              {errors.includes('fraudPriceEntry') && (
                <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
              )}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onChange({ fraudPriceEntry: 'manager_office' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudPriceEntry === 'manager_office'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                ✅ Faqat ofis / ta'minotchi kiritadi
              </button>
              <button
                type="button"
                onClick={() => onChange({ fraudPriceEntry: 'cashier_entry' })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                  formData.fraudPriceEntry === 'cashier_entry'
                    ? 'bg-red-600/20 border-red-500 text-red-300 ring-1 ring-red-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🚨 Sotuvchining o'zi kiritadi (tannarx chalkashligi)
              </button>
            </div>
          </div>
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
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          Keyingisi (Marketing & Trafik) &rarr;
        </button>
      </div>
    </div>
  );
}
