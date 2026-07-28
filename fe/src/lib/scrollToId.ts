const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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
