import { motion } from "framer-motion";
import { project } from "../data/Project-data";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

const Project = () => {
  return (
    // parent container
    <div className="flex justify-center mt-20 px-3">
      <div className="flex flex-col w-full max-w-md gap-y-15">
        {/* header*/}
        <div className="flex flex-col">
          <h1 className="text-black dark:text-white h-10 text-5xl font-bold mt-2 text-center w-full">
            Project
          </h1>
        </div>

        {/* content */}
        <div className="flex flex-col items-center flex-wrap  gap-y-20">
          {/* project container */}
          {project.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col gap-y-5 "
            >
              <div className="flex justify-center items-center px-3 py-1 ml-auto rounded-sm bg-zinc-700  backdrop-blur-md  shadow-md">
                <span className=" text-white">{data.app}</span>
              </div>

              <div className="flex flex-col rounded-b-lg bg-zinc-700 backdrop-blur-md border  shadow-md pb-5">
                <img src={data.image} alt="" className="h-50 w-full" />

                <Accordion type="single" collapsible className="mt-3">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className=" flex items-center text-white w-full pr-4 group">
                      <div className="w-55 pl-3 pb-6">
                        <h1 className=" text-start font-bold text-white leading-7 text-[1.8rem]  mt-2">
                          {data.name}
                        </h1>
                      </div>

                      <ChevronDown
                        size={30}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180"
                      />
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      {/* description */}
                      <div className="flex px-4">
                        <p className="text-white leading-5">
                          {data.description}
                        </p>
                      </div>

                      {/* tech stack */}
                      <div className="flex flex-wrap p-4 gap-2">
                        {data.technology.map((technology, index) => (
                          <p
                            key={index}
                            className="text-white py-1 px-2 font-medium rounded-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
                          >
                            {technology.name}
                          </p>
                        ))}
                      </div>

                      {/* buttons */}
                      {data.buttons.map((button, index) => (
                        <div className="flex justify-center  w-full text-black mt-5">
                          <a
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="flex justify-center items-center p-1 bg-white rounded-md">
                              <button.icon width="30" />
                              <span className="font-bold">{button.label}</span>
                            </button>
                          </a>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
