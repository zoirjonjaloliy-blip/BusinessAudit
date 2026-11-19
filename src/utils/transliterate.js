/**
 * BiznesTahlili.uz — O'zbek tili Lotin <-> Kirill Almashtirgichi
 * Xalqaro va texnik atamalarni o'zgartirmasdan, imlo qoidalariga qat'iy rioya qiladi.
 */

// Kirillchaga o'girilmasligi SHART bo'lgan texnik, xalqaro va brend atamalar
export const PRESERVED_TERMS = [
  'BiznesTahlili.uz',
  'BiznesTahlili',
  'BIZNES DASTURLASH MARKAZI',
  'BDM',
  '1C',
  '1С',
  'POS',
  'CRM',
  'ABC',
  'XYZ',
  'KPI',
  'ROI',
  'LTV',
  'P&L',
  'Cash Flow',
  'FOT',
  'CCC',
  'PDF',
  'Excel',
  'Telegram',
  'Instagram',
  'Google',
  'TikTok',
  'AI',
  'PRO',
  'USD',
  'UZS',
  'FIFO',
  'EMR',
  'KDS',
  'TSD',
  'MXIK',
  'NKM',
  'DIO',
  'DSO',
  'DPO',
  'DataMatrix',
  'Face ID',
  'SMS',
  'Z-otchet',
  'Z-hisobot',
  'Caller ID',
  'Smartup',
  'Poster',
  'Jowi',
  'iiko',
  'AmoCRM',
  'Modme',
  'Yclients',
  '@Jalolov_IST',
  '+998'
];

/**
 * Matnni o'zbek kirill yozuviga o'girish
 * @param {string} text - Lotin yozuvidagi matn
 * @returns {string} Kirill yozuvidagi matn
 */
export function toCyrillic(text) {
  if (typeof text !== 'string' || !text) return text;

  // 1. Texnik atamalarni vaqtincha maskalash (himoyalash)
  const tokenMap = [];
  let processed = text;

  // URL va email larni himoyalash
  processed = processed.replace(/(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)/gi, (match) => {
    const placeholder = `__URL_TOKEN_${tokenMap.length}__`;
    tokenMap.push({ placeholder, original: match });
    return placeholder;
  });

  // Telefon raqamlarni himoyalash
  processed = processed.replace(/(\+998[\s\d-]+)/g, (match) => {
    const placeholder = `__PHONE_TOKEN_${tokenMap.length}__`;
    tokenMap.push({ placeholder, original: match });
    return placeholder;
  });

  // HTML teglarni himoyalash
  processed = processed.replace(/(<[^>]+>)/g, (match) => {
    const placeholder = `__HTML_TOKEN_${tokenMap.length}__`;
    tokenMap.push({ placeholder, original: match });
    return placeholder;
  });

  // Saqlanishi kerak bo'lgan atamalarni uzunligiga ko'ra saralab maskalash
  const sortedTerms = [...PRESERVED_TERMS].sort((a, b) => b.length - a.length);
  for (const term of sortedTerms) {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    processed = processed.replace(regex, (match) => {
      const placeholder = `__TERM_TOKEN_${tokenMap.length}__`;
      tokenMap.push({ placeholder, original: match });
      return placeholder;
    });
  }

  // 2. Birikmali harflar (sh, ch, o', g', yo, yu, ya, ye, ts)
  // Apostroflarni unifikatsiya qilish: ’ ‘ ` ʻ -> '
  processed = processed.replace(/[’‘`ʻ]/g, "'");

  // So'z boshidagi E/e -> Э/э
  processed = processed.replace(/(^|[\s\p{P}])e/gu, '$1э');
  processed = processed.replace(/(^|[\s\p{P}])E/gu, '$1Э');

  // Maxsus harf birikmalari (Katta-kichik harflar bilan)
  const compoundRules = [
    { from: /o'/g, to: 'ў' },
    { from: /O'/g, to: 'Ў' },
    { from: /g'/g, to: 'ғ' },
    { from: /G'/g, to: 'Ғ' },
    { from: /sh/g, to: 'ш' },
    { from: /Sh/g, to: 'Ш' },
    { from: /SH/g, to: 'Ш' },
    { from: /ch/g, to: 'ч' },
    { from: /Ch/g, to: 'Ч' },
    { from: /CH/g, to: 'Ч' },
    { from: /yo/g, to: 'ё' },
    { from: /Yo/g, to: 'Ё' },
    { from: /YO/g, to: 'Ё' },
    { from: /yu/g, to: 'ю' },
    { from: /Yu/g, to: 'Ю' },
    { from: /YU/g, to: 'Ю' },
    { from: /ya/g, to: 'я' },
    { from: /Ya/g, to: 'Я' },
    { from: /YA/g, to: 'Я' },
    { from: /ye/g, to: 'е' },
    { from: /Ye/g, to: 'Е' },
    { from: /YE/g, to: 'Е' },
    { from: /ts/g, to: 'ц' },
    { from: /Ts/g, to: 'Ц' },
    { from: /TS/g, to: 'Ц' }
  ];

  for (const r of compoundRules) {
    processed = processed.replace(r.from, r.to);
  }

  // Undoshdan keyingi tutuq belgisi (') -> ъ
  // Masalan: ma'lumot -> маълумот, san'at -> санъат
  processed = processed.replace(/([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ])'/g, '$1ъ');

  // Qolgan yakka harflar
  const singleCharMap = {
    'a': 'а', 'A': 'А',
    'b': 'б', 'B': 'Б',
    'd': 'д', 'D': 'Д',
    'e': 'е', 'E': 'Е',
    'f': 'ф', 'F': 'Ф',
    'g': 'г', 'G': 'Г',
    'h': 'ҳ', 'H': 'Ҳ',
    'i': 'и', 'I': 'И',
    'j': 'ж', 'J': 'Ж',
    'k': 'к', 'K': 'К',
    'l': 'л', 'L': 'Л',
    'm': 'м', 'M': 'М',
    'n': 'н', 'N': 'Н',
    'o': 'о', 'O': 'О',
    'p': 'п', 'P': 'П',
    'q': 'қ', 'Q': 'Қ',
    'r': 'р', 'R': 'Р',
    's': 'с', 'S': 'С',
    't': 'т', 'T': 'Т',
    'u': 'у', 'U': 'У',
    'v': 'в', 'V': 'В',
    'x': 'х', 'X': 'Х',
    'y': 'й', 'Y': 'Й',
    'z': 'з', 'Z': 'З'
  };

  let result = '';
  for (let i = 0; i < processed.length; i++) {
    const char = processed[i];
    result += singleCharMap[char] !== undefined ? singleCharMap[char] : char;
  }

  // 3. Maskalangan texnik atamalarni asl holiga qaytarish
  for (let i = tokenMap.length - 1; i >= 0; i--) {
    const { placeholder, original } = tokenMap[i];
    result = result.split(placeholder).join(original);
  }

  return result;
}

/**
 * Berilgan tilga qarab matnni qaytaradi
 * @param {string} text - Lotin matn
 * @param {string} lang - 'uz' (Lotin) yoki 'cyrl' (Kirill)
 */
export function translate(text, lang = 'uz') {
  if (lang === 'cyrl') {
    return toCyrillic(text);
  }
  return text;
}

