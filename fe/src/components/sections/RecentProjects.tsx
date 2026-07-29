import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { project } from "@/data/Project-data";
import ProjectCard from "../ui/ProjectCard";
import IconButton from "../ui/IconButton";
import FilterDropdown, { type FilterOption } from "../ui/FilterDropdown";
import { useLanguage } from "@/i18n/LanguageContext";

const GAP_REM = 1;
const DESKTOP_PER_VIEW = 3;
const DOT_THRESHOLD = 6;
const HINT_SESSION_KEY = "recent-projects-carousel-hint-shown";

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

  const [openFilter, setOpenFilter] = useState<"tech" | "year" | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const hasPlayedHint = useRef(false);
  const { language, t } = useLanguage();

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
      const haystack = [
        item.name,
        item.app[language],
        item.description[language],
        ...item.technology.map((tech) => tech.name),
      ]
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
  }, [query, selectedTechs, selectedYear, language]);

  const hasResults = filtered.length > 0;
  const maxIndex = Math.max(0, filtered.length - DESKTOP_PER_VIEW);
  const clampedIndex = Math.min(index, maxIndex);

  useEffect(() => {
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [query, selectedTechs, selectedYear]);

  // Swipe hint, once per session on first scroll into view.
  useEffect(() => {
    if (!hasResults) return;
    if (sessionStorage.getItem(HINT_SESSION_KEY)) return;

    const node = trackRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedHint.current && node.children.length > 1) {
          hasPlayedHint.current = true;
          setShowHint(true);
          sessionStorage.setItem(HINT_SESSION_KEY, "1");
          window.setTimeout(() => setShowHint(false), 900);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasResults]);

  useEffect(() => {
    if (!hasResults) return;
    const node = trackRef.current;
    if (!node) return;

    const onScroll = () => {
      const children = Array.from(node.children) as HTMLElement[];
      const scrollCenter = node.scrollLeft + node.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, childIndex) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(childCenter - scrollCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = childIndex;
        }
      });
      setActiveIndex(closest);
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => node.removeEventListener("scroll", onScroll);
  }, [hasResults]);

  const scrollToIndex = (targetIndex: number) => {
    const node = trackRef.current;
    const child = node?.children[targetIndex] as HTMLElement | undefined;
    if (!node || !child) return;
    node.scrollTo({
      left: child.offsetLeft - (node.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const goPrevSlide = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNextSlide = () => scrollToIndex(Math.min(filtered.length - 1, activeIndex + 1));

  const onTrackKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevSlide();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNextSlide();
    }
  };

  return (
    <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-16">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
        {t.recentProjects.label}
      </p>

      <div className="relative z-20 mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
          }}
          placeholder={t.recentProjects.searchPlaceholder}
          className="h-11 w-full min-w-0 rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)] md:flex-1"
        />

        <div className="flex gap-3">
          <FilterDropdown
            label={t.recentProjects.techFilter}
            options={techOptions}
            selected={selectedTechs}
            onToggle={toggleTech}
            isOpen={openFilter === "tech"}
            onOpenChange={(open) => setOpenFilter(open ? "tech" : null)}
          />
          <FilterDropdown
            label={t.recentProjects.yearFilter}
            options={yearOptions}
            selected={selectedYear ? [selectedYear] : []}
            onToggle={toggleYear}
            isOpen={openFilter === "year"}
            onOpenChange={(open) => setOpenFilter(open ? "year" : null)}
          />
        </div>
      </div>

      <div className="relative">
        {!hasResults ? (
          <p className="py-10 text-center text-[15px] text-[var(--ink-faint)]">
            {t.recentProjects.noResults}
          </p>
        ) : (
          <>
            {/* Desktop: static row, paged by arrows. */}
            <div className="hidden lg:block">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    gap: `${GAP_REM}rem`,
                    transform: `translateX(calc(${-clampedIndex} * (100% + ${GAP_REM}rem) / ${DESKTOP_PER_VIEW}))`,
                  }}
                >
                  {filtered.map((item) => (
                    <div
                      key={item.slug}
                      className="shrink-0"
                      style={{
                        width: `calc((100% - ${(DESKTOP_PER_VIEW - 1) * GAP_REM}rem) / ${DESKTOP_PER_VIEW})`,
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

              <IconButton
                label="Previous project"
                disabled={clampedIndex === 0}
                onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
                className="absolute top-1/2 right-full z-10 mr-3 -translate-y-1/2"
              >
                <ArrowLeft size={17} strokeWidth={1.75} />
              </IconButton>

              <IconButton
                label="Next project"
                disabled={clampedIndex >= maxIndex}
                onClick={() => setIndex((prev) => Math.min(maxIndex, prev + 1))}
                className="absolute top-1/2 left-full z-10 ml-3 -translate-y-1/2"
              >
                <ArrowRight size={17} strokeWidth={1.75} />
              </IconButton>
            </div>

            {/* Mobile & tablet: swipeable carousel. */}
            <div className="lg:hidden">
              <motion.div
                ref={trackRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Recent projects"
                tabIndex={0}
                onKeyDown={onTrackKeyDown}
                animate={showHint ? { x: [0, -18, 0] } : { x: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[9%] py-1 outline-none sm:px-[19%]"
              >
                {filtered.map((item, itemIndex) => (
                  <div
                    key={item.slug}
                    onClickCapture={(event) => {
                      if (itemIndex !== activeIndex) {
                        event.preventDefault();
                        event.stopPropagation();
                        scrollToIndex(itemIndex);
                      }
                    }}
                    className="w-[82%] shrink-0 snap-center sm:w-[62%]"
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
              </motion.div>

              {filtered.length > 1 && activeIndex === filtered.length - 1 && (
                <IconButton
                  label="Back to first project"
                  onClick={() => scrollToIndex(0)}
                  className="absolute left-1 top-1/2 z-10 -translate-y-1/2"
                >
                  <ArrowLeft size={17} strokeWidth={1.75} />
                </IconButton>
              )}

              {filtered.length > 1 && (
                <div className="mt-6 flex items-center justify-center">
                  {filtered.length <= DOT_THRESHOLD ? (
                    <div className="flex items-center gap-2">
                      {filtered.map((item, dotIndex) => (
                        <button
                          key={item.slug}
                          type="button"
                          aria-label={`Go to ${item.name}`}
                          onClick={() => scrollToIndex(dotIndex)}
                          className={`h-1.5 cursor-pointer rounded-full transition-all duration-200 hover:scale-125 active:scale-90 ${
                            dotIndex === activeIndex
                              ? "w-5 bg-[var(--ink)]"
                              : "w-1.5 bg-[var(--line-strong)]"
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono text-[13px] text-[var(--ink-faint)]">
                      {activeIndex + 1} / {filtered.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentProjects;
