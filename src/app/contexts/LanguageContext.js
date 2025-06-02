'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState({});

  const loadTranslations = async (locale) => {
    try {
      const response = await fetch(`/locales/${locale}/common.json`);
      const data = await response.json();
      setTranslations(data);
    } catch (err) {
      console.error('Failed to load translations:', err);
    }
  };

  useEffect(() => {
    loadTranslations(locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, translations, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
