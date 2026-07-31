import type { UiText } from "@/i18n/translations";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Compact relative time for visitor arrivals ("just now", "8h ago", "6d ago").
 * Entries never exceed the API's 7-day retention window.
 */
export const formatRelativeTime = (
  timestamp: number,
  t: UiText["visitorsMap"],
) => {
  const elapsed = Math.max(0, Date.now() - timestamp);

  if (elapsed < MINUTE) return t.timeJustNow;
  if (elapsed < HOUR) return t.timeMinutesAgo.replace("{n}", String(Math.floor(elapsed / MINUTE)));
  if (elapsed < DAY) return t.timeHoursAgo.replace("{n}", String(Math.floor(elapsed / HOUR)));
  return t.timeDaysAgo.replace("{n}", String(Math.floor(elapsed / DAY)));
};
