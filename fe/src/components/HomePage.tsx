import Profile from "./Profile"
import About from "./About"
import TechStack from "./TechStack"
import Education from "./Education"
import Work from "./Work"
import Project from "./Project"



const HomePage = () => {

  return (
    <div className="p-4">
        <Profile/>
        <About/>
        <TechStack/>
        <Education/> 
        <Work/>
        <Project/>
    </div>
  )
}

export default HomePage
