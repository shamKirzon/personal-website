import { myTechStack } from "@/data/TechStack-data";
import kambing from "@/assets/kambing.jpg"

const TechStack = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-start space-y-5">
      <h1
        className="
         text-white font-bold text-5xl"
      >
        Tech Stack
      </h1>

      {/* techStack container */}
      <div className="flex flex-wrap gap-3 p-3">

        {myTechStack.map((obj, index)=>(
            
            // techStacks box
            <div
            key={index}
            className=" flex items-center bg-[#3F3F46] p-1.5 rounded-md space-x-2">
                    <img src={obj.icons ? obj.icons : kambing } alt={obj.icons ? obj.icons : kambing }
                        className="h-9 rounded-sm "
                    />
                  <h1 className="text-lg font-medium text-white">{obj.title}</h1>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
