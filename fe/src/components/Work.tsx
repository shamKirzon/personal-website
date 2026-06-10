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
    <div className="flex justify-center mt-20">
      <div
        className="flex flex-col w-full max-w-md gap-y-7
      md:items-start
         md:min-w-md md:max-w-2xl md:gap-x-5 lg:max-w-4xl

      "
      >
        <h1 className="text-black dark:text-white  text-3xl md:text-5xl font-bold mt-2 text-center w-full md:text-start">
          Work Experience
        </h1>

        <div className="relative flex flex-col gap-y-5 w-full">
          <div className="absolute left-[29.5px] md:left-[35.5px] top-9 bottom-9 w-[3px] bg-black dark:bg-white z-0"></div>

          {work.map((data, index) => (
            <motion.div
              key={index}
              className="relative w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="relative  flex items-start gap-x-4 py-3 z-10 w-full">
                <img
                  src={data.image}
                  alt={data.image}
                  className="w-[59px] md:w-[71px] border-2 border-black dark:border-none object-cover rounded-[3rem]"
                />

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-black dark:text-white  text-lg md:text-[1.4rem] font-medium">
                    {data.name}
                  </span>

                  <span className=" text-zinc-400 text-base md:text-lg mt-1">
                    {data.position}
                  </span>

                  <div className="  block md:hidden bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700">
                    <p className="text-zinc-200 dark:text-zinc-500 text-sm whitespace-nowrap">
                      {data.year}
                    </p>
                  </div>
                </div>

                <div className=" hidden md:block justify-end bg-zinc-800 mt-2 w-fit py-1 px-3 rounded-md border border-zinc-700 md:ml-auto shrink-0">
                  <p className="text-zinc-200 dark:text-zinc-500 text-sm whitespace-nowrap">
                    {data.year}
                  </p>
                </div>
              </div>

              <div className="border-l-3 border-black dark:border-white ml-[29.5px] md:ml-[35.5px] pl-10 mt-7 flex flex-col gap-y-5 relative">
                {data.description.map((desc, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[3.08rem] top-2 h-4 w-4  bg-black dark:bg-white rounded-full z-10" />

                    <Accordion type="single" collapsible>
                      <AccordionItem value={`index-${index}`}>
                        <AccordionTrigger className="text-black    dark:text-white text-base md:text-lg w-full ">
                          <span>
                            {desc.header}
                            <span className="hidden md:inline">
                              {" "}
                              qui tempore aliquid
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-black dark:text-white text-base md:text-lg pt-2">
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
