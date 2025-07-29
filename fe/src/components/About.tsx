import { motion } from "motion/react";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);

  return (
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
      className="flex justify-center mt-24 "
    >
      <div
        className="flex flex-col items-center gap-y-4  w-full  max-w-md
      md:items-start
      md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl"
      >
        <h1 className="text-black text-5xl font-bold mt-2 dark:text-white">
          About
        </h1>

        <p className=" text-center text-black text-lg leading-9  dark:text-white md:text-start">
          I'm Shammy Kierson Suyat, a Computer Science student living in Taguig
          City, Philippines. I’m currently focusing on full-stack development
          and have started exploring how to integrate AI into my projects.
        </p>
      </div>  
    </motion.div>
  );
};

export default About;
