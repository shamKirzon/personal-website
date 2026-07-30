import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
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
import { useLanguage } from "@/i18n/LanguageContext";

type Consent = "pending" | "granted" | "declined";

const CONSENT_KEY = "visitor-map-consent";
const LIST_SIZE = 5;
const POLL_INTERVAL = 12000;

const readConsent = (): Consent => {
  try {
    const stored = sessionStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "declined" ? stored : "pending";
  } catch {
    return "pending";
  }
};

const storeConsent = (consent: Consent) => {
  try {
    sessionStorage.setItem(CONSENT_KEY, consent);
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

  const hasDecided = consent !== "pending";

  useEffect(() => {
    if (!hasDecided) return;

    let cancelled = false;

    const load = async () => {
      // Register first so the list that comes back already includes us.
      if (consent === "granted") {
        await resolveMyLocation();
        if (cancelled) return;
      }

      const everyone = await fetchVisitors();
      if (cancelled) return;

      setVisitors(everyone);
      setIsLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [hasDecided, consent]);

  useEffect(() => {
    if (!hasDecided || isLoading) return;

    const timer = window.setInterval(async () => {
      const latest = await fetchVisitors();
      if (latest.length > 0) setVisitors(latest);
    }, POLL_INTERVAL);

    return () => window.clearInterval(timer);
  }, [hasDecided, isLoading]);

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

  const decide = (choice: Consent) => {
    setConsent(choice);
    storeConsent(choice);
  };

  const statItems = [
    { value: stats.total, label: t.visitorsMap.statVisitors },
    { value: stats.live, label: t.visitorsMap.statLive },
    { value: stats.cities, label: t.visitorsMap.statCities },
  ];

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
              onClick={() => decide("granted")}
              className="h-11 cursor-pointer rounded-lg bg-[var(--cta-bg)] px-5 text-[15px] font-semibold text-[var(--cta-ink)] transition-all duration-150 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.97]"
            >
              {t.visitorsMap.consentAccept}
            </button>
            <button
              type="button"
              onClick={() => decide("declined")}
              className="h-11 cursor-pointer rounded-lg border border-[var(--line)] px-5 text-[15px] text-[var(--ink-mid)] transition-all duration-150 hover:border-[var(--line-strong)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.97]"
            >
              {t.visitorsMap.consentDecline}
            </button>
          </div>
        </div>
      ) : (
        <>
          {consent === "declined" && (
            <p className="mt-5 text-[14px] text-[var(--ink-faint)]">
              {t.visitorsMap.declinedNote}
            </p>
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
                <p className="text-[20px] font-bold text-[var(--ink)]">
                  {item.value}
                </p>
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
            <ul className="flex flex-col">
              {visitors.slice(0, LIST_SIZE).map((visitor) => (
                <li
                  key={visitor.id}
                  className="flex items-center gap-2.5 border-b border-[var(--line-hairline)] py-2 text-[14px] text-[var(--ink-soft)] last:border-b-0"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                  />
                  {visitor.city}, {visitor.country}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default VisitorsSection;
