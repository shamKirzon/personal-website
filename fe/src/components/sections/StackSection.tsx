import { myTechStack } from "@/data/TechStack-data";
import Pill from "../ui/Pill";
import { StaggerGroup, itemVariants } from "../ui/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

const StackSection = () => {
  const { language, t } = useLanguage();

  return (
  <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-16">
    <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
      {t.stack.label}
    </p>

    <div className="flex flex-col gap-7">
      {myTechStack.map((group) => (
        <div key={group.category.en}>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
            {group.category[language]}
          </p>
          <StaggerGroup className="flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <Pill key={item.title} variants={itemVariants}>
                {item.title}
              </Pill>
            ))}
          </StaggerGroup>
        </div>
      ))}
    </div>
  </section>
  );
};

export default StackSection;
