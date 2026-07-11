import { createContext, useContext, useState, useEffect } from "react";
import { Lang, TranslationKey } from "./types";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("bg");
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    import("../shared/translations.json").then(module => {
      setTranslations(module.default);
    });
  }, []);

  const t = (key: TranslationKey) => {
    if (!translations) return key;
    return translations[lang][key];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};