import { myTechStack } from "@/data/TechStack-data";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import kambing from "@/assets/kambing.jpg";

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center px-4 mt-20"
    >
      {/* Content container */}
      <div className="flex flex-col items-center w-full max-w-md gap-y-7">
        <h1 className="text-black text-5xl font-bold mt-2 dark:text-white">Tech Stack</h1>

        {/* tech stack list */}
        <div className="flex flex-wrap justify-center gap-3">
          {myTechStack.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1, // stagger effect
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, 5, -5, 0], // wiggle on hover
                transition: { duration: 1 },
              }}
              className="flex items-center gap-x-2 bg-zinc-600 text-white px-4 py-2 rounded-md cursor-pointer shadow-md"

            >
              <img
                src={obj.icons || kambing}
                alt={obj.title}
                className="h-6 rounded-xs"
              />
              <span className="font-medium text-md">{obj.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TechStack;


