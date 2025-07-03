import profile from "@/assets/images/profile.jpg";
import location from "@/assets/icons/location.svg";
import download from "@/assets/icons/download.svg";
import email from "@/assets/icons/email.svg";

import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";

type Props = {
  onFinish?: () => void;
};

const ProfileAnimation = ({ onFinish }: Props) => {
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const profileButtons = [
    { name: "Download CV", icon: download },
    { name: "Send Email", icon: email },
  ];


  return (
    <motion.div
     
        initial={{scale:1, y:0}}
        animate ={{scale: 0.6, y: -200}}
        transition={{ delay: 2, duration: 1, ease: "easeInOut" }}

      onAnimationComplete={() => {
        setAnimationFinished(true);
        if(onFinish) onFinish()
      }}

       className="flex items-center justify-center mt-[10rem] "
    >
      {/* content container */}
      <div className="w-[65rem] flex h-[19rem] space-x-8">
        <img src={profile} alt="Profile" className="h-[19rem] rounded-[1rem]" />

        {/* content */}
        <div
          className={`${
            animationFinished ? " mt-[1rem]" : "mt-[3rem]"
          } flex flex-col`}
        >
          <h1 className="text-white text-5xl font-bold">
            Shammy Kierson L. Suyat
          </h1>

          {/* svg, location */}
          <div className="flex mt-[.5rem]">
            <img src={location} alt="location icon" className="h-8" />

            <h1 className="text-white text-2xl bold">
              Taguig City, Philippines
            </h1>
          </div>

          <h1
            className={`${
              animationFinished ? "mt-[1rem]" : "mt-[3rem]"
            } text-3xl font-normal text-[#A1A1AA]`}
          >
            Computer Science student focused on learning full-stack development.
          </h1>

          {/* if motion complete */}
          {animationFinished && (
            <motion.div
              animate={{
                opacity: 1,
                y: 0,
              }}
              initial={{ opacity: 0, y: 50 }}
              transition={{
                duration: 1,
                ease: "backOut",
              }}
              className="flex space-x-10 "
            >
              {profileButtons.map((button, index) => (
                <Button
                  key={index}
                  className={` h-[4rem] mt-[2rem] bg-zinc-900 border border-2  ${
                    button.name === "Download CV"
                      ? "border-[#22D3EE]"
                      : "border-[#3F3F46]"
                  }`}
                >
                  <img
                    src={button.icon}
                    alt={button.icon}
                    className="h-[2.5rem] pr-[.5rem]"
                  />{" "}
                  <p className="text-xl">{button.name}</p>
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileAnimation;
