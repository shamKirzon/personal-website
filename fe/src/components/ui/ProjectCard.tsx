import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  name: string;
  app: string;
  description: string;
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
}: ProjectCardProps) => (
  <Link
    to={`/projects/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg)] shadow-[var(--panel-shadow)] transition-colors hover:border-[var(--line-strong)]"
  >
    <img
      src={image}
      alt={name}
      className="aspect-[16/10] w-full object-cover object-top"
    />

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
        {description}
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

export default ProjectCard;
