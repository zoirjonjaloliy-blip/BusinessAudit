import React from 'react';
import { ShieldCheck, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export function WelcomeDisclaimerModal({ isOpen, onAccept }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden text-left">
        {/* Glow blur background */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
            <Target className="w-6 h-6 animate-pulse" />
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

        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Biznesingizdagi yashirin teshiklar, ombor holati va aniq yo'qotishlarni hisoblab berishimiz uchun quyidagi savollarga o'zingizning haqiqiy va taxminiy real raqamlaringiz bilan javob berishingizni so'raymiz.
          </p>
          <p>
            Ma'lumotlar qancha aniq kiritilsa, tizim shunchalik mukammal <strong>"Moliyaviy Rentgen"</strong> va <strong>30 kunlik amaliy reja</strong> taqdim etadi. Barcha ma'lumotlar mutlaqo xavfsiz va konfidensial saqlanadi.
          </p>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center gap-2.5 text-xs text-blue-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Xolis laboratoriya: reklama yoki dastur sotish majburiyati yuklanmaydi.</span>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onAccept}
            className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/25 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <span>Tushunarli, diagnostikani boshlaymiz 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

