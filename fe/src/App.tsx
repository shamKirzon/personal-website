import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

const App = () => {
  const location = useLocation();
  const { pathname, hash } = location;

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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/visitors" element={<VisitorsPage />} />
      </Routes>

      {pathname !== "/visitors" && <Footer />}
      <BackToTopButton />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default App;
