import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.getElementById("site-nav");
    if (!nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
    );
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--line)] bg-[var(--panel-bg)] text-[var(--ink-soft)] shadow-lg transition-all duration-150 hover:scale-105 hover:border-[#22c55e]/45 hover:text-[#22c55e] active:scale-95"
    >
      <ChevronUp size={20} strokeWidth={2} />
    </button>
  );
};

export default BackToTopButton;
