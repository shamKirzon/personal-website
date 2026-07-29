import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileSection from "@/components/sections/ProfileSection";
import CurrentlySection from "@/components/sections/CurrentlySection";
import RecentProjects from "@/components/sections/RecentProjects";
import StackSection from "@/components/sections/StackSection";
import GetInTouchSection from "@/components/sections/GetInTouchSection";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/scrollToId";

// Kept for reference — not part of the current design.
// import About from "@/components/About";
// import Experience from "@/components/Experience";
// import GetInTouch from "@/components/GetInTouch";

const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToId(hash.slice(1));
  }, [hash]);

  return (
    <main className="relative z-10">
      <ProfileSection />
      <Reveal>
        <CurrentlySection />
      </Reveal>
      <Reveal>
        <RecentProjects />
      </Reveal>
      <Reveal>
        <StackSection />
      </Reveal>
      <Reveal>
        <GetInTouchSection />
      </Reveal>

      {/* <About /> */}
      {/* <Experience /> */}
      {/* <GetInTouch /> */}
    </main>
  );
};

export default HomePage;
