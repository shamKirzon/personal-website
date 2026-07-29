import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import VisitorsPage from "./pages/VisitorsPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import StarField from "./components/layout/StarField";
import BackToTopButton from "./components/ui/BackToTopButton";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

// Kept for reference — not part of the current design.
// import ChatBot from "./components/ChatBot";

// Remembers scroll position per pathname so returning to the homepage lands
// back where you were, while navigating to any other page starts at the top.
const scrollPositions: Record<string, number> = {};

const pageVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction * 16 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -16 }),
};

const App = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { pathname, hash } = location;
  const prefersReducedMotion = useReducedMotion();
  const direction = navigationType === "POP" ? -1 : 1;

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hash) return;

    const frame = requestAnimationFrame(() => {
      const savedPosition = pathname === "/" ? scrollPositions[pathname] : undefined;
      window.scrollTo({ top: savedPosition ?? 0 });
    });

    return () => {
      cancelAnimationFrame(frame);
      scrollPositions[pathname] = window.scrollY;
    };
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[var(--page-bg)] transition-colors duration-150">
      <StarField />
      {/* <ChatBot /> */}
      <Navbar />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/visitors" element={<VisitorsPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {pathname !== "/visitors" && <Footer />}
      <BackToTopButton />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default App;
