import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

// "Detail" pages (project/blog post) are one level deeper than their list
// pages. The page-transition animation only plays when drilling into a
// deeper page — returning to a shallower one (back link, browser back,
// or navigating between top-level pages) is instant, no animation.
const getRouteLevel = (pathname: string) =>
  pathname.startsWith("/projects/") || pathname.startsWith("/blog/") ? 1 : 0;

const EASE = [0.16, 1, 0.3, 1] as const;

// Variants are functions of `shouldAnimate` so that AnimatePresence can
// apply the CURRENT transition's intent to the exiting page too — without
// this, an exiting page would replay whatever transition it used when it
// was entered, animating its exit even during a "no animation" back nav.
const pageVariants = {
  initial: (shouldAnimate: boolean) => ({
    opacity: shouldAnimate ? 0 : 1,
    x: shouldAnimate ? 16 : 0,
  }),
  animate: (shouldAnimate: boolean) => ({
    opacity: 1,
    x: 0,
    transition: shouldAnimate
      ? { duration: 0.25, ease: EASE }
      : { duration: 0 },
  }),
  exit: (shouldAnimate: boolean) => ({
    opacity: shouldAnimate ? 0 : 1,
    x: shouldAnimate ? -16 : 0,
    transition: shouldAnimate
      ? { duration: 0.25, ease: EASE }
      : { duration: 0 },
  }),
};

const App = () => {
  const location = useLocation();
  const { pathname, hash } = location;
  const prefersReducedMotion = useReducedMotion();

  const currentLevel = getRouteLevel(pathname);
  const prevLevelRef = useRef(currentLevel);
  const shouldAnimate = currentLevel > prevLevelRef.current && !prefersReducedMotion;

  useEffect(() => {
    prevLevelRef.current = currentLevel;
  }, [pathname, currentLevel]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // Only reacts to actual page navigation, not hash changes on the same
    // page — those are handled separately (anchor scroll on HomePage, or
    // BackToTopButton's own smooth scroll when it clears a hash).
    if (hash) return;

    const frame = requestAnimationFrame(() => {
      const savedPosition = pathname === "/" ? scrollPositions[pathname] : undefined;
      window.scrollTo({ top: savedPosition ?? 0 });
    });

    return () => {
      cancelAnimationFrame(frame);
      scrollPositions[pathname] = window.scrollY;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[var(--page-bg)] transition-colors duration-150">
      <StarField />
      {/* <ChatBot /> */}
      <Navbar />

      <AnimatePresence mode="wait" initial={false} custom={shouldAnimate}>
        <motion.div
          key={pathname}
          custom={shouldAnimate}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
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
