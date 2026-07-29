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
    className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-150 hover:scale-[1.04] active:scale-[0.96] ${
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
