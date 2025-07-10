import Profile from "./Profile"
import About from "./About"
import TechStack from "./TechStack"
import Education from "./Education"


const HomePage = () => {

  return (
    <div className="p-4">
        <Profile/>
        <About/>
        <TechStack/>
        <Education/> 
    </div>
  )
}

export default HomePage
