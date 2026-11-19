import React, { createContext, useContext, useState, useEffect } from 'react';
import { toCyrillic, translate } from '../utils/transliterate';

const LanguageContext = createContext({
  lang: 'uz', // 'uz' (Lotin) | 'cyrl' (Kirill)
  setLang: () => {},
  toggleLang: () => {},
  t: (text) => text
});

export function LanguageProvider({ children }) {
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

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

