/**
 * BiznesTahlili.uz PRO 5.0 — Wizard Bosqichlari Uchun Qat'iy Validatsiya Tizimi
 */

export function validateStep(step, formData = {}) {
  const errors = [];
  let message = '';

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

  else if (step === 2) {
    if (!formData.accountingSoftware) errors.push('accountingSoftware');
    if (!formData.debtTracking) errors.push('debtTracking');
    if (!formData.inventoryStatus) errors.push('inventoryStatus');
    if (!formData.fiscalMarking) errors.push('fiscalMarking');
    if (!formData.dailyOperationalHours) errors.push('dailyOperationalHours');
    if (!formData.abcAnalysisStatus) errors.push('abcAnalysisStatus');
    if (!formData.autoOrderingStatus) errors.push('autoOrderingStatus');
    if (!formData.aiUsageStatus) errors.push('aiUsageStatus');

    // Sohaviy maxsus savollar
    if (formData.industry === 'pharmacy') {
      if (!formData.pharmacyExpiryTracking) errors.push('pharmacyExpiryTracking');
      if (!formData.pharmacyBlisterSplit) errors.push('pharmacyBlisterSplit');
    }
    if (formData.industry === 'clinic_medical') {
      if (!formData.clinicCashBypass) errors.push('clinicCashBypass');
      if (!formData.clinicMaterialSpisanie) errors.push('clinicMaterialSpisanie');
    }

    // Anti-Fraud savollari
    if (!formData.fraudVoidPermission) errors.push('fraudVoidPermission');
    if (!formData.fraudScaleIntegration) errors.push('fraudScaleIntegration');
    if (!formData.fraudPriceEntry) errors.push('fraudPriceEntry');

    if (errors.length > 0) {
      message = "⚠️ Davom etish uchun 2-bosqichdagi barcha savollarga javob variantini tanlang!";
    }
  }

  else if (step === 3) {
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

  else if (step === 4) {
    if (!formData.hasCrm) errors.push('hasCrm');
    if (!formData.salesTeam) errors.push('salesTeam');
    if (!formData.responseTime) errors.push('responseTime');
    if (!formData.loyaltySystem) errors.push('loyaltySystem');

    if (errors.length > 0) {
      message = "⚠️ CRM, sotuv bo'limi, tezlik va loyallik savollarining barchasiga javob bering!";
    }
  }

  else if (step === 5) {
    const rev = Number(formData.targetRevenue);
    if (!formData.targetRevenue || isNaN(rev) || rev <= 0) {
      errors.push('targetRevenue');
    }

    const check = Number(formData.averageCheck);
    if (!formData.averageCheck || isNaN(check) || check <= 0) {
      errors.push('averageCheck');
    }

    const conv = Number(formData.conversionRate);
    if (!formData.conversionRate || isNaN(conv) || conv < 1 || conv > 100) {
      errors.push('conversionRate');
    }

    const margin = Number(formData.netMargin);
    if (!formData.netMargin || isNaN(margin) || margin < 1 || margin > 100) {
      errors.push('netMargin');
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

    if (errors.length > 0) {
      message = "⚠️ Barcha moliyaviy maydonlarni to'g'ri va noldan katta musbat sonlar bilan to'ldiring!";
    }
  }

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

