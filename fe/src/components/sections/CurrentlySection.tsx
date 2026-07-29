import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { previousRoles } from "@/data/PreviousRoles-data";
import RoleEntry from "../ui/RoleEntry";
import { SiTypescript, SiReact, SiNodedotjs, SiTailwindcss } from "react-icons/si";

const stackIcons = [
  { Icon: SiTypescript, alt: "TypeScript" },
  { Icon: SiReact, alt: "React" },
  { Icon: SiNodedotjs, alt: "Node.js" },
  { Icon: SiTailwindcss, alt: "Tailwind CSS" },
];

const CurrentlySection = () => {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false);

  return (
    <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-12">
      <div className="rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] p-5 shadow-[var(--panel-shadow)]">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]" />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#22c55e]">
            Currently
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[24px] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
              Computer Science Student
            </h2>
            <p className="mt-0.5 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--ink-mid)]">
              2023 - Present
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-0.5 sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[var(--ink)]">
                University of Makati
              </span>
            </div>
            <span className="text-[15px] text-[var(--ink-mid)]">Taguig City</span>
          </div>
        </div>

        <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[var(--ink-mid)]">
          Building full-stack web applications with React, Node.js and
          PostgreSQL, while growing a specialization in agentic AI
          application architecture.
        </p>

        <div className="mt-3 flex items-center gap-2.5">
          {stackIcons.map(({ Icon, alt }) => (
            <Icon key={alt} title={alt} size={16} className="text-[var(--ink)]" />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowPreviousRoles((prev) => !prev)}
        aria-expanded={showPreviousRoles}
        className="mt-6 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel-bg)] px-4 py-2 text-[14px] text-[var(--ink)] transition-all duration-150 hover:scale-[1.02] hover:border-[var(--line-strong)] hover:bg-[var(--hover-bg)] hover:font-semibold hover:text-[var(--ink)]"
      >
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-[var(--ink-mid)] transition-transform duration-300 ${
            showPreviousRoles ? "rotate-180" : ""
          }`}
        />
        Previous roles
      </button>

      <AnimatePresence initial={false}>
        {showPreviousRoles && (
          <motion.div
            key="previous-roles"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.ul
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-col gap-9 border-l border-[var(--line-hairline)] pl-6"
            >
              {previousRoles.map((role) => (
                <RoleEntry key={role.title} {...role} />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CurrentlySection;
