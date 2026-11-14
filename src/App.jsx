import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepBusinessProfile } from './components/StepBusinessProfile';
import { StepAutomationSoftware } from './components/StepAutomationSoftware';
import { StepMarketingTraffic } from './components/StepMarketingTraffic';
import { StepSalesSystem } from './components/StepSalesSystem';
import { StepFinancialGoals } from './components/StepFinancialGoals';
import { StepAuditUnlock } from './components/StepAuditUnlock';
import { AuditReport } from './components/AuditReport';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { calculateBusinessAudit } from './utils/auditCalculator';
import { sendLeadToTelegram } from './utils/telegramNotifier';

const INITIAL_FORM_DATA = {
  fullName: '',
  businessName: '',
  phone: '',
  city: '',
  isOwner: 'yes',
  industry: 'retail_general',
  accountingSoftware: 'paper',
  debtTracking: 'paper',
  inventoryStatus: 'estimated',
  fiscalMarking: 'partial',
  dailyOperationalHours: 'medium',
  platforms: ['instagram'],
  platform: 'instagram',
  socialStatus: 'good',
  leadChannel: 'direct',
  hasCrm: 'no',
  salesTeam: 'owner_only',
  responseTime: 'slow',
  retention: 'no',
  loyaltySystem: 'verbal',
  targetRevenue: 10000,
  averageCheck: 60,
  conversionRate: 25,
  netMargin: 30,
  fixedCosts: 1800,
  inventoryCapital: 15000
};

export default function App() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('biz_audit_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_FORM_DATA;
  });

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

  // Auto-save form progress
  useEffect(() => {
    try {
      localStorage.setItem('biz_audit_data', JSON.stringify(formData));
    } catch (e) {}
  }, [formData]);

  // Auto-save leads list
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
    setAuditResult(result);
    setIsSubmitted(true);
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Yangi lid obyektini shakllantirish
    const newLead = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('uz-UZ'),
      ...formData,
      ...result
    };

    // 1. Zoirjon Jalolovning Telegram botiga yuborish
    sendLeadToTelegram(newLead);

    // 2. Mahalliy bazaga ham saqlash
    setLeads((prev) => [newLead, ...prev]);

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
    if (window.confirm("Barcha ma'lumotlarni tozalab, auditni qaytadan boshlaysizmi?")) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setIsSubmitted(false);
      setIsUnlocked(false);
      setAuditResult(null);
      try {
        localStorage.removeItem('biz_audit_data');
      } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        currentStep={currentStep}
        totalSteps={6}
        isSubmitted={isSubmitted}
        onReset={handleReset}
        leadsCount={leads.length}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
          <AuditReport
            auditData={auditResult}
            rawFormData={formData}
            isUnlocked={isUnlocked}
            onUnlock={() => {
              setIsSubmitted(false);
              setCurrentStep(6);
            }}
          />
        )}
      </main>

      {/* Admin Leads Modal (Parol bilan himoyalangan) */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onDeleteLead={handleDeleteLead}
        onClearAll={handleClearAllLeads}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 no-print">
        <p>© {new Date().getFullYear()} BiznesAudit.uz — Xolis Biznes-Laboratoriya va Yechimlar Markazi. Dasturlash va avtomatlashtirish: Zoirjon Jalolov.</p>
      </footer>
    </div>
  );
}