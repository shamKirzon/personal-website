import { motion, useScroll } from "motion/react";

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-white"
    />
  );
};

export default ReadingProgressBar;
