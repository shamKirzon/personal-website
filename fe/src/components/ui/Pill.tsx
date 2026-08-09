interface PillProps {
  children: React.ReactNode;
}

const Pill = ({ children }: PillProps) => (
  <span className="rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-3.5 py-2 font-mono text-[13px] text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
    {children}
  </span>
);

export default Pill;
