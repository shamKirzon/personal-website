import { motion, type Variants } from "motion/react";

interface PillProps {
  children: React.ReactNode;
  variants?: Variants;
}

const Pill = ({ children, variants }: PillProps) => (
  <motion.span
    variants={variants}
    className="rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-3.5 py-2 font-mono text-[13px] text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
  >
    {children}
  </motion.span>
);

export default Pill;
