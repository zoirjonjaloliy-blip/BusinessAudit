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

export const BLANK_FORM_DATA = {
  fullName: '',
  businessName: '',
  phone: '',
  city: '',
  isOwner: '',
  industry: '',
  accountingSoftware: '',
  debtTracking: '',
  inventoryStatus: '',
  fiscalMarking: '',
  dailyOperationalHours: '',
  // PRO 4.0 Yangi Boshqaruv, Moliyaviy Balans & AI maydonlari:
  abcAnalysisStatus: '',
  autoOrderingStatus: '',
  aiUsageStatus: '',
  financialReportsStatus: '',
  unitEconomicsStatus: '',
  // PRO 5.0 Dorixona, Klinika, Anti-Fraud & Unit-Productivity:
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

  // 1-QADAM: Welcome Disclaimer holati (har safar saytga kirganda 1-bosqichda chiqadi)
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
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep((prev) => Math.min(6, prev + 1));
  };

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // VIP Qulfni ochish (Ism, biznes va telefon kiritilganda)
  const handleUnlockSubmit = () => {
    const result = calculateBusinessAudit(formData);
    const leadSnapshot = { ...formData };
    
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

    // 1. Zoirjon Jalolovning Telegram botiga yuborish
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

    // 4. Telefondan keshni tozalash va formani bo'shatish (keyingi foydalanuvchi uchun)
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

  // Demo ko'rish (Kontakt kiritmasdan cheklangan prevyu)
  const handleDemoSubmit = () => {
    const result = calculateBusinessAudit(formData);
    setSubmittedLeadData({ ...formData });
    setAuditResult(result);
    setIsSubmitted(true);
    setIsUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        currentStep={currentStep}
        totalSteps={6}
        isSubmitted={isSubmitted}
        onReset={handleReset}
        leadsCount={leads.length}
        onOpenAdmin={() => setIsAdminOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
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
              />
            )}

            {/* 2-Bosqich: Dastur & Avtomatlashtirish */}
            {currentStep === 2 && (
              <StepAutomationSoftware
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {/* 3-Bosqich: Marketing & Trafik */}
            {currentStep === 3 && (
              <StepMarketingTraffic
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {/* 4-Bosqich: Sotuv tizimi va Voronka */}
            {currentStep === 4 && (
              <StepSalesSystem
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {/* 5-Bosqich: Moliyaviy reja & Unit-iqtisodiyot */}
            {currentStep === 5 && (
              <StepFinancialGoals
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {/* 6-Bosqich: Natija Prevyusi & VIP Qulfni Ochish */}
            {currentStep === 6 && (
              <StepAuditUnlock
                formData={formData}
                onChange={updateFormData}
                onUnlock={handleUnlockSubmit}
                onDemo={handleDemoSubmit}
                onPrev={handlePrev}
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
            />
          </ErrorBoundary>
        )}
      </main>

      {/* 1-QADAM: Welcome Disclaimer Modal */}
      <WelcomeDisclaimerModal
        isOpen={showDisclaimer && !isSubmitted}
        onAccept={handleAcceptDisclaimer}
      />

      {/* Admin Leads Modal (Parol bilan himoyalangan: 19990127) */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onDeleteLead={handleDeleteLead}
        onClearAll={handleClearAllLeads}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 no-print">
        <p>© {new Date().getFullYear()} BiznesTahlili.uz — Xolis Biznes-Laboratoriya va Yechimlar Markazi. Dasturlash va avtomatlashtirish: BDM kompaniyasi (10 yillik tajribaga ega).</p>
      </footer>
    </div>
  );
}
