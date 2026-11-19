import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeDisclaimerModal } from './components/WelcomeDisclaimerModal';
import { StepBusinessProfile } from './components/StepBusinessProfile';
import { StepAutomationSoftware } from './components/StepAutomationSoftware';
import { StepMarketingTraffic } from './components/StepMarketingTraffic';
import { StepSalesSystem } from './components/StepSalesSystem';
import { StepFinancialGoals } from './components/StepFinancialGoals';
import { StepAuditUnlock } from './components/StepAuditUnlock';
import { AuditReport } from './components/AuditReport';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { calculateBusinessAudit } from './utils/auditCalculator';
import { sendLeadToTelegram } from './utils/telegramNotifier';
import { validateStep } from './utils/stepValidator';
import { translate } from './utils/transliterate';

export const BLANK_FORM_DATA = {
  fullName: '',
  businessName: '',
  phone: '',
  city: '',
  isOwner: '',
  industry: '',
  auditMode: 'deep', // 'deep' (6 bosqich) | 'fast' (4 bosqich)
  accountingSoftware: '',
  debtTracking: '',
  inventoryStatus: '',
  capacityUtilization: '',
  fiscalMarking: '',
  dailyOperationalHours: '',
  // PRO 4.0 Yangi Boshqaruv, Moliyaviy Balans & AI maydonlari:
  abcAnalysisStatus: '',
  autoOrderingStatus: '',
  aiUsageStatus: '',
  financialReportsStatus: '',
  unitEconomicsStatus: '',
  // PRO 5.0 Dorixona, Klinika, Ishlab chiqarish, Xizmatlar & Anti-Fraud:
  productionWastage: '',
  productionCostCalculation: '',
  productionB2bOrders: '',
  educationAttendance: '',
  educationChurn: '',
  servicesSpecialistSchedule: '',
  servicesMaterialUsage: '',
  horecaKitchenFoodCost: '',
  horecaOrderVoidControl: '',
  pharmacyExpiryTracking: '',
  pharmacyBlisterSplit: '',
  pharmacyDataMatrix: '',
  pharmacyCrossSell: '',
  clinicDoctorKpi: '',
  clinicMaterialSpisanie: '',
  clinicEmrRecall: '',
  clinicCashBypass: '',
  fraudVoidPermission: '',
  fraudScaleIntegration: '',
  fraudPriceEntry: '',
  employeesCount: '',
  businessAreaSqM: '',
  platforms: [],
  platform: '',
  socialStatus: '',
  leadChannel: '',
  hasCrm: '',
  salesTeam: '',
  responseTime: '',
  retention: '',
  loyaltySystem: '',
  targetRevenue: '',
  averageCheck: '',
  conversionRate: '',
  netMargin: '',
  fixedCosts: '',
  inventoryCapital: ''
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('biznestahlili_theme') || localStorage.getItem('biznesaudit_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Lotin / Kirill tili holati (O'z | Ўз)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('biznestahlili_lang') || 'uz';
    } catch (e) {
      return 'uz';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('biznestahlili_lang', lang);
    } catch (e) {}
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'uz' ? 'cyrl' : 'uz'));
  };

  const t = (text) => {
    if (typeof text !== 'string') return text;
    return translate(text, lang);
  };

  // Rejimni (Kungi / Tungi) qo'llash va saqlash
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('biznestahlili_theme', theme);
      localStorage.setItem('biznesaudit_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('biz_audit_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return BLANK_FORM_DATA;
  });

  const [submittedLeadData, setSubmittedLeadData] = useState(null);

  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('biz_audit_leads');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Qat'iy Validatsiya holatlari
  const [stepErrors, setStepErrors] = useState([]);
  const [validationAlertMessage, setValidationAlertMessage] = useState('');

  // 1-QADAM: Welcome Disclaimer holati
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  // 3-QADAM: Avvalgi audit natijasi bilan solishtirish
  const [previousAudit, setPreviousAudit] = useState(() => {
    try {
      const saved = localStorage.getItem('biznestahlili_last_audit');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Dinamik bosqichlar ketma-ketligi:
  // Tezkor rejim: 1 -> 2 -> 5 -> 6 (4 bosqich)
  // Chuqur rejim: 1 -> 2 -> 3 -> 4 -> 5 -> 6 (6 bosqich)
  const stepSequence = formData.auditMode === 'fast' ? [1, 2, 5, 6] : [1, 2, 3, 4, 5, 6];
  const currentStepIndex = Math.max(1, stepSequence.indexOf(currentStep) + 1);
  const totalStepsCount = stepSequence.length;

  // Saqlash faqat to'ldirish paytida (agar audit topshirilmagan bo'lsa)
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem('biz_audit_data', JSON.stringify(formData));
      } catch (e) {}
    }
  }, [formData, isSubmitted]);

  // Lidlar tarixini saqlash
  useEffect(() => {
    try {
      localStorage.setItem('biz_audit_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    const updatedKeys = Object.keys(fields);
    setStepErrors((prev) => prev.filter((field) => !updatedKeys.includes(field)));
    setValidationAlertMessage('');
  };

  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setStepErrors(validation.errors);
      setValidationAlertMessage(validation.message || "⚠️ Davom etish uchun barcha savollarga javob tanlang va kerakli maydonlarni to'ldiring!");
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[data-error="true"], .border-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return;
    }

    setStepErrors([]);
    setValidationAlertMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentIdx = stepSequence.indexOf(currentStep);
    if (currentIdx !== -1 && currentIdx < stepSequence.length - 1) {
      setCurrentStep(stepSequence[currentIdx + 1]);
    }
  };

  const handlePrev = () => {
    setStepErrors([]);
    setValidationAlertMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const currentIdx = stepSequence.indexOf(currentStep);
    if (currentIdx > 0) {
      setCurrentStep(stepSequence[currentIdx - 1]);
    } else {
      setCurrentStep(1);
    }
  };

  // VIP Qulfni ochish (Ism, biznes va telefon kiritilganda)
  const handleUnlockSubmit = () => {
    const validation = validateStep(6, formData);
    if (!validation.isValid) {
      setStepErrors(validation.errors);
      setValidationAlertMessage(validation.message || "⚠️ Ism, Biznes nomi va 9 ta raqamli telefoningizni to'liq kiriting!");
      return;
    }

    setStepErrors([]);
    setValidationAlertMessage('');

    // Tezkor auditda o'tkazib yuborilgan maydonlarga xavfsiz standart qiymatlar berish
    const preparedData = { ...formData };
    if (formData.auditMode === 'fast') {
      if (!preparedData.conversionRate) preparedData.conversionRate = 15;
      if (!preparedData.fixedCosts) preparedData.fixedCosts = Math.round(Number(preparedData.targetRevenue || 10000) * 0.2);
      if (!preparedData.employeesCount) preparedData.employeesCount = 3;
      if (!preparedData.financialReportsStatus) preparedData.financialReportsStatus = 'cash_only';
      if (!preparedData.unitEconomicsStatus) preparedData.unitEconomicsStatus = 'markup_only';
    }

    const result = calculateBusinessAudit(preparedData);
    const leadSnapshot = { ...preparedData };
    
    setSubmittedLeadData(leadSnapshot);
    setAuditResult(result);
    setIsSubmitted(true);
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Yangi lid obyektini shakllantirish
    const newLead = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('uz-UZ'),
      ...leadSnapshot,
      ...result
    };

    // 1. BDM (BIZNES DASTURLASH MARKAZI) Telegram botiga yuborish
    sendLeadToTelegram(newLead);

    // 2. Mahalliy bazaga ham saqlash
    setLeads((prev) => [newLead, ...prev]);

    // 3. Avvalgi audit solishtiruvi uchun saqlash
    try {
      const prev = localStorage.getItem('biznestahlili_last_audit');
      if (prev) {
        setPreviousAudit(JSON.parse(prev));
      }
      localStorage.setItem('biznestahlili_last_audit', JSON.stringify({
        score: result.scores?.overall || 50,
        date: new Date().toLocaleDateString('uz-UZ'),
        businessName: leadSnapshot.businessName || 'Biznesingiz',
        totalMonthlyLoss: result.totalMonthlyLoss || 0
      }));
    } catch (e) {}

    // 4. Formani tozalash
    try {
      localStorage.removeItem('biz_audit_data');
    } catch (e) {}
    setFormData(BLANK_FORM_DATA);

    // Dinamik konfetti animatsiyasi
    import('canvas-confetti')
      .then((module) => {
        const confetti = module.default || module;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      })
      .catch(() => {});
  };

  const handleDeleteLead = (id) => {
    setLeads((prev) => prev.filter((item, idx) => (item.id ? item.id !== id : idx !== id)));
  };

  const handleClearAllLeads = () => {
    if (window.confirm("Haqiqatan ham barcha saqlangan mijozlar tarixini tozalaysizmi?")) {
      setLeads([]);
      localStorage.removeItem('biz_audit_leads');
    }
  };

  const handleReset = () => {
    setFormData(BLANK_FORM_DATA);
    setSubmittedLeadData(null);
    setCurrentStep(1);
    setIsSubmitted(false);
    setIsUnlocked(false);
    setAuditResult(null);
    setShowDisclaimer(true);
    setStepErrors([]);
    setValidationAlertMessage('');
    try {
      localStorage.removeItem('biz_audit_data');
      localStorage.removeItem('biznestahlili_disclaimer_accepted');
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Header */}
      <Header
        currentStep={currentStepIndex}
        totalSteps={totalStepsCount}
        isSubmitted={isSubmitted}
        onReset={handleReset}
        leadsCount={leads.length}
        onOpenAdmin={() => setIsAdminOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        t={t}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-10">
        {!isSubmitted ? (
          <div className="max-w-2xl mx-auto">
            {/* 1-Bosqich: Soha va Faoliyat turi */}
            {currentStep === 1 && (
              <StepBusinessProfile
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}

            {/* 2-Bosqich: Dastur & Avtomatlashtirish */}
            {currentStep === 2 && (
              <StepAutomationSoftware
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}

            {/* 3-Bosqich: Marketing & Trafik (Faqat Chuqur rejimda) */}
            {currentStep === 3 && (
              <StepMarketingTraffic
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}

            {/* 4-Bosqich: Sotuv tizimi va Voronka (Faqat Chuqur rejimda) */}
            {currentStep === 4 && (
              <StepSalesSystem
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}

            {/* 5-Bosqich: Moliyaviy reja & Unit-iqtisodiyot */}
            {currentStep === 5 && (
              <StepFinancialGoals
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}

            {/* 6-Bosqich: Natija Prevyusi & VIP Qulfni Ochish */}
            {currentStep === 6 && (
              <StepAuditUnlock
                formData={formData}
                onChange={updateFormData}
                onUnlock={handleUnlockSubmit}
                onPrev={handlePrev}
                errors={stepErrors}
                errorMessage={validationAlertMessage}
                t={t}
              />
            )}
          </div>
        ) : (
          <ErrorBoundary onReset={handleReset}>
            <AuditReport
              auditData={auditResult}
              rawFormData={submittedLeadData || formData}
              isUnlocked={isUnlocked}
              onUnlock={() => {
                setIsSubmitted(false);
                setCurrentStep(6);
              }}
              onReset={handleReset}
              previousAudit={previousAudit}
              t={t}
            />
          </ErrorBoundary>
        )}
      </main>

      {/* 1-QADAM: Welcome Disclaimer Modal */}
      <WelcomeDisclaimerModal
        isOpen={showDisclaimer && !isSubmitted}
        onAccept={handleAcceptDisclaimer}
      />

      {/* Admin Leads Modal (Parol: 19990127) */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onDeleteLead={handleDeleteLead}
        onClearAll={handleClearAllLeads}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 no-print">
        <p>© {new Date().getFullYear()} BiznesTahlili.uz — {t("Xolis Biznes-Laboratoriya va Yechimlar Markazi. Dasturlash va avtomatlashtirish:")} BDM (BIZNES DASTURLASH MARKAZI) (10 {t("yillik tajribaga ega")}).</p>
      </footer>
    </div>
  );
}
