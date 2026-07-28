import { useEffect, useRef, useState } from "react";
import { CirclePlus, Search } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterDropdown = ({
  label,
  options,
  selected,
  onToggle,
  isOpen,
  onOpenChange,
}: FilterDropdownProps) => {
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const visibleOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-5 text-[15px] transition-colors sm:w-auto ${
          selected.length > 0
            ? "border-[var(--line-strong)] bg-[var(--overlay-strong)] text-[var(--ink)]"
            : "border-[var(--line-subtle)] bg-[var(--panel-bg)] text-[var(--ink)] shadow-[var(--panel-shadow)] hover:border-[var(--line-strong)]"
        }`}
      >
        <CirclePlus size={17} strokeWidth={1.5} />
        {label}
        {selected.length > 0 && (
          <span className="text-[13px] text-[var(--ink-mid)]">
            {selected.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel-bg)] shadow-xl">
          <div className="flex items-center gap-2 border-b border-[var(--line-subtle)] px-3">
            <Search size={15} strokeWidth={1.75} className="shrink-0 text-[var(--ink-faint)]" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={label}
              className="h-11 w-full bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
            />
          </div>

          <ul className="max-h-64 overflow-y-auto py-1">
            {visibleOptions.length === 0 ? (
              <li className="px-3.5 py-3 text-[13px] text-[var(--ink-faint)]">
                No matches.
              </li>
            ) : (
              visibleOptions.map((option) => {
                const isChecked = selected.includes(option.value);
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => onToggle(option.value)}
                      aria-pressed={isChecked}
                      className={`flex w-full items-center gap-3 px-3.5 py-2 text-left transition-colors ${
                        isChecked ? "bg-[var(--overlay-strong)]" : "hover:bg-[var(--overlay-soft)]"
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                          isChecked
                            ? "border-neutral-300 bg-neutral-300"
                            : "border-[var(--line-strong)] bg-transparent"
                        }`}
                      >
                        {isChecked && (
                          <span className="h-2 w-2 rounded-sm bg-black" />
                        )}
                      </span>
                      <span className="flex-1 truncate text-[14px] text-[var(--ink)]">
                        {option.label}
                      </span>
                      <span className="text-[13px] text-[var(--ink-faint)]">
                        {option.count}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
