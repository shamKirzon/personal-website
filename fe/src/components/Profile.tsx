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
      icon: <Email className="w-8 h-7 " />,
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
        className=" flex justify-center mt-4"
      >

        <div className="flex   flex-col items-center w-full max-w-md md:flex-row md:items-start
         md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl lg:items-center ">
          <img
            src={myProfile}
            alt="Profile"
            className="w-50  object-cover rounded-md md:w-40"
          />

          
          <div className="flex flex-col  items-center md:items-start">
            <h1 className="text-zinc-900 text-3xl font-bold mt-2 dark:text-white">
              Shammy Kierson Suyat
            </h1>



            <div className="flex items-center gap-x-1">
              <Location className="w-5 h-5  text-black dark:text-white" />

              <h1 className="text-zinc-900 text-lg dark:text-white">
                Taguig City, Philippines
              </h1>
            </div>
            <p className=" text-zinc-500 text-center text-lg leading-6 mt-2 md:text-start">
              Computer Science student focused on learning full-stack
              development.
            </p>

            <div className=" hidden  md:flex w-full md:mt-7 md:gap-x-5 lg:mt-10">
              {profileButtons.map((button, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-center gap-x-1 bg-zinc-900 px-2 py-1 lg:px-2 lg:py-2 border-2 rounded-sm ${
                    button.label === "Download CV"
                      ? "border-cyan-500 active:bg-cyan-500"
                      : "border-zinc-00 active:bg-zinc-800"
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
                  <span className="text-md text-white">
                    {button.label}
                  </span>
                </button>
              ))}
            </div>
          </div>


          <div className="flex md:hidden  flex-col space-y-3 mt-6 w-full px-4 ">
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
