import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, TrendingDown, TrendingUp, 
  DollarSign, Users, Target, ArrowRight, Printer, Share2, Sparkles, 
  CheckCircle, XCircle, Layers, Cpu, Zap,
  User, Building, Phone, Calendar, Laptop, Send, Award, Check,
  Sliders, AlertOctagon, RefreshCw, HelpCircle
} from 'lucide-react';

export function AuditReport({ auditData, rawFormData }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'simulator' | 'software' | 'funnel' | 'roadmap'

  // Interaktiv simulyator holatlari (Foydalanuvchi "agar tizim o'rnatsam nima bo'ladi" deb o'zi sinab ko'radi)
  const [simPosInstalled, setSimPosInstalled] = useState(rawFormData.accountingSoftware === 'paper');
  const [simDebtFixed, setSimDebtFixed] = useState(rawFormData.debtTracking === 'paper');
  const [simCrmInstalled, setSimCrmInstalled] = useState(rawFormData.hasCrm === 'no');

  // Simulyatsiya hisob-kitoblari
  const baseWasted = auditData.monthlyWastedMoney || 600;
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
      `⚠️ Tizimsizlik sababli oylik yo'qotish: $${auditData.monthlyWastedMoney.toLocaleString()}\n` +
      `💻 Dasturiy holat: ${rawFormData.accountingSoftware === 'software' ? "Dastur bor" : "Daftarda (Zarur)"}\n\n` +
      `Dastur o'rnatish va tizimlashtirish bo'yicha: Zoirjon Jalolov (+998995160021, @Jalolov_IST)`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Rasmiy Hujjat Sarlavhasi */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Rasmiy Auditorlik Diagnostikasi & Xulosasi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {rawFormData.businessName ? `"${rawFormData.businessName}"` : "Korxona"} Savdo, Moliya & Marketing Auditi
            </h1>
            
            {/* Tadbirkor rekvizitlari */}
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2.5 flex-wrap">
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

          <div className="flex items-center gap-2.5 no-print">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              PDF / Chop etish
            </button>
            <button
              onClick={handleShareTelegram}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Ulashish
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

          {/* Sub Scores Progress */}
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
              <span>Tizimsizlik yo'qotishi</span>
              <TrendingDown className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-red-400">
              ${auditData.monthlyWastedMoney.toLocaleString()}
              <span className="text-xs text-red-400/80 font-normal"> /oyiga</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Daftarda ishlash, CRM yo'qligi va nazoratsizlik sababli yillik{' '}
              <strong className="text-red-300 font-bold">${auditData.yearlyWastedMoney.toLocaleString()}</strong> pul havoga uchmoqda.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-900/30 text-[11px] font-semibold text-red-400">
            Ortiqcha xarajat jarimasi: +{auditData.totalPenaltyPercentage}%
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

      {/* ⭐ 1. "PUL QAYERGA OQIB KETYAPTI?" (Tadbirkorga eng tushunarli 3 ta katta teshik) ⭐ */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
            <AlertOctagon className="w-4 h-4" />
            Diagnostika: Pul qayerga oqib ketyapti?
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Biznesingizdagi Asosiy 3 Ta "Moliyaviy Teshik"
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ushbu muammolar sababli oylik daromadingizning katta qismi sizga yetib kelmayapti:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1-teshik: Kassa va Ombor */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-red-900/40 relative overflow-hidden">
            <div className="text-xs font-bold text-red-400 mb-1 flex items-center justify-between">
              <span>1-TESHIK: OMOBOR & KASSA</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-[10px]">~${Math.round(baseWasted * 0.45)}/oy</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              {rawFormData.accountingSoftware === 'paper' ? "Daftarda yuritish xavfi" : "Nazoratsiz qoldiqlar"}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Kassada shtrix-kodli dastur bo'lmasa, tovar qoldig'i (ostatka) hisoblanmaydi. Natijada tovarlar kamomadi, muddati o'tishi va hisobsiz chiqib ketishlar tufayli oyiga yuzlab dollar yo'qotiladi.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Yechim: POS savdo dasturi o'rnatish
            </div>
          </div>

          {/* 2-teshik: Nasiya va Qarz daftari */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/40 relative overflow-hidden">
            <div className="text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
              <span>2-TESHIK: QARZ DAFTARI</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px]">~${Math.round(baseWasted * 0.30)}/oy</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              {rawFormData.debtTracking === 'paper' ? "Daftardagi muzlagan pullar" : "Qarzdorlik nazoratsizligi"}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Qarzlar daftarga yozilsa, eslatish noqulay, qachon to'lanishi aniq emas. O'rtacha 15% qarzlar yillab yopilmay, o'z pulingizga o'zingiz aylanma mablag' topolmay qolasiz.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Yechim: Avtomatlashgan Nasiya moduli
            </div>
          </div>

          {/* 3-teshik: Lidlar va Sotuvchilar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/40 relative overflow-hidden">
            <div className="text-xs font-bold text-blue-400 mb-1 flex items-center justify-between">
              <span>3-TESHIK: MIJOZLAR KETISHI</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-[10px]">~${Math.round(baseWasted * 0.25)}/oy</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">
              Murojaatlarning unutilishi
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Reklamadan qiziqib yozgan 100 ta odamdan 30 tasi javob kechikkani yoki qayta qo'ng'iroq qilinmagani uchun raqobatchiga ketadi. CRM bo'lmasa, reklama byudjeti havoga uchadi.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Yechim: CRM va tezkor sotuv tizimi
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ 2. INTERAKTIV SIMULYATOR: "AGAR TIZIM O'RNATSAM QANCHA FOYDA KO'RAMAN?" ⭐ */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/50 rounded-3xl p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              Interaktiv Simulyator (O'zingiz tekshirib ko'ring)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Agar Dastur O'rnatib Tizimlashtirsangiz Qancha Tejaysiz?
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Kutilayotgan yillik qo'shimcha foyda:</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">
              +${simulatedSavingsYearly.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Switch 1: POS Dastur */}
          <div
            onClick={() => setSimPosInstalled(!simPosInstalled)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
              simPosInstalled
                ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">1. POS Dastur o'rnatilsa:</span>
              <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                simPosInstalled ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
              }`}>
                {simPosInstalled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-400">+${Math.round(baseWasted * 0.45)} /oyiga tejaladi</div>
            <p className="text-[11px] text-slate-400 mt-1">Ombordagi kamomad va o'g'irliklar 95% yo'qoladi.</p>
          </div>

          {/* Switch 2: Qarzlar moduli */}
          <div
            onClick={() => setSimDebtFixed(!simDebtFixed)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
              simDebtFixed
                ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">2. Nasiya dasturga o'tsa:</span>
              <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                simDebtFixed ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
              }`}>
                {simDebtFixed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-400">+${Math.round(baseWasted * 0.30)} /oyiga qaytadi</div>
            <p className="text-[11px] text-slate-400 mt-1">Qarzlar o'z vaqtida qaytib, aylanma pulingiz ko'payadi.</p>
          </div>

          {/* Switch 3: CRM va Sotuv */}
          <div
            onClick={() => setSimCrmInstalled(!simCrmInstalled)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
              simCrmInstalled
                ? 'bg-emerald-600/15 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">3. CRM va tezkor javob:</span>
              <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                simCrmInstalled ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
              }`}>
                {simCrmInstalled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-400">+${Math.round(baseWasted * 0.25)} /oyiga sof foyda</div>
            <p className="text-[11px] text-slate-400 mt-1">Lidlar yo'qolmaydi, sotuv konversiyasi 25% ga oshadi.</p>
          </div>
        </div>
      </div>

      {/* ⭐ 3. Zoirjon Jalolov - Dastur O'rnatish & Avtomatlashtirish Bo'yicha Asosiy Ekspert Bloki ⭐ */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/50 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wide border border-blue-500/30">
              <Award className="w-4 h-4 text-amber-400" />
              Biznesingizni Avtomatlashtirish Yechimi
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Korxonangizga Zamonaviy POS Dasturlari & 1C: Korxona Tizimini O'rnatish
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Daftardagi hisob-kitob, tovar kamomadlari va qarzlardagi chalkashliklarni butunlay to'xtatish uchun korxonangizga maxsus savdo dasturlarini o'rnatib, xodimlaringizni to'liq o'rgatib beramiz:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>POS savdo dasturlari (Kassa, shtrix-kod, chek)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1C: Korxona tizimini to'liq joriy etish</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Qarzlar (nasiya) va mijozlar elektron bazasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Xodimlarni o'qitish va doimiy texnik qo'llab-quvvatlash</span>
              </div>
            </div>
          </div>

          {/* Ekspert Kontaktlari */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-5 sm:p-6 shrink-0 w-full lg:w-80 space-y-4">
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
              Dastur tanlash va o'rnatish bo'yicha bepul konsultatsiya oling
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 no-print overflow-x-auto">
        {[
          { id: 'overview', label: "📋 Qadam-baqadam Retsept", icon: Layers },
          { id: 'software', label: "💻 Tavsiya etiladigan Dasturlar", icon: Laptop },
          { id: 'funnel', label: "Funnel & Byudjet", icon: DollarSign },
          { id: 'roadmap', label: "30 kunlik Yo'l xaritasi", icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RETSEPT & QADAMLAR */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Tadbirkor Uchun Shifokor Retsepti (Ertagayoq qilinadigan 3 ta ish):
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Inventarizatsiya qilib, tovarlarni POS dasturiga kiritish</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Do'kondagi barcha tovar qoldiqlarini bir marta hisoblab, shtrix-kodlar bilan kassa dasturiga joylang. Bu bir kunda sizga do'konda qancha pul aylanayotganini ko'rsatadi.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Qarz daftarini yopib, faqat dastur orqali nasiya berish</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Har bir qarz oluvchi mijozga qat'iy limit belgilang. Muddat o'tganda dastur ogohlantirmaguncha yangi tovar bermaslik qoidasini kiriting.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zoirjon Jalolov bilan dasturni o'rnatish va sozlash</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Sohangizga mos dasturni o'rnatib, xodimlaringizga kassa bilan to'g'ri ishlashni o'rgating va biznesingizni xotirjam nazorat qiling.
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
              <h4 className="text-sm font-bold text-white">Ushbu dasturlarni o'rnatmoqchimisiz?</h4>
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
                Dastur o'rnatilib, kassa va savdo nazoratga olinsa, oylik <strong className="text-emerald-400">${auditData.monthlyWastedMoney.toLocaleString()}</strong> tejaladi!
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
