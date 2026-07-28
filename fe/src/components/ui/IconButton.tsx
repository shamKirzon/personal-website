interface IconButtonProps {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const IconButton = ({
  children,
  label,
  onClick,
  disabled,
  className = "",
}: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-subtle)] bg-[var(--panel-bg)] text-[var(--ink-soft)] shadow-[var(--panel-shadow)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--line-subtle)] disabled:hover:text-[var(--ink-soft)] ${className}`}
  >
    {children}
  </button>
);

export default IconButton;
