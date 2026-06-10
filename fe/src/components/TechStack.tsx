import { myTechStack } from "@/data/TechStack-data";

import kambing from "@/assets/kambing.jpg";

const TechStack = () => {
  return (
    <div className="flex flex-col items-center px-4 mt-20">

      <div className="flex flex-col items-center w-full max-w-md gap-y-7 md:items-start
      md:gap-y-5 
      md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl
        
      ">
        <h1 className="text-black text-3xl md:text-5xl font-bold mt-2 dark:text-white">Tech Stack</h1>

        
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {myTechStack.map((obj, index) => (
            <div
              key={index}
              className="flex items-center gap-x-2 bg-zinc-600 text-white px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-zinc-500"
            >
              <img
                src={obj.icons || kambing}
                alt={obj.title}
                className="h-6 rounded-xs"
              />
              <span className="font-medium text-md">{obj.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;


