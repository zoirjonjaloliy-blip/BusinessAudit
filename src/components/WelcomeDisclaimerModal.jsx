import React from 'react';
import { ShieldCheck, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export function WelcomeDisclaimerModal({ isOpen, onAccept }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      style={{
        backgroundColor: 'rgba(11, 15, 25, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left my-auto transform transition-all">
        {/* Glow blur background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start sm:items-center gap-3.5 mb-5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
            <Target className="w-6 h-6 animate-pulse text-white" />
          </div>
          <div>
            <div className="text-[11px] uppercase font-extrabold text-cyan-400 tracking-wider">
              Xolis Diagnostika Standarti
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              🎯 Hurmatli tadbirkor, to'g'ri tashxis — aniq raqamlardan boshlanadi!
            </h2>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          <p>
            Biznesingizdagi yashirin teshiklar, ombor holati va aniq yo'qotishlarni hisoblab berishimiz uchun quyidagi savollarga o'zingizning haqiqiy va taxminiy real raqamlaringiz bilan javob berishingizni so'raymiz.
          </p>
          <p>
            Ma'lumotlar qancha aniq kiritilsa, tizim shunchalik mukammal <strong className="text-cyan-300">"Moliyaviy Rentgen"</strong> va <strong className="text-blue-300">30 kunlik amaliy reja</strong> taqdim etadi. Barcha ma'lumotlar mutlaqo xavfsiz va konfidensial saqlanadi.
          </p>
        </div>

        <div className="mt-5 p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center gap-3 text-xs text-blue-200 relative z-10">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">Xolis laboratoriya: reklama yoki dastur sotish majburiyati yuklanmaydi.</span>
        </div>

        <div className="mt-6 relative z-10">
          <button
            type="button"
            onClick={onAccept}
            className="w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/30 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] transition-all"
            style={{ color: '#ffffff' }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Tushunarli, diagnostikani boshlaymiz 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}
