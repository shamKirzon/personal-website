import Profile from "./Profile";
import About from "./About";
import TechStack from "./TechStack";
import Education from "./Education";
import Work from "./Work";
import Project from "./Project";
import BottomNav from "./BottomNav";
import ChatBot from "./ChatBot";

import { useEffect, useRef, useState } from "react";
import GetInTouch from "./GetInTouch";


interface Props{
  isLightMode: () => void;
}

const HomePage = ({isLightMode}: Props) => {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const techRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const getInTouchRef = useRef<HTMLDivElement | null>(null);

 
  return (
    <div className="relative  p-4">
       <div className="hidden lg:block">
         <ChatBot />
       </div>

      <div className="flex  z-20 fixed bottom-5 left-1/2 transform -translate-x-1/2">
          
        <BottomNav
          lightMode={isLightMode}
          ref={{
            profileRef,
            aboutRef,
            techRef,
            educationRef,
            projectRef,
            workRef,
             getInTouchRef
          }}
        />
      </div>

      <div ref={profileRef}>
        <Profile />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={techRef}>
        <TechStack />
      </div>
      <div ref={educationRef}>
        <Education />
      </div>
      <div ref={projectRef}>
        <Project />
      </div>
      <div ref={workRef}>
        <Work />
      </div>
      <div className="pb-20" ref={ getInTouchRef}>
        <GetInTouch />
      </div>
    </div>
  );
};

export default HomePage;
