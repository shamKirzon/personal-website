import { useState } from "react";
import { motion } from "motion/react";
import { work } from "@/data/Work-data";
import { education } from "@/data/Education-data";

const Experience = () => {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  return (
    <div className="flex justify-center py-16">
      <div className="flex flex-col w-full max-w-md gap-y-7 md:items-start md:max-w-3xl">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
            experience
          </p>
          <h2 className="text-foreground text-xl font-semibold">background</h2>
        </div>

        <div className="flex bg-card border border-border rounded-lg p-1 w-full max-w-xs">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "work"
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("work")}
          >
            Work
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "education"
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden w-full">
          {activeTab === "work"
            ? work.map((data, index) => (
                <motion.div
                  key={index}
                  className="flex gap-x-4 items-start p-5 border-b border-border-subtle last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-foreground text-sm font-semibold">
                        {data.name}
                      </span>
                      <span className="font-mono text-xs text-text-hint whitespace-nowrap shrink-0">
                        {data.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {data.position}
                    </p>
                    <ul className="flex flex-col gap-y-1.5">
                      {data.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground text-sm leading-relaxed pl-3.5 relative before:content-['▸'] before:absolute before:left-0 before:text-primary"
                        >
                          {desc.header.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            : education.map((data, index) => (
                <motion.div
                  key={index}
                  className="flex gap-x-4 items-start p-5 border-b border-border-subtle last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-foreground text-sm font-semibold">
                        {data.school}
                      </span>
                      <span className="font-mono text-xs text-text-hint whitespace-nowrap shrink-0">
                        {data.years}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {data.course}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
