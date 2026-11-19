import React from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, BookOpen, AlertOctagon, 
  Package, Clock, ShieldAlert, Sparkles, BarChart3, BrainCircuit, Layers, AlertCircle,
  Users, Calendar, Scissors, Utensils, Stethoscope, Pill, Hammer, FileText
} from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/industryBenchmarks';

export function StepAutomationSoftware({ formData, onChange, onNext, onPrev, errors = [], errorMessage = '', t = (s) => s }) {
  const currentIndustry = INDUSTRY_BENCHMARKS[formData.industry] || INDUSTRY_BENCHMARKS.retail_general;
  const isFastMode = formData.auditMode === 'fast';
  
  const isHoreca = currentIndustry.id === 'horeca_cafe';
  const isEducation = currentIndustry.category === 'talim' || formData.industry === 'education_courses';
  const isServices = (currentIndustry.category === 'xizmat' && !isHoreca) || formData.industry === 'services_general';
  const isManufacturing = formData.industry === 'manufacturing';
  const isPharmacy = formData.industry === 'pharmacy';
  const isClinic = formData.industry === 'clinic_medical';
  const isTrade = ['retail_food', 'retail_general', 'wholesale_b2b', 'pharmacy'].includes(formData.industry);
  const isServiceOrEducation = ['education_courses', 'clinic_medical', 'services_general'].includes(formData.industry);
  const isMarkingRequired = ['retail_food', 'pharmacy'].includes(formData.industry);

  const getCardStyle = (name) => {
    return errors.includes(name)
      ? 'border-2 border-red-500 ring-2 ring-red-500/30 bg-red-950/20'
      : 'border border-slate-800 bg-slate-900/60';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
          {isFastMode ? t("⚡ 2-Bosqich: Asosiy tizim & Og'riq") : t("2-Bosqich: Dastur & Avtomatlashtirish")}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isFastMode 
            ? t("Hisob-kitob va Asosiy Operatsion Og'riqlar") 
            : t("Hisob-kitob, Kassa va Operatsion Nazorat")}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {t("Soha:")} <span className="text-white font-medium">{t(currentIndustry.name)}</span>
          {isFastMode && (
            <span className="ml-2 text-xs text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
              {t("⚡ Tezkor rejim: 3 ta asosiy savol")}
            </span>
          )}
        </p>
      </div>

      {/* 1. Kassa va hisob tizimi (Hammasida bor) */}
      <div 
        data-error={errors.includes('accountingSoftware') ? "true" : undefined}
        className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('accountingSoftware')}`}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-200">
            {isPharmacy ? t("1. Dorilar qoldig'i, seriyali hisob va kassa qanday yuritiladi?") :
             isClinic ? t("1. Registratura, bemorlar navbati va to'lovlar qanday yuritiladi?") :
             isHoreca ? t("1. Oshxona tex-kartasi, mahsulot sarfi va kassa qanday yuritiladi?") :
             isEducation ? t("1. O'quvchilar hisobi, davomat va to'lovlar qanday yuritiladi?") :
             isServices ? t("1. Mijozlar qabuli, navbat va xizmatlar hisobi qanday yuritiladi?") :
             isManufacturing ? t("1. Ishlab chiqarish, sex kassa va ombor hisobi qanday yuritiladi?") :
             t("1. Tovarlar qoldig'i (ostatka), ombor va kassa qanday yuritiladi?")}
          </label>
          {errors.includes('accountingSoftware') && (
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
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
              <span className="font-semibold text-sm">{t("Dastur bor (1C / POS / CRM)")}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              {t("Maxsus dastur o'rnatilgan va kassa apparatiga ulangan")}
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
              <span className="font-semibold text-sm">{t("Excelda yuritiladi")}</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">
              {t("Jadvallarga qo'lda yoziladi, avtomat kassa integratsiyasi yo'q")}
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
              <span className="font-semibold text-sm">{t("Daftarda / Qog'ozda")}</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xs text-slate-400">
              {t("Dastur yo'q, hisob-kitoblar qo'lda daftarga qayd qilinadi")}
            </div>
          </button>
        </div>
      </div>

      {/* TEZKOR REJIM (Fast Mode - Faqat 2 ta qo'shimcha savol) */}
      {isFastMode ? (
        <>
          {/* Fast Savol 2: Asosiy sohaviy og'riq */}
          {isManufacturing && (
            <div 
              data-error={errors.includes('productionWastage') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('productionWastage')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-amber-400" />
                  {t("2. Xomashyo va \"Otxod\" (brak/chiqindi) nazorati:")}
                </label>
                {errors.includes('productionWastage') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Har bir buyurtmaga qancha xomashyo ketgani va otxod foizi dasturda aniq hisoblanadimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button type="button" onClick={() => onChange({ productionWastage: 'accurate' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.productionWastage === 'accurate' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Aniq hisoblanadi (0-3% brak)")}</div>
                  <div className="text-slate-400">{t("Otxod normada nazorat qilinadi")}</div>
                </button>
                <button type="button" onClick={() => onChange({ productionWastage: 'estimated' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.productionWastage === 'estimated' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Taxminan bilaman (5-8% otxod)")}</div>
                  <div className="text-slate-400">{t("Ko'z bilan chamalab chiqariladi")}</div>
                </button>
                <button type="button" onClick={() => onChange({ productionWastage: 'uncontrolled' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.productionWastage === 'uncontrolled' ? 'bg-red-600/20 border-red-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-red-400 mb-1">{t("🚨 Hisoblanmaydi (8-15% zarar)")}</div>
                  <div className="text-slate-400">{t("Xomashyo o'g'irligi va otxod nazoratsiz")}</div>
                </button>
              </div>
            </div>
          )}

          {isEducation && (
            <div 
              data-error={errors.includes('educationAttendance') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('educationAttendance')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {t("2. Davomat va Oylik to'lovlar nazorati:")}
                </label>
                {errors.includes('educationAttendance') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("O'quvchilar davomati, qarzdorlar va o'qituvchilar oyligi avtomatik hisoblanadimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ educationAttendance: 'automated' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.educationAttendance === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ CRM da avtomatlashgan")}</div>
                  <div className="text-slate-400">{t("Davomat, SMS eslatma va to'lovlar tizimda")}</div>
                </button>
                <button type="button" onClick={() => onChange({ educationAttendance: 'manual' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.educationAttendance === 'manual' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Daftar / Excelda qo'lda")}</div>
                  <div className="text-slate-400">{t("Qarzdorlarni qidirishga vaqt ketadi")}</div>
                </button>
              </div>
            </div>
          )}

          {isServices && (
            <div 
              data-error={errors.includes('servicesSpecialistSchedule') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('servicesSpecialistSchedule')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-purple-400" />
                  {t("2. Ustalar bandligi va Onlayn navbat:")}
                </label>
                {errors.includes('servicesSpecialistSchedule') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Ustalar jadvali, bo'sh soatlar va mutaxassisning foizli oyligi dasturda yuritiladimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ servicesSpecialistSchedule: 'automated' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.servicesSpecialistSchedule === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Dasturda sozlangan")}</div>
                  <div className="text-slate-400">{t("Navbat va usta foizi avtomatik hisoblanadi")}</div>
                </button>
                <button type="button" onClick={() => onChange({ servicesSpecialistSchedule: 'manual' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.servicesSpecialistSchedule === 'manual' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Qo'lda yoki daftarda")}</div>
                  <div className="text-slate-400">{t("Ustalar bo'sh vaqti to'liq nazorat qilinmaydi")}</div>
                </button>
              </div>
            </div>
          )}

          {isHoreca && (
            <div 
              data-error={errors.includes('horecaKitchenFoodCost') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('horecaKitchenFoodCost')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-orange-400" />
                  {t("2. Oshxona tex-kartasi (Food-cost) va masalliqlar sarfi:")}
                </label>
                {errors.includes('horecaKitchenFoodCost') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Har bir sotilgan taomdan so'ng ombordan masalliqlar grammigacha avtomat yechiladimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ horecaKitchenFoodCost: 'automated' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.horecaKitchenFoodCost === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Ha, dasturda avtomatik")}</div>
                  <div className="text-slate-400">{t("Oshxona ombori qat'iy nazoratda")}</div>
                </button>
                <button type="button" onClick={() => onChange({ horecaKitchenFoodCost: 'manual' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.horecaKitchenFoodCost === 'manual' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Yo'q / Chamalab olinadi")}</div>
                  <div className="text-slate-400">{t("Oshxonada isrof va kamomad xavfi bor")}</div>
                </button>
              </div>
            </div>
          )}

          {isPharmacy && (
            <div 
              data-error={errors.includes('pharmacyExpiryTracking') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('pharmacyExpiryTracking')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Pill className="w-4 h-4 text-emerald-400" />
                  {t("2. Srok godnosti va dorilar seriyasi nazorati:")}
                </label>
                {errors.includes('pharmacyExpiryTracking') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Muddati yaqinlashgan dorilar haqida dastur oldindan ogohlantiradimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ pharmacyExpiryTracking: 'automated' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.pharmacyExpiryTracking === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Dasturda FIFO bo'yicha nazoratda")}</div>
                  <div className="text-slate-400">{t("Muddati o'tib qolish xavfi 0%")}</div>
                </button>
                <button type="button" onClick={() => onChange({ pharmacyExpiryTracking: 'manual' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.pharmacyExpiryTracking === 'manual' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Qo'lda tekshirib turiladi")}</div>
                  <div className="text-slate-400">{t("Oylab muddati o'tgan dorilar chiqib turadi")}</div>
                </button>
              </div>
            </div>
          )}

          {isClinic && (
            <div 
              data-error={errors.includes('clinicCashBypass') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('clinicCashBypass')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" />
                  {t("2. Kassani chetlab o'tish (Shifokor cho'ntagiga to'lov):")}
                </label>
                {errors.includes('clinicCashBypass') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Bemorlar elektron navbat orqali to'liq markaziy kassaga to'laydimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ clinicCashBypass: 'prevented' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.clinicCashBypass === 'prevented' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ 100% Kassa orqali o'tadi")}</div>
                  <div className="text-slate-400">{t("Elektron navbat kassasiz qabul qilmaydi")}</div>
                </button>
                <button type="button" onClick={() => onChange({ clinicCashBypass: 'risk' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.clinicCashBypass === 'risk' ? 'bg-red-600/20 border-red-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-red-400 mb-1">{t("🚨 Cho'ntakka to'lov xavfi bor")}</div>
                  <div className="text-slate-400">{t("15-30% tushum kassadan chetda qolishi mumkin")}</div>
                </button>
              </div>
            </div>
          )}

          {!isManufacturing && !isEducation && !isServices && !isHoreca && !isPharmacy && !isClinic && (
            <div 
              data-error={errors.includes('inventoryStatus') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('inventoryStatus')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  {t("2. Ombor va Nelikvid (Muzlagan tovarlar) holati:")}
                </label>
                {errors.includes('inventoryStatus') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Ombordagi qoldiqlar aniqmi yoki oylab sotilmaydigan tovarlar aylanmani band qilganmi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ inventoryStatus: 'accurate' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.inventoryStatus === 'accurate' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Qoldiqlar aniq & Tez aylanadi")}</div>
                  <div className="text-slate-400">{t("Nelikvid va kamomad yo'q")}</div>
                </button>
                <button type="button" onClick={() => onChange({ inventoryStatus: 'dead_stock' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.inventoryStatus === 'dead_stock' ? 'bg-red-600/20 border-red-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-red-400 mb-1">{t("⚠️ Nelikvid tovar ko'p / Taxminan")}</div>
                  <div className="text-slate-400">{t("Pul omborda muzlab qolmoqda")}</div>
                </button>
              </div>
            </div>
          )}

          {/* Fast Savol 3: Ta'lim/Xizmatda Bandlik, qolganlarda Nasiya */}
          {isServiceOrEducation ? (
            <div 
              data-error={errors.includes('capacityUtilization') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('capacityUtilization')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {t("3. O'rinlar / Xonalar / Mutaxassislar bandligi darajasi (%):")}
                </label>
                {errors.includes('capacityUtilization') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Mavjud quvvatingiz (xona, parta, usta o'rni) o'rtacha necha foizga to'lgan?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button type="button" onClick={() => onChange({ capacityUtilization: 'high' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.capacityUtilization === 'high' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("80% - 100% (To'liq)")}</div>
                  <div className="text-slate-400">{t("Bo'sh joylar deyarli yo'q")}</div>
                </button>
                <button type="button" onClick={() => onChange({ capacityUtilization: 'medium' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.capacityUtilization === 'medium' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("50% - 79% (O'rtacha)")}</div>
                  <div className="text-slate-400">{t("Bo'sh soat va joylar bor")}</div>
                </button>
                <button type="button" onClick={() => onChange({ capacityUtilization: 'low' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.capacityUtilization === 'low' ? 'bg-red-600/20 border-red-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-red-400 mb-1">{t("50% dan kam")}</div>
                  <div className="text-slate-400">{t("Katta zaxira bo'sh turibdi")}</div>
                </button>
              </div>
            </div>
          ) : (
            <div 
              data-error={errors.includes('debtTracking') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('debtTracking')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  {t("3. Mijozlar va do'konlarning qarzlari (Nasiya) nazorati:")}
                </label>
                {errors.includes('debtTracking') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">Tanlang</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">{t("Har bir mijoz qarzdorlik limiti va qaytish muddatlari dasturda ko'rinadimi?")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onChange({ debtTracking: 'software' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.debtTracking === 'software' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-emerald-400 mb-1">{t("✅ Dasturda avtomatlashgan")}</div>
                  <div className="text-slate-400">{t("SMS eslatma va limitlar bor")}</div>
                </button>
                <button type="button" onClick={() => onChange({ debtTracking: 'paper' })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all ${formData.debtTracking === 'paper' ? 'bg-amber-600/20 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-300'}`}>
                  <div className="font-bold text-amber-400 mb-1">{t("⚠️ Qarz daftarida / Aniq hisob yo'q")}</div>
                  <div className="text-slate-400">{t("Qarzlar kechikadi, daftardan qidiriladi")}</div>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* CHUQUR REJIM (Deep 360° Mode) */
        <>
          {/* 2. Nasiya va qarzlar */}
          <div 
            data-error={errors.includes('debtTracking') ? "true" : undefined}
            className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('debtTracking')}`}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-200">
                {isPharmacy ? t("2. Doimiy mijozlar va nasiyalar qanday yuritiladi?") :
                 isClinic ? t("2. Shifokorlar va tashqi vrachlar (Napravitellar) bonusi qanday?") :
                 isHoreca ? t("2. Doimiy mijozlar bonusi va yetkazib berish hisobi qanday?") :
                 isEducation ? t("2. Oylik to'lovlar va qarzdor o'quvchilar nazorati qanday?") :
                 isServices ? t("2. Mijozlar qarzlari, oldindan to'lov va abonent hisobi qanday?") :
                 t("2. Mijozlar va do'konlarning qarzlari (Nasiya) qanday yuritiladi?")}
              </label>
              {errors.includes('debtTracking') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
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
                  <span className="font-semibold text-sm">{t("Dasturda avtomatlashgan")}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400">
                  {t("Har bir mijoz limiti, to'lov muddatlari va eslatmalari dasturda ko'rinadi")}
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
                  <span className="font-semibold text-sm">{t("Qarz daftari bor (Qo'lda)")}</span>
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400">
                  {t("Qarzlar daftarga yoziladi, lekin eslatish va qidirish ko'p vaqt oladi")}
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
                  <span className="font-semibold text-sm">{t("Aniq hisob yo'q")}</span>
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-xs text-slate-400">
                  {t("Qarzdorlik yoki to'lovlar qat'iy nazorat qilinmaydi")}
                </div>
              </button>
            </div>
          </div>

          {/* 3. Ombor yoki Bandlik/Sig'im savoli */}
          {isServiceOrEducation ? (
            <div 
              data-error={errors.includes('capacityUtilization') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('capacityUtilization')}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {t("3. Bo'sh qolgan o'rinlar / Ustalar bandligi (%):")}
                </label>
                {errors.includes('capacityUtilization') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                {t("Mavjud joylar, xonalar va ustalar soatining necha foizi band?")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => onChange({ capacityUtilization: 'high' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.capacityUtilization === 'high'
                      ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">{t("80% - 100% (To'liq)")}</div>
                  <div className="text-[11px] text-slate-400">{t("Bo'sh joylar kam, navbat bor")}</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ capacityUtilization: 'medium' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.capacityUtilization === 'medium'
                      ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">{t("50% - 79% (O'rtacha)")}</div>
                  <div className="text-[11px] text-slate-400">{t("Bo'sh o'rinlar bor, 20-30% potentsial boy berilmoqda")}</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ capacityUtilization: 'low' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.capacityUtilization === 'low'
                      ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">{t("50% dan kam (Bo'sh)")}</div>
                  <div className="text-[11px] text-slate-400">{t("Katta maydon va ustalar o'rni samarasiz turibdi")}</div>
                </button>
              </div>
            </div>
          ) : (
            <div 
              data-error={errors.includes('inventoryStatus') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('inventoryStatus')}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  {t("3. Ombor va Nelikvid (Muzlagan tovarlar) holati qanday?")}
                </label>
                {errors.includes('inventoryStatus') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                {t("Ombordagi tovarlar qanchalik tez pulga aylanadi va hisobi aniqmi?")}
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
                  <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">{t("Qoldiqlar aniq & Tez aylanadi")}</div>
                  <div className="text-[11px] text-slate-400">{t("Kamomad yo'q, tovarlar muzlab qolmaydi")}</div>
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
                  <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">{t("Taxminan bilaman")}</div>
                  <div className="text-[11px] text-slate-400">{t("Bazi tovarlar qolib ketadi, aniq hisob yo'q")}</div>
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
                  <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">{t("Nelikvid & Kamomad ko'p")}</div>
                  <div className="text-[11px] text-slate-400">{t("Oylab sotilmaydigan tovarlar aylanmani band qilgan")}</div>
                </button>
              </div>
            </div>
          )}

          {/* 4. Soliq, Markirovka (Asl Belgisi) — FAQAT OZIQ-OVQAT VA DORIXONADA */}
          {isMarkingRequired && (
            <div 
              data-error={errors.includes('fiscalMarking') ? "true" : undefined}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('fiscalMarking')}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  {t("4. Soliq, Markirovka (Asl Belgisi) va Kassa integratsiyasi:")}
                </label>
                {errors.includes('fiscalMarking') && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                {t("Soliq talablari va 2D skaner orqali markirovka tizimlashganmi?")}
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
                  <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">{t("To'liq avtomatlashgan")}</div>
                  <div className="text-[11px] text-slate-400">{t("1C/POS ga ulangan, cheklar avtomat ketadi")}</div>
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
                  <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">{t("Qisman (Qo'lda uriladi)")}</div>
                  <div className="text-[11px] text-slate-400">{t("Xatoliklar va kassa navbatlari bo'lib turadi")}</div>
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
                  <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">{t("Tizimlashtirilmagan")}</div>
                  <div className="text-[11px] text-slate-400">{t("Markirovka qilinmaydi (katta jarima xavfi)")}</div>
                </button>
              </div>
            </div>
          )}

          {/* 5. Kunlik operatsionkaga ketadigan vaqt */}
          <div 
            data-error={errors.includes('dailyOperationalHours') ? "true" : undefined}
            className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('dailyOperationalHours')}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                {t("5. Kunlik operatsionkaga (hisob-kitob, qoldiq tekshirish, nazorat) qancha shaxsiy vaqtingiz ketadi?")}
              </label>
              {errors.includes('dailyOperationalHours') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
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
                <div className="font-semibold text-xs sm:text-sm text-emerald-400 mb-1">{t("Kuniga 1 soatdan kam")}</div>
                <div className="text-[11px] text-slate-400">{t("Tizim ishlaydi, rahbar hisobotni ko'radi")}</div>
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
                <div className="font-semibold text-xs sm:text-sm text-amber-400 mb-1">{t("Kuniga 2 - 4 soat")}</div>
                <div className="text-[11px] text-slate-400">{t("Doimiy nazorat va tekshirishlar talab qiladi")}</div>
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
                <div className="font-semibold text-xs sm:text-sm text-red-400 mb-1">{t("Kuniga 5+ soat")}</div>
                <div className="text-[11px] text-slate-400">{t("Butunlay operatsionkaga bog'lanib qolganman")}</div>
              </button>
            </div>
          </div>

          {/* 6 & 7. ABC-tahlil va Auto-ordering (Savdo, Dorixona, Ishlab chiqarishda) */}
          {!isServiceOrEducation && (
            <>
              {/* ABC tahlil */}
              <div 
                data-error={errors.includes('abcAnalysisStatus') ? "true" : undefined}
                className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('abcAnalysisStatus')}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    {t("6. Ombor va Tovarlar Analitikasi (ABC / XYZ tahlil):")}
                  </label>
                  {errors.includes('abcAnalysisStatus') && (
                    <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  {t("Qaysi 20% tovar 80% sof foyda keltirishini va qaysi tovarlar 60 kundan ortiq muzlab yotganini (Nelikvid) aniq bilasizmi?")}
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
                      <span className="font-semibold text-xs sm:text-sm text-emerald-400">{t("Dasturda avtomatik")}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">{t("1C/POS da ABC-tahlil va muzlagan tovarlar ro'yxati chiqadi")}</div>
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
                      <span className="font-semibold text-xs sm:text-sm text-amber-400">{t("Taxminan bilaman")}</span>
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">{t("Ko'z bilan chamalab tovar buyurtma qilamiz")}</div>
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
                      <span className="font-semibold text-xs sm:text-sm text-red-400">{t("Bilmayman / Qilinmaydi")}</span>
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">{t("ABC-tahlil yo'q, faqat tugagan tovarni olaveramiz")}</div>
                  </button>
                </div>
              </div>

              {/* Auto Ordering */}
              <div 
                data-error={errors.includes('autoOrderingStatus') ? "true" : undefined}
                className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('autoOrderingStatus')}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    {t("7. Xarid va Ta'minotchilar Prognozi (Auto-Ordering / Min-Max):")}
                  </label>
                  {errors.includes('autoOrderingStatus') && (
                    <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  {t("Yangi tovar xarid qilayotganda miqdorni qanday belgilaysiz?")}
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
                      <span className="font-semibold text-xs sm:text-sm text-emerald-400">{t("Dasturiy prognoz (Min-Max)")}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">{t("Oldingi savdo tezligiga qarab dastur o'zi hisoblaydi")}</div>
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
                      <span className="font-semibold text-xs sm:text-sm text-amber-400">{t("Og'zaki / Tugasa keyin olinadi")}</span>
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">{t("Sotuvchi aytganda olinadi (8-12% savdo boy beriladi)")}</div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 8. AI va Analitika */}
          <div 
            data-error={errors.includes('aiUsageStatus') ? "true" : undefined}
            className={`rounded-2xl p-4 sm:p-5 transition-all ${getCardStyle('aiUsageStatus')}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                {t("8. Sun'iy Intellekt (AI) va Avtomatik Telegram-bot Analitikasi:")}
              </label>
              {errors.includes('aiUsageStatus') && (
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> {t("Tanlang")}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {t("Biznesingizda Sun'iy Intellekt (AI) va avtomatik Telegram-bot analitikasidan foydalanasizmi?")}
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
                  <span className="font-semibold text-xs sm:text-sm text-emerald-400">{t("AI va Telegram bot ulangan")}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400">{t("1C/POS ga AI ulangan: har kechqurun tahliliy xulosa keladi")}</div>
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
                  <span className="font-semibold text-xs sm:text-sm text-amber-400">{t("Faqat oddiy chatda")}</span>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400">{t("ChatGPT dan post yoki matnlar uchun, bazaga ulanmagan")}</div>
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
                  <span className="font-semibold text-xs sm:text-sm text-red-400">{t("Ishlatmayman")}</span>
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400">{t("AI orqali savdo va omborni tahlil qilishni bilmayman")}</div>
              </button>
            </div>
          </div>

          {/* 🏭 ISHLAB CHIQARISH & SEXLAR MAXSUS BLOK */}
          {isManufacturing && (
            <div className="bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-amber-500/20">
                <Hammer className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Ishlab chiqarish & Sexlar Maxsus Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-amber-300 font-medium">{t("Xomashyo otxodi, tayyor mahsulot tannarxi va ishbay oylik")}</p>
                </div>
              </div>

              {/* 1. Otxod nazorati */}
              <div data-error={errors.includes('productionWastage') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('productionWastage')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">
                    {t("1. Xomashyo va \"Otxod\" (chiqindi/brak) nazorati:")}
                  </label>
                  {errors.includes('productionWastage') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{t("Har bir buyurtmaga qancha xomashyo ketgani va necha foiz otxod/brak chiqqani dasturda aniq hisoblanadimi?")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button type="button" onClick={() => onChange({ productionWastage: 'accurate' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionWastage === 'accurate' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Aniq hisoblanadi (0-3% brak)")}
                  </button>
                  <button type="button" onClick={() => onChange({ productionWastage: 'estimated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionWastage === 'estimated' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Taxminan (5-8% noaniq chiqindi)")}
                  </button>
                  <button type="button" onClick={() => onChange({ productionWastage: 'uncontrolled' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionWastage === 'uncontrolled' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("🚨 Hisoblanmaydi (8-15% zarar)")}
                  </button>
                </div>
              </div>

              {/* 2. Tannarx & Ishbay oylik */}
              <div data-error={errors.includes('productionCostCalculation') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('productionCostCalculation')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">
                    {t("2. Tannarx kalkulyatsiyasi va Ishbay (Sdelniy) oylik:")}
                  </label>
                  {errors.includes('productionCostCalculation') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{t("Tayyor mahsulot tannarxi (xomashyo + usta haqi + elektr/ijara) va ishchilar bajargan ishiga qarab oyligi avtomat hisoblanadimi?")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ productionCostCalculation: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionCostCalculation === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ 1C/Dasturda avtomatik hisoblanadi")}
                  </button>
                  <button type="button" onClick={() => onChange({ productionCostCalculation: 'manual_excel' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionCostCalculation === 'manual_excel' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Excelda yoki chamalab (oyliklar chalkashadi)")}
                  </button>
                </div>
              </div>

              {/* 3. B2B & Akt-sverki */}
              <div data-error={errors.includes('productionB2bOrders') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('productionB2bOrders')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">
                    {t("3. B2B Buyurtmalar va Akt-sverki nazorati:")}
                  </label>
                  {errors.includes('productionB2bOrders') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{t("Dilerlar va yirik mijozlar bilan buyurtma bosqichlari hamda qarzdorlik tizimda yuritiladimi?")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ productionB2bOrders: 'systematic' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionB2bOrders === 'systematic' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Tizimli: Akt-sverki 1C/CRM da qat'iy nazoratda")}
                  </button>
                  <button type="button" onClick={() => onChange({ productionB2bOrders: 'partial' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.productionB2bOrders === 'partial' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Telefonda / Daftarda (adashishlar va qarz kechikishi bor)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🎓 O'QUV MARKAZI MAXSUS BLOK */}
          {isEducation && (
            <div className="bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-blue-500/20">
                <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("O'quv Markazi & Kurslar Maxsus Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-blue-300 font-medium">{t("Davomat, to'lovlar nazorati va o'quvchilar ketib qolishi (Churn)")}</p>
                </div>
              </div>

              <div data-error={errors.includes('educationAttendance') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('educationAttendance')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("1. Davomat va Oylik to'lovlar nazorati:")}</label>
                  {errors.includes('educationAttendance') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ educationAttendance: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.educationAttendance === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ CRM da davomat va SMS eslatmalar sozlangan")}
                  </button>
                  <button type="button" onClick={() => onChange({ educationAttendance: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.educationAttendance === 'manual' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Qog'oz jurnalda yoki Excelda qo'lda yuritiladi")}
                  </button>
                </div>
              </div>

              <div data-error={errors.includes('educationChurn') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('educationChurn')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("2. Guruhlar to'lish darajasi va Ketib qolish (Churn):")}</label>
                  {errors.includes('educationChurn') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ educationChurn: 'tracked' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.educationChurn === 'tracked' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Sabablari tahlil qilinadi, qaytarish tizimi bor")}
                  </button>
                  <button type="button" onClick={() => onChange({ educationChurn: 'untracked' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.educationChurn === 'untracked' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Nazorat qilinmaydi (har oy 20-30% o'quvchi ketib qoladi)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ✂️ XIZMATLAR MAXSUS BLOK */}
          {isServices && (
            <div className="bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-900 border-2 border-purple-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-purple-500/20">
                <Scissors className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Xizmat Ko'rsatish Sohalari Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-purple-300 font-medium">{t("Ustalar jadvali, onlayn navbat va sarf materiallari hisobi")}</p>
                </div>
              </div>

              <div data-error={errors.includes('servicesSpecialistSchedule') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('servicesSpecialistSchedule')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("1. Ustalar bandligi va Onlayn navbat:")}</label>
                  {errors.includes('servicesSpecialistSchedule') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ servicesSpecialistSchedule: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.servicesSpecialistSchedule === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Dasturda ustalar grafigi va ish haqi foizi sozlangan")}
                  </button>
                  <button type="button" onClick={() => onChange({ servicesSpecialistSchedule: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.servicesSpecialistSchedule === 'manual' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Jonli navbat / Qo'lda yoziladi")}
                  </button>
                </div>
              </div>

              <div data-error={errors.includes('servicesMaterialUsage') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('servicesMaterialUsage')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("2. Sarf materiallari nazorati (moy, ehtiyot qism, bo'yoq):")}</label>
                  {errors.includes('servicesMaterialUsage') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ servicesMaterialUsage: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.servicesMaterialUsage === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Har mijozga ketgan material avtomat yechiladi")}
                  </button>
                  <button type="button" onClick={() => onChange({ servicesMaterialUsage: 'loose' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.servicesMaterialUsage === 'loose' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Umumiy olinadi, aniq norma yo'q (kamomad bor)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🍽️ HORECA MAXSUS BLOK */}
          {isHoreca && (
            <div className="bg-gradient-to-b from-orange-950/40 via-slate-900 to-slate-900 border-2 border-orange-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-orange-500/20">
                <Utensils className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Kafe, Restoran & Fast-Food Maxsus Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-orange-300 font-medium">{t("Oshxona tex-kartasi (Food-cost) va ofitsiant cheki nazorati")}</p>
                </div>
              </div>

              <div data-error={errors.includes('horecaKitchenFoodCost') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('horecaKitchenFoodCost')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("1. Oshxona tex-kartasi (Food-cost):")}</label>
                  {errors.includes('horecaKitchenFoodCost') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ horecaKitchenFoodCost: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.horecaKitchenFoodCost === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Grammigacha avtomat yechiladi")}
                  </button>
                  <button type="button" onClick={() => onChange({ horecaKitchenFoodCost: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.horecaKitchenFoodCost === 'manual' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Chamalab olinadi (oshxonada isrof xavfi)")}
                  </button>
                </div>
              </div>

              <div data-error={errors.includes('horecaOrderVoidControl') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('horecaOrderVoidControl')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("2. Ofitsiant cheki va Otmena nazorati:")}</label>
                  {errors.includes('horecaOrderVoidControl') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ horecaOrderVoidControl: 'manager_only' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.horecaOrderVoidControl === 'manager_only' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Chek bekor qilish faqat administrator paroli bilan")}
                  </button>
                  <button type="button" onClick={() => onChange({ horecaOrderVoidControl: 'cashier_allowed' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.horecaOrderVoidControl === 'cashier_allowed' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("🚨 Ofitsiant/kassir o'zi bekor qila oladi (kamomad)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 💊 DORIXONA MAXSUS BLOK */}
          {isPharmacy && (
            <div className="bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-500/20">
                <Pill className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Dorixona & Farmatsevtika Maxsus Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-emerald-400 font-medium">{t("Srok godnosti, blister bo'linishi va Asl Belgisi 2D nazorati")}</p>
                </div>
              </div>

              <div data-error={errors.includes('pharmacyExpiryTracking') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('pharmacyExpiryTracking')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("1. Yaroqlilik muddati (Srok godnosti) va Seriyali hisob:")}</label>
                  {errors.includes('pharmacyExpiryTracking') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ pharmacyExpiryTracking: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.pharmacyExpiryTracking === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ 1C FIFO bo'yicha nazoratda")}
                  </button>
                  <button type="button" onClick={() => onChange({ pharmacyExpiryTracking: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.pharmacyExpiryTracking === 'manual' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Qo'lda qarab turiladi (muddati o'tish xavfi bor)")}
                  </button>
                </div>
              </div>

              <div data-error={errors.includes('pharmacyBlisterSplit') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('pharmacyBlisterSplit')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("2. Blister (Plastinka) va ampulalar bo'lib sotish:")}</label>
                  {errors.includes('pharmacyBlisterSplit') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ pharmacyBlisterSplit: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.pharmacyBlisterSplit === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Dasturda bo'laklab to'g'ri hisobdan chiqariladi")}
                  </button>
                  <button type="button" onClick={() => onChange({ pharmacyBlisterSplit: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.pharmacyBlisterSplit === 'manual' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Qo'lda yoziladi (peresort va kamomad)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🏥 KLINIKA MAXSUS BLOK */}
          {isClinic && (
            <div className="bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-cyan-500/20">
                <Stethoscope className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Klinika & Stomatologiya Maxsus Diagnostikasi")}</h3>
                  <p className="text-xs sm:text-sm text-cyan-400 font-medium">{t("Kassani chetlab o'tish, shifokorlar KPI va reaktivlar spisaniyasi")}</p>
                </div>
              </div>

              <div data-error={errors.includes('clinicCashBypass') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('clinicCashBypass')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("1. Kassani chetlab o'tish (Shifokor cho'ntagiga to'lov):")}</label>
                  {errors.includes('clinicCashBypass') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ clinicCashBypass: 'prevented' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.clinicCashBypass === 'prevented' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ 100% Kassa orqali o'tadi (EMR va navbat)")}
                  </button>
                  <button type="button" onClick={() => onChange({ clinicCashBypass: 'risk' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.clinicCashBypass === 'risk' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("🚨 Cho'ntakka to'lov xavfi bor (15-30% yo'qotish)")}
                  </button>
                </div>
              </div>

              <div data-error={errors.includes('clinicMaterialSpisanie') ? "true" : undefined} className={`p-3.5 rounded-xl transition-all ${getCardStyle('clinicMaterialSpisanie')}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-bold text-white">{t("2. Reaktiv va tibbiy sarf materiallari hisobi:")}</label>
                  {errors.includes('clinicMaterialSpisanie') && <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button type="button" onClick={() => onChange({ clinicMaterialSpisanie: 'automated' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.clinicMaterialSpisanie === 'automated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("✅ Xizmat bo'yicha avtomatik spisaniya qilinadi")}
                  </button>
                  <button type="button" onClick={() => onChange({ clinicMaterialSpisanie: 'untracked' })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${formData.clinicMaterialSpisanie === 'untracked' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
                    {t("⚠️ Umumiy olinadi, aniq norma yo'q (isrof xavfi)")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🛡️ ANTI-FRAUD DETEKTORI: FAQAT SAVDO SOHALARIDA */}
          {isTrade && (
            <div className="bg-gradient-to-b from-rose-950/30 via-slate-900 to-slate-900 border-2 border-rose-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-rose-500/20">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{t("Anti-Fraud & Kassa Xavfsizligi Detektori")}</h3>
                  <p className="text-xs sm:text-sm text-rose-300 font-medium">{t("Kassir va sotuvchilar tomonidan pul o'marilishi xavfini aniqlash")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Otmena */}
                <div data-error={errors.includes('fraudVoidPermission') ? "true" : undefined}
                  className={`p-3.5 rounded-xl transition-all ${getCardStyle('fraudVoidPermission')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs sm:text-sm font-bold text-white">{t("1. Chekni bekor qilish:")}</div>
                    {errors.includes('fraudVoidPermission') && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button type="button" onClick={() => onChange({ fraudVoidPermission: 'manager_only' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudVoidPermission === 'manager_only' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("✅ Faqat rahbar/admin paroli bilan")}
                    </button>
                    <button type="button" onClick={() => onChange({ fraudVoidPermission: 'cashier_allowed' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudVoidPermission === 'cashier_allowed' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("🚨 Kassir o'zi bekor qila oladi")}
                    </button>
                  </div>
                </div>

                {/* Tarozi */}
                <div data-error={errors.includes('fraudScaleIntegration') ? "true" : undefined}
                  className={`p-3.5 rounded-xl transition-all ${getCardStyle('fraudScaleIntegration')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs sm:text-sm font-bold text-white">{t("2. Narx yoki vazn kiritish:")}</div>
                    {errors.includes('fraudScaleIntegration') && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button type="button" onClick={() => onChange({ fraudScaleIntegration: 'direct_integrated' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudScaleIntegration === 'direct_integrated' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("✅ Dasturga avtomat ulanadi")}
                    </button>
                    <button type="button" onClick={() => onChange({ fraudScaleIntegration: 'manual_entry' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudScaleIntegration === 'manual_entry' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("⚠️ Sotuvchi qo'lda teradi")}
                    </button>
                  </div>
                </div>

                {/* Prixod */}
                <div data-error={errors.includes('fraudPriceEntry') ? "true" : undefined}
                  className={`p-3.5 rounded-xl transition-all ${getCardStyle('fraudPriceEntry')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs sm:text-sm font-bold text-white">{t("3. Yangi tovar prixodini:")}</div>
                    {errors.includes('fraudPriceEntry') && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-500/40">Tanlang</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <button type="button" onClick={() => onChange({ fraudPriceEntry: 'manager_office' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudPriceEntry === 'manager_office' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("✅ Faqat ofis / ta'minotchi kiritadi")}
                    </button>
                    <button type="button" onClick={() => onChange({ fraudPriceEntry: 'cashier_entry' })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold cursor-pointer transition-all ${
                        formData.fraudPriceEntry === 'cashier_entry' ? 'bg-red-600/20 border-red-500 text-red-300' : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}>
                      {t("🚨 Sotuvchining o'zi kiritadi")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Validatsiya xatolik ogohlantirishi */}
      {errorMessage && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-xl shadow-red-950/50 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
          <span>{t(errorMessage)}</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all cursor-pointer"
        >
          &larr; {t("Orqaga")}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          {isFastMode ? t("Keyingisi (Moliya) &rarr;") : t("Keyingisi (Marketing & Trafik) &rarr;")}
        </button>
      </div>
    </div>
  );
}
