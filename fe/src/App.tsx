import HomePage from "./components/HomePage";
import "./index.css";
import GetInTouch from "./components/GetInTouch";
import { useEffect, useState } from "react";

const App = () => {
  const [screenWidth, setScreenWidth] = useState<number | undefined>(
    window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative bg-zinc-900 min-w-full min-h-screen ">
        {screenWidth! < 640 ? <HomePage /> : <GetInTouch />}
      </div>

      <div className="fixed bottom-0 left-0 w-full h-15 pointer-events-none bg-gradient-to-t from-zinc-900 to-transparent"></div>
    </>
  );
};

export default App;
