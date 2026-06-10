import {
  Home,
  Contact,
  Projects,
  DarkMode,
  LightMode,
} from "../assets/icons/Icons";
// import ChatBot from "./ChatBot";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface BottomNavProps {
  lightMode: () => void;
  ref: {
    profileRef: React.RefObject<HTMLDivElement | null>;
    aboutRef: React.RefObject<HTMLDivElement | null>;
    techRef: React.RefObject<HTMLDivElement | null>;
    educationRef: React.RefObject<HTMLDivElement | null>;
    projectRef: React.RefObject<HTMLDivElement | null>;
    workRef: React.RefObject<HTMLDivElement | null>;
    getInTouchRef: React.RefObject<HTMLDivElement | null>;
  };
}

const BottomNav = ({ lightMode, ref }: BottomNavProps) => {
  const [selfLightMode, setSelfLightMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex items-center justify-between bg-zinc-900 border border-cyan-500 rounded-full px-4 py-2 w-fit mx-auto gap-[0.80rem] shadow-[0_0_12px_3px_rgba(6,182,212,0.5)] transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-24 pointer-events-none"
      }`}
    >
      <button onClick={() => scrollTo(ref.profileRef)}>
        <Home width="30" />
      </button>

      <button onClick={() => scrollTo(ref.getInTouchRef)}>
        <Contact width="30" />
      </button>
      <button onClick={() => scrollTo(ref.projectRef)}>
        <Projects width="30" />
      </button>
      
      <div className="h-6 w-px bg-zinc-700 mx-2" />

      {/* <button className="lg:hidden">
        <ChatBot />
      </button> */}
      <button
        onClick={() => {
          lightMode();
          setSelfLightMode((prev) => !prev);
          document.documentElement.classList.toggle("dark");
        }}
      >
        {selfLightMode ? <DarkMode width="30" /> : <LightMode width="30" />}
      </button>
    </div>
  );
};

export default BottomNav;
