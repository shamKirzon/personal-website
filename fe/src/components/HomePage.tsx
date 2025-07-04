import ProfileAnimation from "./ProfileAnimation";
import { useState } from "react";
import { motion } from "framer-motion"; // (if not imported globally)
import TechStack from "./TechStack";

const HomePage = () => {
  const [showNext, setShowNext] = useState(false);

  return (
    <div className="flex flex-col justify-center min-w-full">
      <ProfileAnimation onFinish={() => setShowNext(true)} />

      {showNext && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: -150 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 w-full "
          >
            {/* line */}
            <div className="max-w-2xl mx-auto flex flex-col items-start space-y-5 p-3">
              <h1
                className="
         text-white font-bold text-5xl"
              >
                About
              </h1>

           <p className="text-white font-light leading-relaxed w-full max-w-2xl">

                I'm Shammy Kierson Suyat, a Computer Science student living in
                Taguig City, Philippines. I’m currently focusing on full-stack
                development and starting to learn about AI and machine learning.
                I believe and hope that this path will have a meaningful impact
                on my future.
              </p>

              {/* line */}
              <div className="mt-5 mx-auto h-[0.04rem] w-full max-w-3xl bg-[#3F3F46]" />

            </div>

            <TechStack/>
          </motion.div>
        </>



      )}
            

    </div>
  );
};

export default HomePage;
