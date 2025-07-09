import Profile from "./Profile"
import About from "./About"
import TechStack from "./TechStack"


const HomePage = () => {

  return (
    <div className="p-4">
        <Profile/>
        <About/>
        <TechStack/>
    </div>
  )
}

export default HomePage
