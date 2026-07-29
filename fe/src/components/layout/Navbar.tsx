import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/images/personal-website-logo.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { applyTheme, getStoredTheme, type Language } from "@/lib/preferences";

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle = ({ isLight, onToggle, className = "" }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle theme"
    className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center text-[var(--ink-mid)] transition-all duration-150 hover:scale-[1.08] hover:text-[var(--ink)] active:scale-[0.92] md:h-9 md:w-9 ${className}`}
  >
    <span className="relative block h-[17px] w-[17px] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isLight ? "sun" : "moon"}
          initial={{ y: 16, rotate: 90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -16, rotate: -90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isLight ? (
            <Sun size={17} strokeWidth={1.5} />
          ) : (
            <Moon size={17} strokeWidth={1.5} />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  </button>
);

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
    className={`grid h-11 shrink-0 cursor-pointer place-items-center text-[var(--ink-mid)] transition-all duration-150 hover:scale-[1.05] hover:text-[var(--ink)] active:scale-[0.95] md:h-9 ${className}`}
  >
    <span className="relative block h-[17px] w-8 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={language}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center text-[15px]"
        >
          {language === "en" ? "EN" : "FIL"}
        </motion.span>
      </AnimatePresence>
    </span>
  </button>
);

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(() => getStoredTheme() === "light");
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.blog, to: "/blog" },
    { label: t.nav.visitors, to: "/visitors" },
    { label: t.nav.contact, to: "/#get-in-touch" },
  ];

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : to !== "#" && pathname.startsWith(to);

  const toggleTheme = () => {
    const next = !isLight;
    applyTheme(next ? "light" : "dark");
    setIsLight(next);
  };

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

  return (
    <header
      id="site-nav"
      className={`relative w-full ${menuOpen ? "z-[60]" : "z-10"}`}
    >
      <div className="mx-auto flex h-20 max-w-[760px] items-center justify-between px-5 sm:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-1.5">
          <img
            src={logo}
            alt="Shammy logo"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="truncate text-[20px] font-extrabold uppercase tracking-tight text-[var(--ink)]">
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
                  <motion.span
                    layoutId="nav-active-indicator"
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-[var(--ink)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-4 w-px bg-[var(--line)]" />

          <ThemeToggle isLight={isLight} onToggle={toggleTheme} />

          <LanguageToggle language={language} onToggle={toggleLanguage} />
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="-mr-2 grid h-11 w-11 shrink-0 cursor-pointer place-items-center text-[var(--ink-mid)] transition-all duration-150 hover:text-[var(--ink)] active:scale-[0.9] md:hidden"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[78%] max-w-xs flex-col border-l border-[var(--line-subtle)] bg-[var(--page-bg)] px-5 py-5 md:hidden"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center text-[var(--ink-mid)] transition-all duration-150 hover:text-[var(--ink)] active:scale-[0.9]"
                >
                  <X size={22} strokeWidth={1.75} />
                </button>
              </div>

              <ul className="mt-4 flex flex-col">
                {links.map((link) => (
                  <li key={link.to}>
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

              <div className="mt-auto flex items-center gap-2 border-t border-[var(--line-subtle)] pt-4">
                <ThemeToggle
                  isLight={isLight}
                  onToggle={toggleTheme}
                  className="-ml-2"
                />
                <LanguageToggle language={language} onToggle={toggleLanguage} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
