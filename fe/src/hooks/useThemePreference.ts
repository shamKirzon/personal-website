import { useEffect, useState } from "react";
import {
  crossfadeTheme,
  getStoredThemePreference,
  switchThemePreference,
  watchSystemTheme,
  type ThemePreference,
} from "@/lib/preferences";

/** Current theme choice plus a setter; keeps "system" in sync with the device live. */
export const useThemePreference = () => {
  const [preference, setPreference] = useState<ThemePreference>(getStoredThemePreference);

  useEffect(() => {
    if (preference !== "system") return;
    return watchSystemTheme(crossfadeTheme);
  }, [preference]);

  const choose = (next: ThemePreference, origin?: { x: number; y: number }) => {
    switchThemePreference(next, origin);
    setPreference(next);
  };

  return [preference, choose] as const;
};
