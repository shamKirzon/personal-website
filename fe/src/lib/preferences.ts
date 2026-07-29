export type Theme = "dark" | "light";
export type Language = "en" | "fil";

export const THEME_KEY = "theme";
export const LANGUAGE_KEY = "language";

export const DEFAULT_THEME: Theme = "dark";
export const DEFAULT_LANGUAGE: Language = "en";

const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// localStorage throws in Safari private mode and when site data is blocked.
const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* empty */
  }
};

export const getStoredTheme = (): Theme =>
  readStorage(THEME_KEY) === "light" ? "light" : DEFAULT_THEME;

export const getStoredLanguage = (): Language =>
  readStorage(LANGUAGE_KEY) === "fil" ? "fil" : DEFAULT_LANGUAGE;

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("light", theme === "light");
  writeStorage(THEME_KEY, theme);
};

export const applyLanguage = (language: Language) => {
  document.documentElement.lang = language === "fil" ? "fil" : "en";
  writeStorage(LANGUAGE_KEY, language);
};
