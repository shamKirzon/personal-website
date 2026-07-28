const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates the scroll to the element with the given id over a fixed
 * duration (instead of the browser's native smooth-scroll, whose speed
 * is roughly constant px/sec and feels slow over long distances).
 */
export const scrollToId = (id: string, duration = 450) => {
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
