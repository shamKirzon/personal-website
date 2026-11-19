import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Certification } from "@/data/Certifications-data";

interface CertificationCardProps extends Pick<Certification, "title" | "issuer" | "logo"> {
  /** Resting tilt in degrees; the card straightens on hover. */
  tilt?: number;
  viewLabel: string;
  onOpen: () => void;
}

const CertificationCard = ({
  title,
  issuer,
  logo,
  tilt = 0,
  viewLabel,
  onOpen,
}: CertificationCardProps) => (
  <button
    type="button"
    onClick={onOpen}
    aria-haspopup="dialog"
    aria-label={`${title}, ${issuer}. ${viewLabel}`}
    style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    className="group relative flex h-full w-full cursor-pointer flex-col items-center rounded-xl border border-[var(--line-subtle)] bg-gradient-to-b from-[var(--surface-muted)] to-[var(--page-bg)] px-3.5 py-5 text-center shadow-[var(--panel-shadow)] transition-[transform,border-color,box-shadow] duration-200 ease-out rotate-[var(--tilt)] hover:-translate-y-[3px] hover:rotate-0 hover:border-[var(--line-strong)] hover:shadow-[var(--card-hover-shadow)] motion-reduce:rotate-0 motion-reduce:hover:translate-y-0"
  >
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[6px] rounded-lg border border-[var(--line-hairline)] transition-colors group-hover:border-[var(--line)]"
    />

    <img
      src={logo}
      alt=""
      loading="lazy"
      className="relative h-9 w-9 rounded-md border border-[var(--line)] bg-white object-contain"
    />

    <h3 className="relative mt-3 text-[13px] font-semibold leading-snug text-[var(--ink)]">
      {title}
    </h3>
    <p className="relative mt-1 font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-faint)]">
      {issuer}
    </p>

    <div className="relative mt-auto flex items-center gap-1.5 pt-3 text-[var(--ink-faint)] transition-colors group-hover:text-[var(--ink)]">
      <ChevronLeft size={10} strokeWidth={2} aria-hidden />
      <span className="font-mono text-[9px] uppercase tracking-[0.16em]">{viewLabel}</span>
      <ChevronRight size={10} strokeWidth={2} aria-hidden />
    </div>
  </button>
);

export default CertificationCard;
