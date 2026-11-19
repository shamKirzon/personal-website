import type { ReactNode } from "react";
import AnimatedContent from "./AnimatedContent";

// Scroll entrances, powered by React Bits' AnimatedContent (GSAP + ScrollTrigger).
// Kept subtle on purpose: a short rise and fade, played once. Reduced-motion users
// get the content immediately (handled inside AnimatedContent).

const SHARED = {
  distance: 24,
  duration: 0.7,
  ease: "power3.out",
  threshold: 0.1,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

/** Fades and lifts a whole block into place when it scrolls into view. */
export const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => (
  <AnimatedContent {...SHARED} delay={delay} className={className}>
    {children}
  </AnimatedContent>
);

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

/** Animates each direct child in turn (grids of cards, rows of pills). */
export const StaggerGroup = ({ children, className = "" }: StaggerGroupProps) => (
  <AnimatedContent {...SHARED} distance={16} duration={0.6} stagger={0.05} className={className}>
    {children}
  </AnimatedContent>
);

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** A plain wrapper for one staggered child. */
export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <div className={className}>{children}</div>
);
