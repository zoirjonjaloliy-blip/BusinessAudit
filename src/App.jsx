import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepPersonalContact } from './components/StepPersonalContact';
import { StepBusinessProfile } from './components/StepBusinessProfile';
import { StepAutomationSoftware } from './components/StepAutomationSoftware';
import { StepMarketingTraffic } from './components/StepMarketingTraffic';
import { StepSalesSystem } from './components/StepSalesSystem';
import { StepFinancialGoals } from './components/StepFinancialGoals';
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
  platforms: ['instagram'],
  platform: 'instagram',
  socialStatus: 'good',
  leadChannel: 'direct',
  hasCrm: 'no',
  salesTeam: 'owner_only',
  responseTime: 'slow',
  retention: 'no',
  targetRevenue: 10000,
  averageCheck: 60,
  conversionRate: 25,
  netMargin: 30
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

  const handleSubmit = () => {
    const result = calculateBusinessAudit(formData);
    setAuditResult(result);
    setIsSubmitted(true);
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
            {currentStep === 1 && (
              <StepPersonalContact
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <StepBusinessProfile
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 3 && (
              <StepAutomationSoftware
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 4 && (
              <StepMarketingTraffic
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 5 && (
              <StepSalesSystem
                formData={formData}
                onChange={updateFormData}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 6 && (
              <StepFinancialGoals
                formData={formData}
                onChange={updateFormData}
                onSubmit={handleSubmit}
                onPrev={handlePrev}
              />
            )}
          </div>
        ) : (
          <AuditReport
            auditData={auditResult}
            rawFormData={formData}
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
        <p>© {new Date().getFullYear()} BiznesAudit.uz — Barcha huquqlar himoyalangan. Dasturlash va avtomatlashtirish: Zoirjon Jalolov.</p>
      </footer>
    </div>
  );
}
