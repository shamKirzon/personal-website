import { Sun } from "lucide-react";
import {
  Home,
  Contact,
  Projects,
  DarkMode,
  LightMode,
} from "../assets/icons/Icons";
import type React from "react";
import { useState } from "react";

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

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-cyan-500 rounded-full px-4 py-2 w-fit mx-auto gap-[0.80rem] shadow-[0_0_12px_3px_rgba(6,182,212,0.5)]">
      <button onClick={() => scrollTo(ref.profileRef)}>
        <Home width="30"  />
      </button>

      <button onClick={() => scrollTo(ref.getInTouchRef)}>
        <Contact width="30" />
      </button>
      <button onClick={() => scrollTo(ref.projectRef)}>
        <Projects width="30" />
      </button>
      {/* Divider */}
      <div className="h-6 w-px bg-zinc-700 mx-2" />

      <button
        onClick={() => {
          lightMode();
          setSelfLightMode((prev) => !prev);
          document.documentElement.classList.toggle("dark")
        }}
      >
        {selfLightMode ? <DarkMode width="30" /> : <LightMode width="30" />}
      </button>
    </div>
  );
};

export default BottomNav;
