// Sohaviy benchmarklar (O'zbekiston va MDH bozori o'rtacha ko'rsatkichlari)
export const INDUSTRY_BENCHMARKS = {
  retail_food: {
    id: 'retail_food',
    name: "Oziq-ovqat savdosi, Supermarket & Minimarket",
    category: "savdo",
    icon: 'Apple',
    avgCpl: { instagram: 0.6, telegram: 0.4, google: 1.2, tiktok: 0.4 },
    avgConversion: 35,
    avgCheck: 15,
    avgMargin: 18,
    softwareTip: "Kassa, elektron tarozi va shtrix-kod skaneri bilan ishlovchi zamonaviy POS savdo dasturi.",
    tip: "Oziq-ovqatda tovar aylanmasi tezligi va doimiy mahalliy xaridorlar oqimi eng muhimi."
  },
  retail_general: {
    id: 'retail_general',
    name: "Chakana savdo (Kiyim, Qurilish mollari, Kosmetika, Uy-ro'zg'or)",
    category: "savdo",
    icon: 'Store',
    avgCpl: { instagram: 1.2, telegram: 0.8, google: 2.0, tiktok: 0.7 },
    avgConversion: 20,
    avgCheck: 45,
    avgMargin: 35,
    softwareTip: "Shtrix-kod skaner va ombordagi real qoldiqlarni (ostatka) hisoblovchi POS savdo dasturi.",
    tip: "Chakana savdoda qoldiq tovarlar 'muzlab qolishi' aylanma mablag'ni yeb qo'yadi."
  },
  wholesale_b2b: {
    id: 'wholesale_b2b',
    name: "Ulgurji savdo (Optom, Distribyutsiya, Dilerlik)",
    category: "savdo",
    icon: 'Truck',
    avgCpl: { instagram: 4.5, telegram: 2.8, google: 6.0, tiktok: 2.0 },
    avgConversion: 12,
    avgCheck: 800,
    avgMargin: 20,
    softwareTip: "1C: Korxona va mobil savdo agentlari integratsiyasi, mijozlar qarzdorligi (debitorlik) nazorati.",
    tip: "Nasiya daftarda yuritilsa, aylanma mablag'ning 15-20% yillab qaytmasligi mumkin."
  },
  horeca_cafe: {
    id: 'horeca_cafe',
    name: "Kafe, Restoran, Fast-Food & Qahvaxona",
    category: "xizmat",
    icon: 'Coffee',
    avgCpl: { instagram: 0.8, telegram: 0.5, google: 1.8, tiktok: 0.4 },
    avgConversion: 28,
    avgCheck: 20,
    avgMargin: 35,
    softwareTip: "Umumiy ovqatlanish uchun maxsus POS kassa tizimi, tex-kartalar va oshxona nazorati.",
    tip: "Yaxshi servis va sodiqlik tizimi orqali takroriy tashriflarni 40% oshirish mumkin."
  },
  manufacturing: {
    id: 'manufacturing',
    name: "Ishlab chiqarish & Sexlar (Mebel, Tekstil, Qandolat va h.k.)",
    category: "ishlab_chiqarish",
    icon: 'Factory',
    avgCpl: { instagram: 3.5, telegram: 2.2, google: 5.5, tiktok: 1.8 },
    avgConversion: 14,
    avgCheck: 650,
    avgMargin: 30,
    softwareTip: "Hom-ashyo sarfi va tayyor mahsulot tannarxini hisoblovchi 1C: Korxona ishlab chiqarish moduli.",
    tip: "Ishlab chiqarishda hom-ashyo isrofi va nosoz mahsulot (brak) foizi rentabellikni keskin tushiradi."
  },
  education_courses: {
    id: 'education_courses',
    name: "O'quv markazlari, Kurslar & Ta'lim",
    category: "talim",
    icon: 'GraduationCap',
    avgCpl: { instagram: 1.8, telegram: 1.2, google: 3.5, tiktok: 1.0 },
    avgConversion: 18,
    avgCheck: 80,
    avgMargin: 45,
    softwareTip: "O'quvchilar hisobi, to'lovlar va davomatni yurituvchi ta'lim CRM tizimi.",
    tip: "Birinchi ochiq bepul darsga lillarni yig'ish va 10 daqiqada bog'lanish asosiy drayver."
  },
  services_general: {
    id: 'services_general',
    name: "Xizmatlar (Tibbiyot, Go'zallik, Avtoservis, Ta'mirlash)",
    category: "xizmat",
    icon: 'Briefcase',
    avgCpl: { instagram: 2.2, telegram: 1.5, google: 4.0, tiktok: 1.2 },
    avgConversion: 25,
    avgCheck: 110,
    avgMargin: 50,
    softwareTip: "Mijozlar navbati va qabulini yurituvchi elektron xizmat dasturi.",
    tip: "Mijozlar bilan ishonch va usta/shifokor tavsiyalari sotuvni 2 barobar osonlashtiradi."
  },
  other_biz: {
    id: 'other_biz',
    name: "Boshqa soha",
    category: "boshqa",
    icon: 'Sparkles',
    avgCpl: { instagram: 1.5, telegram: 1.0, google: 3.0, tiktok: 0.8 },
    avgConversion: 20,
    avgCheck: 70,
    avgMargin: 30,
    softwareTip: "Biznesingizga mos zamonaviy POS dastur yoki 1C: Korxona avtomatlashtirish tizimi.",
    tip: "Hisob-kitob qilinmagan narsani boshqarib ham, o'stirib ham bo'lmaydi."
  }
};

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram Target', icon: 'Instagram', multiplier: 1.0 },
  { id: 'telegram', name: 'Telegram Kanallar & Ads', icon: 'Send', multiplier: 0.8 },
  { id: 'google', name: 'Google Ads (Qidiruv/KMS)', icon: 'Globe', multiplier: 1.6 },
  { id: 'tiktok', name: 'TikTok Ads', icon: 'Video', multiplier: 0.7 },
  { id: 'bloggers', name: 'Blogerlar & Reklama', icon: 'Users', multiplier: 1.2 },
  { id: 'organic', name: 'Tavsiyalar / Sarafan (Og\'zaki)', icon: 'HeartHandshake', multiplier: 0.5 }
];
