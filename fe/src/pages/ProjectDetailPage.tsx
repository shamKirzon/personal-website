import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { project } from "@/data/Project-data";
import Pill from "@/components/ui/Pill";
import { LaptopMockup, PhoneMockup } from "@/components/ui/DeviceMockup";
import { StaggerGroup, itemVariants } from "@/components/ui/Reveal";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const data = project.find((item) => item.slug === slug);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc]);

  if (!data) {
    return (
      <main className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-4 px-5 sm:px-10 py-24">
        <p className="text-[17px] text-[var(--ink)]">Project not found.</p>
        <Link to="/" className="text-[15px] text-[#22c55e]">
          Back to projects
        </Link>
      </main>
    );
  }

  const showLaptop = data.devices.includes("laptop");
  const showPhone = data.devices.includes("phone");
  const laptopSrc = data.laptopImage ?? data.image;
  const phoneImages = data.phoneImages ?? [data.image];

  return (
    <main className="relative z-10 mx-auto max-w-[760px] px-5 sm:px-10 pt-8 pb-16">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to projects
      </Link>

      <div className="mb-12 flex flex-col items-center gap-8 sm:h-[260px] sm:flex-row sm:items-end sm:justify-center sm:gap-4">
        {showLaptop && (
          <LaptopMockup
            src={laptopSrc}
            alt={data.name}
            onClick={() => setLightboxSrc(laptopSrc)}
          />
        )}

        {showPhone && (
          <div className="flex flex-wrap items-end justify-center gap-3 sm:contents">
            {phoneImages.map((src, index) => (
              <PhoneMockup
                key={index}
                src={src}
                alt={`${data.name} — screen ${index + 1}`}
                onClick={() => setLightboxSrc(src)}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[#22c55e]">
        {data.app}
      </p>
      <h1 className="mb-4 text-[24px] font-extrabold sm:text-[28px] leading-tight tracking-tight text-[var(--ink)]">
        {data.name}
      </h1>
      <p className="mb-8 max-w-[560px] text-[16px] leading-relaxed text-[var(--ink-mid)]">
        {data.description}
      </p>

      <div className="flex flex-wrap gap-3">
        {data.buttons.map((button) => (
          <a
            key={button.url}
            href={button.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[var(--line)] bg-[var(--panel-bg)] px-5 py-2.5 text-[15px] text-[var(--ink)] transition-all duration-150 hover:scale-[1.03] hover:border-[var(--line-strong)] active:scale-[0.97]"
          >
            {button.label}
          </a>
        ))}
      </div>

      <section className="mt-12">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
          Technologies
        </p>
        <StaggerGroup className="flex flex-wrap gap-2.5">
          {data.technology.map((tech) => (
            <Pill key={tech.name} variants={itemVariants}>
              {tech.name}
            </Pill>
          ))}
        </StaggerGroup>
      </section>

      <section className="mt-12">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
          Key Features
        </p>
        <ul className="flex max-w-[560px] flex-col gap-2.5 pl-5">
          {data.keyFeatures.map((feature) => (
            <li
              key={feature}
              className="list-disc text-[16px] leading-relaxed text-[var(--ink-mid)]"
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/95"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setLightboxSrc(null)}
            className="fixed right-6 top-5 cursor-pointer text-[var(--ink-mid)] transition-all duration-150 hover:scale-110 hover:text-[var(--ink)] active:scale-90"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
          <img
            src={lightboxSrc}
            alt={data.name}
            className="max-h-[88vh] max-w-[88vw] rounded-xl border border-[var(--line)] object-contain"
          />
        </div>
      )}
    </main>
  );
};

export default ProjectDetailPage;
