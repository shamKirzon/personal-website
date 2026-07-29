import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { uiText, type UiText } from "./translations";
import {
  applyLanguage,
  getStoredLanguage,
  type Language,
} from "@/lib/preferences";

export type { Language };

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: UiText;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initializer keeps the first render from flashing the default language.
  const [language, setLanguage] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "fil" : "en"));

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t: uiText[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
