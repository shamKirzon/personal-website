import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { LocalizedText } from "@/data/Project-data";

interface ProjectCardProps {
  slug: string;
  name: string;
  app: LocalizedText;
  description: LocalizedText;
  image: string;
  technology: { name: string }[];
  year: number;
}

const ProjectCard = ({
  slug,
  name,
  description,
  image,
  technology,
  year,
}: ProjectCardProps) => {
  const { language } = useLanguage();

  return (
  <Link
    to={`/projects/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg)] shadow-[var(--panel-shadow)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-xl"
  >
    <div className="overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[16px] font-medium leading-tight text-[var(--ink)]">
          {name}
        </h3>
        <ArrowUpRight
          size={15}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0 text-[var(--ink-faint)] transition-colors group-hover:text-[var(--ink)]"
        />
      </div>

      <p className="line-clamp-2 text-[13px] leading-snug text-[var(--ink-mid)]">
        {description[language]}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {technology.slice(0, 2).map((tech) => (
          <span
            key={tech.name}
            className="rounded border border-[var(--line)] bg-[var(--chip-bg)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--ink)]"
          >
            {tech.name}
          </span>
        ))}
        <span className="rounded border border-[var(--line)] bg-[var(--chip-bg)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--ink)]">
          {year}
        </span>
      </div>
    </div>
  </Link>
  );
};

export default ProjectCard;
