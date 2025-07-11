import Profile from "./Profile";
import About from "./About";
import TechStack from "./TechStack";
import Education from "./Education";
import Work from "./Work";
import Project from "./Project";
import BottomNav from "./BottomNav";

const HomePage = () => {
  return (
    <div className=" p-4">
     
         <div className=" z-20 fixed bottom-5 left-1/2 transform -translate-x-1/2">
         <BottomNav/>
      </div>

      <Profile />
      <About />
      <TechStack />
      <Education />
      <Project />
      <Work />
    </div>
  );
};

export default HomePage;
