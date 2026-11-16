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

  // Yangi PRO 3.0 kiritilgan qiymatlar
  const fixedCosts = Math.max(100, Number(formData.fixedCosts) || industry.typicalFixedCosts || 1500);
  const inventoryCapital = Math.max(500, Number(formData.inventoryCapital) || industry.typicalInventory || 15000);

  // Platformalar (Multi-select)
  const selectedPlatforms = Array.isArray(formData.platforms) && formData.platforms.length > 0
    ? formData.platforms
    : [formData.platform || 'instagram'];

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

  // A. Kassa / Savdo Dasturi
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

  // B. Nasiya va Qarzlar
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

  // C. Ombor va Nelikvid holati (PRO 3.0)
  if (formData.inventoryStatus === 'dead_stock') {
    const penalty = 15;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'inventory_dead',
      title: "Omborda katta miqdorda nelikvid (muzlagan tovar)",
      impact: `+${penalty}% kapital muzlashi`,
      lossPercent: penalty,
      severity: 'high',
      description: "Oylab sotilmay yotgan tovarlar aylanma mablag'ni band qilib, biznes rivojini to'xtatib qo'ygan.",
      solution: "ABC-tahlil o'tkazib, nelikvidlarni chegirmada naqd pulga aylantirish."
    });
  } else if (formData.inventoryStatus === 'estimated') {
    const penalty = 8;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'inventory_est',
      title: "Ombor qoldiqlari taxminiy hisoblanishi",
      impact: `+${penalty}% noaniqlik`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Tovarlar real qoldig'i aniq emasligi sababli xaridlar xato qilinadi va pul behuda muzlaydi.",
      solution: "1C yoki POS dasturi orqali avtomatik qoldiqlar hisobini yo'lga qo'yish."
    });
  }

  // D. Soliq va Markirovka (PRO 3.0)
  if (formData.fiscalMarking === 'unorganized') {
    const penalty = 18;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'fiscal_bad',
      title: "Soliq va Markirovka integratsiyasi yo'qligi",
      impact: `Yuqori jarima xavfi`,
      lossPercent: penalty,
      severity: 'critical',
      description: "Asl Belgisi markirovkasiz va fiskal cheksiz savdo qilish katta moliyaviy jarimalar xavfini tug'diradi.",
      solution: "2D skaner va soliqqa to'g'ridan-to'g'ri ulangan 1C/POS kassani joriy etish."
    });
  } else if (formData.fiscalMarking === 'partial') {
    const penalty = 8;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'fiscal_partial',
      title: "Markirovka va cheklar qo'lda urilishi",
      impact: `Qisman xatoliklar`,
      lossPercent: penalty,
      severity: 'low',
      description: "Qo'lda kassa cheki urish kassirning vaqtini oladi va navbatlarni yuzaga keltiradi.",
      solution: "Kassa monoblokiga shtrix-kod skanerini to'g'ridan-to'g'ri integratsiya qilish."
    });
  }

  // E. CRM Tizimi
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
      description: "Excelda avtomatik eslatmalar yo'q, qo'ng'iroqlar tarixi saqlanmaydi.",
      solution: "Bulutli CRM tizimiga o'tish."
    });
  }

  // F. Sotuvchilar va Javob tezligi
  if (formData.salesTeam === 'owner_only') {
    const penalty = 15;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'sales_team',
      title: "Alohida sotuvchilar yo'qligi (Egasi sotadi)",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'high',
      description: "Biznes egasining vaqti cheklangan. Boshqa ishlar sababli mijozlar kutib qoladi.",
      solution: "Kamida 1 ta sotuv menejerini yollash va skript bilan ta'minlash."
    });
  }

  if (formData.responseTime === 'slow') {
    const penalty = 12;
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
    const penalty = 22;
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

  // G. Loyallik va Bonus tizimi (PRO 3.0)
  if (formData.loyaltySystem === 'none') {
    const penalty = 12;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'loyalty_none',
      title: "Mijozlarni ushlab qolish (Loyallik/Bonus) yo'qligi",
      impact: `+${penalty}% qayta sotuv yo'qolishi`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Har doim faqat yangi mijoz qidiriladi, eski mijozlar esa unutiladi va qaytib kelmaydi.",
      solution: "Avtomatlashgan keshbek/bonus Telegram botini ishga tushirish."
    });
  }

  // H. Ombor ABC-Tahlili (PRO 4.0)
  if (formData.abcAnalysisStatus === 'none') {
    const penalty = 25;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'abc_none',
      title: "Omborda ABC-tahlil yo'qligi (Muzlagan kapital)",
      impact: `+${penalty}% aylanma zarar`,
      lossPercent: penalty,
      severity: 'critical',
      description: "Qaysi tovarlar 80% daromad keltirayotgani va qaysi biri 60 kundan beri muzlab yotgani noma'lum. Omborda o'lik kapital to'planadi.",
      solution: "1C yoki POS tizimida avtomatik ABC-tahlil matritsasini joriy qilish."
    });
  } else if (formData.abcAnalysisStatus === 'approximate') {
    const penalty = 12;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'abc_approx',
      title: "Ombor tahlilining ko'zda chamalab qilinishi",
      impact: `+${penalty}% yo'qotish`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Tovarlar savdo tezligi aniq raqamlarga emas, his-tuyg'uga qarab baholanganligi sababli nelikvid yig'iladi.",
      solution: "Kunlik avtomatik ombor qoldig'i hisobotiga o'tish."
    });
  }

  // I. Out-of-Stock va Auto-Ordering (PRO 4.0)
  if (formData.autoOrderingStatus === 'out_of_stock_risk') {
    const penalty = 15;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'out_of_stock',
      title: "Xarid va Ta'minotda 'Out-of-Stock' xavfi (Talab yo'qotilishi)",
      impact: `+${penalty}% aylanma boy berilishi`,
      lossPercent: penalty,
      severity: 'high',
      description: "Eng xaridorgir 'A-toifa' tovarlar tugab qolganda, xaridorlar raqobatchiga ketadi va har oy 8-12% aylanma yo'qotiladi.",
      solution: "Dasturda 'Minimal Qoldiq' (Min-Max) signallari va avtomatik ta'minotchi buyurtmasini yoqish."
    });
  }

  // J. Moliyaviy Balans va 3 ta Hisobot (PRO 4.0)
  if (formData.financialReportsStatus === 'blind') {
    const penalty = 20;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'balance_blind',
      title: "Moliyaviy Balans va P&L yo'qligi (Moliyaviy ko'rlik)",
      impact: `+${penalty}% kassa xavfi`,
      lossPercent: penalty,
      severity: 'critical',
      description: "Kassadagi pul bilan sof foyda adashtiriladi. Haqiqiy foydaning 40% qismi ombordagi o'lik tovarlarda va qaytmas nasiyalarda muzlab qoladi.",
      solution: "Har oy oxirida avtomatik DDS (Cash Flow), P&L va Balans hisobotini yuritish."
    });
  } else if (formData.financialReportsStatus === 'cash_only') {
    const penalty = 10;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'balance_cash_only',
      title: "Faqat kassa tushumini yozish (To'liq Balans yo'q)",
      impact: `+${penalty}% kassa uzilishi xavfi`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Aktivlar va qarzdorliklar solishtirilmagani sababli to'satdan kassa uzilishi yuzaga kelishi mumkin.",
      solution: "Kassa daftaridan P&L va Balans tizimiga o'tish."
    });
  }

  // K. AI va Avto-Analitika (PRO 4.0)
  if (formData.aiUsageStatus === 'none') {
    const penalty = 12;
    totalPenaltyPercentage += penalty;
    penalties.push({
      id: 'ai_none',
      title: "Sun'iy Intellekt (AI) va Avto-Analitika yo'qligi",
      impact: `+${penalty}% strategik yo'qotish`,
      lossPercent: penalty,
      severity: 'medium',
      description: "Rahbar har oy 30-40 soat vaqtini qog'ozbozlikka sarflaydi, kassa anomaliyalari va o'g'irliklar esa o'z vaqtida aniqlanmaydi.",
      solution: "1C/POS bazaga har kuni kechqurun tahliliy xulosa beruvchi AI Telegram-botni ulash."
    });
  }

  // 4. CHUQUR MOLIYAVIY MATEMATIKA (PRO 3.0 & PRO 4.0)

  // A. Jarimalar chegarasi (Cap: max 50%) & "Sarafan" mantiqi
  const cappedPenaltyPercentage = Math.min(50, totalPenaltyPercentage);
  const isSarafanOnly = (selectedPlatforms.length === 1 && (selectedPlatforms[0] === 'organic' || selectedPlatforms[0] === 'sarafan')) ||
    (formData.leadChannel === 'referral_only');

  const penaltyMultiplier = 1 + (cappedPenaltyPercentage / 100);
  const realRequiredLeads = isSarafanOnly 
    ? requiredLeadsIdeal 
    : Math.ceil(requiredLeadsIdeal * (1 + (cappedPenaltyPercentage * 0.40 / 100)));

  const realMinBudget = isSarafanOnly ? 0 : Math.round(minBudgetIdeal * penaltyMultiplier);
  const realOptimalBudget = isSarafanOnly ? 0 : Math.round(optimalBudgetIdeal * penaltyMultiplier);
  
  // Realistik reklama zarari ($0 agar sarafan bo'lsa, aks holda me'yorida)
  const monthlyWastedMarketing = isSarafanOnly 
    ? 0 
    : Math.min(750, Math.max(0, Math.round(realOptimalBudget - optimalBudgetIdeal)));

  // B. Yo'qotilgan Sof Foyda (Lost Net Profit)
  const lostCustomersCount = Math.max(0, Math.round((realRequiredLeads - requiredLeadsIdeal) * (conversionRate / 100)));
  const lostNetProfitMonthly = Math.round(lostCustomersCount * averageCheck * (netMargin / 100));

  // C. Ombor va Kassa kamomadi / isrofi (Theft & Inventory shrink)
  let inventoryShrinkRate = 0;
  if (formData.accountingSoftware === 'paper') inventoryShrinkRate = 0.045; // 4.5% kamomad
  else if (formData.accountingSoftware === 'excel') inventoryShrinkRate = 0.02; // 2%
  else inventoryShrinkRate = 0.005; // 0.5%
  const inventoryShrinkLossMonthly = Math.round(targetRevenue * inventoryShrinkRate);

  // D. Out-of-Stock (Talab yo'qotilishi) zarari (PRO 4.0)
  let outOfStockRate = 0;
  if (formData.autoOrderingStatus === 'out_of_stock_risk' || formData.abcAnalysisStatus === 'none') {
    outOfStockRate = 0.10; // 10% boy berilgan savdo
  } else if (formData.abcAnalysisStatus === 'approximate') {
    outOfStockRate = 0.05; // 5%
  }
  const outOfStockLossMonthly = Math.round(targetRevenue * outOfStockRate);

  // E. Nasiyadagi xavf ostidagi summa
  let debtRiskPercent = 0;
  if (formData.debtTracking === 'paper') debtRiskPercent = 0.14; // 14%
  else if (formData.debtTracking === 'no_tracking') debtRiskPercent = 0.25;
  else debtRiskPercent = 0.02;
  const estimatedDebtRiskSum = Math.round(targetRevenue * debtRiskPercent);

  // F. Dorixona va Klinika Maxsus Yo'qotishlari (PRO 5.0)
  let pharmacyExpiredLossMonthly = 0;
  let pharmacyBlisterLossMonthly = 0;
  if (industryKey === 'pharmacy') {
    if (formData.pharmacyExpiryTracking === 'manual' || !formData.pharmacyExpiryTracking) {
      pharmacyExpiredLossMonthly = Math.round(inventoryCapital * 0.05 / 12); // yillik 5% srok godnosti spisaniya
    }
    if (formData.pharmacyBlisterSplit === 'manual' || !formData.pharmacyBlisterSplit) {
      pharmacyBlisterLossMonthly = Math.round(targetRevenue * 0.025); // 2.5% peresort/blister kamomadi
    }
  }

  let clinicCashBypassLossMonthly = 0;
  let clinicMaterialLossMonthly = 0;
  if (industryKey === 'clinic_medical') {
    if (formData.clinicCashBypass === 'risk_bypass') {
      clinicCashBypassLossMonthly = Math.round(targetRevenue * 0.22); // 22% kassa chetlab o'tilishi
    }
    if (formData.clinicMaterialSpisanie === 'untracked') {
      clinicMaterialLossMonthly = Math.round(targetRevenue * 0.08); // 8% reaktiv va sarf isrofi
    }
  }

  // G. Anti-Fraud & Kassa O'g'riliklari Zarari (PRO 5.0)
  let fraudVoidLossMonthly = 0;
  let fraudScaleLossMonthly = 0;
  let fraudPriceLossMonthly = 0;
  if (formData.fraudVoidPermission === 'cashier_allowed') {
    fraudVoidLossMonthly = Math.round(targetRevenue * 0.035); // 3.5% soxta vozvrat
  }
  if (formData.fraudScaleIntegration === 'manual_entry') {
    fraudScaleLossMonthly = Math.round(targetRevenue * 0.02); // 2% qo'lda o'zgartirish
  }
  if (formData.fraudPriceEntry === 'cashier_entry') {
    fraudPriceLossMonthly = Math.round(targetRevenue * 0.025); // 2.5% prixod ustama qallobligi
  }
  const fraudTotalMonthlyLoss = fraudVoidLossMonthly + fraudScaleLossMonthly + fraudPriceLossMonthly;

  // H. UMUMIY OYLIK VA YILLIK YO'QOTISH (Grand Total Losses)
  const totalMonthlyLoss = monthlyWastedMarketing + 
    lostNetProfitMonthly + 
    inventoryShrinkLossMonthly + 
    outOfStockLossMonthly + 
    pharmacyExpiredLossMonthly + 
    pharmacyBlisterLossMonthly + 
    clinicCashBypassLossMonthly + 
    clinicMaterialLossMonthly + 
    fraudTotalMonthlyLoss;
  const totalYearlyLoss = totalMonthlyLoss * 12;

  // I. Unit-Productivity: Xodimlar va Maydon (Kv.m) Samaradorligi (PRO 5.0)
  const employeesCount = Math.max(1, Number(formData.employeesCount) || industry.typicalEmployees || 4);
  const businessAreaSqM = Math.max(10, Number(formData.businessAreaSqM) || industry.typicalAreaSqM || 50);
  const revenuePerEmployee = Math.round(targetRevenue / employeesCount);
  const profitPerEmployee = Math.round((targetRevenue * (netMargin / 100)) / employeesCount);
  const revenuePerSqM = Math.round(targetRevenue / businessAreaSqM);
  const benchmarkRevPerEmp = Math.round(targetRevenue / (industry.typicalEmployees || 4));

  let productivityDiagnosis = "Shtat va xodimlar unumdorligi barqaror darajada.";
  let productivityColor = "emerald";
  if (revenuePerEmployee < benchmarkRevPerEmp * 0.75) {
    productivityDiagnosis = `Sizda 1 xodimga $${revenuePerEmployee.toLocaleString()} savdo to'g'ri kelmoqda (Soha normasi: ~$${benchmarkRevPerEmp.toLocaleString()}). Shtat shishirilgan yoki xodimlar motivatsiya/KPI tizimi ishlamayapti.`;
    productivityColor = "amber";
  } else if (revenuePerEmployee > benchmarkRevPerEmp * 1.3) {
    productivityDiagnosis = `1 xodimga $${revenuePerEmployee.toLocaleString()} yuqori savdo to'g'ri kelmoqda. Jamoangiz zo'riqishda ishlamoqda, xodimlar yetishmasligi sababli mijozlar boy berilishi xavfi bor.`;
    productivityColor = "blue";
  }

  // J. Krizis Stress-Testi va Maksimal Chegirma Chegarasi (PRO 5.0)
  const crisisDropRevenue = Math.round(targetRevenue * 0.70); // -30% savdo tushsa
  const crisisGrossProfit = Math.round(crisisDropRevenue * (netMargin / 100));
  const crisisNetProfit = Math.round(crisisGrossProfit - fixedCosts);
  const isCrisisDeficit = crisisNetProfit < 0;
  const fixedCostRatioPercent = Number(((fixedCosts / targetRevenue) * 100).toFixed(1));
  const maxAllowedDiscountPercent = Math.max(0, Number((netMargin - fixedCostRatioPercent).toFixed(1)));

  // K. Pul Aylanish Sikli (CCC - Cash Conversion Cycle) (PRO 5.0)
  const dioDays = industry.dio || 30; // Ombor aylanishi
  const dsoDays = industry.dso || 15; // Nasiya qaytishi
  const dpoDays = industry.dpo || 20; // Ta'minotchi to'lov muddati
  const cccTotalDays = Math.max(1, dioDays + dsoDays - dpoDays);
  // 15 kunga tezlashtirilsa erkin bo'shaydigan aylanma naqd pul
  const cashFreedUp15Days = Math.round((targetRevenue / 30) * 15 * (1 - (netMargin / 100)));

  // L. LTV va Bonus Tizimi Potensiali (Reklamasiz qo'shimcha tushum)
  let ltvGainPercent = formData.loyaltySystem === 'automated' ? 0 : 0.25;
  const potentialLtvMonthlyRevenue = Math.round(requiredCustomers * averageCheck * ltvGainPercent);
  const potentialLtvMonthlyProfit = Math.round(potentialLtvMonthlyRevenue * (netMargin / 100));
  const potentialLtvYearlyProfit = potentialLtvMonthlyProfit * 12;

  // M. Muzlagan Kapital (Dead Stock / Nelikvid tovar)
  let deadStockRatio = 0.05;
  if (formData.inventoryStatus === 'dead_stock') deadStockRatio = 0.25;
  else if (formData.inventoryStatus === 'estimated') deadStockRatio = 0.16;
  else if (formData.accountingSoftware === 'paper' || formData.abcAnalysisStatus === 'none') deadStockRatio = 0.22;
  const deadStockSum = Math.round(inventoryCapital * deadStockRatio);

  // N. ABC-Tahlil Ombordagi Taqsimot (Pareto 80/20 Matritsasi) (PRO 4.0)
  const groupA_Stock = Math.round(inventoryCapital * 0.20); // 20% tovar = 80% savdo
  const groupB_Stock = Math.round(inventoryCapital * 0.30); // 30% tovar = 15% savdo
  const groupC_Stock = Math.round(inventoryCapital * 0.50); // 50% tovar = 5% savdo
  const deadStockCGroup = Math.round(inventoryCapital * 0.22); // C-guruhdagi o'lik kapital

  // O. P&L vs Cash Flow xavfi: Qog'ozdagi soxta foyda (PRO 4.0)
  const expectedMonthlyNetProfit = Math.round(targetRevenue * (netMargin / 100));
  const paperProfitTrapped = formData.financialReportsStatus !== 'full_reports' 
    ? Math.round(expectedMonthlyNetProfit * 0.42) 
    : 0;

  // P. AI va Strategik Vaqt Zaxirasi (PRO 4.0)
  const aiMonthlySavedHours = formData.aiUsageStatus !== 'integrated' ? 35 : 5;
  const aiDecisionLossMonthly = formData.aiUsageStatus !== 'integrated' ? Math.round(targetRevenue * 0.07) : 0;

  // Q. Ish haqi fondi (FOT) samaradorligi (Norma: 8-15%)
  const estimatedFot = Math.max(Math.round(employeesCount * 280), Math.round(fixedCosts * 0.60));
  const fotRatioPercent = Number(((estimatedFot / targetRevenue) * 100).toFixed(1));
  const isFotHigh = fotRatioPercent > 18;
  const fotDiagnosis = isFotHigh 
    ? `⚠️ Shtat xarajatingiz me'yordan oshib ketgan (${fotRatioPercent}%). Fiks oylikni kamaytirib, KPI va sotuv foiziga o'ting.`
    : `Shtat fondi me'yorda (${fotRatioPercent}%).`;

  // R. Kredit / Investitsiya Xavfsizlik Filtri
  const isCreditDangerous = Boolean(netMargin < 18 || deadStockSum > (targetRevenue * 0.30));
  const creditWarningMessage = isCreditDangerous 
    ? "⚠️ Hozirgi holatda bank krediti yoki qarz olish xavfli! Avval ombordagi muzlagan tovarlarni soting."
    : null;

  // S. Zararsizlik Nuqtasi (Break-Even Point)
  const breakEvenRevenue = Math.round(fixedCosts / (netMargin / 100));
  const breakEvenDay = Math.min(30, Math.max(1, Math.round((breakEvenRevenue / targetRevenue) * 30)));

  // M. Tadbirkorning Vaqt Qiymati (Operatsionka zarari)
  const hourlyRate = Math.max(5, Math.round((targetRevenue * (netMargin / 100)) / 200));
  const dailyOpHours = formData.dailyOperationalHours === 'high' ? 5 : formData.dailyOperationalHours === 'medium' ? 3 : 1;
  const yearlyOpHours = dailyOpHours * 300;
  const yearlyTimeCost = yearlyOpHours * hourlyRate;

  // N. Avtomatlashtirish ROI va O'zini Oqlash Muddati (Payback Period)
  const automationCost = industry.autoInvestCost || 950;
  const paybackMonths = totalMonthlyLoss > 0 ? Math.max(0.6, Number((automationCost / totalMonthlyLoss).toFixed(1))) : 1.2;

  // O. Soliq va Qonunchilik Xavfi Statusi
  let fiscalRiskStatus = "Barqaror (Yashil)";
  let fiscalRiskColor = "emerald";
  if (formData.fiscalMarking === 'unorganized') {
    fiscalRiskStatus = "Kritik (Jarima xavfi yuqori)";
    fiscalRiskColor = "red";
  } else if (formData.fiscalMarking === 'partial') {
    fiscalRiskStatus = "O'rtacha (Qisman qo'lda)";
    fiscalRiskColor = "amber";
  }

  // 5. Biznes salomatlik indeksi (0 - 100) va Boshqaruv Intellekti (BI Score)
  let marketingScore = 100;
  let salesScore = 100;
  let systemScore = 100;
  let biScore = 100; // PRO 4.0 Boshqaruv & AI Intellekti

  if (formData.socialStatus === 'bad') marketingScore -= 30;
  else if (formData.socialStatus === 'medium') marketingScore -= 15;

  if (formData.salesTeam === 'owner_only') salesScore -= 30;
  if (formData.responseTime === 'slow') salesScore -= 20;
  else if (formData.responseTime === 'very_slow') salesScore -= 35;
  if (formData.loyaltySystem === 'none') salesScore -= 20;

  if (formData.accountingSoftware === 'paper') systemScore -= 35;
  else if (formData.accountingSoftware === 'excel') systemScore -= 15;
  if (formData.debtTracking === 'paper') systemScore -= 20;
  else if (formData.debtTracking === 'no_tracking') systemScore -= 35;
  if (formData.fiscalMarking === 'unorganized') systemScore -= 25;
  if (formData.hasCrm === 'no') systemScore -= 20;

  // BI & AI Score (PRO 4.0)
  if (formData.abcAnalysisStatus === 'none') biScore -= 25;
  else if (formData.abcAnalysisStatus === 'approximate') biScore -= 12;

  if (formData.financialReportsStatus === 'blind') biScore -= 30;
  else if (formData.financialReportsStatus === 'cash_only') biScore -= 15;

  if (formData.aiUsageStatus === 'none') biScore -= 25;
  else if (formData.aiUsageStatus === 'basic_chat') biScore -= 12;

  if (formData.autoOrderingStatus === 'out_of_stock_risk') biScore -= 15;
  if (formData.unitEconomicsStatus === 'markup_only') biScore -= 10;

  marketingScore = Math.max(15, marketingScore);
  salesScore = Math.max(15, salesScore);
  systemScore = Math.max(15, systemScore);
  biScore = Math.max(15, Math.min(100, biScore));

  const overallScore = Math.round((marketingScore * 0.20) + (salesScore * 0.25) + (systemScore * 0.30) + (biScore * 0.25));

  let riskLevel = 'Past (Barqaror)';
  let riskColor = 'emerald';
  if (overallScore < 45) {
    riskLevel = 'Kritik (Yuqori yo\'qotishlar)';
    riskColor = 'red';
  } else if (overallScore < 70) {
    riskLevel = 'O\'rtacha (Xavfli zonada)';
    riskColor = 'amber';
  }

  // 6. Dasturiy Tavsiyalar
  const softwareRecommendations = [
    {
      name: "POS Savdo va Kassa Dasturlari",
      category: "POS Tizimi",
      reason: "Kassa, 2D shtrix-kod skaneri va chek printeri bilan ishlash, tovar qoldiqlarini real vaqtda ko'rish va Asl Belgisi markirovkasini to'g'ri chiqarish.",
      impact: "Do'kondagi tovar kamomadi va o'g'irliklarni 95% gacha to'xtatadi."
    },
    {
      name: "1C: Korxona Tizimlari",
      category: "Boshqaruv & Buxgalteriya",
      reason: "Ombor hisobi, tovarlar tannarxi, ta'minotchilar bilan hisob-kitob va korxona sof foydasini 100% aniqlikda chiqarish.",
      impact: "Mablag'lar aylanmasini to'liq shaffof qiladi va biznes egasini erkinlashtiradi."
    },
    {
      name: "Qarzlar va Nasiya Nazorati Tizimi",
      category: "Nasiya Moduli",
      reason: "Mijozlar qarzlarini daftardan chiqarib, limit belgilash va to'lov muddati kelganda avtomatik SMS/Telegram eslatish.",
      impact: "Qarzlarning o'z vaqtida qaytishini 60% ga tezlashtiradi va 'muzlagan' pullarni chiqaradi."
    },
    {
      name: "Mijozlar Loyallik va Keshbek Tizimi",
      category: "Bonus & LTV",
      reason: "Har bir xariddan avtomatik 3-5% keshbek hisoblash va mijozlarni Telegram orqali doimiy qayta sotuvga chaqirish.",
      impact: "Reklama xarajatlarisiz qo'shimcha 25% gacha takroriy xaridlar oqimini yaratadi."
    },
    {
      name: "AI-Direktor & Telegram Analitika Boti (1C / POS ga ulangan)",
      category: "Sun'iy Intellekt (AI)",
      reason: "Har kuni soat 21:00 da kunlik savdo, sof foyda, kassa anomaliyalari (otmena/skidka), tugab qolayotgan A-toifa tovarlar va muzlagan kapitalni Telegramingizga yuboradi.",
      impact: "Rahbarga qimmat tahlilchi xodimsiz har kuni 1C bazani to'liq tushuntirib, 35+ soat shaxsiy vaqtini tejaydi."
    },
    {
      name: "Avtomatik ABC/XYZ Matritsa & Ta'minotchi Prognozi",
      category: "Ombor Intellekti",
      reason: "Savdoning 80% ini qiluvchi 'Oltin Lokomotivlar' (A-guruh) tugab qolishining oldini oladi va 'Pul yutkich' C-tovarlarga ortiqcha pul tikishni to'xtatadi.",
      impact: "Out-of-Stock tufayli har oy yo'qotilayotgan 8-12% aylanmani saqlab qoladi va muzlagan kapitalni naqdga chiqaradi."
    }
  ];

  // 7. 30 kunlik Yo'l Xaritasi
  const roadmap = [
    {
      period: "1-7 kun (Tezkor tartibga solish)",
      steps: [
        formData.accountingSoftware === 'paper' ? "Daftardagi tovar qoldiqlarini hisoblab, zudlik bilan avtomatlashgan POS savdo dasturi yoki 1C: Korxona tizimiga o'tishni boshlash." : "Kassa va tushumlar hisobini kunlik tekshirishni yo'lga qo'yish.",
        formData.debtTracking === 'paper' ? "Barcha qarz daftarlarini to'liq inventarizatsiya qilish va muddati o'tgan mijozlar ro'yxatini shakllantirish." : "Nasiya berish chegarasi (limiti)ni belgilash.",
        "Ombordagi eng ko'p sotiladigan Top-20 lokomotiv tovarlarni ajratib, tugab qolishiga yo'l qo'ymaslik."
      ]
    },
    {
      period: "8-20 kun (Tizim va Dasturiy ta'minot)",
      steps: [
        "POS savdo dasturi yoki 1C tizimini o'rnatib, xodimlarni 2D shtrix-kod va to'g'ri kassa yuritishga o'rgatish.",
        formData.hasCrm === 'no' ? "CRM tizimi orqali Instagram va Telegram lidlarini avtomatlashtirish." : "CRM voronkasidagi to'xtab qolgan lidlar bilan ishlash.",
        "1C / POS bazaga avtomatik kechki Telegram hisobot botini ulash."
      ]
    },
    {
      period: "21-30 kun (Masshtablash va Moliyaviy o'sish)",
      steps: [
        `Oylik $${targetRevenue.toLocaleString()} daromad maqsadi uchun barqaror kunlik ${Math.ceil(realRequiredLeads / 30)} ta lid oqimini ta'minlash.`,
        "Ombordagi ABC-tahlil orqali eng ko'p foyda keltirayotgan tovarlar zaxirasini mustahkamlash va muzlagan tovarlarni naqd pulga aylantirish.",
        "Buxgaltersiz har oy avtomatik P&L (Foyda va Zarar) va Balans hisobotini tahlil qilib borish."
      ]
    }
  ];

  return {
    targetRevenue,
    averageCheck,
    conversionRate,
    netMargin,
    fixedCosts,
    inventoryCapital,
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
    // Yangi PRO 3.0 & PRO 4.0 Moliyaviy ko'rsatkichlar:
    monthlyWastedMarketing,
    lostCustomersCount,
    lostNetProfitMonthly,
    inventoryShrinkLossMonthly,
    outOfStockLossMonthly,
    paperProfitTrapped,
    aiMonthlySavedHours,
    aiDecisionLossMonthly,
    groupA_Stock,
    groupB_Stock,
    groupC_Stock,
    deadStockCGroup,
    totalMonthlyLoss,
    totalYearlyLoss,
    monthlyWastedMoney: totalMonthlyLoss, // mavjud prop bilan moslik
    yearlyWastedMoney: totalYearlyLoss,
    estimatedDebtRiskSum,
    deadStockSum,
    breakEvenRevenue,
    breakEvenDay,
    potentialLtvMonthlyRevenue,
    potentialLtvMonthlyProfit,
    potentialLtvYearlyProfit,
    hourlyRate,
    dailyOpHours,
    yearlyOpHours,
    yearlyTimeCost,
    automationCost,
    paybackMonths,
    fiscalRiskStatus,
    fiscalRiskColor,
    expectedGrossProfit: targetRevenue * (netMargin / 100),
    // PRO 5.0 Yangi Rentgen & Anti-Fraud maydonlari:
    pharmacyExpiredLossMonthly,
    pharmacyBlisterLossMonthly,
    clinicCashBypassLossMonthly,
    clinicMaterialLossMonthly,
    fraudVoidLossMonthly,
    fraudScaleLossMonthly,
    fraudPriceLossMonthly,
    fraudTotalMonthlyLoss,
    employeesCount,
    businessAreaSqM,
    revenuePerEmployee,
    profitPerEmployee,
    revenuePerSqM,
    benchmarkRevPerEmp,
    productivityDiagnosis,
    productivityColor,
    crisisDropRevenue,
    crisisGrossProfit,
    crisisNetProfit,
    isCrisisDeficit,
    fixedCostRatioPercent,
    maxAllowedDiscountPercent,
    dioDays,
    dsoDays,
    dpoDays,
    cccTotalDays,
    cashFreedUp15Days,
    // Yangi optimallashtirilgan ko'rsatkichlar:
    isSarafanOnly,
    estimatedFot,
    fotRatioPercent,
    isFotHigh,
    fotDiagnosis,
    isCreditDangerous,
    creditWarningMessage,
    cappedPenaltyPercentage,
    scores: {
      overall: overallScore,
      marketing: marketingScore,
      sales: salesScore,
      system: systemScore,
      bi: biScore
    },
    riskLevel,
    riskColor,
    softwareRecommendations,
    roadmap
  };
}
