import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import type { Certification } from "@/data/Certifications-data";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePresence } from "@/hooks/usePresence";

interface CertificationModalProps {
  /** The certification to show, or undefined when closed. */
  certification: Certification | undefined;
  onClose: () => void;
}

const FOCUSABLE = "a[href], button:not([disabled])";

/** "Dec 2023"-style date; returns null for a missing or malformed date instead of "Invalid Date". */
const formatMonthYear = (iso: string | undefined, locale: string) => {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(date);
};

/** "https://www.credly.com/..." → "credly.com"; null if the URL is missing or invalid. */
const hostOf = (url: string | undefined) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const CertificationModal = ({ certification, onClose }: CertificationModalProps) => {
  const { language, t } = useLanguage();
  const { mounted, visible } = usePresence(certification !== undefined, 220);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keep showing the last certification while the close animation plays.
  const [shown, setShown] = useState(certification);
  if (certification && certification !== shown) setShown(certification);

  const open = certification !== undefined;

  // Escape closes; lock page scroll; move focus into the dialog and give it back on close.
  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
      returnTo?.focus?.();
    };
  }, [open, onClose]);

  // The dialog mounts a render after `open` flips, so focus it once it exists.
  useEffect(() => {
    if (open && mounted) closeRef.current?.focus();
  }, [open, mounted]);

  if (!mounted || !shown) return null;

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const { title, issuer, logo, certificateImage, type, status, awarded, description, tags, url } =
    shown;
  const locale = language === "fil" ? "fil-PH" : "en-US";
  const meta = [
    t.certifications.types[type] ?? type,
    issuer,
    formatMonthYear(awarded, locale),
    t.certifications.statuses[status] ?? status,
  ].filter(Boolean);
  const host = hostOf(url);
  const image = certificateImage ?? logo;
  const descriptionText = description?.[language] || description?.en;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/40 p-4 backdrop-blur-md transition-opacity duration-200 ease-out motion-reduce:transition-none sm:p-6 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={trapFocus}
        className={`flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-y-auto overscroll-contain [scrollbar-width:thin] rounded-xl border border-[var(--line)] bg-[var(--panel-bg)] shadow-[var(--card-hover-shadow)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
          <h2
            id={titleId}
            data-plain
            className="text-[17px] font-semibold leading-snug text-[var(--ink)] sm:text-[19px]"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.certifications.close}
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--line)] text-[var(--ink-mid)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
          >
            <X size={15} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="px-5 pt-4 sm:px-6">
          <div className="flex items-center justify-center rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] p-2 sm:p-3">
            <img
              src={image}
              alt={`${title} certificate`}
              className="max-h-[42vh] w-auto max-w-full rounded-md object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
            {meta.join(" · ")}
          </p>

          {descriptionText && (
            <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{descriptionText}</p>
          )}

          {tags && tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-[var(--chip-bg)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-mid)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {url && host && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex w-fit items-center gap-2 rounded-md bg-[var(--cta-bg)] px-4 py-2.5 text-[13px] font-medium text-[var(--cta-ink)] transition-opacity duration-150 hover:opacity-90 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {t.certifications.verifyOn.replace("{host}", host)}
              <ArrowRight
                size={14}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CertificationModal;
