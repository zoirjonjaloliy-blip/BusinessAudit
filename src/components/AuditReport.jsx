import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle, TrendingDown, TrendingUp, 
  DollarSign, Users, Target, ArrowRight, Printer, Share2, Sparkles, 
  CheckCircle, XCircle, Layers, Cpu, Zap, RotateCcw,
  User, Building, Phone, Calendar, Laptop, Send, Award, Check,
  Sliders, AlertOctagon, CheckCircle2, ChevronRight,
  Package, Clock, CheckSquare, Square, Flame, Activity, FileText,
  Copy, Lock, Unlock, HelpCircle, ArrowUpRight,
  BrainCircuit, BarChart3, Scale, Bot
} from 'lucide-react';
import { calculateBusinessAudit } from '../utils/auditCalculator';

export function AuditReport({ auditData, rawFormData, isUnlocked = true, onUnlock, onReset, previousAudit = null }) {
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

  // PRO 5.0 Jonli Mini ABC-Analizator holati
  const [abcItems, setAbcItems] = useState([
    { name: "Lokomotiv Tovar 1", revenue: 4500, margin: 25 },
    { name: "Mashhur Tovar 2", revenue: 3200, margin: 28 },
    { name: "O'rtacha Tovar 3", revenue: 1400, margin: 30 },
    { name: "Kuchsiz Tovar 4", revenue: 500, margin: 35 },
    { name: "Qotib qolgan Tovar 5", revenue: 150, margin: 40 }
  ]);

  const loadAbcPreset = (type) => {
    if (type === 'pharmacy') {
      setAbcItems([
        { name: "Antibiotiklar (Augmentin / Tseftriakson)", revenue: 3800, margin: 22 },
        { name: "Kardiologiya va Qon bosimi dorilari", revenue: 3200, margin: 24 },
        { name: "Mavsumiy Shamollash & Gripp kukunlari", revenue: 2100, margin: 28 },
        { name: "Bolalar vitaminlari va Sirop", revenue: 900, margin: 35 },
        { name: "Tibbiy kosmetika & Kam sotiladigan BAA", revenue: 250, margin: 45 }
      ]);
    } else if (type === 'construction') {
      setAbcItems([
        { name: "Sement M500 (Qopda)", revenue: 6500, margin: 15 },
        { name: "Gipsokarton va Profil 60x27", revenue: 4200, margin: 24 },
        { name: "Shpatlevka va Suvoq qorishmalari", revenue: 1900, margin: 30 },
        { name: "Bo'yoqlar va Emulsiya", revenue: 800, margin: 35 },
        { name: "Qimmat dekorativ plintus va lyustra", revenue: 220, margin: 45 }
      ]);
    } else if (type === 'clinic') {
      setAbcItems([
        { name: "MRT va MSKT Diagnostika tekshiruvi", revenue: 7500, margin: 45 },
        { name: "Stomatologiya: Plomba va Terapevtik davolash", revenue: 4800, margin: 55 },
        { name: "Klinik Qon va Gormon analizlari", revenue: 3100, margin: 38 },
        { name: "Fizioterapiya va Massaj muolajalari", revenue: 1100, margin: 50 },
        { name: "Kam talab qilinadigan ixtisoslashgan tahlillar", revenue: 300, margin: 30 }
      ]);
    } else {
      setAbcItems([
        { name: "Sut, Qatiq va Non mahsulotlari", revenue: 5200, margin: 16 },
        { name: "Go'sht va Kolbasa mahsulotlari", revenue: 3900, margin: 22 },
        { name: "Yog', Shakar va Un mahsulotlari", revenue: 2400, margin: 18 },
        { name: "Shirinliklar va Ichimliklar", revenue: 1100, margin: 30 },
        { name: "Ekzotik soslar va Muzlagan elita mahsulotlar", revenue: 280, margin: 35 }
      ]);
    }
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
      `📊 BiznesTahlili.uz (Anti-Sale & DIY Edition) Diagnostikasi:\n` +
      `👤 Tadbirkor: ${safeRaw.fullName || "Mijoz"} (${safeRaw.businessName || "Korxona"})\n` +
      `🎯 Oylik maqsad: $${fmt(data.targetRevenue)}\n` +
      `⚠️ Umumiy yo'qotish rezervi: $${fmt(data.totalMonthlyLoss)}/oy\n` +
      `📅 Zararsizlik kuni: Oyning ${data.breakEvenDay || 15}-kuni\n` +
      `🏥 Salomatlik indeksi: ${data.scores?.overall || 60}/100\n\n` +
      `Xolis konsalting & avtomatlashtirish: BDM kompaniyasi (10 yillik tajribaga ega) (+998995160021, @Jalolov_IST)`
    );
    window.open(`https://t.me/share/url?url=https://biznestahlili.uz&text=${text}`, '_blank');
  };

  const handleSharePartnerTelegram = () => {
    const text = encodeURIComponent(
      `✈️ Hurmatli hamkor / buxgalter!\n\n` +
      `BiznesTahlili.uz orqali korxonamiz ("${safeRaw.businessName || "Biznes"}") diagnostika qilindi:\n\n` +
      `📊 Salomatlik Indeksi: ${data.scores?.overall || 60}/100\n` +
      `🎯 Oylik maqsad: $${fmt(data.targetRevenue)}\n` +
      `⚠️ Aniqlangan oylik yo'qotishlar: ~$${fmt(data.totalMonthlyLoss)}/oy\n` +
      `🧊 Ombordagi muzlagan tovar (nelikvid): $${fmt(data.deadStockSum)}\n` +
      `📅 Zararsizlik kuni: Oyning ${data.breakEvenDay || 15}-kuni\n` +
      `${data.isCreditDangerous ? "🚨 Xulosa: Hozirgi holatda bank krediti olish xavfli, avval omborni naqdga aylantirish kerak!\n" : ""}` +
      `\nTo'liq diagnostika xulosasi bilan tanishish: https://biznestahlili.uz`
    );
    window.open(`https://t.me/share/url?url=https://biznestahlili.uz&text=${text}`, '_blank');
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

          <div className="flex items-center gap-2 flex-wrap no-print">
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
            <button
              onClick={handleSharePartnerTelegram}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
              title="Natijani hamkor yoki buxgalterga Telegramda yuborish"
            >
              <Send className="w-4 h-4" />
              <span>✈️ Hamkor / Buxgalterga yuborish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-QADAM: Avvalgi Audit bilan Solishtirish (Dinamika) */}
      {previousAudit && typeof previousAudit.score === 'number' && (
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                📈 Audit Dinamikasi (Oldingi natija bilan solishtirish):
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                Oldingi natijangiz: <span className="text-slate-300 font-bold">{previousAudit.score} ball</span> ({previousAudit.date || "Avvalgi"}) → Hozirgi natija: <span className="text-cyan-400 font-bold">{data.scores?.overall || 50} ball</span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            {(data.scores?.overall || 50) >= previousAudit.score ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold text-xs">
                ▲ +{(data.scores?.overall || 50) - previousAudit.score} ball o'sish!
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-extrabold text-xs">
                ▼ {(data.scores?.overall || 50) - previousAudit.score} ball pasayish
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3-QADAM: Kredit / Investitsiya Xavfsizlik Filtri */}
      {data.isCreditDangerous && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border-2 border-rose-500/50 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-lg shadow-rose-500/10">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-0.5">
              <span>⚠️ Kredit / Investitsiya Xavfsizlik Filtri</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              <strong className="text-rose-300">DIQQAT: Hozirgi holatda bank krediti yoki yangi qarz olish xavfli!</strong> {data.netMargin < 18 ? `Sof marjangiz (${data.netMargin}%) kredit foiz stavkasidan past.` : ''} {data.deadStockSum > 0 ? `Avval ombordagi $${fmt(data.deadStockSum)} lik muzlagan tovarlarni soting va zararlarni to'xtating.` : ''}
            </p>
          </div>
        </div>
      )}

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
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Reklama yo'qotishi:</span>
                  <span className={`font-semibold ${data.isSarafanOnly ? 'text-emerald-400 text-[11px]' : 'text-white'}`}>
                    {data.isSarafanOnly ? "$0 (Faqat Sarafan)" : `$${fmt(data.monthlyWastedMarketing)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kamomad va o'g'irlik:</span>
                  <span className="font-semibold text-white">${fmt(data.inventoryShrinkLossMonthly)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-red-400/90 font-medium bg-red-950/40 px-2 py-1 rounded">
              {data.isSarafanOnly 
                ? "💡 Reklama yo'qotishi $0 (sarafandasiz). Asosiy yo'qotishlar ombor nelikvidi, kamomad va nasiyalarga bog'liq."
                : "⚠️ Tizimsizlik sababli har oy ushbu summa boy berilmoqda."}
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

      {/* ⭐ PRO 4.0: CFO & AI ANALITIKA MARKAZI ⭐ */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-7 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              PRO 4.0: CFO & AI Analitika Markazi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Moliyaviy Balans, Pareto (ABC) Matritsasi va AI-Direktor Rentgeni
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Biznesni ko'z bilan chamalab emas, 3 ta asosiy hisobot (P&L, Cash Flow, Balans) va Sun'iy Intellekt yordamida boshqarish tahlili:
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/40 text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Boshqaruv Intellekti (BI):</div>
              <div className="text-2xl font-black text-cyan-400">
                {data.scores?.bi || 50}<span className="text-sm text-slate-500 font-semibold">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1-MODUL: ABC-TAHLIL VA OMBOR MATRITSASI (PARETO 80/20) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                1-Modul: Pareto Matritsasi (ABC-Tahlil) va Ombor Rentgeni
              </h3>
            </div>
            <span className="text-xs text-slate-400">Jami ombor zaxirasi: ${fmt(data.inventoryCapital)}</span>
          </div>
          <p className="text-xs text-slate-300">
            Ombordagi tovarlarning 20% i korxonaga 80% sof foydani olib keladi. Qolgan 50% tovar esa aylanma pulni muzlatib yotadi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* A-Guruh */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase">
                    🟢 A-Guruh (Oltin Lokomotivlar)
                  </span>
                  <span className="text-xs font-black text-emerald-400">80% Savdo</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  ${fmt(data.groupA_Stock)}
                  <span className="text-xs font-normal text-slate-400"> (20% tovar)</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong className="text-emerald-300">Qat'iy qoida:</strong> Bu tovarlar omborda 1 soat ham tugab qolmasligi SHART! Dasturda bularga <strong>'Minimal Qoldiq'</strong> signali o'rnatiladi.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-900/40 text-[11px] text-emerald-400 font-semibold">
                ✓ 1C/POS da doimiy auto-monitoringda bo'ladi
              </div>
            </div>

            {/* B-Guruh */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border-2 border-amber-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase">
                    🟡 B-Guruh (Barqaror O'rtamiyonalar)
                  </span>
                  <span className="text-xs font-black text-amber-400">15% Savdo</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  ${fmt(data.groupB_Stock)}
                  <span className="text-xs font-normal text-slate-400"> (30% tovar)</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong className="text-amber-300">Tavsiya:</strong> Bularni haftada 1 marta nazorat qiling va A-guruh tovarlari yonida kassada qo'shimcha (Cross-sell) qilib taklif eting.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-900/40 text-[11px] text-amber-400 font-semibold">
                ✓ Haftalik partiya buyurtmasi yetarli
              </div>
            </div>

            {/* C-Guruh */}
            <div className="p-4 rounded-2xl bg-red-950/20 border-2 border-red-500/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-extrabold uppercase">
                    🔴 C-Guruh (Pul Yutkichlar)
                  </span>
                  <span className="text-xs font-black text-red-400">Atigi 5% Savdo</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  ${fmt(data.groupC_Stock)}
                  <span className="text-xs font-normal text-slate-400"> (50% tovar)</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong className="text-red-300">Aniq raqam:</strong> Omborda taxminan <strong className="text-white">${fmt(data.deadStockCGroup)}</strong> pulingiz nelikvid tovarlarda muzlab yotibdi! Ularni tezda sotib, naqdga aylantiring.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-red-900/40 text-[11px] text-red-400 font-semibold">
                ⚠️ Yangi tovar olishdan oldin bu tovarlar to'xtatiladi
              </div>
            </div>
          </div>

          {/* Out-of-Stock ogohlantirishi */}
          {data.outOfStockLossMonthly > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between gap-3 text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>"Out-of-Stock" boy berilgan talab:</strong> A-toifa tovarlar vaqtida buyurtma qilinmagani sababli oylik taxminan <strong className="text-white">${fmt(data.outOfStockLossMonthly)} /oy</strong> aylanma xaridorlar bilan birga raqobatchilarga ketmoqda!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2-MODUL: 3 TA ASOSIY MOLIYAVIY HISOBOT */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              2-Modul: Tadbirkor Bilishi Shart Bo'lgan 3 Ta Moliyaviy Hisobot (Shifokor Tili)
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Kassadagi naqd pul — hali korxonaning sof foydasi emas. Haqiqiy moliyaviy manzara quyidagi 3 hisobot kesishuvida ko'rinadi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                <span>1. DDS (Cash Flow / Pul oqimi)</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                "Bugun cho'ntagingizda qancha pul bor?"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kassaga kirgan va chiqqan har bir so'm. <strong className="text-amber-300">Eslatma:</strong> Kassadagi pul — bu hali sizning foydangiz emas! Uning ichida tovar tan narxi, ijara, oylik va soliqlar yotadi.
              </p>
              <div className="text-[11px] text-cyan-300 pt-2 border-t border-slate-800">
                Savol: "Xarajatlarni to'lashga naqd pul bormi?"
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>2. P&L (Foyda va Zarar hisoboti)</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                "Bu oy biznesingiz haqiqatan qancha ishladi?"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sotilgan tovarlarning sof rentabelligi va barcha xarajatlar ayirilgandan so'ng qoladigan haqiqiy sof foyda. Tushum $20,000 bo'lsa ham, P&L orqali zarar ko'rayotganingiz fosh bo'lishi mumkin.
              </p>
              <div className="text-[11px] text-emerald-300 pt-2 border-t border-slate-800">
                Savol: "Korxona foydada ishlayaptimi yoki zarardami?"
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>3. Balans Hisoboti (Balance Sheet)</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                "Ishlangan foydangiz qayerda turibdi?"
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Biznesingizning to'liq rentgeni: qancha pul ombordagi tovarda, qanchasi mijozlar nasiyasida, qanchasi jihozlarda va o'zingiz kimlardan qancha qarzdorsiz (Kreditorlik).
              </p>
              <div className="text-[11px] text-purple-300 pt-2 border-t border-slate-800">
                Savol: "Mening boyligim va kapitalim qanchaga yetdi?"
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>
              💡 <strong className="text-white">Xolis yechim:</strong> 1C: Korxona tizimida bu 3 ta hisobot buxgaltersiz ham 1 ta tugma bilan 2 soniyada avtomatik chiqadi.
            </span>
            {data.paperProfitTrapped > 0 && (
              <span className="text-amber-300 font-semibold shrink-0">
                ⚠️ Muzlagan 'qog'ozdagi foyda': ~${fmt(data.paperProfitTrapped)}
              </span>
            )}
          </div>
        </div>

        {/* 3-MODUL: AI-DIREKTOR VA TELEGRAM-BOT ANALITIKASI (JONLI MOCKUP) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                3-Modul: Sun'iy Intellekt (AI) va Telegram-Bot Boshqaruvi
              </h3>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              Jonli Telegram Namunasi
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Zoirjon Jalolov tomonidan 1C / POS tizimingizga ulab beriladigan AI Telegram-bot har kuni soat 21:00 da rahbarga quyidagi formatda aqlli hisobot beradi:
          </p>

          {/* Telegram Chat Mockup */}
          <div className="max-w-xl mx-auto rounded-3xl bg-slate-950 border-2 border-blue-500/40 p-4 sm:p-5 shadow-2xl space-y-3 font-sans">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
                🤖
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>AI-Biznes Tahlilchi (1C + Bot)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-cyan-400">Kechki soat 21:00 hisoboti — "{safeRaw.businessName || "Korxona"}"</div>
              </div>
              <span className="text-[10px] text-slate-500">21:00</span>
            </div>

            <div className="space-y-2 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-mono bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              <p>📊 <strong>Bugungi savdo:</strong> $1,450 (Kecha bilan solishtirganda +14%). Sof foyda: $320.</p>
              <p className="text-amber-300">
                ⚠️ <strong>AI Ogohlantirishi (Anomaliya):</strong> Bugun 2-kassada chek bekor qilishlar (otmena) soni odatdagidan 3 barobar ko'p bo'ldi — tekshirib ko'ring!
              </p>
              <p className="text-emerald-300">
                📦 <strong>ABC-Ombor signali:</strong> Eng ko'p foyda keltiruvchi 4 ta "A-toifa" mahsulot omborda 2 kunga yetadigan qoldi. Ertaga buyurtma berish shart!
              </p>
              <p className="text-cyan-300">
                ❄️ <strong>Muzlagan kapital:</strong> Ombordagi 12 xil tovar 45 kundan beri 1 dona ham sotilmadi (Jami: $840). Ularga 15% chegirma e'lon qilishni tavsiya qilaman.
              </p>
            </div>

            <div className="text-right text-[10px] text-slate-500 pr-1">
              ✓✓ Yetkazildi • 1C Enterprise AI Engine
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <strong className="text-white">Qimmat tahlilchi xodim yollash shart emas:</strong> 1C/POS bazangizga AI Telegram-bot o'rnatilgach, rahbar har oy 35+ soat strategik vaqtini tejaydi.
            </div>
            <button
              type="button"
              onClick={() => handleCopyText(`Men chakana/ulgurji savdo do'koni rahbariman. Mana mening tovarlar qoldig'im va oxirgi 60 kunlik sotuv jadvallarim: [Excel jadvalini tashlang]. Menga quyidagi tahlilni qilib ber:\n1. Pareto qonuni (ABC-tahlil) bo'yicha menga 80% daromad keltiruvchi eng muhim A-guruh tovarlarni ajratib ber;\n2. Oxirgi 45 kunda 1 dona ham sotilmagan C-guruh 'o'lik nelikvid' tovarlar ro'yxatini va ularda muzlab yotgan umumiy summani hisoblab ber;\n3. A-toifa tovarlarim tugab qolmasligi uchun keyingi oyga necha donadan buyurtma berishim kerakligini (Min-Max) hisoblab ber.`, 'ai_prompt_cfo')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {copiedId === 'ai_prompt_cfo' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-white" />}
              <span>{copiedId === 'ai_prompt_cfo' ? "Nusxalandi! ✓" : "ChatGPT uchun ABC-Promptni Nusxalash"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ⭐⭐⭐ PRO 5.0: MIKRO-OPERATSION RENTGEN, ANTI-FRAUD & MAXSUS SOHALAR MARKAZI ⭐⭐⭐ */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-rose-500/40 rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Yuqori Sarlavha */}
        <div className="border-b border-rose-500/20 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-extrabold uppercase mb-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            ⭐ PRO 5.0: Mikro-Operatsion Rentgen & Anti-Fraud Markazi
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            Kassa Xavfsizligi, Xodimlar Unumdorligi va Krizis Stress-Testi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Biznesingizning kassa o'g'riliklari, xodim va kvadrat metr samaradorligi hamda pul aylanish sikli (CCC) chuqur tahlili:
          </p>
        </div>

        {/* 1-MODUL: ANTI-FRAUD DETEKTORI VA KASSA O'G'RILIKLARI */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                1-Modul: Anti-Fraud Detektori — Kassa va Ombor O'g'riliklari Xavfi
              </h3>
            </div>
            <div className="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300 font-bold">
              Aniqlangan Xavf: ~${fmt(data.fraudTotalMonthlyLoss || 450)} /oy
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sxema 1: Soxta Vozvrat */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-extrabold text-xs uppercase tracking-wider">
                1. "Soxta Vozvrat" Sxemasi
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mijoz naqd pul to'lab chekni olmay ketgach, kassir chekni bekor qilib (otmena/vozvrat) naqd pulni cho'ntakka uradi.
              </p>
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-200">
                🛡️ <strong>1C Himoyasi:</strong> Har qanday chek bekor qilinishi faqat rahbar Telegramiga keladigan 1 martalik SMS/Bot tasdiq kodi bilan amalga oshiriladi.
              </div>
            </div>

            {/* Sxema 2: Peresort & Srok */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                2. "Peresort & Muddat Almashtirish"
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Qimmat va arzon tovar kodlari almashtirib uriladi yoki muddati o'tgan tovar 'spisaniya' qilinib, arzon sotib yuboriladi.
              </p>
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-[11px] text-amber-200">
                🛡️ <strong>1C Himoyasi:</strong> 2D skaner orqali seriya va srok avtomat tekshiriladi, qo'lda narx yoki tovar almashtirish imkoniyati bloklanadi.
              </div>
            </div>

            {/* Sxema 3: Kassani chetlab o'tish */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
                3. "Kassani Chetlab O'tish"
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Klinika, avtoservis yoki xizmat ko'rsatishda mijozdan to'lov cheksiz olinib, shifokor yoki usta cho'ntagiga ketishi.
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-900/60 text-[11px] text-cyan-200">
                🛡️ <strong>1C Himoyasi:</strong> Shifokor xonasi yoki ustaxonaga faqat kassa cheki/QR-kod orqali kirish tartibi va avtomatik EMR joriy etiladi.
              </div>
            </div>
          </div>
        </div>

        {/* 2-MODUL: XODIMLAR VA MAYDON (KV.M) SAMARADORLIGI RENTGENI */}
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              2-Modul: Unit-Productivity — Xodim va Joy (Kv.m) Samaradorligi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase">1 Xodimga Oylik Savdo:</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                ${fmt(data.revenuePerEmployee)}
                <span className="text-xs text-slate-400 font-normal"> /xodim</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Soha normasi: <strong>~${fmt(data.benchmarkRevPerEmp)}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase">1 Xodimga Sof Foyda:</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                ${fmt(data.profitPerEmployee)}
                <span className="text-xs text-slate-400 font-normal"> /xodim</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Jami shtat: <strong>{data.employeesCount} nafar</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase">1 Kv.m Maydon Rentabelligi:</div>
              <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">
                ${fmt(data.revenuePerSqM)}
                <span className="text-xs text-slate-400 font-normal"> /kv.m</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Maydon hajmi: <strong>{data.businessAreaSqM} kv.m</strong>
              </div>
            </div>

            {/* 3-QADAM: Ish Haqi Fondi (FOT) Samaradorligi */}
            <div className={`p-4 rounded-2xl border ${data.isFotHigh ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Ish Haqi Fondi (FOT):</span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${data.isFotHigh ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  Norma: 8-15%
                </span>
              </div>
              <div className={`text-2xl sm:text-3xl font-black mt-1 ${data.isFotHigh ? 'text-amber-400' : 'text-emerald-400'}`}>
                {data.fotRatioPercent || 12}%
                <span className="text-xs text-slate-400 font-normal"> savdodan</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Taxminiy fond: <strong>~${fmt(data.estimatedFot)}/oy</strong>
              </div>
            </div>
          </div>

          {/* FOT Me'yordan oshgan ogohlantirishi */}
          {data.isFotHigh && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/60 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5 shadow-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Shtat Xarajati Ogohlantirishi: </strong>
                Shtat xarajatining umumiy savdodagi ulushi me'yordan oshib ketgan ({data.fotRatioPercent}% &gt; 18%). Fiks oylikni kamaytirib, xodimlarni KPI va sotuv foiziga o'ting.
              </div>
            </div>
          )}

          {/* Tashxis */}
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/60 text-xs sm:text-sm text-blue-200 flex items-start gap-2.5">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Unumdorlik Diagnostikasi: </strong>
              {data.productivityDiagnosis}
            </div>
          </div>
        </div>

        {/* 3-MODUL: KRIZIS STRESS-TESTI VA MAKSIMAL CHEGIRMA CHEGARASI */}
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              3-Modul: Krizis Stress-Testi va Maksimal Chegirma Chegarasi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ssenariy: -30% Mavsumiy tushish */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase text-amber-400">
                <span>Mavsumiy Inqiroz Ssenariysi (-30% Savdo)</span>
                <TrendingDown className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-white">
                Daromad: ${fmt(data.crisisDropRevenue)} <span className="text-xs text-slate-400">(${fmt(data.targetRevenue)} dan tushsa)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Doimiy xarajatlar (${fmt(data.fixedCosts)}) to'langach, oylik natija:
              </p>
              <div className={`p-3 rounded-xl border text-xs sm:text-sm font-black flex items-center justify-between ${
                data.isCrisisDeficit 
                  ? 'bg-red-950/40 border-red-500/50 text-red-300'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              }`}>
                <span>{data.isCrisisDeficit ? "🚨 KASSA UZILISHI XAVFI:" : "✅ BARQAROR REZERV:"}</span>
                <span className="text-base sm:text-lg">
                  {data.isCrisisDeficit ? `-$${fmt(Math.abs(data.crisisNetProfit))} /oy` : `+$${fmt(data.crisisNetProfit)} /oy`}
                </span>
              </div>
            </div>

            {/* Maksimal Chegirma Chegarasi */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-rose-400">
                Qat'iy Qoida: Maksimal Ruxsat Etilgan Chegirma
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400">
                {data.maxAllowedDiscountPercent}%
                <span className="text-xs font-normal text-slate-300"> dan oshmasligi shart</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/60 text-xs text-rose-200 leading-relaxed">
                ⛔ <strong>Diqqat!</strong> Sizning biznesingizda xaridorga <strong>{data.maxAllowedDiscountPercent}% dan ortiq chegirma berish</strong> — to'g'ridan-to'g'ri o'z cho'ntagingizdan (zararga) sotish demakdir! Doimiy xarajatlar tushumni qoplamay qoladi.
              </div>
            </div>
          </div>
        </div>

        {/* 4-MODUL: PUL AYLANISH SIKLI (CASH CONVERSION CYCLE - CCC) */}
        <div className="space-y-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              4-Modul: Pul Aylanish Sikli (CCC) — Muzlagan Naqd Pulni Chiqarish
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400">1. Ombor Aylanishi (DIO):</div>
                <div className="text-xl font-black text-white mt-0.5">{data.dioDays} kun</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400">+ 2. Nasiya Qaytishi (DSO):</div>
                <div className="text-xl font-black text-amber-400 mt-0.5">{data.dsoDays} kun</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400">- 3. Ta'minotchi To'lovi (DPO):</div>
                <div className="text-xl font-black text-cyan-400 mt-0.5">{data.dpoDays} kun</div>
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/50">
                <div className="text-[11px] font-bold text-indigo-300">= Pul Sikli (CCC):</div>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">{data.cccTotalDays} kun</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-200">
              <div>
                💡 <strong>Tadbirkorga Xulosa:</strong> Tovar omborga kirib, sotilib, puli qo'lingizga naqd bo'lib qaytib kelgungacha <strong>{data.cccTotalDays} kun</strong> o'tmoqda. 1C va ABC-tahlil orqali bu muddatni 15 kunga qisqartirsangiz:
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-sm shrink-0 whitespace-nowrap">
                +${fmt(data.cashFreedUp15Days)} bo'shaydi
              </div>
            </div>
          </div>
        </div>

        {/* 5-MODUL: DORIXONA YOKI KLINIKA BO'LSA MAXSUS BLOK */}
        {safeRaw.industry === 'pharmacy' && (
          <div className="p-5 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase">
              <span>💊 Dorixona Diagnostikasi Bo'yicha Xulosa</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/60">
                <div className="font-bold text-white mb-1">Muddati o'tgan dorilar (Srok godnosti):</div>
                <div className="text-rose-400 font-bold">Zarar xavfi: ~${fmt(data.pharmacyExpiredLossMonthly || 150)} /oy</div>
                <div className="text-slate-400 mt-1">1C FIFO moduli bilan bu zarar 0 ga tushiriladi.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/60">
                <div className="font-bold text-white mb-1">Blister (Plastinka) peresort kamomadi:</div>
                <div className="text-amber-400 font-bold">Xavf: ~${fmt(data.pharmacyBlisterLossMonthly || 200)} /oy</div>
                <div className="text-slate-400 mt-1">Dasturda 1 pachkani 0.1/0.5 bo'lib avtomat hisoblash joriy qilinadi.</div>
              </div>
            </div>
          </div>
        )}

        {safeRaw.industry === 'clinic_medical' && (
          <div className="p-5 rounded-2xl bg-cyan-950/30 border-2 border-cyan-500/50 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm uppercase">
              <span>🏥 Klinika va Diagnostika Diagnostikasi Bo'yicha Xulosa</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/60">
                <div className="font-bold text-white mb-1">Kassani chetlab o'tish (Vrach cho'ntagiga):</div>
                <div className="text-rose-400 font-bold">Yo'qotish: ~${fmt(data.clinicCashBypassLossMonthly || 800)} /oy</div>
                <div className="text-slate-400 mt-1">Elektron navbat va shifokor EMR tizimi orqali to'lov 100% markazlashadi.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/60">
                <div className="font-bold text-white mb-1">Reaktiv va tibbiy sarf materiallari:</div>
                <div className="text-amber-400 font-bold">Isrof: ~${fmt(data.clinicMaterialLossMonthly || 350)} /oy</div>
                <div className="text-slate-400 mt-1">Har bir tahlil va muolajaga qat'iy tex-karta bo'yicha avto-spisaniya sozlansin.</div>
              </div>
            </div>
          </div>
        )}
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

        {/* 7 ta Vkladka (Tablar) — PRO 5.0 Kengaytirilgan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { id: 'debt_scripts', label: "📋 Nasiya Skripti", icon: FileText },
            { id: 'sales_scripts', label: "🎯 Sotuv Skripti", icon: Flame },
            { id: 'kpi_calc', label: "💰 Xodimlar KPI", icon: DollarSign },
            { id: 'revision_checklist', label: "✅ 5 Qadam Reviziya", icon: CheckSquare },
            { id: 'ai_prompts', label: "🤖 AI-Prompt", icon: BrainCircuit },
            { id: 'live_abc', label: "⚡ Jonli ABC-Kalkulyator", icon: BarChart3 },
            { id: 'b2b_loyalty', label: "🤝 Hamkorlar & Vrachlar", icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDiyTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDiyTab(tab.id)}
                className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25 ring-1 ring-blue-400'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
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

        {/* TAB 5: AI-Prompt va Balans Formulalari (PRO 4.0) */}
        {activeDiyTab === 'ai_prompts' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Qimmat moliyachi yoki IT-mutaxassis yollamasdan, Sun'iy Intellekt va Excel yordamida mustaqil qo'llanadigan tayyor vositalar:
            </p>

            {/* Prompt 1 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md">
                  🤖 1-Instrument: Excel Omborini ABC-Tahlil Qilish uchun ChatGPT / Gemini Prompti
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(`Men ${safeRaw.businessName || "chakana savdo"} do'koni rahbariman. Mana mening tovarlar qoldig'im va oxirgi 60 kunlik sotuv jadvallarim: [Excel jadvalingizni shu yerga tashlang].\nMenga quyidagi tahlilni aniq jadvallarda qilib ber:\n1. Pareto qonuni (ABC-tahlil) bo'yicha menga 80% daromad keltiruvchi eng muhim A-guruh tovarlarni ajratib ber;\n2. Oxirgi 45 kunda 1 dona ham sotilmagan C-guruh 'o'lik nelikvid' tovarlar ro'yxatini va ularda muzlab yotgan umumiy summani hisoblab ber;\n3. A-toifa tovarlarim tugab qolmasligi uchun keyingi oyga necha donadan buyurtma berishim kerakligini (Min-Max) hisoblab ber.`, 'prompt_abc_full')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
                >
                  {copiedId === 'prompt_abc_full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedId === 'prompt_abc_full' ? "Nusxalandi! ✓" : "Promptni Nusxalash"}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                "Men {safeRaw.businessName || "chakana savdo"} do'koni rahbariman. Mana mening tovarlar qoldig'im va oxirgi 60 kunlik sotuv jadvallarim: [Excel jadvalingizni shu yerga tashlang].<br />
                Menga quyidagi tahlilni aniq jadvallarda qilib ber:<br />
                1. Pareto qonuni (ABC-tahlil) bo'yicha menga 80% daromad keltiruvchi eng muhim A-guruh tovarlarni ajratib ber;<br />
                2. Oxirgi 45 kunda 1 dona ham sotilmagan C-guruh 'o'lik nelikvid' tovarlar ro'yxatini va ularda muzlab yotgan umumiy summani hisoblab ber;<br />
                3. A-toifa tovarlarim tugab qolmasligi uchun keyingi oyga necha donadan buyurtma berishim kerakligini (Min-Max) hisoblab ber."
              </div>
            </div>

            {/* Formula 2: Balans va P&L Farqi */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                ⚖️ 2-Instrument: Moliyaviy Balansning Oltin Tenglamasi
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">AKTIVLAR (Mulk):</div>
                  <div className="text-white font-mono text-[11px] leading-relaxed">
                    Kassadagi Naqd pul + Ombordagi tovar qoldig'i + Mijozlarning nasiyalari (Debitorlik) + Jihozlar
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">MAJBURIYATLAR (Qarzlar):</div>
                  <div className="text-amber-400 font-mono text-[11px] leading-relaxed">
                    Ta'minotchilardan olingan nasiya tovarlar + Xodimlar oyligi + Ijara va soliq qarzdorliklari
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">XUSUSIY KAPITAL (Sof Boylik):</div>
                  <div className="text-emerald-300 font-mono text-[11px] leading-relaxed">
                    Aktivlar — Majburiyatlar = Sizning haqiqiy shaxsiy biznes kapitalingiz!
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                💡 Har oyning 1-sanasida Aktivlar va Majburiyatlar ayirmasini hisoblang. Agar Xususiy Kapital o'smayotgan bo'lsa, biznes faqat qarzlar hisobiga aylanayotgan bo'ladi.
              </p>
            </div>
          </div>
        )}

        {/* TAB 6: ⚡ JONLI MINI ABC-ANALIZATOR (PRO 5.0 INTERAKTIV SUPER-INSTRUMENT) */}
        {activeDiyTab === 'live_abc' && (() => {
          const itemsWithProfit = abcItems.map((it) => ({
            ...it,
            profit: Math.round(Number(it.revenue || 0) * (Number(it.margin || 0) / 100))
          })).sort((a, b) => b.profit - a.profit);

          const totalAbcProfit = itemsWithProfit.reduce((sum, it) => sum + it.profit, 0) || 1;
          let runningProfit = 0;

          return (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>⚡ Brauzer Ichida Jonli ABC-Tahlil Kalkulyatori</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase">
                      Real-Vaqtda
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Bir tugma bilan sohangiz namunasini yuklang yoki o'z mahsulotlaringizni tekshiring:
                  </p>
                </div>

                {/* Preset yuklash tugmalari */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => loadAbcPreset('pharmacy')}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    💊 Dorixona
                  </button>
                  <button
                    type="button"
                    onClick={() => loadAbcPreset('construction')}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    🧱 Qurilish
                  </button>
                  <button
                    type="button"
                    onClick={() => loadAbcPreset('market')}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    🛒 Minimarket
                  </button>
                  <button
                    type="button"
                    onClick={() => loadAbcPreset('clinic')}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    🏥 Klinika
                  </button>
                </div>
              </div>

              {/* Jonli ABC Jadvali */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                      <th className="py-2.5 px-3 font-bold">Mahsulot / Dori / Xizmat</th>
                      <th className="py-2.5 px-3 font-bold text-right">Oylik Savdo ($)</th>
                      <th className="py-2.5 px-3 font-bold text-right">Marja (%)</th>
                      <th className="py-2.5 px-3 font-bold text-right">Sof Foyda ($)</th>
                      <th className="py-2.5 px-3 font-bold text-center">ABC Toifasi</th>
                      <th className="py-2.5 px-3 font-bold min-w-[200px]">Tavsiya & Retsept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsWithProfit.map((it, idx) => {
                      runningProfit += it.profit;
                      const cumPercent = Math.round((runningProfit / totalAbcProfit) * 100);

                      let category = "A";
                      let badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
                      let label = "🟢 A (Oltin Lokomotiv)";
                      let action = "Doimiy qoldiq nazorati (Min-Max buyurtma). Aslo tugab qolmasin!";

                      if (cumPercent > 92) {
                        category = "C";
                        badgeClass = "bg-red-500/20 text-red-300 border-red-500/40";
                        label = "🔴 C (Nelikvid / Pul yutkich)";
                        action = "Yangi partiya olmang! Chegirma yoki aksiya bilan naqd pulga aylantiring.";
                      } else if (cumPercent > 78) {
                        category = "B";
                        badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
                        label = "🟡 B (O'rtamiyona)";
                        action = "A-guruh yonida Cross-sell qiling, haftalik partiya yetarli.";
                      }

                      return (
                        <tr key={idx} className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{it.name}</td>
                          <td className="py-3 px-3 text-right font-mono text-slate-200">${it.revenue.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right font-mono text-slate-300">{it.margin}%</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">${it.profit.toLocaleString()}</td>
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full border text-[11px] font-extrabold ${badgeClass}`}>
                              {label}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-300 text-[11px] leading-relaxed">{action}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>✓ Jami hisoblangan sof foyda: <strong className="text-emerald-400">${totalAbcProfit.toLocaleString()}</strong></span>
                <span className="text-[11px] text-cyan-300">1C / POS dasturida bu tahlil har kuni kechqurun avtomat shakllanadi</span>
              </div>
            </div>
          );
        })()}

        {/* TAB 7: HAMKORLAR, USTALAR VA VRACHLAR BONUS MATRITSASI (PRO 5.0) */}
        {activeDiyTab === 'b2b_loyalty' && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>🤝 B2B Hamkorlik va Yo'llanma (Napravitel) Rag'batlantirish Matritsasi</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Qurilishda — <strong>Ustalar/Prorablar</strong>, Klinikada — <strong>Yo'llanma beruvchi Vrachlar</strong>, Savdoda — <strong>Mijoz olib keluvchi agentlar</strong> uchun 3 darajali shaffof rag'batlantirish:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daraja 1 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/50 text-xs font-bold uppercase">
                    🥉 1-Daraja: Bronza
                  </span>
                  <span className="text-base font-black text-amber-400">3% Keshbek</span>
                </div>
                <div className="text-xs font-bold text-white">Yangi boshlagan ustalar / Shifokorlar</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Oylik 1 dan 5 tagacha mijoz olib kelganda. Har bir mijoz to'lovidan 3% bonus yig'iladi.
                </p>
              </div>

              {/* Daraja 2 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-600 text-xs font-bold uppercase">
                    🥈 2-Daraja: Kumush
                  </span>
                  <span className="text-base font-black text-slate-200">5% Keshbek</span>
                </div>
                <div className="text-xs font-bold text-white">Faol hamkorlar (Oylik $2,000+ aylanma)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Doimiy bemor yoki buyurtmachi olib keluvchi shifokor/usta uchun oshirilgan stavka.
                </p>
              </div>

              {/* Daraja 3 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-yellow-500/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-bold uppercase">
                    🥇 3-Daraja: Oltin VIP
                  </span>
                  <span className="text-base font-black text-yellow-400">7% Keshbek</span>
                </div>
                <div className="text-xs font-bold text-white">TOP-Hamkorlar ($5,000+ aylanma)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Eksklyuziv hamkorlar: qo'shimcha sovg'alar va har oyning 1-sanasida avtomat to'lov.
                </p>
              </div>
            </div>

            {/* Qat'iy Qoidalar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="font-bold text-white text-xs sm:text-sm">Matritsaning 3 ta Qat'iy Qoidasi:</div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span><strong>Naqd vs Nasiya:</strong> Agar mijoz tovarni nasiyaga olsa, ustaga bonus 50% kam beriladi yoki faqat mijoz qarzini to'liq yopgan kuni hisobiga tushadi.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span><strong>Telegram-bot Kabineti:</strong> Har bir usta/shifokor o'zining shaxsiy Telegram botiga kirib, nechta mijoz keltirgani va qancha bonusi yig'ilganini real vaqtda ko'rib turadi.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span><strong>Kassa chekida ko'rinishi:</strong> Har bir sotuv kassa chekiga usta/vrach kodi kiritilganda, chek ostida to'plangan ball avtomat chop etiladi.</span>
              </div>
            </div>
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
                  🚀 2-Yo'l: BDM kompaniyasi bilan "Pod Klyuch"
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  ROI: ~1.5 oyda o'zini oqlaydi
                </span>
              </div>

              <h4 className="text-lg font-bold text-white">
                10 yillik tajribaga ega BDM kompaniyasi mutaxassislari bilan to'liq avtomatlashtirish
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
                  <h4 className="text-sm font-bold text-white">BDM kompaniyasi (10 yillik tajriba) bilan individual sozlash yoki dastur o'rnatish</h4>
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
                  {data.isSarafanOnly ? (
                    <div className="mt-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
                      ✓ Reklama byudjeti yo'qotishi: $0 (Siz faqat tavsiya va sarafan orqali ishlaysiz)
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
                  Mas'ul: {safeRaw.fullName || "Biznes egasi"} & BDM kompaniyasi (10 yillik tajriba)
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
