import { education } from "@/data/Education-data";
import { motion } from "framer-motion";

const Education = () => {
  return (
    // parent container
    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-full max-w-md gap-y-7">
        {/* header*/}
        <div className="flex flex-col">
          <h1 className="text-white h-10 text-5xl font-bold mt-2 text-center w-full">
            Education
          </h1>
          <h1 className="text-zinc-500 font-light text-3xl mt-2 text-center w-full">
            with Programming Experience
          </h1>
        </div>

        <div className="flex flex-col gap-y-5">
          {education.map((data, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* line */}
              {data.school === "University of Makati" && (
                <div className="absolute left-10 top-8 w-0.5 h-[12rem] bg-white z-0"></div>
              )}

              {/* content */}
              <div className="relative flex items-start gap-x-4 py-3 z-10">
                <img
                  src={data.icon}
                  alt={data.icon}
                  className="w-20 object-cover rounded-[3rem]"
                />

                <div className="flex flex-col">
                  <span className="text-white text-[1.4rem] font-medium">
                    {data.school}
                  </span>

                  <span className="text-zinc-400 text-lg mt-1">
                    {data.course}
                  </span>

                  <div className="bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700">
                    <p className="text-zinc-500 text-sm">{data.years}</p>
                  </div>
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
