import ProfileAnimation from "./ProfileAnimation";
import { useState } from "react";
import { motion } from "framer-motion"; // (if not imported globally)

const HomePage = () => {
  const [showNext, setShowNext] = useState(false);

  return (
    <div className=" flex flex-col h-screen w-screen">
      <ProfileAnimation onFinish={() => setShowNext(true)} />

      {showNext && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: -150 }}
          transition={{ duration: 0.8 }}
          className="ml-[28rem] space-y-5"
        >
          <h1 className="text-white font-bold text-5xl">About</h1>

          <p className="text-white text-light leading-relaxed w-2xl">
            I'm Shammy Kierson Suyat, a Computer Science student living in
            Taguig City, Philippines. I’m currently focusing on full-stack
            development and starting to learn about AI and machine learning. I
            believe and hope that this path will have a meaningful impact on my
            future.
          </p>

          
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
