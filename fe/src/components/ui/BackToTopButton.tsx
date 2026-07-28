import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--panel-bg)] text-[var(--ink-soft)] shadow-lg transition-colors hover:border-[#22c55e]/45 hover:text-[#22c55e]"
        >
          <ChevronUp size={20} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
