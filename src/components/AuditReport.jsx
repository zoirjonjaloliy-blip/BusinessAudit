import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle, TrendingDown, TrendingUp, 
  DollarSign, Users, Target, ArrowRight, Printer, Share2, Sparkles, 
  CheckCircle, XCircle, Layers, Cpu, Zap, RotateCcw,
  User, Building, Phone, Calendar, Laptop, Send, Award, Check,
  Sliders, AlertOctagon, CheckCircle2, ChevronRight,
  Package, Clock, CheckSquare, Square, Flame, Activity, FileText,
  Copy, Lock, Unlock, HelpCircle, ArrowUpRight
} from 'lucide-react';
import { calculateBusinessAudit } from '../utils/auditCalculator';

export function AuditReport({ auditData, rawFormData, isUnlocked = true, onUnlock, onReset }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'software' | 'funnel' | 'roadmap'
  const [activeDiyTab, setActiveDiyTab] = useState('debt_scripts'); // 'debt_scripts' | 'sales_scripts' | 'kpi_calc' | 'revision_checklist'
  const [copiedId, setCopiedId] = useState(null);

  const safeRaw = rawFormData || {};
  const data = auditData || calculateBusinessAudit(safeRaw);

  const fmt = (n) => Number(n || 0).toLocaleString();

  const hasSoftware = safeRaw.accountingSoftware === 'software';
  const hasDebtTracking = safeRaw.debtTracking === 'software';
  const hasCrm = safeRaw.hasCrm === 'yes';
  const hasLoyalty = safeRaw.loyaltySystem === 'automated';

  // Reviziya chek-listi holati (interaktiv)
  const [checkedRevision, setCheckedRevision] = useState({});
  const toggleRevision = (idx) => {
    setCheckedRevision((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Hardware checklist holati
  const [checkedHardware, setCheckedHardware] = useState({});
  const toggleHardware = (id) => {
    setCheckedHardware((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Interaktiv simulyator (4 ta switch)
  const [simPosInstalled, setSimPosInstalled] = useState(!hasSoftware);
  const [simDebtFixed, setSimDebtFixed] = useState(!hasDebtTracking);
  const [simCrmInstalled, setSimCrmInstalled] = useState(!hasCrm);
  const [simLoyaltyInstalled, setSimLoyaltyInstalled] = useState(!hasLoyalty);

  const baseTotalLoss = data.totalMonthlyLoss || data.monthlyWastedMoney || 600;
  
  let simulatedSavingsMonthly = 0;
  if (simPosInstalled) simulatedSavingsMonthly += Math.round(baseTotalLoss * 0.38);
  if (simDebtFixed) simulatedSavingsMonthly += Math.round(baseTotalLoss * 0.24);
  if (simCrmInstalled) simulatedSavingsMonthly += Math.round(baseTotalLoss * 0.20);
  if (simLoyaltyInstalled) simulatedSavingsMonthly += Math.round(data.potentialLtvMonthlyProfit || (baseTotalLoss * 0.18));
  
  const simulatedSavingsYearly = simulatedSavingsMonthly * 12;
  const simPaybackMonths = simulatedSavingsMonthly > 0 
    ? Math.max(0.6, Number(((data.automationCost || 1200) / simulatedSavingsMonthly).toFixed(1)))
    : 0;

  // Xolis shifokor (Anti-Sale) tekshiruvi:
  const isAntiSaleRecommended = (Number(safeRaw.targetRevenue || 0) < 3000) || 
    (safeRaw.platforms?.length === 1 && safeRaw.platforms[0] === 'organic' && safeRaw.salesTeam === 'owner_only');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const industry = data.industry || { name: "Umumiy Savdo", softwareTip: "" };
  const hardwareList = industry.hardwareChecklist || [
    { id: 'pos_terminal', name: "Sensorli POS-monoblok (Kassa ekrani)", essential: true },
    { id: 'scanner_2d', name: "2D Shtrix-kod va Markirovka skaneri", essential: true },
    { id: 'receipt_printer', name: "80mm tezkor chek printeri", essential: true }
  ];

  const rulesList = industry.rules || [
    "ABC-tahlil orqali ombordagi eng ko'p foyda keltiruvchi tovarlar ro'yxatini shakllantiring va nelikvidni kamaytiring.",
    "Har bir mijoz uchun nasiya limitini dasturda qat'iy belgilang va muddat o'tganda yangi tovar berishni to'xtating.",
    "Kassa va omborni yagona bazaga ulab, reviziyani 1 soatda o'tkazish tartibini joriy qiling."
  ];

  const benchmarksList = industry.benchmarks || [];

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `📊 BiznesAudit.uz (Anti-Sale & DIY Edition) Diagnostikasi:\n` +
      `👤 Tadbirkor: ${safeRaw.fullName || "Mijoz"} (${safeRaw.businessName || "Korxona"})\n` +
      `🎯 Oylik maqsad: $${fmt(data.targetRevenue)}\n` +
      `⚠️ Umumiy yo'qotish rezervi: $${fmt(data.totalMonthlyLoss)}/oy\n` +
      `📅 Zararsizlik kuni: Oyning ${data.breakEvenDay || 15}-kuni\n` +
      `🏥 Salomatlik indeksi: ${data.scores?.overall || 60}/100\n\n` +
      `Xolis konsalting & avtomatlashtirish: Zoirjon Jalolov (+998995160021, @Jalolov_IST)`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Yuqori Tezkor Boshqaruv Paneli (Yangi Tadbirkor / Qaytadan Boshlash) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl no-print">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Diagnostika muvaffaqiyatli yakunlandi va hisoblandi!</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onReset && (
            <button
              onClick={onReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Yangi Tadbirkor Uchun Qaytadan Boshlash 🔄</span>
            </button>
          )}
        </div>
      </div>

      {/* Rasmiy Hujjat Sarlavhasi */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Xolis Biznes-Laboratoriya & Mustaqil Yechimlar Markazi
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {safeRaw.businessName ? `"${safeRaw.businessName}"` : "Korxona"} Savdo, Moliya & Operatsion Rentgen
            </h1>
            
            {/* Tadbirkor rekvizitlari */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-300 mt-2.5 flex-wrap">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <strong className="text-white">{safeRaw.fullName || "Tadbirkor"}</strong>
              </span>
              {safeRaw.phone && (
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{safeRaw.phone}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>{industry.name}</span>
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
              <span>A4 PDF / Chop</span>
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

      {/* XOLIS SHIFOKOR (ANTI-SALE) ALGORITMI */}
      {isAntiSaleRecommended ? (
        <div className="p-5 rounded-2xl bg-amber-950/25 border-2 border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg shadow-amber-500/5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <span>🩺 Xolis Ekspert Ogohlantirishi (Anti-Sale Tashxis)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              <strong className="text-amber-300">DIQQAT: Xolis tashxis! Hozirgi bosqichda sizga qimmat va murakkab ERP/1C tizimlarini sotib olish TAVSIYA ETILMAYDI</strong> — bu hozircha korxonangiz uchun ortiqcha moliyaviy xarajat bo'ladi. Sizning 1-navbatdagi vazifangiz — pastdagi bepul DIY (Mustaqil) instrumentlarimiz, Excel/Telegram-bot va tayyor skriptlar yordamida oylik aylanmani kamida $5,000+ ga va bazaviy tartibga olib chiqishdir.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-blue-950/25 border-2 border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg shadow-blue-500/5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              <span>🩺 Xolis Ekspert Xulosasi</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              <strong className="text-blue-300">Sizning biznesingiz hajmi qog'oz va Excel bosqichidan o'tib bo'lgan.</strong> Hozirgi hisob-kitobdagi noaniqlik va tizimsizlik sizga har oy dastur narxidan 2-3 barobar qimmatga tushmoqda. Tizimli avtomatlashtirish o'zini oqlash muddati atigi ~{data.paybackMonths || 1.5} oyni tashkil etadi.
            </p>
          </div>
        </div>
      )}

      {/* A-BLOK: CHUQUR MOLIYAVIY VA OPERATSION RENTGEN (4 TA KARTA) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              A-Blok: 360° Chuqur Moliyaviy va Operatsion Rentgen
            </h2>
          </div>
          <span className="text-xs text-slate-400">Biznesingizning real ko'rsatkichlari</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KARTA 1: Umumiy Yo'qotilayotgan Potensial */}
          <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-red-800/80 transition-all">
            <div>
              <div className="flex items-center justify-between text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Umumiy Oylik Yo'qotish</span>
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-red-400">
                ${fmt(data.totalMonthlyLoss)}
                <span className="text-xs font-normal text-red-300/80"> /oy</span>
              </div>
              <div className="text-[11px] text-red-300/80 mt-1">
                Yillik zarar: <strong>${fmt(data.totalYearlyLoss)}</strong>
              </div>

              <div className="mt-4 pt-3 border-t border-red-900/30 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Boy berilgan sof foyda:</span>
                  <span className="font-semibold text-white">${fmt(data.lostNetProfitMonthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reklama behuda ketishi:</span>
                  <span className="font-semibold text-white">${fmt(data.monthlyWastedMarketing)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kamomad va o'g'irlik:</span>
                  <span className="font-semibold text-white">${fmt(data.inventoryShrinkLossMonthly)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-red-400/90 font-medium bg-red-950/40 px-2 py-1 rounded">
              ⚠️ Tizimsizlik sababli har oy ushbu summa boy berilmoqda.
            </div>
          </div>

          {/* KARTA 2: Ombor va Nasiya Muzlatkichlari */}
          <div className="bg-amber-950/20 border border-amber-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-800/80 transition-all">
            <div>
              <div className="flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Muzlagan Pul (Nelikvid)</span>
                <Package className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                ${fmt(data.deadStockSum)}
              </div>
              <div className="text-[11px] text-amber-300/80 mt-1">
                Omborda muzlab yotgan tovarlar
              </div>

              <div className="mt-4 pt-3 border-t border-amber-900/30 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Umumiy tovar qoldig'i:</span>
                  <span className="font-semibold text-white">${fmt(data.inventoryCapital)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nasiya daftari xavfi:</span>
                  <span className="font-semibold text-amber-300">${fmt(data.estimatedDebtRiskSum)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ombor hisobi holati:</span>
                  <span className="font-semibold text-white">
                    {safeRaw.inventoryStatus === 'accurate' ? "Aniq" : safeRaw.inventoryStatus === 'estimated' ? "Taxminiy" : "Nelikvid ko'p"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-amber-400/90 font-medium bg-amber-950/40 px-2 py-1 rounded">
              🧊 ABC-tahlil va avtomatlashtirish orqali ushbu pulni naqdga aylantirish mumkin.
            </div>
          </div>

          {/* KARTA 3: Zararsizlik Nuqtasi & LTV Potensiali */}
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-800/80 transition-all">
            <div>
              <div className="flex items-center justify-between text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Zararsizlik Nuqtasi</span>
                <Target className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400">
                Oyning {data.breakEvenDay || 15}-kuni
              </div>
              <div className="text-[11px] text-blue-300/80 mt-1">
                Zararsizlik aylanmasi: <strong>${fmt(data.breakEvenRevenue)}</strong>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-900/30 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Oylik doimiy xarajat:</span>
                  <span className="font-semibold text-white">${fmt(data.fixedCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bonus/LTV potensiali:</span>
                  <span className="font-semibold text-emerald-400">+${fmt(data.potentialLtvMonthlyProfit)} /oy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Yillik LTV rezervi:</span>
                  <span className="font-semibold text-emerald-300">+${fmt(data.potentialLtvYearlyProfit)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-blue-300/90 font-medium bg-blue-950/40 px-2 py-1 rounded">
              💡 {data.breakEvenDay || 15}-sanadan boshlab faqat o'zingizga sof foyda ishlayapsiz.
            </div>
          </div>

          {/* KARTA 4: Vaqt Qiymati & Soliq/Markirovka Xavfi */}
          <div className="bg-purple-950/20 border border-purple-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-800/80 transition-all">
            <div>
              <div className="flex items-center justify-between text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Vaqt & Qonuniy Xavf</span>
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-400">
                {data.yearlyOpHours || 900} soat
                <span className="text-xs font-normal text-purple-300/80"> /yil</span>
              </div>
              <div className="text-[11px] text-purple-300/80 mt-1">
                Qog'ozbozlikka ketgan: ~<strong>{Math.round((data.yearlyOpHours || 900) / 8)} ish kuni</strong>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/30 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vaqtingiz narxi:</span>
                  <span className="font-semibold text-white">${data.hourlyRate || 15}/soat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Yillik vaqt yo'qotishi:</span>
                  <span className="font-semibold text-purple-300">${fmt(data.yearlyTimeCost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Soliq/Markirovka:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    data.fiscalRiskColor === 'emerald'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : data.fiscalRiskColor === 'amber'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {data.fiscalRiskStatus || "Qisman nazoratda"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-purple-300/90 font-medium bg-purple-950/40 px-2 py-1 rounded">
              ⚡ Dastur o'rnatilgach, operatsionka 1 kunda 30 daqiqagacha kamayadi.
            </div>
          </div>
        </div>
      </div>

      {/* O'ZBEKISTON BOZORI BENCHMARKI (TOP-10% LIDERLAR BILAN TAQQOSLASH) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            O'zbekiston Bozor Benchmarki (TOP-10% Peshqadam Bizneslar Bilan Solishtirish)
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            Sizning Natijangiz vs Bozor O'rtachasi vs TOP-10% Liderlar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            "{industry.name}" sohasidagi 120+ korxonalarning real tahlili asosida shakllantirilgan xolis taqqoslash jadvali:
          </p>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-3 font-semibold uppercase tracking-wider">Ko'rsatkich</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-blue-400">Sizning Natijangiz</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-slate-300">Bozor O'rtachasi</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-emerald-400">O'zbekiston TOP-10%</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-slate-400">Xolis Ekspert Izohi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {benchmarksList.map((bm, bIdx) => {
                let userVal = bm.userValue;
                if (bm.userMetric && safeRaw[bm.userMetric]) {
                  userVal = `${safeRaw[bm.userMetric]}${bm.userSuffix || ''}`;
                }
                return (
                  <tr key={bIdx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-white whitespace-nowrap">
                      {bm.name}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-blue-400 whitespace-nowrap">
                      {userVal || "—"}
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">
                      {bm.marketAvg}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-400 whitespace-nowrap">
                      {bm.top10}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 min-w-[240px] leading-relaxed">
                      {bm.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MUSTAQIL YECHIMLAR (DIY TOOLKIT) — NUSXALAB OLISH UCHUN TAYYOR INSTRUMENTLAR */}
      <div className="bg-slate-900/90 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-7 space-y-5 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Mustaqil Yechimlar Sandig'i (DIY Toolkit) — $500 lik Tayyor Instrumentlar
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white">
              Hech Kimga Pul To'lamasdan, Bugunoq Nusxalab Ishlatiladigan Resurslar
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              O'zbekiston amaliyotida 100% sinovdan o'tgan skriptlar, KPI formulasi va reviziya chek-listi:
            </p>
          </div>

          <div className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Bepul & Amaliy</span>
          </div>
        </div>

        {/* 4 ta Vkladka (Tablar) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'debt_scripts', label: "📋 Nasiyani Undirish Skriptlari", icon: FileText },
            { id: 'sales_scripts', label: "🎯 Sotuv & Kassa 'Oltin Skripti'", icon: Flame },
            { id: 'kpi_calc', label: "💰 Xodimlar KPI Formulari", icon: DollarSign },
            { id: 'revision_checklist', label: "✅ 5 Qadamli Reviziya", icon: CheckSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDiyTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDiyTab(tab.id)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-start gap-2 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Nasiya va Qarzdorlikni Undirish Skriptlari */}
        {activeDiyTab === 'debt_scripts' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Qarzdor bilan munosabatni buzmasdan, mas'uliyatni shaxsiy iltimosdan tizimga o'tkazuvchi 3 bosqichli matnlar:
            </p>

            {/* 1-Skript */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  1-bosqich: Yumshoq eslatma (To'lov kunidan 1 kun oldin)
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  "Assalomu alaykum, [Mijoz ismi] aka/opa! Ishlaringizga baraka bersin. {safeRaw.businessName || "[Biznes nomi]"} moliya bo'limidan yozmoqdamiz. Ertaga, [Sana] kuni hisob-kitobimiz bo'yicha [Summa] so'm to'lov muddati yetib keladi. To'lovni karta orqali ([Karta raqami]) yoki kassamizga naqd amalga oshirishingiz mumkin. Doimiy hamkorligimiz uchun rahmat!"
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(`Assalomu alaykum, [Mijoz ismi] aka/opa! Ishlaringizga baraka bersin. ${safeRaw.businessName || "[Biznes nomi]"} moliya bo'limidan yozmoqdamiz. Ertaga, [Sana] kuni hisob-kitobimiz bo'yicha [Summa] so'm to'lov muddati yetib keladi. To'lovni karta orqali ([Karta raqami]) yoki kassamizga naqd amalga oshirishingiz mumkin. Doimiy hamkorligimiz uchun rahmat!`, 'debt_1')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
              >
                {copiedId === 'debt_1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === 'debt_1' ? "Nusxalandi! ✓" : "Nusxalash"}</span>
              </button>
            </div>

            {/* 2-Skript */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  2-bosqich: Muddati 3-5 kun o'tganda (Tizimga tayanish usuli)
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  "Assalomu alaykum, [Mijoz ismi]! Siz bilan doimo yaxshi ishlab kelganmiz. Hozir bizda hisob-kitob dasturi yangilanib, barcha qarzdorliklar avtomatik nazoratga olingan. Dastur [Summa] so'm qoldiqni qizil ro'yxatga o'tkazib, yangi yuk/xizmat berishni avtomatik bloklab qo'ymasligi uchun bugun soat 18:00 gacha to'lovni yopishimizga yordam bera olasizmi?"
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(`Assalomu alaykum, [Mijoz ismi]! Siz bilan doimo yaxshi ishlab kelganmiz. Hozir bizda hisob-kitob dasturi yangilanib, barcha qarzdorliklar avtomatik nazoratga olingan. Dastur [Summa] so'm qoldiqni qizil ro'yxatga o'tkazib, yangi yuk/xizmat berishni avtomatik bloklab qo'ymasligi uchun bugun soat 18:00 gacha to'lovni yopishimizga yordam bera olasizmi?`, 'debt_2')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
              >
                {copiedId === 'debt_2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === 'debt_2' ? "Nusxalandi! ✓" : "Nusxalash"}</span>
              </button>
            </div>

            {/* 3-Skript */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-md">
                  3-bosqich: Eski qarzni "Muzlatish va Bo'lib to'lash" orqali undirish
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  "[Mijoz ismi], vaziyatingizni tushunib turibmiz. Keling, [Summa] so'm qarz sizga ham og'ir botmasligi uchun uni 4 haftaga bo'lib, grafik qilib qo'yamiz — har dushanba [Summa/4] so'mdan. Bugun 1-qismini tashlab bersangiz, hisobingizni faol holatda saqlab qolamiz. Ma'qulmi?"
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(`[Mijoz ismi], vaziyatingizni tushunib turibmiz. Keling, [Summa] so'm qarz sizga ham og'ir botmasligi uchun uni 4 haftaga bo'lib, grafik qilib qo'yamiz — har dushanba [Summa/4] so'mdan. Bugun 1-qismini tashlab bersangiz, hisobingizni faol holatda saqlab qolamiz. Ma'qulmi?`, 'debt_3')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
              >
                {copiedId === 'debt_3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === 'debt_3' ? "Nusxalandi! ✓" : "Nusxalash"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Sotuv Menejerlari va Kassirlar uchun "Oltin Skript" */}
        {activeDiyTab === 'sales_scripts' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Lid yo'qolishining oldini oluvchi va o'rtacha chekni 25% ga oshiruvchi 2 ta amaliy qoida:
            </p>

            {/* Skript A */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md">
                  A-Qoida: Kiruvchi lidga 5 daqiqa ichida javob berish skripti
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  "Assalomu alaykum, [Ism]! {safeRaw.businessName || "[Biznes nomi]"}ga murojaat qilganingizdan xursandmiz. Siz so'ragan [Mahsulot/Xizmat] hozir omborimizda bor. Sizga eng to'g'ri variantni tanlab berishim uchun ayting-chi: buni o'zingiz (uyda/ishda) ishlatish uchun olyapsizmi yoki qayta sotish/sovg'a uchunmi? (Hoziroq 2 xil narxdagi variantni yuboraman)."
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(`Assalomu alaykum, [Ism]! ${safeRaw.businessName || "[Biznes nomi]"}ga murojaat qilganingizdan xursandmiz. Siz so'ragan [Mahsulot/Xizmat] hozir omborimizda bor. Sizga eng to'g'ri variantni tanlab berishim uchun ayting-chi: buni o'zingiz (uyda/ishda) ishlatish uchun olyapsizmi yoki qayta sotish/sovg'a uchunmi? (Hoziroq 2 xil narxdagi variantni yuboraman).`, 'sales_1')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
              >
                {copiedId === 'sales_1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === 'sales_1' ? "Nusxalandi! ✓" : "Nusxalash"}</span>
              </button>
            </div>

            {/* Skript B */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                  B-Qoida: Kassada o'rtacha chekni oshirish (Cross-sell) qoidasi
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  "Har bir xaridorga chek urishdan oldin aytiladigan 1 ta jumla: 'Aytgancha, bugun siz olgan [Tovar A] bilan birga [Qo'shimcha Tovar B] olgan mijozlarimizga [X]% maxsus chegirma / bonus yoqilyapti, qo'shib beraymi?' (Shu 1 ta jumla oylik aylanmani reklamasiz 15-20% ga oshiradi)."
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(`Har bir xaridorga chek urishdan oldin aytiladigan 1 ta jumla: 'Aytgancha, bugun siz olgan [Tovar A] bilan birga [Qo'shimcha Tovar B] olgan mijozlarimizga [X]% maxsus chegirma / bonus yoqilyapti, qo'shib beraymi?' (Shu 1 ta jumla oylik aylanmani reklamasiz 15-20% ga oshiradi).`, 'sales_2')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
              >
                {copiedId === 'sales_2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === 'sales_2' ? "Nusxalandi! ✓" : "Nusxalash"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Xodimlar uchun Tayyor KPI va Oylik Formulasi */}
        {activeDiyTab === 'kpi_calc' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Dinamik KPI Modeli ({safeRaw.businessName || "Korxona"} ko'rsatkichlariga mos):</span>
                <span className="text-emerald-400 font-mono">Formula: 40% Fiks + 40% Savdo + 20% KPI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">1. Qat'iy Fiks (40%):</div>
                  <div className="text-base font-bold text-white">~$250 - $350</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ish intizomi, o'z vaqtida kelib-ketish va kassa tozaligi uchun kafolatlangan baza.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">2. Savdo Bonusi (40%):</div>
                  <div className="text-base font-bold text-emerald-400">
                    +${Math.round(1000 * ((data.netMargin || 30) / 100) * 0.09)} /har $1,000 ga
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Zararsizlik aylanmasi (${fmt(data.breakEvenRevenue)}) dan oshgan har $1,000 savdodan sof marjaning 9% i bonus qilib beriladi.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-1">3. Jarima & Nazorat:</div>
                  <div className="text-base font-bold text-amber-400">-20% bonus kuyishi</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Agar kassada kamomad chiqsa yoki mijozlar CRM/daftarga kiritilmasa — oylik savdo bonusining 20% qismi ushlab qolinadi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 5 Qadamli Reviziya Chek-listi */}
        {activeDiyTab === 'revision_checklist' && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Dastursiz ham do'konda kamomad va o'g'irliklarning 90% ini to'xtatuvchi interaktiv kunlik/haftalik tartib:
            </p>

            {[
              { id: 1, title: "Top-20 'Lokomotiv' tovarlar nazorati", desc: "Har kuni kechqurun do'kondagi eng ko'p sotiladigan 20 ta tovar qoldig'ini 15 daqiqa ichida sanab chiqish (80% o'g'irlik va kamomad aynan shu tovarlarda bo'ladi)." },
              { id: 2, title: "Nasiya 'Stop-List' qoidasi", desc: "Qarzi 15 kundan oshgan mijozlarga rahbar ruxsatisiz yangi tovar berishni qat'iy taqiqlash." },
              { id: 3, title: "Kassa 'Z-otchet' va Naqd pul solishtiruvi", desc: "Kun oxirida tushgan naqd pul, terminal va karta o'tkazmalarini tiyinigacha hisoblab, farqni o'sha kuniyoq aniqlash." },
              { id: 4, title: "'Sariq narxnomalar' aksiyasi", desc: "Omborda 45 kundan beri harakatsiz yotgan tovarlarni aniqlab, tannarxiga +5% ustama bilan 'Tezkor tugatish' burchagiga chiqarish (muzlagan pulni naqdga aylantirish)." },
              { id: 5, title: "Yo'qotilgan lidlar auditi", desc: "Kechqurun Telegram/Instagram va qo'ng'iroqlarda javobsiz qolgan yoki 'o'ylab ko'raman' degan 10 ta mijozga qayta aloqaga chiqish." }
            ].map((item) => {
              const isChecked = !!checkedRevision[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleRevision(item.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> : <Square className="w-5 h-5 text-slate-500 shrink-0" />}
                  </div>
                  <div className="flex-1">
                    <h5 className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.id}. {item.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* C-BLOK: YANGILANGAN INTERAKTIV ROI SIMULYATORI (4 SWITCH) */}
      <div className="bg-slate-900/80 border border-blue-900/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              C-Blok: Interaktiv Avtomatlashtirish & ROI Simulyatori
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Tizimlashtirish Orqali Qancha Pul Qaytarib Olasiz?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Quyidagi vositalarni yoqib, korxonangiz oylik tejaydigan va qaytarib oladigan pulini ko'ring:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <div className="text-[10px] uppercase font-bold text-emerald-400">O'zini oqlash muddati:</div>
              <div className="text-lg sm:text-xl font-black text-white">
                ~{simPaybackMonths} oyda
              </div>
            </div>
            
            <div className="px-4 py-2.5 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
              <div className="text-[10px] uppercase font-bold text-blue-400">Oylik tejaladigan mablag':</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400">
                +${fmt(simulatedSavingsMonthly)} <span className="text-xs text-slate-400 font-normal">/oy</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 ta Switch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-5">
          <button
            type="button"
            onClick={() => setSimPosInstalled(!simPosInstalled)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              simPosInstalled
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10'
                : 'bg-slate-950 border-slate-800 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">1. POS / 1C Tizimi</span>
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${simPosInstalled ? 'bg-blue-600' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${simPosInstalled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Kassa qoldiqlari, shtrix-kod va tovar kamomadini bartaraf etish.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-bold text-emerald-400">
              +${Math.round(baseTotalLoss * 0.38)} /oy tejaladi
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSimDebtFixed(!simDebtFixed)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              simDebtFixed
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10'
                : 'bg-slate-950 border-slate-800 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">2. Nasiya Avtomatika</span>
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${simDebtFixed ? 'bg-blue-600' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${simDebtFixed ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Qat'iy qarz limiti va SMS/Telegram orqali avtomatik eslatmalar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-bold text-emerald-400">
              +${Math.round(baseTotalLoss * 0.24)} /oy tejaladi
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSimCrmInstalled(!simCrmInstalled)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              simCrmInstalled
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10'
                : 'bg-slate-950 border-slate-800 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">3. CRM & Voronka</span>
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${simCrmInstalled ? 'bg-blue-600' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${simCrmInstalled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mijozlar bazasi va tezkor javob orqali lidlarni sotuvga aylantirish.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-bold text-emerald-400">
              +${Math.round(baseTotalLoss * 0.20)} /oy tejaladi
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSimLoyaltyInstalled(!simLoyaltyInstalled)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              simLoyaltyInstalled
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10'
                : 'bg-slate-950 border-slate-800 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">4. Bonus & Keshbek Boti</span>
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${simLoyaltyInstalled ? 'bg-blue-600' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${simLoyaltyInstalled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Telegram bot orqali keshbek va qayta xaridlarni (LTV) oshirish.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-bold text-emerald-400">
              +${Math.round(data.potentialLtvMonthlyProfit || (baseTotalLoss * 0.18))} /oy qayta sotuv
            </div>
          </button>
        </div>
      </div>

      {/* 2 XIL YO'L: O'ZIM BAJARAMAN vs MUTAXASSIS BILAN (XOLIS TAQQOSLASH) */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Tadbirkor Uchun 2 Ta Haqqoniy Tanlov
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Keyingi Qadamingiz: Qaysi Yo'l Siz Uchun Qulayroq?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Biz sizga majburlab dastur sotmaymiz. O'zingiz mustaqil joriy qilasizmi yoki mutaxassisga topshirasizmi — qaror sizniki:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
          {/* 1-USTUN: MUSTAQIL JORIY QILISH (Byudjet: $0) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  🛠️ 1-Yo'l: Mustaqil joriy qilish
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  Byudjet: $0
                </span>
              </div>

              <h4 className="text-lg font-bold text-white">
                O'zingiz va jamoangiz bilan bosqichma-bosqich tartib o'rnatish
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Nima qilasiz:</strong> Yuqoridagi bepul DIY skriptlar, KPI formulalar, 5 qadamli reviziya va yo'l xaritasini qo'llab, Excel + Telegram orqali nazorat o'rnatasiz.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Ketadigan vaqt:</strong> 1.5 – 3 oy (kuniga 2-3 soat shaxsiy vaqt).</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Qiyinchilik & Xavf:</strong> Inson omili saqlanadi, xodimlar qarshilik qilishi mumkin, tovar 200 tadan oshganda Excelda chalkashliklar boshlanadi.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>📄 Barcha bepul shablonlar & PDF xulosani yuklab olish</span>
              </button>
            </div>
          </div>

          {/* 2-USTUN: TIZIMLI AVTOMATLASHTIRISH (Zoirjon Jalolov bilan) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/60 via-indigo-950/50 to-slate-900 border-2 border-blue-500/40 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  🚀 2-Yo'l: Zoirjon Jalolov bilan "Pod Klyuch"
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  ROI: ~1.5 oyda o'zini oqlaydi
                </span>
              </div>

              <h4 className="text-lg font-bold text-white">
                5+ yillik amaliyotchi mutaxassis bilan to'liq avtomatlashtirish
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Nima qilasiz:</strong> Barcha qora ishlarni (1C / POS o'rnatish, tovarlarni shtrix-kodlash, tarozilar, Telegram-bot hisobotlari va xodimlarni o'qitish) mutaxassisga topshirasiz.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Ketadigan vaqt:</strong> 3 – 7 ish kuni ichida to'liq ishga tushadi.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Xolis kafolat:</strong> Avval 15 daqiqalik BEPUL texnik razbor o'tkazamiz — agar korxonangizga dastur hozir kerak bo'lmasa, buni o'zimiz ochiq aytamiz.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="tel:+998995160021"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+998 99 516 00 21</span>
                </a>
                <a
                  href="https://t.me/Jalolov_IST"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>@Jalolov_IST</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* B-BLOK: KERAKLI MANBALAR VA TEXNIK ARXITEKTURA (RESOURCE HUB) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            B-Blok: Kerakli Uskunalar va Dasturiy Arxitektura
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            "{industry.name}" Uchun Texnik Jihozlar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bozorda minglab ortiqcha jihozlar taklif etiladi — sizga faqat quyidagi asosiy uskunalar kifoya:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 1-USTUN: Dasturiy Tizim */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Laptop className="w-4 h-4" />
                <span>1. Dasturiy Tizim (Software)</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Sohaviy Dasturiy Arxitektura
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {industry.softwareTip || "Kassa va ombor hisobi uchun zamonaviy dastur."}
              </p>

              <div className="mt-4 space-y-2.5 text-xs">
                {(data.softwareRecommendations || []).slice(0, 3).map((soft, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span>{soft.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{soft.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{soft.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-indigo-300 font-medium">
              💡 1C yoki POS tizimi o'rnatilgach, butun savdo bitta ekranda jamlanadi.
            </div>
          </div>

          {/* 2-USTUN: Uskunalar Checklist */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Package className="w-4 h-4" />
                  <span>2. Uskunalar (Hardware)</span>
                </div>
                <span className="text-[10px] text-slate-400">Boringizni belgilang:</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Kassa va Ombor Jihozlari Cheklisti
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Kassa intizomi, Asl Belgisi markirovkasi va tezkor hisob uchun zarur uskunalar:
              </p>

              <div className="mt-4 space-y-2">
                {hardwareList.map((hw) => {
                  const isChecked = !!checkedHardware[hw.id];
                  return (
                    <button
                      key={hw.id}
                      type="button"
                      onClick={() => toggleHardware(hw.id)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all text-xs cursor-pointer border ${
                        isChecked 
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className="flex-1 truncate">{hw.name}</span>
                      {hw.essential && (
                        <span className="text-[9px] px-1 py-0.5 rounded bg-blue-500/20 text-blue-300 shrink-0">
                          Asosiy
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-blue-300 font-medium">
              🛒 Zoirjon Jalolov barcha uskunalarni yetkazib, dasturga ulab beradi.
            </div>
          </div>

          {/* 3-USTUN: Boshqaruv Qoidalari */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4" />
                <span>3. Boshqaruv Qoidalari</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Hozirdan Qo'llashingiz Kerak Bo'lgan 3 Qoida
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Tizim samarali ishlashi va daromad o'sishi uchun muhim operatsion qoidalar:
              </p>

              <div className="mt-4 space-y-3">
                {rulesList.map((rule, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                      {rIdx + 1}
                    </div>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Natija: Nelikvid kamayadi, pul aylanmasi 2x tezlashadi.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 TAB MENYU 📱 */}
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
            {(data.softwareRecommendations || []).map((soft, sIdx) => (
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
                      <strong className="text-emerald-400 text-base">{data.requiredLeadsIdeal || 50} ta</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Hozirgi holatda: </span>
                      <strong className="text-red-400 text-base">{data.realRequiredLeads || 80} ta</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="text-xs text-slate-400">Optimal reklama byudjeti (Tavsiya etiladi):</div>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-xs text-slate-400">Ideal: </span>
                      <strong className="text-emerald-400 text-base">${fmt(data.optimalBudgetIdeal)}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Hozirgi real: </span>
                      <strong className="text-amber-400 text-base">${fmt(data.realOptimalBudget)}</strong>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-amber-400 font-medium">
                    ⚠️ Byudjet farqi (yo'qotish): +${fmt(data.monthlyWastedMarketing)}
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
                    <span className="text-blue-400">Kerakli mijozlar</span> = ${fmt(data.targetRevenue)} / ${fmt(data.averageCheck)} = <span className="text-white font-bold">{data.requiredCustomers || 166} ta</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-cyan-400">Kerakli lidlar</span> = {data.requiredCustomers || 166} / {data.conversionRate || 20}% = <span className="text-white font-bold">{data.requiredLeadsIdeal || 830} ta</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-emerald-400">CPL (Lid narxi)</span> = ${data.baseCpl || 1.5} (Soha: {industry.name})
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 text-xs text-slate-300">
                <span className="font-bold text-white block mb-1">💡 Xulosa:</span>
                Dastur optimallashtirilib, kassa va savdo nazoratga olinsa, oylik <strong className="text-emerald-400">${fmt(data.totalMonthlyLoss)}</strong> tejaladi!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(data.roadmap || []).map((phase, idx) => (
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
                  Mas'ul: {safeRaw.fullName || "Biznes egasi"} & Zoirjon Jalolov
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pastki Katta Harakat Tugmasi: Yangi Tadbirkor Uchun Qaytadan Boshlash */}
      {onReset && (
        <div className="pt-6 border-t border-slate-800 text-center no-print">
          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-slate-950" />
            <span>Yangi Tadbirkor Uchun Qaytadan Boshlash (Formani Tozalash) 🔄</span>
          </button>
          <p className="text-xs text-slate-500 mt-2">
            Barcha tanlangan parametrlar va shaxsiy ma'lumotlar tozalanib, yangi auditga o'tiladi.
          </p>
        </div>
      )}
    </div>
  );
}
