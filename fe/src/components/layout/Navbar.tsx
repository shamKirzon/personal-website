import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/personal-website-logo.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/lib/preferences";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { useThemePreference } from "@/hooks/useThemePreference";
import { usePresence } from "@/hooks/usePresence";

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
  className?: string;
}

const LanguageToggle = ({ language, onToggle, className = "" }: LanguageToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Change language"
    className={`grid h-11 w-8 shrink-0 cursor-pointer place-items-center text-[15px] text-[var(--ink-mid)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-150 hover:scale-[1.05] hover:text-[var(--ink)] active:scale-[0.95] md:h-9 ${className}`}
  >
    {language === "en" ? "EN" : "FIL"}
  </button>
);

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const { mounted: menuMounted, visible: menuVisible } = usePresence(menuOpen, 320);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);
  const [themePreference, setThemePreference] = useThemePreference();
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.blog, to: "/blog" },
    { label: t.nav.visitors, to: "/visitors" },
    { label: t.nav.contact, to: "/#get-in-touch" },
  ];

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : to !== "#" && pathname.startsWith(to);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.classList.add("overflow-hidden");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Move focus into the panel when it opens and back to the trigger on close.
  useEffect(() => {
    if (menuOpen) {
      hasOpenedRef.current = true;
      closeButtonRef.current?.focus();
    } else if (hasOpenedRef.current) {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen, menuMounted]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      id="site-nav"
      className={`relative w-full ${menuMounted ? "z-[60]" : "z-10"}`}
    >
      <div className="mx-auto flex h-20 max-w-[760px] items-center justify-between px-5 sm:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-1.5">
          <img
            src={logo}
            alt="Shammy logo"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="font-pixel truncate text-[20px] uppercase tracking-tight text-[var(--ink)]">
            Shammy
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.to} className="relative">
                <Link
                  to={link.to}
                  className={`group relative inline-block py-1 text-[15px] transition-colors ${
                    isActive(link.to)
                      ? "font-medium text-[var(--ink)]"
                      : "text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"
                  }`}
                >
                  {link.label}
                  {!isActive(link.to) && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--ink-soft)] transition-transform duration-200 ease-out group-hover:scale-x-100"
                    />
                  )}
                </Link>
                {isActive(link.to) && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-[var(--ink)]"
                  />
                )}
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-4 w-px bg-[var(--line)]" />

          <ThemeSwitch value={themePreference} onChange={setThemePreference} />

          <LanguageToggle language={language} onToggle={toggleLanguage} />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="-mr-2 grid h-11 w-11 shrink-0 cursor-pointer place-items-center text-[var(--ink-mid)] transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-150 hover:text-[var(--ink)] active:scale-[0.9] md:hidden"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </div>

      {menuMounted && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
              menuVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={trapFocus}
            className={`fixed right-0 top-0 z-[70] flex h-full w-[78%] max-w-xs flex-col overscroll-contain border-l border-[var(--line-subtle)] bg-[var(--page-bg)] px-5 py-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
              menuVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center text-[var(--ink-mid)] transition-[color,transform] duration-150 hover:text-[var(--ink)] active:scale-[0.9]"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            <ul className="mt-4 flex flex-col">
              {links.map((link, index) => (
                <li
                  key={link.to}
                  style={{ transitionDelay: menuVisible ? `${120 + index * 45}ms` : "0ms" }}
                  className={`transition-[opacity,transform] duration-300 ease-out ${
                    menuVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-[44px] items-center text-[17px] transition-colors ${
                      isActive(link.to)
                        ? "font-medium text-[var(--ink)]"
                        : "text-[var(--ink-mid)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-3 border-t border-[var(--line-subtle)] pt-4">
              <ThemeSwitch value={themePreference} onChange={setThemePreference} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
