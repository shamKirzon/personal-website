interface TagFilterPillProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

const TagFilterPill = ({
  label,
  count,
  active,
  onClick,
}: TagFilterPillProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
      active
        ? "border-[#22c55e]/45 bg-[#22c55e]/10 text-[#22c55e]"
        : "border-[var(--line)] bg-[var(--panel-bg)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
    }`}
  >
    {label}
    <span className={active ? "text-[#22c55e]/70" : "text-[var(--ink-faint)]"}>
      {count}
    </span>
  </button>
);

export default TagFilterPill;
