import { education } from "@/data/Education-data";
import { motion } from "framer-motion";

const Education = () => {
  return (

    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-full max-w-md gap-y-7  md:items-start
     md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl
      
">
        <div className="flex flex-col">
          <h1 className="text-black dark:text-white h-10 text-5xl font-bold mt-2 text-center w-full">
            Education
          </h1>
        </div>

        <div className="flex flex-col gap-y-5 w-full">
          {education.map((data, index) => (
            <motion.div
              key={index}
              className="relative w-full "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >

              {data.school === "University of Makati" && (
                <div className="absolute left-10 top-8 w-0.5 h-[12rem] md:h-[11rem] bg-black dark:bg-white z-0"></div>
              )}


              <div className="relative flex items-start gap-x-4 py-3 z-10 w-full ">
                 <img
                  src={data.image}
                  alt={data.image}
                  className="w-19 object-cover rounded-[3rem]"
                />

                <div className="flex flex-col ">
                  <span className="text-black dark:text-white text-[1.4rem] font-medium">
                    {data.school}
                  </span>

                  <span className="text-zinc-400 text-lg mt-1">
                    {data.course}
                  </span>

                  <div className="md:hidden bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700">
                    <p className="text-zinc-300 dark:text-zinc-500 text-sm">{data.years}</p>
                  </div>
                </div>

                 <div className=" hidden md:block justify-end bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700 md:ml-auto">
                    <p className="text-zinc-300 dark:text-zinc-500 text-sm">{data.years}</p>
                  </div>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
