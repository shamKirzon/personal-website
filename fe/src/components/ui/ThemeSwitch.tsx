import type { MouseEvent, ReactElement } from "react";
import type { ThemePreference } from "@/lib/preferences";

// Icons copied as-is from bryllim.com's theme switch.
const SystemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[13px] w-[13px]">
    <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const LightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[13px] w-[13px]">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const DarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[13px] w-[13px]">
    <path
      d="M20 13.6A8 8 0 1 1 10.4 4a6.2 6.2 0 0 0 9.6 9.6z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const OPTIONS: {
  value: ThemePreference;
  label: string;
  title: string;
  Icon: () => ReactElement;
}[] = [
  { value: "system", label: "System theme", title: "System", Icon: SystemIcon },
  { value: "light", label: "Light theme", title: "Light", Icon: LightIcon },
  { value: "dark", label: "Dark theme", title: "Dark", Icon: DarkIcon },
];

interface ThemeSwitchProps {
  value: ThemePreference;
  /** `origin` is where the reveal animation starts (the click point). */
  onChange: (value: ThemePreference, origin?: { x: number; y: number }) => void;
  className?: string;
}

// Start the reveal at the pointer; keyboard presses (no pointer position) use the button's center.
const originOf = (event: MouseEvent<HTMLButtonElement>) => {
  if (event.clientX || event.clientY) return { x: event.clientX, y: event.clientY };
  const rect = event.currentTarget.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

const ThemeSwitch = ({ value, onChange, className = "" }: ThemeSwitchProps) => (
  <div
    role="group"
    aria-label="Theme"
    className={`inline-flex shrink-0 items-center gap-px rounded-full border border-[var(--line)] p-[2px] ${className}`}
  >
    {OPTIONS.map(({ value: option, label, title, Icon }) => {
      const active = option === value;
      return (
        <button
          key={option}
          type="button"
          onClick={(event) => onChange(option, originOf(event))}
          aria-label={label}
          aria-pressed={active}
          title={title}
          className={`inline-flex h-[1.35rem] w-[1.35rem] cursor-pointer items-center justify-center rounded-full transition-[color,background-color] duration-200 hover:text-[var(--ink)] ${
            active ? "bg-[var(--chip-bg)] text-[var(--ink)]" : "text-[var(--text-hint)]"
          }`}
        >
          <Icon />
        </button>
      );
    })}
  </div>
);

export default ThemeSwitch;
