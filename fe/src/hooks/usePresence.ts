import { useEffect, useState } from "react";

/**
 * Keeps an element mounted long enough to play its exit transition.
 *
 * - `mounted`: render the element while true.
 * - `visible`: drive the "open" classes with this (false on the first frame
 *   and while closing, so CSS transitions run both ways).
 */
export const usePresence = (open: boolean, exitMs = 200) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Wait a frame so the closed styles paint first and the transition runs.
      const frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [open, exitMs]);

  return { mounted, visible };
};
