import React from 'react';
import { PLATFORMS } from '../data/industryBenchmarks';
import { Send, Globe, Video, Users, HeartHandshake, CheckCircle2, AlertTriangle, XCircle, Check } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const PLATFORM_ICONS = {
  Instagram: InstagramIcon,
  Send,
  Globe,
  Video,
  Users,
  HeartHandshake
};

export function StepMarketingTraffic({ formData, onChange, onNext, onPrev }) {
  const selectedPlatforms = Array.isArray(formData.platforms) 
    ? formData.platforms 
    : [formData.platform || 'instagram'];

  const togglePlatform = (id) => {
    let updated;
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length === 1) return; // Kamida bittasi tanlangan bo'lishi kerak
      updated = selectedPlatforms.filter((p) => p !== id);
    } else {
      updated = [...selectedPlatforms, id];
    }
    onChange({ platforms: updated, platform: updated[0] });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
          3-Bosqich: Marketing & Trafik
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Reklama va Mijozlarni jalb qilish holati
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Mijozlar sizni qayerdan topadi? (Bir nechtasini tanlashingiz mumkin)
        </p>
      </div>

      {/* Savol: Asosiy reklama kanallari (Multi-select) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-1 flex items-center justify-between">
          <span>1. Asosiy mijoz oqimi (reklama) qaysi kanallardan keladi?</span>
          <span className="text-[11px] font-normal text-cyan-400">Bir nechtasini belgilang</span>
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Tanlangan kanallar soni: <strong className="text-white">{selectedPlatforms.length} ta</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PLATFORMS.map((plat) => {
            const IconComp = PLATFORM_ICONS[plat.icon] || Globe;
            const isSelected = selectedPlatforms.includes(plat.id);
            return (
              <button
                key={plat.id}
                type="button"
                onClick={() => togglePlatform(plat.id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-600/15 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-700/60 text-slate-400'}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">{plat.name}</div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-800/50'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Savol: Upakovka va ijtimoiy tarmoqlar holati */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          2. Ijtimoiy tarmoqlaringiz holati (Upakovka & Brending)?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ socialStatus: 'good' })}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.socialStatus === 'good'
                ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Zo'r holatda
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">
              Chiroyli dizayn, muntazam postlar, mijozlar fikrlari va aniq taklif bor.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ socialStatus: 'medium' })}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.socialStatus === 'medium'
                ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                O'rtacha
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs text-slate-400">
              Sahifalar ochilgan, lekin postlar kam, vizual uslub tartibsiz.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ socialStatus: 'bad' })}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.socialStatus === 'bad'
                ? 'bg-red-600/15 border-red-500 text-white ring-1 ring-red-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                Sust / Yo'q
              </span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-xs text-slate-400">
              Sahifa deyarli yuritilmaydi, ishonch uyg'otmaydi yoki yo'q.
            </p>
          </button>
        </div>
      </div>

      {/* Savol: Sayt / Landing sahifa bormi? */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-sm font-semibold text-slate-200 mb-3">
          3. Reklama qayerga olib boradi? (Qabul qilish kanali)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange({ leadChannel: 'direct' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.leadChannel === 'direct'
                ? 'bg-cyan-600/15 border-cyan-500 text-white ring-1 ring-cyan-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm">To'g'ridan-to'g'ri Direct / Telegram</div>
            <div className="text-[11px] text-slate-400 mt-1">Mijozlar shaxsiy xabar yozishadi</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ leadChannel: 'taplink' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.leadChannel === 'taplink'
                ? 'bg-cyan-600/15 border-cyan-500 text-white ring-1 ring-cyan-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm">Taplink / Telegram-bot</div>
            <div className="text-[11px] text-slate-400 mt-1">Avtomatlashtirilgan mini sahifa yoki bot</div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ leadChannel: 'website' })}
            className={`p-3 rounded-xl border text-left transition-all ${
              formData.leadChannel === 'website'
                ? 'bg-cyan-600/15 border-cyan-500 text-white ring-1 ring-cyan-500'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-xs sm:text-sm">To'liq Vebsayt / Katalog</div>
            <div className="text-[11px] text-slate-400 mt-1">Keng tushuntirilgan sotuv sahifasi</div>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all"
        >
          &larr; Orqaga
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          Keyingisi (Sotuv tizimi) &rarr;
        </button>
      </div>
    </div>
  );
}
