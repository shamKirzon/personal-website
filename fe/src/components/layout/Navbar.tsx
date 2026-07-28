import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/images/personal-website-logo.webp";

const links = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "Visitors", to: "/visitors" },
  { label: "Contact", to: "/#get-in-touch" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  // Lazy-init from the class the index.html FOUC-prevention script already applied.
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light"),
  );

  // "/" must match exactly; section routes stay active on their detail pages.
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : to !== "#" && pathname.startsWith(to);

  const toggleTheme = () => {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
    setIsLight(next);
  };

  return (
    <header id="site-nav" className="relative z-10 w-full">
      <div className="mx-auto flex h-20 max-w-[760px] items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-1.5">
          <img
            src={logo}
            alt="Shammy logo"
            className="h-6 w-6 object-contain"
          />
          <span className="text-[16px] font-extrabold uppercase tracking-tight text-[var(--ink)]">
            Shammy
          </span>
        </Link>

        <nav className="flex items-center gap-5">
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

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative h-[17px] w-[17px] overflow-hidden text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isLight ? (
                <motion.span
                  key="sun"
                  initial={{ y: 16, rotate: 90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -16, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun size={17} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ y: 16, rotate: 90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -16, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon size={17} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            aria-label="Change language"
            className="text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
          >
            EN
          </button>

          <span aria-hidden className="h-4 w-px bg-[var(--line)]" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
