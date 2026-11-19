export type Theme = "dark" | "light";
/** What the visitor picked. "system" follows the device's light/dark setting. */
export type ThemePreference = "system" | Theme;
export type Language = "en" | "fil";

export const THEME_KEY = "theme";
export const LANGUAGE_KEY = "language";

export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";
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

export const getStoredThemePreference = (): ThemePreference => {
  const value = readStorage(THEME_KEY);
  return value === "light" || value === "dark" || value === "system"
    ? value
    : DEFAULT_THEME_PREFERENCE;
};

const systemLightQuery = (): MediaQueryList | null =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

/** The theme the device prefers; dark when the browser can't tell. */
export const getSystemTheme = (): Theme =>
  systemLightQuery()?.matches ? "light" : "dark";

export const resolveTheme = (preference: ThemePreference): Theme =>
  preference === "system" ? getSystemTheme() : preference;

/** Calls `onChange` whenever the device switches between light and dark. */
export const watchSystemTheme = (onChange: (theme: Theme) => void) => {
  const query = systemLightQuery();
  if (!query) return () => {};
  const listener = () => onChange(query.matches ? "light" : "dark");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};

export const getStoredLanguage = (): Language =>
  readStorage(LANGUAGE_KEY) === "fil" ? "fil" : DEFAULT_LANGUAGE;

/** Shows a resolved theme without touching storage (used for live device changes). */
export const paintTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("light", theme === "light");
};

export const applyThemePreference = (preference: ThemePreference) => {
  paintTheme(resolveTheme(preference));
  writeStorage(THEME_KEY, preference);
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const currentTheme = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

let crossfadeTimer: number | undefined;

/** Soft color crossfade (fallback, and for live device changes). See `.theme-anim` in index.css. */
export const crossfadeTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  paintTheme(theme);
  window.clearTimeout(crossfadeTimer);
  crossfadeTimer = window.setTimeout(() => root.classList.remove("theme-anim"), 520);
};

/**
 * Saves the choice and switches theme with a circular reveal that grows from `origin`
 * (the click point) to fill the screen, using the View Transitions API.
 * Falls back to a crossfade when the browser lacks it or the user prefers reduced motion.
 */
export const switchThemePreference = (
  preference: ThemePreference,
  origin?: { x: number; y: number },
) => {
  writeStorage(THEME_KEY, preference);
  const next = resolveTheme(preference);
  if (next === currentTheme()) return; // e.g. picking "system" when it resolves to the same theme

  if (prefersReducedMotion() || typeof document.startViewTransition !== "function") {
    crossfadeTheme(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth;
  const y = origin?.y ?? window.innerHeight;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;

  // Pause the site's normal color transitions so the new snapshot is fully the new theme.
  root.classList.add("theme-switching");
  const transition = document.startViewTransition(() => paintTheme(next));
  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 540,
          easing: "cubic-bezier(.32,.08,.24,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove("theme-switching"));
};

export const applyLanguage = (language: Language) => {
  document.documentElement.lang = language === "fil" ? "fil" : "en";
  writeStorage(LANGUAGE_KEY, language);
};
