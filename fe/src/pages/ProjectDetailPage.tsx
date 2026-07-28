import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { project } from "@/data/Project-data";
import Pill from "@/components/ui/Pill";

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
      <main className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-4 px-5 py-24">
        <p className="text-[17px] text-[var(--ink)]">Project not found.</p>
        <Link to="/" className="text-[15px] text-[#22c55e]">
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="relative z-10 mx-auto max-w-[760px] px-5 pt-8">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to projects
      </Link>

      <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[#22c55e]">
        {data.app}
      </p>
      <h1 className="mb-4 text-[28px] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
        {data.name}
      </h1>
      <p className="mb-8 max-w-[560px] text-[16px] leading-relaxed text-[var(--ink-mid)]">
        {data.description}
      </p>

      <div className="mb-14 flex flex-wrap gap-3">
        {data.buttons.map((button) => (
          <a
            key={button.url}
            href={button.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[var(--line)] bg-[var(--panel-bg)] px-5 py-2.5 text-[15px] text-[var(--ink)] transition-colors hover:border-[var(--line-strong)]"
          >
            View Source
          </a>
        ))}
      </div>

      <section className="border-t border-[var(--line-hairline)] py-12">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
          Technologies
        </p>
        <div className="flex flex-wrap gap-2.5">
          {data.technology.map((tech) => (
            <Pill key={tech.name}>{tech.name}</Pill>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line-hairline)] py-12">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
          Preview
        </p>
        <button
          type="button"
          onClick={() => setLightboxSrc(data.image)}
          className="w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--line-subtle)] transition-colors hover:border-[var(--line-strong)]"
        >
          <img
            src={data.image}
            alt={data.name}
            className="aspect-video w-full object-cover object-top"
          />
        </button>
      </section>

      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/95"
        >
          <button
            type="button"
            aria-label="Close preview"
            className="fixed right-6 top-5 text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
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
