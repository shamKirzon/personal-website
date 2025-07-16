import HomePage from "./components/HomePage";
import "./index.css";
import { useEffect, useState } from "react";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const [screenWidth, setScreenWidth] = useState<number | undefined>(window.innerWidth);
  const [lightMode, setLightMode] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`relative min-w-full min-h-screen bg-white dark:bg-zinc-900`}
      >
        <HomePage isLightMode={() => setLightMode((prev) => !prev)}/>
          <Toaster richColors  position="bottom-right" /> 
      </div>
        
      <div className="fixed bottom-0 left-0 w-full h-15 pointer-events-none bg-gradient-to-t  from-white dark:from-zinc-900 to-transparent"></div>
    </>
  );
};

export default App;
