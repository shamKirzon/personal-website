import type { ReactNode } from "react";

// Animation-free by design — these used to fade/slide content in on scroll.
// Kept as passthrough wrappers so callers don't need to change.

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className = "" }: RevealProps) => (
  <div className={className}>{children}</div>
);

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

export const StaggerGroup = ({ children, className = "" }: StaggerGroupProps) => (
  <div className={className}>{children}</div>
);

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <div className={className}>{children}</div>
);
