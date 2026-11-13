import React, { useState } from 'react';
import { X, Download, Phone, Send, Trash2, Search, Users, ShieldAlert, ShieldCheck, DollarSign, Calendar, Lock, KeyRound, LogOut } from 'lucide-react';

const ADMIN_PASSWORD = "19990127"; // Yangi admin paroli

export function AdminLeadsModal({ isOpen, onClose, leads, onDeleteLead, onClearAll }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setInputPassword('');
    } else {
      setPasswordError(true);
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setInputPassword('');
    setPasswordError(false);
    onClose();
  };

  // Agar parol terilmagan bo'lsa - Parol so'rash oynasi chiqadi
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <Lock className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Admin Tizimiga Kirish
            </h3>
            <p className="text-xs text-slate-400">
              Ushbu bo'lim faqat tizim ma'muri (Zoirjon Jalolov) uchun mo'ljallangan. Iltimos, parolni kiriting.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  autoFocus
                  required
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Admin parolini kiriting"
                  className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all ${
                    passwordError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-800 focus:border-blue-500'
                  }`}
                />
              </div>
              {passwordError && (
                <p className="text-xs text-red-400 mt-1.5 font-medium flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Parol noto'g'ri! Qayta urinib ko'ring.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              Kirish &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Parol to'g'ri kiritilganda to'liq Baza ochiladi
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      lead.fullName?.toLowerCase().includes(q) ||
      lead.businessName?.toLowerCase().includes(q) ||
      lead.phone?.toLowerCase().includes(q) ||
      lead.city?.toLowerCase().includes(q)
    );
  });

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("Hozircha saqlangan lidlar yo'q!");
      return;
    }

    const headers = [
      "Sana",
      "Ism Familiya",
      "Biznes Nomi",
      "Telefon",
      "Shahar",
      "Soha",
      "Oylik Maqsad ($)",
      "O'rtacha Chek ($)",
      "Oylik Yo'qotish ($)",
      "Dastur Holati",
      "Qarzlar Holati",
      "CRM",
      "Salomatlik Balli"
    ];

    const rows = leads.map((item) => [
      item.date || '',
      `"${item.fullName || ''}"`,
      `"${item.businessName || ''}"`,
      `"${item.phone || ''}"`,
      `"${item.city || ''}"`,
      `"${item.industry?.name || ''}"`,
      item.targetRevenue || '',
      item.averageCheck || '',
      item.monthlyWastedMoney || '',
      `"${item.accountingSoftware === 'software' ? "Dastur bor" : item.accountingSoftware === 'excel' ? "Excel" : "Daftarda"}"`,
      `"${item.debtTracking === 'software' ? "Dasturda" : item.debtTracking === 'paper' ? "Qarz daftari" : "Hisobsiz"}"`,
      `"${item.hasCrm === 'yes' ? "CRM bor" : "CRM yo'q"}"`,
      item.scores?.overall || ''
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Biznes_Audit_Lidlar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Tadbirkorlar Bazasi (Lidlar)
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                  {leads.length} ta mijoz
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Audit topshirgan mijozlar kontaktlari va dastur o'rnatish uchun potensial lidlar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              title="Excel (CSV) formatida yuklab olish"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Excelga yuklash</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              title="Chiqish"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ism, biznes nomi yoki telefon raqami bo'yicha qidirish..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          {leads.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tozalash</span>
            </button>
          )}
        </div>

        {/* Leads Table / Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Hozircha hech qanday ma'lumot topilmadi.
            </div>
          ) : (
            filteredLeads.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {item.fullName || "Noma'lum"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                      {item.businessName || "Kompaniya"}
                    </span>
                    {item.city && (
                      <span className="text-xs text-slate-400">
                        • {item.city}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 ml-auto flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                    <div>
                      Dastur: <strong className={item.accountingSoftware === 'paper' ? 'text-red-400' : 'text-emerald-400'}>
                        {item.accountingSoftware === 'software' ? 'Dastur bor' : item.accountingSoftware === 'excel' ? 'Excel' : 'Daftarda (Zarur)'}
                      </strong>
                    </div>
                    <div>
                      Qarzlar: <strong className={item.debtTracking === 'paper' ? 'text-amber-400' : 'text-slate-200'}>
                        {item.debtTracking === 'software' ? 'Dasturda' : item.debtTracking === 'paper' ? 'Qarz daftari' : 'Hisobsiz'}
                      </strong>
                    </div>
                    <div>
                      Oylik Yo'qotish: <strong className="text-red-400">${item.monthlyWastedMoney?.toLocaleString()}/oy</strong>
                    </div>
                    <div>
                      Maqsad: <strong className="text-emerald-400">${item.targetRevenue?.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{item.phone}</span>
                  </a>
                  <a
                    href={`https://t.me/${item.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all"
                    title="Telegramda ochish"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onDeleteLead(item.id || idx)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
