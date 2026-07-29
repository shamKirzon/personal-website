import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/images/personal-website-logo.webp";

const links = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "Visitors", to: "/visitors" },
  { label: "Contact", to: "/#get-in-touch" },
];

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
    className={`grid h-11 w-11 shrink-0 place-items-center text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)] md:h-9 md:w-9 ${className}`}
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

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light"),
  );

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : to !== "#" && pathname.startsWith(to);

  const toggleTheme = () => {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
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
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-[15px] transition-colors ${
                    isActive(link.to)
                      ? "font-medium text-[var(--ink)]"
                      : "text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-4 w-px bg-[var(--line)]" />

          <ThemeToggle isLight={isLight} onToggle={toggleTheme} />

          <button
            type="button"
            aria-label="Change language"
            className="text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
          >
            EN
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="-mr-2 grid h-11 w-11 shrink-0 place-items-center text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)] md:hidden"
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
                  className="-mr-2 grid h-11 w-11 place-items-center text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
                >
                  <X size={22} strokeWidth={1.75} />
                </button>
              </div>

              <ul className="mt-4 flex flex-col">
                {links.map((link) => (
                  <li key={link.label}>
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
                <button
                  type="button"
                  aria-label="Change language"
                  className="grid h-11 min-w-11 place-items-center px-2 text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
                >
                  EN
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
