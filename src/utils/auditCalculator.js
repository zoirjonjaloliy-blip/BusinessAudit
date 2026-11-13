import { INDUSTRY_BENCHMARKS, PLATFORMS } from '../data/industryBenchmarks';

export function calculateBusinessAudit(formData) {
  // 1. Asosiy moliyaviy ko'rsatkichlar
  const targetRevenue = Math.max(100, Number(formData.targetRevenue) || 10000);
  const averageCheck = Math.max(1, Number(formData.averageCheck) || 60);
  const conversionRate = Math.min(100, Math.max(0.5, Number(formData.conversionRate) || 20));
  const netMargin = Math.min(100, Math.max(5, Number(formData.netMargin) || 30));

  // Soha ma'lumotlari
  const industryKey = formData.industry || 'retail_general';
  const industry = INDUSTRY_BENCHMARKS[industryKey] || INDUSTRY_BENCHMARKS.retail_general;

  // Platformalar (Multi-select)
  const selectedPlatforms = Array.isArray(formData.platforms) && formData.platforms.length > 0
    ? formData.platforms
    : [formData.platform || 'instagram'];

  // O'rtacha CPL ni hisoblash
  let totalCplSum = 0;
  selectedPlatforms.forEach((p) => {
    const cpl = industry.avgCpl[p] || industry.avgCpl.instagram || 1.5;
    totalCplSum += cpl;
  });
  const baseCpl = Number((totalCplSum / selectedPlatforms.length).toFixed(2));

  // 2. Ideal Funnel hisobi (Yo'qotishlarsiz)
  const requiredCustomers = Math.ceil(targetRevenue / averageCheck);
  const requiredLeadsIdeal = Math.ceil(requiredCustomers / (conversionRate / 100));
  const minBudgetIdeal = Math.round(requiredLeadsIdeal * (baseCpl * 0.8));
  const optimalBudgetIdeal = Math.round(requiredLeadsIdeal * baseCpl);

  // 3. Jarimalar & Samaradorlik yo'qotishlari (Penalties)
  const penalties = [];
  let totalPenaltyPercentage = 0;

  // A. Kassa / Savdo / Ombor Avtomatlashtirish Dasturi (POS / 1C)
  if (formData.accountingSoftware === 'paper') {
    const penalty = 25;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'software_paper',
      title: "Savdo va Ombor daftarda yuritilishi (Kritik xavf)",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'critical',
      description: "Qog'oz daftarda tovar qoldiqlari (ostatka), pul aylanmasi va sotuvchilar nazorati yo'q. Bu tovar kamomadi, o'g'irliklar va hisob chalkashligiga olib keladi.",
      solution: "Do'konga POS savdo dasturi yoki 1C: Korxona tizimini o'rnatish."
    });
  } else if (formData.accountingSoftware === 'excel') {
    const penalty = 12;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'software_excel',
      title: "Savdo faqat Excelda yuritilishi",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Excel kassa apparati va shtrix-kod skaneriga ulanmagan, inson xatolari tufayli real qoldiqlar chalkashadi.",
      solution: "Shtrix-kodli zamonaviy POS dasturiga o'tish."
    });
  }

  // B. Nasiya va Qarzlar hisobi (Debitorlik)
  if (formData.debtTracking === 'paper') {
    const penalty = 20;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'debt_paper',
      title: "Nasiya (qarzlar)ning daftarda yuritilishi",
      impact: `+${penalty}% aylanma zarar`,
      lossPercent: penalty,
      severity: 'high',
      description: "Daftardagi qarzlar esdan chiqadi, mijozga eslatish noqulay, o'rtacha 15% qarzlar yillab yopilmay pul 'muzlab' qoladi.",
      solution: "Qarzlarni avtomatik hisoblovchi va muddatida eslatuvchi dastur joriy qilish."
    });
  } else if (formData.debtTracking === 'no_tracking') {
    const penalty = 30;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'debt_none',
      title: "Qarzlar umuman nazorat qilinmaydi",
      impact: `+${penalty}% aylanma zarar`,
      lossPercent: penalty,
      severity: 'critical',
      description: "Nazoratsiz qarz berish korxonani kassa uzilishiga olib keluvchi 1-raqamli omildir.",
      solution: "Qarz limitlarini belgilash va faqat dastur orqali rasmiylashtirish."
    });
  }

  // C. CRM Tizimi
  if (formData.hasCrm === 'no') {
    const penalty = 20;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'crm',
      title: "Mijozlar bazasi (CRM) yo'qligi",
      impact: `+${penalty}% xarajat`,
      lossPercent: penalty,
      severity: 'high',
      description: "Murojaat qilgan mijozlarning 20-30% qismi unutiladi va qayta qo'ng'iroq qilinmasdan raqobatchiga ketadi.",
      solution: "Lidlarni yig'uvchi va nazorat qiluvchi CRM tizimini o'rnatish."
    });
  } else if (formData.hasCrm === 'excel') {
    const penalty = 10;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'crm_excel',
      title: "Lidlar faqat Excelda yozilishi",
      impact: `+${penalty}% xarajat`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Excelda avtomatik eslatmalar yo'q, qo'ng'iroqlar tarixi saqlanmaydi va sotuvchilar mas'uliyati sust bo'ladi.",
      solution: "Bulutli CRM tizimiga o'tish."
    });
  }

  // D. Sotuv bo'limi
  if (formData.salesTeam === 'owner_only') {
    const penalty = 18;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'sales_team',
      title: "Alohida sotuvchilar yo'qligi (Egasi sotadi)",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'high',
      description: "Biznes egasining vaqti cheklangan. Boshqa ishlar sababli mijozlar kutib qoladi va sotuv foizi tushadi.",
      solution: "Kamida 1 ta sotuv menejerini yollash va skript bilan ta'minlash."
    });
  } else if (formData.salesTeam === 'junior') {
    const penalty = 8;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'sales_junior',
      title: "Menejerlarda skript va qat'iy reja yo'qligi",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'low',
      description: "Sotuvchilar faqat kutib o'tiradi, e'tirozlar bilan ishlay olmaydi.",
      solution: "Sotuv skriptlari va kunlik hisobot joriy etish."
    });
  }

  // E. Javob berish tezligi
  if (formData.responseTime === 'slow') {
    const penalty = 15;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'response_slow',
      title: "Mijozga sekin javob berish (1-4 soat)",
      impact: `+${penalty}% xarajat`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Internet mijozi 15 daqiqadan so'ng boshqa joydan olib qo'yishi mumkin.",
      solution: "Tezkor bildirishnoma yoki avtojavob tizimini o'rnatish."
    });
  } else if (formData.responseTime === 'very_slow') {
    const penalty = 25;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'response_critical',
      title: "Kritik sekin javob (4+ soat yoki ertasi kuni)",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'high',
      description: "Kech javob qaytarilgan lidlarning yarmi allaqachon boshqa do'kondan olib bo'ladi.",
      solution: "Sotuvchilarga 10 daqiqa reglamentini qo'yish."
    });
  }

  // F. Upakovka
  if (formData.socialStatus === 'bad') {
    const penalty = 15;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'branding_bad',
      title: "Ijtimoiy tarmoq va Upakovka sustligi",
      impact: `+${penalty}% qimmat lid`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Sahifada ishonch va aniq narxlar yo'qligi xarid qaroriga to'sqinlik qiladi.",
      solution: "Profil shakli, vizual qadoq va mijozlar fikrlarini (keyslar) to'g'irlash."
    });
  }

  // 4. Real hisob-kitoblar
  const penaltyMultiplier = 1 + (totalPenaltyPercentage / 100);
  const realRequiredLeads = Math.ceil(requiredLeadsIdeal * (1 + (totalPenaltyPercentage * 0.65 / 100)));
  const realMinBudget = Math.round(minBudgetIdeal * penaltyMultiplier);
  const realOptimalBudget = Math.round(optimalBudgetIdeal * penaltyMultiplier);

  // Pul yo'qotishlari
  const monthlyWastedMoney = Math.round(realOptimalBudget - optimalBudgetIdeal);
  const yearlyWastedMoney = monthlyWastedMoney * 12;

  // 5. Biznes salomatlik indeksi (0 - 100)
  let marketingScore = 100;
  let salesScore = 100;
  let systemScore = 100;

  if (formData.socialStatus === 'bad') marketingScore -= 35;
  else if (formData.socialStatus === 'medium') marketingScore -= 15;

  if (formData.salesTeam === 'owner_only') salesScore -= 35;
  else if (formData.salesTeam === 'junior') salesScore -= 15;
  if (formData.responseTime === 'slow') salesScore -= 20;
  else if (formData.responseTime === 'very_slow') salesScore -= 35;

  if (formData.accountingSoftware === 'paper') systemScore -= 40;
  else if (formData.accountingSoftware === 'excel') systemScore -= 20;

  if (formData.debtTracking === 'paper') systemScore -= 25;
  else if (formData.debtTracking === 'no_tracking') systemScore -= 40;

  if (formData.hasCrm === 'no') systemScore -= 25;

  marketingScore = Math.max(15, marketingScore);
  salesScore = Math.max(15, salesScore);
  systemScore = Math.max(15, systemScore);

  const overallScore = Math.round((marketingScore * 0.25) + (salesScore * 0.35) + (systemScore * 0.40));

  let riskLevel = 'Past (Barqaror)';
  let riskColor = 'emerald';
  if (overallScore < 45) {
    riskLevel = 'Kritik (Yuqori yo\'qotishlar)';
    riskColor = 'red';
  } else if (overallScore < 70) {
    riskLevel = 'O\'rtacha (Xavfli zonada)';
    riskColor = 'amber';
  }

  // 6. Dasturiy Tavsiyalar (Umumiy toifalar bilan)
  const softwareRecommendations = [
    {
      name: "POS Savdo va Kassa Dasturlari",
      category: "POS Tizimi",
      reason: "Kassa, shtrix-kod skaneri va chek printeri bilan ishlash, tovar qoldiqlarini real vaqtda ko'rish va kamomadni yo'qotish.",
      impact: "Do'kondagi tovar yo'qotishlari va kamomadni 95% gacha to'xtatadi."
    },
    {
      name: "1C: Korxona Tizimlari",
      category: "Boshqaruv & Buxgalteriya",
      reason: "Ombor hisobi, tovarlar tannarxi, ta'minotchilar bilan hisob-kitob va korxona foydasini 100% aniqlikda chiqarish.",
      impact: "Mablag'lar aylanmasini to'liq shaffof qiladi va biznes egasini erkinlashtiradi."
    },
    {
      name: "Qarzlar va Nasiya Nazorati Tizimi",
      category: "Nasiya Moduli",
      reason: "Mijozlar qarzlarini daftardan chiqarib, limit belgilash va to'lov muddati kelganda avtomatik eslatish.",
      impact: "Qarzlarning o'z vaqtida qaytishini 60% ga tezlashtiradi va 'muzlagan' pullarni chiqaradi."
    },
    {
      name: "Mijozlar bilan Aloqa Tizimi (CRM)",
      category: "CRM Voronka",
      reason: "Telegram, Instagram va qo'ng'iroqlarni bitta oynaga yig'ib, har bir xaridorni sotuvgacha kuzatib borish.",
      impact: "Lidlar yo'qolishini oldini olib, sotuv konversiyasini 20-30% ga oshiradi."
    }
  ];

  // 7. 30 kunlik Yo'l Xaritasi
  const roadmap = [
    {
      period: "1-7 kun (Tezkor tartibga solish)",
      steps: [
        formData.accountingSoftware === 'paper' ? "Daftardagi tovar qoldiqlarini hisoblab, zudlik bilan avtomatlashgan POS savdo dasturi yoki 1C: Korxona tizimiga o'tishni boshlash." : "Kassa va tushumlar hisobini kunlik tekshirishni yo'lga qo'yish.",
        formData.debtTracking === 'paper' ? "Barcha qarz daftarlarini to'liq inventarizatsiya qilish va muddati o'tgan mijozlar ro'yxatini shakllantirish." : "Nasiya berish chegarasi (limiti)ni belgilash.",
        "Murojaat qilgan mijozlarga 10 daqiqa ichida javob berish tartibini joriy etish."
      ]
    },
    {
      period: "8-20 kun (Tizim va Dasturiy ta'minot)",
      steps: [
        "POS savdo dasturi yoki 1C tizimini o'rnatib, xodimlarni shtrix-kod va to'g'ri kassa yuritishga o'rgatish.",
        formData.hasCrm === 'no' ? "CRM tizimi orqali Instagram va Telegram lidlarini avtomatlashtirish." : "CRM voronkasidagi to'xtab qolgan lidlar bilan ishlash.",
        formData.salesTeam === 'owner_only' ? "Biznes egasini doimiy sotuvdan ozod qilish uchun menejer jalb qilish." : "Sotuvchilarga aniq reja va KPI joriy qilish."
      ]
    },
    {
      period: "21-30 kun (Masshtablash va Moliyaviy o'sish)",
      steps: [
        `Oylik $${targetRevenue.toLocaleString()} daromad maqsadi uchun barqaror kunlik ${Math.ceil(realRequiredLeads / 30)} ta lid oqimini ta'minlash.`,
        "Eng ko'p marja va daromad keltirayotgan tovarlar guruhiga asosiy urg'uni qaratish.",
        "Dastur orqali har haftalik P&L (Foyda va Zarar) hisobotini tahlil qilib borish."
      ]
    }
  ];

  return {
    targetRevenue,
    averageCheck,
    conversionRate,
    netMargin,
    industry,
    selectedPlatforms,
    baseCpl,
    requiredCustomers,
    requiredLeadsIdeal,
    realRequiredLeads,
    minBudgetIdeal,
    optimalBudgetIdeal,
    realMinBudget,
    realOptimalBudget,
    totalPenaltyPercentage,
    penalties,
    monthlyWastedMoney,
    yearlyWastedMoney,
    expectedGrossProfit: targetRevenue * (netMargin / 100),
    scores: {
      overall: overallScore,
      marketing: marketingScore,
      sales: salesScore,
      system: systemScore
    },
    riskLevel,
    riskColor,
    softwareRecommendations,
    roadmap
  };
}
