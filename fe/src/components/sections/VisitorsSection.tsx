import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { toast } from "sonner";
import {
  fetchVisitors,
  resolveMyLocation,
  type Visitor,
} from "@/data/Visitors-data";
import {
  MAP_VIEW_HEIGHT,
  MAP_VIEW_WIDTH,
  SILHOUETTE_DOTS,
  isWithinMap,
  projectToEdgePercent,
  projectToPercent,
} from "@/lib/philippines-map";
import { formatRelativeTime } from "@/lib/relative-time";
import Skeleton from "@/components/ui/Skeleton";
import { useLanguage } from "@/i18n/LanguageContext";

type Consent = "pending" | "granted" | "declined";

const CONSENT_KEY = "visitor-map-consent";
const LIST_SIZE = 5;
const POLL_INTERVAL = 12000;
// Relative labels drift as time passes, so re-render them on a slow tick.
const CLOCK_INTERVAL = 60000;

// localStorage (not sessionStorage) so the choice survives switching tabs —
// sessionStorage is scoped per-tab and would otherwise reset on every switch.
const readConsent = (): Consent => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "declined" ? stored : "pending";
  } catch {
    return "pending";
  }
};

const storeConsent = (consent: Consent) => {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    /* empty */
  }
};

const Signal = ({
  x,
  y,
  label,
  animate,
}: {
  x: number;
  y: number;
  label?: string;
  animate: boolean;
}) => (
  <span
    className="absolute -translate-x-1/2 -translate-y-1/2"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <span className="relative flex items-center justify-center">
      {animate && (
        <span className="animate-visitor-ping absolute h-3.5 w-3.5 rounded-full bg-[var(--primary)]" />
      )}
      <span className="relative h-[5px] w-[5px] rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--accent-border-soft)]" />
      {label && (
        <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--line)] bg-[var(--panel-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-soft)]">
          {label}
        </span>
      )}
    </span>
  </span>
);

const VisitorsSection = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const [consent, setConsent] = useState<Consent>(readConsent);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [, setClockTick] = useState(0);

  const hasDecided = consent !== "pending";

  // Keeps this tab's consent state in sync if the choice changes in another
  // tab — the native cross-tab equivalent of an onChanged listener.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      setConsent(
        event.newValue === "granted" || event.newValue === "declined"
          ? event.newValue
          : "pending",
      );
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /** Registers this visitor, then refreshes the shared list. */
  const join = useCallback(async () => {
    setIsJoining(true);
    try {
      const me = await resolveMyLocation();

      if (me) {
        toast.success(t.visitorsMap.addedToastTitle, {
          description: t.visitorsMap.addedToastDesc.replace(
            "{location}",
            `${me.city}, ${me.country}`,
          ),
        });
      } else {
        toast(t.visitorsMap.unknownToastTitle, {
          description: t.visitorsMap.unknownToastDesc,
        });
      }

      setConsent("granted");
      storeConsent("granted");

      const everyone = await fetchVisitors();
      setVisitors(everyone);
      setIsLoading(false);
    } finally {
      setIsJoining(false);
    }
  }, [t]);

  const decline = () => {
    setConsent("declined");
    storeConsent("declined");
  };

  // Initial load. Registration is handled by `join`, so this only reads.
  useEffect(() => {
    if (!hasDecided) return;

    let cancelled = false;
    fetchVisitors().then((everyone) => {
      if (cancelled) return;
      setVisitors(everyone);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [hasDecided]);

  useEffect(() => {
    if (!hasDecided || isLoading) return;

    const timer = window.setInterval(async () => {
      const latest = await fetchVisitors();
      if (latest.length > 0) setVisitors(latest);
    }, POLL_INTERVAL);

    return () => window.clearInterval(timer);
  }, [hasDecided, isLoading]);

  useEffect(() => {
    if (!hasDecided) return;
    const timer = window.setInterval(
      () => setClockTick((tick) => tick + 1),
      CLOCK_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [hasDecided]);

  const stats = useMemo(() => {
    const cities = new Set(visitors.map((v) => `${v.city}|${v.country}`));
    return {
      total: visitors.length,
      live: visitors.filter((v) => v.isLive).length,
      cities: cities.size,
    };
  }, [visitors]);

  // One marker per city keeps overlapping arrivals from stacking into a blob.
  const markers = useMemo(() => {
    const seen = new Map<string, Visitor>();
    visitors.forEach((visitor) => {
      const key = `${visitor.city}|${visitor.country}`;
      if (!seen.has(key)) seen.set(key, visitor);
    });

    return [...seen.values()].map((visitor) => {
      const onMap = isWithinMap(visitor.lat, visitor.lng);
      const position = onMap
        ? projectToPercent(visitor.lat, visitor.lng)
        : projectToEdgePercent(visitor.lat, visitor.lng);

      return {
        key: `${visitor.city}|${visitor.country}`,
        ...position,
        label: onMap ? undefined : `${visitor.city}, ${visitor.country}`,
      };
    });
  }, [visitors]);

  const statItems = [
    { value: stats.total, label: t.visitorsMap.statVisitors },
    { value: stats.live, label: t.visitorsMap.statLive },
    { value: stats.cities, label: t.visitorsMap.statCities },
  ];

  const recent = visitors.slice(0, LIST_SIZE);

  return (
    <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-8 pb-16">
      <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--primary)]">
        {t.visitorsMap.eyebrow}
      </p>
      <h1 className="mb-4 text-[24px] font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-[28px]">
        {t.visitorsMap.title}
      </h1>
      <p className="max-w-[560px] text-[16px] leading-relaxed text-[var(--ink-mid)]">
        {t.visitorsMap.lead}
      </p>

      {!hasDecided ? (
        <div className="mt-8 max-w-[520px] rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] p-5 shadow-[var(--panel-shadow)]">
          <h2 className="text-[17px] font-semibold text-[var(--ink)]">
            {t.visitorsMap.consentHeading}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-mid)]">
            {t.visitorsMap.consentBodyStart}
            <strong className="font-semibold text-[var(--ink-soft)]">
              {t.visitorsMap.consentBodyEmphasis}
            </strong>
            {t.visitorsMap.consentBodyEnd}
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={join}
              disabled={isJoining}
              className="h-11 cursor-pointer rounded-lg bg-[var(--cta-bg)] px-5 text-[15px] font-semibold text-[var(--cta-ink)] transition-all duration-150 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {isJoining
                ? t.visitorsMap.consentAdding
                : t.visitorsMap.consentAccept}
            </button>
            <button
              type="button"
              onClick={decline}
              disabled={isJoining}
              className="h-11 cursor-pointer rounded-lg border border-[var(--line)] px-5 text-[15px] text-[var(--ink-mid)] transition-all duration-150 hover:border-[var(--line-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {t.visitorsMap.consentDecline}
            </button>
          </div>
        </div>
      ) : (
        <>
          {consent === "declined" && (
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-[14px] text-[var(--ink-faint)]">
                {t.visitorsMap.declinedNote}
              </p>
              <button
                type="button"
                onClick={join}
                disabled={isJoining}
                className="cursor-pointer rounded text-[14px] font-medium text-[var(--primary)] underline-offset-4 transition-opacity duration-150 hover:underline hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isJoining
                  ? t.visitorsMap.consentAdding
                  : t.visitorsMap.reOptIn}
              </button>
            </div>
          )}

          <div
            role="img"
            aria-label={t.visitorsMap.mapAriaLabel}
            className="relative mx-auto mt-8 w-full max-w-[340px]"
          >
            <svg
              viewBox={`0 0 ${MAP_VIEW_WIDTH} ${MAP_VIEW_HEIGHT}`}
              className="h-auto w-full"
              aria-hidden
            >
              {SILHOUETTE_DOTS.map((dot, index) => (
                <circle
                  key={index}
                  cx={dot.x}
                  cy={dot.y}
                  r={1.7}
                  className="fill-[var(--line-strong)]"
                />
              ))}
            </svg>

            <div aria-hidden className="absolute inset-0">
              {markers.map((marker) => (
                <Signal
                  key={marker.key}
                  x={marker.x}
                  y={marker.y}
                  label={marker.label}
                  animate={!prefersReducedMotion}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-[var(--line-hairline)] pt-6">
            {statItems.map((item) => (
              <div key={item.label} className="text-center">
                {isLoading ? (
                  <Skeleton className="mx-auto h-[20px] w-8" />
                ) : (
                  <p className="text-[20px] font-bold text-[var(--ink)]">
                    {item.value}
                  </p>
                )}
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[340px]">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
              {t.visitorsMap.recentLabel}
            </p>

            {isLoading ? (
              <ul className="flex flex-col">
                {Array.from({ length: LIST_SIZE }).map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 border-b border-[var(--line-hairline)] py-2 last:border-b-0"
                  >
                    <Skeleton className="h-1.5 w-1.5 shrink-0 rounded-full" />
                    <Skeleton className="h-[14px] flex-1" />
                    <Skeleton className="h-[12px] w-12 shrink-0" />
                  </li>
                ))}
              </ul>
            ) : recent.length === 0 ? (
              <p className="py-2 text-[14px] text-[var(--ink-faint)]">
                {t.visitorsMap.recentEmpty}
              </p>
            ) : (
              <ul className="flex flex-col">
                {recent.map((visitor) => (
                  <li
                    key={visitor.id}
                    className="flex items-center gap-2.5 border-b border-[var(--line-hairline)] py-2 text-[14px] text-[var(--ink-soft)] last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                    />
                    <span className="flex-1 truncate">
                      {visitor.city}, {visitor.country}
                    </span>
                    <span className="shrink-0 font-mono text-[12px] text-[var(--ink-faint)]">
                      {formatRelativeTime(visitor.arrivedAt, t.visitorsMap)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default VisitorsSection;
