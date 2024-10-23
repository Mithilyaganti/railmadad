import React, { createContext, useState, useContext, ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../locales/en.json";
import teTranslations from "../locales/te.json";
import hiTraslations from "../locales/hi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    te: { translation: teTranslations },
    hi: { translation: hiTraslations },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(() => {
    const lang = localStorage.getItem("language");
    if (!lang) localStorage.setItem("language", "en");
    return lang ? lang : "en";
  });

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
