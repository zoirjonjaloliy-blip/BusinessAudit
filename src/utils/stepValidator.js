/**
 * BiznesTahlili.uz PRO 5.0 — Wizard Bosqichlari Uchun Qat'iy & Aqlli Validatsiya Tizimi
 * 
 * QOIDALAR:
 * 1. "Tezkor rejim" (fast) yoki sohaviy filtr tufayli EKRANDA KO'RINMAYDIGAN
 *    savollar HECH QACHON xatolik ro'yxatiga qo'shilmaydi!
 * 2. Foydalanuvchi faqat o'ziga ko'rinib turgan maydonlar bo'yicha tekshiriladi.
 */

export function validateStep(step, formData = {}, options = {}) {
  const errors = [];
  let message = '';
  const auditMode = formData.auditMode || options.auditMode || 'deep';
  const industry = formData.industry || options.industry || '';

  // 1-BOSQICH: Soha va Lavozim
  if (step === 1) {
    if (!formData.isOwner) {
      errors.push('isOwner');
    }
    if (!formData.industry) {
      errors.push('industry');
    }
    if (errors.length > 0) {
      message = "⚠️ Davom etish uchun korxonadagi rolingiz va biznes sohasini tanlang!";
    }
  }

  // 2-BOSQICH: Dastur & Sohaviy Operatsionka
  else if (step === 2) {
    // 1-Umumiy savol: Kassa va hisob tizimi
    if (!formData.accountingSoftware) {
      errors.push('accountingSoftware');
    }

    // TEZKOR REJIM (Fast Mode - Faqat 3 ta asosiy savol)
    if (auditMode === 'fast') {
      // 2-Asosiy sohaviy savol
      if (industry === 'manufacturing') {
        if (!formData.productionWastage) errors.push('productionWastage');
      } else if (industry === 'education_courses') {
        if (!formData.educationAttendance) errors.push('educationAttendance');
      } else if (industry === 'services_general') {
        if (!formData.servicesSpecialistSchedule) errors.push('servicesSpecialistSchedule');
      } else if (industry === 'horeca_cafe') {
        if (!formData.horecaKitchenFoodCost) errors.push('horecaKitchenFoodCost');
      } else if (industry === 'pharmacy') {
        if (!formData.pharmacyExpiryTracking) errors.push('pharmacyExpiryTracking');
      } else if (industry === 'clinic_medical') {
        if (!formData.clinicCashBypass) errors.push('clinicCashBypass');
      } else {
        if (!formData.inventoryStatus) errors.push('inventoryStatus');
      }

      // 3-savol: Qarzlar/Nasiya (yoki ta'lim/xizmatda bandlik)
      if (['education_courses', 'services_general'].includes(industry)) {
        if (!formData.capacityUtilization) errors.push('capacityUtilization');
      } else {
        if (!formData.debtTracking) errors.push('debtTracking');
      }

      if (errors.length > 0) {
        message = "⚠️ Tezkor audit uchun 3 ta asosiy savolga javob tanlang!";
      }
    }

    // CHUQUR REJIM (Deep 360° Mode - Sohaviy filtrlangan to'liq savollar)
    else {
      // Nasiya va qarzlar
      if (!formData.debtTracking) errors.push('debtTracking');

      // Ombor yoki Bandlik savoli:
      // O'quv markazi, Klinika va Xizmatlarda ombor so'ralmaydi, uning o'rniga bandlik/sig'im so'raladi
      const isServiceOrEducation = ['education_courses', 'clinic_medical', 'services_general'].includes(industry);
      if (isServiceOrEducation) {
        if (!formData.capacityUtilization) errors.push('capacityUtilization');
      } else {
        if (!formData.inventoryStatus) errors.push('inventoryStatus');
        if (!formData.abcAnalysisStatus) errors.push('abcAnalysisStatus');
        if (!formData.autoOrderingStatus) errors.push('autoOrderingStatus');
      }

      // Raqamli Markirovka (Asl Belgisi) — FAQAT Oziq-ovqat va Dorixonada ko'rinadi!
      const isMarkingRequired = ['retail_food', 'pharmacy'].includes(industry);
      if (isMarkingRequired) {
        if (!formData.fiscalMarking) errors.push('fiscalMarking');
      }

      // Operatsion soatlar va AI
      if (!formData.dailyOperationalHours) errors.push('dailyOperationalHours');
      if (!formData.aiUsageStatus) errors.push('aiUsageStatus');

      // Maxsus sohaviy savollar:
      if (industry === 'manufacturing') {
        if (!formData.productionWastage) errors.push('productionWastage');
        if (!formData.productionCostCalculation) errors.push('productionCostCalculation');
        if (!formData.productionB2bOrders) errors.push('productionB2bOrders');
      } else if (industry === 'education_courses') {
        if (!formData.educationAttendance) errors.push('educationAttendance');
        if (!formData.educationChurn) errors.push('educationChurn');
      } else if (industry === 'services_general') {
        if (!formData.servicesSpecialistSchedule) errors.push('servicesSpecialistSchedule');
        if (!formData.servicesMaterialUsage) errors.push('servicesMaterialUsage');
      } else if (industry === 'horeca_cafe') {
        if (!formData.horecaKitchenFoodCost) errors.push('horecaKitchenFoodCost');
        if (!formData.horecaOrderVoidControl) errors.push('horecaOrderVoidControl');
      } else if (industry === 'pharmacy') {
        if (!formData.pharmacyExpiryTracking) errors.push('pharmacyExpiryTracking');
        if (!formData.pharmacyBlisterSplit) errors.push('pharmacyBlisterSplit');
      } else if (industry === 'clinic_medical') {
        if (!formData.clinicCashBypass) errors.push('clinicCashBypass');
        if (!formData.clinicMaterialSpisanie) errors.push('clinicMaterialSpisanie');
      }

      // Anti-Fraud faqat savdo sohalarida (retail_food, retail_general, wholesale_b2b, pharmacy)
      const isTradeIndustry = ['retail_food', 'retail_general', 'wholesale_b2b', 'pharmacy'].includes(industry);
      if (isTradeIndustry) {
        if (!formData.fraudVoidPermission) errors.push('fraudVoidPermission');
        if (!formData.fraudScaleIntegration) errors.push('fraudScaleIntegration');
        if (!formData.fraudPriceEntry) errors.push('fraudPriceEntry');
      }

      if (errors.length > 0) {
        message = "⚠️ Davom etish uchun sohangizga oid barcha savollarga javob bering!";
      }
    }
  }

  // 3-BOSQICH: Marketing & Trafik (Tezkor rejimda o'tkazib yuboriladi)
  else if (step === 3) {
    if (auditMode !== 'fast') {
      const platforms = Array.isArray(formData.platforms)
        ? formData.platforms
        : (formData.platform ? [formData.platform] : []);

      if (platforms.length === 0) errors.push('platforms');
      if (!formData.socialStatus) errors.push('socialStatus');
      if (!formData.leadChannel) errors.push('leadChannel');

      if (errors.length > 0) {
        message = "⚠️ Reklama kanali, upakovka holati va qabul qilish kanalini tanlang!";
      }
    }
  }

  // 4-BOSQICH: Sotuv tizimi va Voronka (Tezkor rejimda o'tkazib yuboriladi)
  else if (step === 4) {
    if (auditMode !== 'fast') {
      if (!formData.hasCrm) errors.push('hasCrm');
      if (!formData.salesTeam) errors.push('salesTeam');
      if (!formData.responseTime) errors.push('responseTime');
      if (!formData.loyaltySystem) errors.push('loyaltySystem');

      if (errors.length > 0) {
        message = "⚠️ CRM, sotuv bo'limi, tezlik va loyallik savollarining barchasiga javob bering!";
      }
    }
  }

  // 5-BOSQICH: Moliyaviy reja & Ko'rsatkichlar
  else if (step === 5) {
    const rev = Number(formData.targetRevenue);
    if (!formData.targetRevenue || isNaN(rev) || rev <= 0) {
      errors.push('targetRevenue');
    }

    const check = Number(formData.averageCheck);
    if (!formData.averageCheck || isNaN(check) || check <= 0) {
      errors.push('averageCheck');
    }

    const margin = Number(formData.netMargin);
    if (!formData.netMargin || isNaN(margin) || margin < 1 || margin > 100) {
      errors.push('netMargin');
    }

    // Faqat Chuqur rejimda qo'shimcha maydonlar talab etiladi:
    if (auditMode !== 'fast') {
      const conv = Number(formData.conversionRate);
      if (!formData.conversionRate || isNaN(conv) || conv < 1 || conv > 100) {
        errors.push('conversionRate');
      }

      const fixed = Number(formData.fixedCosts);
      if (formData.fixedCosts === '' || formData.fixedCosts === undefined || isNaN(fixed) || fixed < 0) {
        errors.push('fixedCosts');
      }

      const emp = Number(formData.employeesCount);
      if (formData.employeesCount === '' || formData.employeesCount === undefined || isNaN(emp) || emp < 1) {
        errors.push('employeesCount');
      }

      if (!formData.financialReportsStatus) errors.push('financialReportsStatus');
      if (!formData.unitEconomicsStatus) errors.push('unitEconomicsStatus');
    }

    if (errors.length > 0) {
      message = auditMode === 'fast'
        ? "⚠️ Oylik maqsad, o'rtacha chek va marja foizini kiriting!"
        : "⚠️ Barcha moliyaviy maydonlarni to'g'ri va noldan katta musbat sonlar bilan to'ldiring!";
    }
  }

  // 6-BOSQICH: Kontakt va Natijani ochish
  else if (step === 6) {
    const name = formData.fullName?.trim() || '';
    if (name.length < 3) errors.push('fullName');

    const biz = formData.businessName?.trim() || '';
    if (biz.length < 2) errors.push('businessName');

    const digits = String(formData.phone || '').replace(/\D/g, '');
    const cleanDigits = digits.startsWith('998') ? digits.slice(3) : digits;
    if (cleanDigits.length !== 9) errors.push('phone');

    if (errors.length > 0) {
      message = "⚠️ Ism (kamida 3 harf), Biznes nomi (kamida 2 harf) va to'liq 9 ta raqamli telefon raqamini kiriting!";
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    message
  };
}
