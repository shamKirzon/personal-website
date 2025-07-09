import { motion, useInView } from "motion/react";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });


  return (
    // parent container
    <motion.div
    ref={ref}
       animate={isInView ? { rotate:360,  opacity: 1, y: 0 } : {}}
      initial={{ opacity: 0, y: 60 }}
      transition={{ duration: 1,
        repeat:1, 
        
       }}
    
    
    className="flex justify-center mt-24  ">
      {/* header, content */}
      <div className="flex flex-col items-center gap-y-4  w-full max-w-md">
        <h1 className="text-white text-5xl font-bold mt-2">About</h1>

        <p className="text-white text-lg text-center ">
          I'm Shammy Kierson Suyat, a Computer Science student living in Taguig
          City, Philippines. I’m currently focusing on full-stack development
          and starting to learn about AI and machine learning. I believe and
          hope that this path will have a meaningful impact on my future.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
