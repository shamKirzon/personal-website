import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { project } from "@/data/Project-data";
import ProjectCard from "../ui/ProjectCard";
import IconButton from "../ui/IconButton";
import FilterDropdown, { type FilterOption } from "../ui/FilterDropdown";

const GAP_REM = 1;

const perViewFor = (width: number) => (width < 640 ? 1 : width < 1024 ? 2 : 3);

const buildOptions = (values: string[]): FilterOption[] => {
  const counts = values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, label: value, count }));
};

const techOptions = buildOptions(
  project.flatMap((item) => item.technology.map((tech) => tech.name)),
);
const yearOptions = buildOptions(project.map((item) => String(item.year))).sort(
  (a, b) => Number(b.value) - Number(a.value),
);

const RecentProjects = () => {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(() => perViewFor(window.innerWidth));

  const [openFilter, setOpenFilter] = useState<"tech" | "year" | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setPerView(perViewFor(window.innerWidth));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleTech = (value: string) => {
    setSelectedTechs((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
    setIndex(0);
  };

  const toggleYear = (value: string) => {
    setSelectedYear((prev) => (prev === value ? null : value));
    setIndex(0);
  };

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return project.filter((item) => {
      const haystack = [item.name, item.app, item.description, ...item.technology.map((t) => t.name)]
        .join(" ")
        .toLowerCase();
      const matchesQuery = search === "" || haystack.includes(search);

      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.every((selected) =>
          item.technology.some((tech) => tech.name === selected),
        );

      const matchesYear = !selectedYear || String(item.year) === selectedYear;

      return matchesQuery && matchesTech && matchesYear;
    });
  }, [query, selectedTechs, selectedYear]);

  const maxIndex = Math.max(0, filtered.length - perView);
  const clampedIndex = Math.min(index, maxIndex);

  return (
    <section className="mx-auto max-w-[760px] px-5 pt-16">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
        Recent Projects
      </p>

      <div className="relative z-10 mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
          }}
          placeholder="Filter projects..."
          className="h-11 flex-1 rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)]"
        />

        <div className="flex gap-3">
          <FilterDropdown
            label="Tech"
            options={techOptions}
            selected={selectedTechs}
            onToggle={toggleTech}
            isOpen={openFilter === "tech"}
            onOpenChange={(open) => setOpenFilter(open ? "tech" : null)}
          />
          <FilterDropdown
            label="Year"
            options={yearOptions}
            selected={selectedYear ? [selectedYear] : []}
            onToggle={toggleYear}
            isOpen={openFilter === "year"}
            onOpenChange={(open) => setOpenFilter(open ? "year" : null)}
          />
        </div>
      </div>

      <div className="relative">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-[15px] text-[var(--ink-faint)]">
            No projects match these filters.
          </p>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                gap: `${GAP_REM}rem`,
                transform: `translateX(calc(${-clampedIndex} * (100% + ${GAP_REM}rem) / ${perView}))`,
              }}
            >
              {filtered.map((item) => (
                <div
                  key={item.slug}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(perView - 1) * GAP_REM}rem) / ${perView})`,
                  }}
                >
                  <ProjectCard
                    slug={item.slug}
                    name={item.name}
                    app={item.app}
                    description={item.description}
                    image={item.image}
                    technology={item.technology}
                    year={item.year}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <IconButton
          label="Previous project"
          disabled={clampedIndex === 0}
          onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
          className="absolute right-full top-1/2 z-10 mr-3 -translate-y-1/2"
        >
          <ArrowLeft size={17} strokeWidth={1.75} />
        </IconButton>

        <IconButton
          label="Next project"
          disabled={clampedIndex >= maxIndex}
          onClick={() => setIndex((prev) => Math.min(maxIndex, prev + 1))}
          className="absolute left-full top-1/2 z-10 ml-3 -translate-y-1/2"
        >
          <ArrowRight size={17} strokeWidth={1.75} />
        </IconButton>
      </div>
    </section>
  );
};

export default RecentProjects;
