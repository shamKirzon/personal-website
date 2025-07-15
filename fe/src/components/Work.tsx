import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { work } from "@/data/Work-data";
import { motion } from "framer-motion";

const Work = () => {
  return (
    // parent container
    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-full max-w-md gap-y-7">
        {/* header*/}
        <h1 className="text-black dark:text-white  text-5xl font-bold mt-2 text-center w-full">
          Work Experience
        </h1>

        <div className="flex flex-col gap-y-5">
          {work.map((data, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* line */}
              {data.name === "Lorem Itsum" && (
                <div className="absolute left-10 top-8 w-0.5 h-[19rem] bg-black dark:bg-white  z-0"></div>
              )}
              {/* content */}
              <div className="relative flex items-start gap-x-4 py-3 z-10">
                <img
                  src={data.image}
                  alt={data.image}
                  className="w-19 border-2 border-black dark:border-none object-cover rounded-[3rem]"
                />

                <div className="flex flex-col w-full">
                  <span className="text-black dark:text-white  text-[1.4rem] font-medium">
                    {data.name}
                  </span>

                  <span className=" text-zinc-400 text-lg mt-1">
                    {data.position}
                  </span>

                  <div className="bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700">
                    <p className="text-zinc-200 dark:text-zinc-500 text-sm">{data.year}</p>
                  </div>
                </div>
              </div>

              <div className="border-l-3 border-black dark:border-white ml-10 pl-10 mt-7 flex flex-col gap-y-5 relative">

                {data.description.map((desc, index) => (
                  <div key={index} className="relative">
                    {/* dot */}
                    <div className="absolute -left-[3.08rem] top-2 h-4 w-4  bg-black dark:bg-white rounded-full z-10" />

                    {/* accordion */}
                    <Accordion type="single" collapsible >
                      <AccordionItem value={`index-${index}`}>
                        <AccordionTrigger className="text-black dark:text-white text-lg">
                          {desc.header}
                        </AccordionTrigger>
                        <AccordionContent className="text-black dark:text-white text-lg">
                          {desc.content}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
