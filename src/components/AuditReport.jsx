import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, TrendingDown, TrendingUp, 
  DollarSign, Users, Target, ArrowRight, Printer, Share2, Sparkles, 
  CheckCircle, XCircle, Layers, Cpu, Zap,
  User, Building, Phone, Calendar, Laptop, Send, Award, Check,
  Sliders, AlertOctagon, CheckCircle2, ChevronRight
} from 'lucide-react';

export function AuditReport({ auditData, rawFormData }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'software' | 'funnel' | 'roadmap'

  const hasSoftware = rawFormData.accountingSoftware === 'software';
  const hasDebtTracking = rawFormData.debtTracking === 'software';
  const hasCrm = rawFormData.hasCrm === 'yes';

  // Interaktiv simulyator
  const [simPosInstalled, setSimPosInstalled] = useState(!hasSoftware);
  const [simDebtFixed, setSimDebtFixed] = useState(!hasDebtTracking);
  const [simCrmInstalled, setSimCrmInstalled] = useState(!hasCrm);

  const baseWasted = auditData.monthlyWastedMoney || 500;
  let simulatedSavingsMonthly = 0;
  if (simPosInstalled) simulatedSavingsMonthly += Math.round(baseWasted * 0.45);
  if (simDebtFixed) simulatedSavingsMonthly += Math.round(baseWasted * 0.30);
  if (simCrmInstalled) simulatedSavingsMonthly += Math.round(baseWasted * 0.25);
  const simulatedSavingsYearly = simulatedSavingsMonthly * 12;

  const handlePrint = () => {
    window.print();
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `📊 Korxona Marketing, Savdo & Moliya Auditi:\n` +
      `👤 Tadbirkor: ${rawFormData.fullName || "Mijoz"} (${rawFormData.businessName || "Korxona"})\n` +
      `🎯 Oylik maqsad: $${auditData.targetRevenue.toLocaleString()}\n` +
      `🏥 Salomatlik indeksi: ${auditData.scores.overall}/100 (${auditData.riskLevel})\n` +
      `💻 Dasturiy holat: ${hasSoftware ? "Dastur mavjud" : "Daftarda (Zarur)"}\n\n` +
      `Dastur o'rnatish va individual sozlash: Zoirjon Jalolov (+998995160021, @Jalolov_IST)`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Rasmiy Hujjat Sarlavhasi */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Rasmiy Auditorlik Diagnostikasi & Xulosasi
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {rawFormData.businessName ? `"${rawFormData.businessName}"` : "Korxona"} Savdo, Moliya & Marketing Auditi
            </h1>
            
            {/* Tadbirkor rekvizitlari */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-300 mt-2.5 flex-wrap">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <strong className="text-white">{rawFormData.fullName || "Tadbirkor"}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{rawFormData.phone || "—"}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>{auditData.industry.name}</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date().toLocaleDateString('uz-UZ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>PDF / Chop</span>
            </button>
            <button
              onClick={handleShareTelegram}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Ulashish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Asosiy Salomatlik Indeksi Kartalari */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Health Card */}
        <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Biznes Salomatlik Indeksi
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {auditData.scores.overall}
                </span>
                <span className="text-slate-500 font-semibold text-lg">/100</span>
              </div>
            </div>

            <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              auditData.scores.overall < 45
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : auditData.scores.overall < 70
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}>
              {auditData.scores.overall < 45 ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              {auditData.riskLevel}
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Dastur, Kassa & Hisob-kitob (Tizim):</span>
                <span className="text-purple-400 font-bold">{auditData.scores.system}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${auditData.scores.system}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Sotuv Voronkasi & Menejerlar:</span>
                <span className="text-indigo-400 font-bold">{auditData.scores.sales}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${auditData.scores.sales}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Marketing & Trafik jalb qilish:</span>
                <span className="text-cyan-400 font-bold">{auditData.scores.marketing}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${auditData.scores.marketing}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wasted Money Card */}
        <div className="bg-red-950/25 border border-red-900/40 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Optimallashtirish potentsiali</span>
              <TrendingDown className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-red-400">
              ${auditData.monthlyWastedMoney.toLocaleString()}
              <span className="text-xs text-red-400/80 font-normal"> /oyiga</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {hasSoftware
                ? "Dastur imkoniyatlarini to'liq ishlatish va individual sozlash orqali oyiga ushbu summani qo'shimcha foydaga aylantirish mumkin."
                : `Daftarda ishlash va CRM yo'qligi sababli yillik $${auditData.yearlyWastedMoney.toLocaleString()} pul yo'qotilmoqda.`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-900/30 text-[11px] font-semibold text-red-400">
            {hasSoftware ? "O'sish rezervi: +" + auditData.totalPenaltyPercentage + "%" : "Ortiqcha xarajat jarimasi: +" + auditData.totalPenaltyPercentage + "%"}
          </div>
        </div>

        {/* Target Revenue Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Moliyaviy Maqsad</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              ${auditData.targetRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-2 space-y-1">
              <div>Kerakli xaridorlar: <strong className="text-white">{auditData.requiredCustomers} ta</strong></div>
              <div>O'rtacha chek: <strong className="text-white">${auditData.averageCheck}</strong></div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-semibold text-emerald-400">
            Kutilayotgan sof tushum: ~${auditData.expectedGrossProfit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ⭐ DIAGNOSTIKA: DASTURI BOR VA YO'QLARGA MOSLANGAN TAHLIL ⭐ */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            {hasSoftware ? "Biznesni Tahlil Qilish & Optimallashtirish" : "Diagnostika: Pul qayerga oqib ketyapti?"}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            {hasSoftware 
              ? "Korxonangiz Dasturiy Tizimi Bo'yicha Tahliliy Xulosa" 
              : "Biznesingizdagi Asosiy 3 Ta Moliyaviy Teshik"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {hasSoftware
              ? "Sizda dasturiy poydevor mavjud! Endi uni yanada mukammallashtirish va individual yondashuv orqali foydani oshirish bo'yicha tavsiyalar:"
              : "Qog'oz-daftarda ishlash sababli daromadingizning katta qismi sizga yetib kelmayapti:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Blok 1: Kassa va Ombor */}
          <div className={`p-5 rounded-2xl border ${hasSoftware ? 'bg-slate-950 border-emerald-900/40' : 'bg-slate-950 border-red-900/40'}`}>
            <div className="text-xs font-bold mb-1 flex items-center justify-between">
              <span className={hasSoftware ? 'text-emerald-400' : 'text-red-400'}>
                {hasSoftware ? "1. KASSA & OMBOR (DASTUR BOR)" : "1-TESHIK: OMOBOR & KASSA"}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${hasSoftware ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                {hasSoftware ? "Poydevor bor" : `~${Math.round(baseWasted * 0.45)}$/oy`}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              {hasSoftware ? "Individual yondashuv & Nazorat" : "Daftarda yuritish xavfi"}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {hasSoftware
                ? "Dastur o'rnatilgani juda yaxshi! Endi dasturdagi tovar qoldiqlarini 100% to'g'ri chiqarish, inventarizatsiyadagi chalkashliklarni yo'qotish va xodimlar uchun kassa intizomini kuchaytirish zarur."
                : "Kassada shtrix-kodli dastur bo'lmasa, tovar qoldig'i (ostatka) hisoblanmaydi. Tovar kamomadi va o'g'irliklar tufayli oyiga yuzlab dollar yo'qotiladi."}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{hasSoftware ? "Tavsiya: Dasturni chuqur sozlash & Audit" : "Yechim: POS savdo dasturi o'rnatish"}</span>
            </div>
          </div>

          {/* Blok 2: Qarzlar va Nasiya */}
          <div className={`p-5 rounded-2xl border ${hasDebtTracking ? 'bg-slate-950 border-emerald-900/40' : 'bg-slate-950 border-amber-900/40'}`}>
            <div className="text-xs font-bold mb-1 flex items-center justify-between">
              <span className={hasDebtTracking ? 'text-emerald-400' : 'text-amber-400'}>
                {hasDebtTracking ? "2. QARZLAR (DASTURDA)" : "2-TESHIK: QARZ DAFTARI"}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${hasDebtTracking ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {hasDebtTracking ? "Nazoratda" : `~${Math.round(baseWasted * 0.30)}$/oy`}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              {hasDebtTracking ? "Nasiya moduli faol" : "Daftardagi muzlagan pullar"}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {hasDebtTracking
                ? "Qarzlar dasturda yuritilishi aylanma mablag'ni himoya qiladi. Endi qarzdorlik muddatlari o'tganda avtomatik SMS eslatmalar integratsiyasini ulash tavsiya etiladi."
                : "Qarzlar daftarga yozilsa, eslatish noqulay, qachon to'lanishi aniq emas. O'rtacha 15% qarzlar yillab yopilmay, aylanma pulingiz muzlab qoladi."}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{hasDebtTracking ? "Tavsiya: SMS eslatmalarni ulash" : "Yechim: Avtomatlashgan Nasiya moduli"}</span>
            </div>
          </div>

          {/* Blok 3: Lidlar va CRM */}
          <div className={`p-5 rounded-2xl border ${hasCrm ? 'bg-slate-950 border-emerald-900/40' : 'bg-slate-950 border-blue-900/40'}`}>
            <div className="text-xs font-bold mb-1 flex items-center justify-between">
              <span className={hasCrm ? 'text-emerald-400' : 'text-blue-400'}>
                {hasCrm ? "3. MIJOZLAR (CRM BOR)" : "3-TESHIK: MIJOZLAR KETISHI"}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${hasCrm ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                {hasCrm ? "Tizimli" : `~${Math.round(baseWasted * 0.25)}$/oy`}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              {hasCrm ? "Mijozlar bazasi nazoratda" : "Murojaatlarning unutilishi"}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {hasCrm
                ? "Mijozlar bazasi mavjudligi a'lo! Endi eski xaridorlarga takroriy sotuvlar (LTV) va avtomatlashgan aksiyalar orqali o'rtacha chekni ko'tarish kerak."
                : "Reklamadan qiziqib yozgan 100 ta odamdan 30 tasi javob kechikkani yoki qayta qo'ng'iroq qilinmagani sababli raqobatchiga ketmoqda."}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{hasCrm ? "Tavsiya: Qayta sotuv voronkasi" : "Yechim: CRM va tezkor sotuv tizimi"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ Zoirjon Jalolov - Dastur O'rnatish & Individual Yondashuv Bloki ⭐ */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/50 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wide border border-blue-500/30">
              <Award className="w-4 h-4 text-amber-400" />
              {hasSoftware ? "Mavjud Dasturingizga Individual Yondashuv" : "Biznesingizni Avtomatlashtirish Yechimi"}
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white">
              {hasSoftware
                ? "Dasturingizga Individual Yondashuv & Korxonani To'liq Tizimlashtirish"
                : "Korxonangizga Zamonaviy POS Dasturlari & 1C: Korxona Tizimini O'rnatish"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {hasSoftware
                ? "Agar sizda dastur bo'lsa-yu, lekin tovar qoldiqlari to'g'ri chiqmayotgan bo'lsa, xodimlar chalkashayotgan bo'lsa yoki qo'shimcha imkoniyatlar kerak bo'lsa — Zoirjon Jalolov tizimingizni individual audit qilib, aniq to'g'irlab beradi:"
                : "Daftardagi hisob-kitob, tovar kamomadlari va qarzlardagi chalkashliklarni butunlay to'xtatish uchun korxonangizga maxsus savdo dasturlarini o'rnatib, xodimlaringizni to'liq o'rgatib beramiz:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{hasSoftware ? "Mavjud POS/1C dasturidagi xatolarni to'g'rilash" : "POS savdo dasturlari (Kassa, shtrix-kod, chek)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{hasSoftware ? "Tannarx va sof foydani 100% aniq chiqarish" : "1C: Korxona tizimini to'liq joriy etish"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Qarzlar (nasiya) va mijozlar elektron bazasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Xodimlarni qayta o'qitish va kassa intizomini o'rnatish</span>
              </div>
            </div>
          </div>

          {/* Ekspert Kontaktlari */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-4 sm:p-6 shrink-0 w-full lg:w-80 space-y-3.5">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Tizimlashtirish bo'yicha mutaxassis:</div>
              <div className="text-lg font-bold text-white mt-0.5">Zoirjon Jalolov</div>
              <div className="text-xs text-blue-400">POS & 1C Tizimlari Mutaxassisi</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <a
                href="tel:+998995160021"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+998 99 516 00 21</span>
                </div>
                <span className="text-[10px] text-slate-400">Qo'ng'iroq</span>
              </a>

              <a
                href="https://t.me/Jalolov_IST"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md shadow-blue-500/20"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-white" />
                  <span>@Jalolov_IST</span>
                </div>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Telegram</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Dastur tanlash yoki mavjud tizimni sozlash bo'yicha bepul konsultatsiya
            </p>
          </div>
        </div>
      </div>

      {/* 📱 QULAY MOBIL VA DESKTOP MENYU (NATIJA BO'LIMLARI) 📱 */}
      <div className="no-print">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1 sm:hidden">
          Natija bo'limlari:
        </div>
        <div className="grid grid-cols-2 sm:flex sm:border-b sm:border-slate-800 gap-2 sm:gap-1 p-1 bg-slate-900/90 sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-slate-800">
          {[
            { id: 'overview', label: "📋 Qadamlar (Retsept)", icon: Layers },
            { id: 'software', label: "💻 Dasturlar Tavsiyasi", icon: Laptop },
            { id: 'funnel', label: "📊 Funnel & Byudjet", icon: DollarSign },
            { id: 'roadmap', label: "⚡ 30 Kunlik Reja", icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 sm:py-3 rounded-xl sm:rounded-none text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white sm:bg-blue-500/10 sm:text-blue-400 sm:border-b-2 sm:border-blue-500 shadow-md sm:shadow-none'
                    : 'bg-slate-950 sm:bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: RETSEPT & QADAMLAR */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Tadbirkor Uchun Aniq Retsept (3 ta eng muhim qadam):
            </h3>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {hasSoftware ? "Dastur qoldiqlarini real ombor bilan solishtirish" : "Inventarizatsiya qilib, tovarlarni POS dasturiga kiritish"}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {hasSoftware
                      ? "Do'kondagi tovarlarni dastur bilan to'liq muvofiqlashtiring va kassir-sotuvchilarga aniq javobgarlik yuklang."
                      : "Do'kondagi barcha tovar qoldiqlarini hisoblab, shtrix-kodlar bilan kassa dasturiga joylang. Bu sizga omborni to'liq ko'rsatadi."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Qarzlarni qat'iy limit bilan avtomatlashtirish</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Qarz oluvchi mijozlarga limit belgilang. Qarz muddati o'tganda yangi tovar bermaslik va avtomatik eslatma yuborish tartibini joriy qiling.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zoirjon Jalolov bilan individual sozlash yoki dastur o'rnatish</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {hasSoftware
                      ? "Mavjud dasturingizni professional audit qilib, individual xatoliklarni to'g'rilang va xodimlarni o'qiting."
                      : "Sohangizga mos POS va 1C dasturini o'rnatib, xodimlaringizga kassa bilan to'g'ri ishlashni o'rgating."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOFTWARE RECOMMENDATIONS */}
      {activeTab === 'software' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditData.softwareRecommendations.map((soft, sIdx) => (
              <div
                key={sIdx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-white">{soft.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {soft.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {soft.reason}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Kutilayotgan natija: {soft.impact}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Dastur o'rnatish yoki mavjud tizimni sozlamoqchimisiz?</h4>
              <p className="text-xs text-slate-300 mt-1">
                Zoirjon Jalolov sizning korxonangizga mos POS va 1C dasturlarini o'rnatib, xodimlarni o'qitib beradi.
              </p>
            </div>
            <a
              href="https://t.me/Jalolov_IST"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all whitespace-nowrap text-center shadow-lg shadow-blue-600/30"
            >
              Telegramda yozish &rarr;
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: FUNNEL & BUDGET */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Voronka Taqqoslovi (Ideal vs Real)
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Kerakli lidlar (Murojaatlar soni):</div>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-xs text-slate-400">Tizimli biznesda: </span>
                      <strong className="text-emerald-400 text-base">{auditData.requiredLeadsIdeal} ta</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Hozirgi holatda: </span>
                      <strong className="text-red-400 text-base">{auditData.realRequiredLeads} ta</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Optimal reklama byudjeti (Tavsiya etiladi):</div>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-xs text-slate-400">Ideal: </span>
                      <strong className="text-emerald-400 text-base">${auditData.optimalBudgetIdeal.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Hozirgi real: </span>
                      <strong className="text-amber-400 text-base">${auditData.realOptimalBudget.toLocaleString()}</strong>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-amber-400 font-medium">
                    ⚠️ Byudjet farqi (yo'qotish): +${auditData.monthlyWastedMoney.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  Hisob-kitob Formulalari
                </h3>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-blue-400">Kerakli mijozlar</span> = ${auditData.targetRevenue} / ${auditData.averageCheck} = <span className="text-white font-bold">{auditData.requiredCustomers} ta</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-cyan-400">Kerakli lidlar</span> = {auditData.requiredCustomers} / {auditData.conversionRate}% = <span className="text-white font-bold">{auditData.requiredLeadsIdeal} ta</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-emerald-400">CPL (Lid narxi)</span> = ${auditData.baseCpl} (Soha: {auditData.industry.name})
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-xs text-slate-300">
                <span className="font-bold text-white block mb-1">💡 Xulosa:</span>
                Dastur optimallashtirilib, kassa va savdo nazoratga olinsa, oylik <strong className="text-emerald-400">${auditData.monthlyWastedMoney.toLocaleString()}</strong> tejaladi!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {auditData.roadmap.map((phase, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      {phase.period}
                    </div>
                  </div>

                  <ul className="space-y-3 mt-4">
                    {phase.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-medium">
                  Mas'ul: {rawFormData.fullName || "Biznes egasi"} & Zoirjon Jalolov
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
