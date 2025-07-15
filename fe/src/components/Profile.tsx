import myProfile from "@/assets/images/profile.jpg";
import { Location, Download, Email } from "@/assets/icons/Icons";
import { motion } from "motion/react";
import { useRef } from "react";

const Profile = () => {
  const ref = useRef(null);

  const profileButtons = [
    {
      label: "Download CV",
      icon: <Download width="35" />,
    },
    {
      label: "Send Email",
      icon: <Email  className="w-8 h-7 "/>,
    },
  ];

  const downloadCV = () => {
    const URL = "/myCV-censored.pdf";
    const link = document.createElement("a");

    link.href = URL;
    link.download = "ShammyKiersonSuyat-CV";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendEmail = () => {
    window.location.href =
      "mailto:shammysuyat@gmail.com?subject=Visitors&body=Hi Shammy, I visited your web";
  };

  return (
    <>
      {/*Parent Container*/}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeIn",
          delay: 0.1,
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center mt-4 "
      >
        {/* Profile, Text Container */}
        <div className="flex flex-col items-center w-full max-w-md">
          <img
            src={myProfile}
            alt="Profile"
            className="w-50  object-cover rounded-md"
          />
          <h1 className="text-zinc-900 text-3xl font-bold mt-2 dark:text-white">
            Shammy Kierson Suyat
          </h1>

          {/* location */}

          <div className="flex items-center gap-x-1">
            <Location className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black dark:text-white" />

            <h1 className="text-zinc-900 text-lg dark:text-white">Taguig City, Philippines</h1>
          </div>
          <p className=" text-zinc-500 text-center text-lg leading-6 mt-2 ">
            Computer Science student focused on learning full-stack development.
          </p>

          {/* buttons */}
          <div className=" flex flex-col space-y-3 mt-6 w-full px-4">
            {profileButtons.map((button, index) => (
              <button
                key={index}
                className={`flex items-center justify-center gap-x-1 bg-zinc-900 p-[.45rem] border-2 rounded-lg ${
                  button.label === "Download CV"
                    ? "border-cyan-300 active:bg-cyan-500"
                    : "border-zinc-400 active:bg-zinc-800"
                } border-[.5px]
                 active:scale-95 
                transition duration-200
                `}
                onClick={() => {
                  if (button.label === "Download CV") downloadCV();
                  else sendEmail();
                }}
              >
                {button.icon}
                <span className="text-[1.09rem] text-white">
                  {button.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
