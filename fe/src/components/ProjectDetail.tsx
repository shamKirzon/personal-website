import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { project } from "@/data/Project-data";
import { Times } from "@/assets/icons/Icons";

const placeholderFeatures = [
  "Feature highlight — replace with real content",
  "Feature highlight — replace with real content",
  "Feature highlight — replace with real content",
];

const ImagePlaceholder = ({ label }: { label: string }) => (
  <div className="bg-card border border-border rounded-lg aspect-video flex items-center justify-center">
    <p className="font-mono text-xs text-text-hint text-center px-5">
      [ {label} ]
      <br />
      replace with your image
    </p>
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const data = project.find((p) => p.slug === slug);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc]);

  if (!data) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <p className="text-foreground">Project not found.</p>
        <Link to="/#projects" className="text-primary text-sm">
          Back to projects
        </Link>
      </div>
    );
  }

  const galleryImages = [data.image, null, null, null];

  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-3xl pt-12 pb-16 text-center">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          ← Back to projects
        </Link>

        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
          {data.app.en}
        </p>
        <h1 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
          {data.name}
        </h1>
        <p className="text-muted-foreground text-[18px] leading-7 max-w-md mx-auto mb-8">
          {data.description.en}
        </p>

        <div className="flex gap-3 justify-center">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Live Demo
          </a>
          {data.buttons.map((button, i) => (
            <a
              key={i}
              href={button.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-x-2 border border-border text-muted-foreground text-sm px-4 py-2.5 rounded-md hover:border-text-hint hover:text-foreground transition"
            >
              <button.icon width="16" />
              View Source
            </a>
          ))}
        </div>
      </header>

      <section className="w-full max-w-3xl border-t border-border-subtle py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
          01
        </p>
        <h2 className="text-foreground text-xl font-semibold mb-7">
          Context &amp; Motivation
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-muted-foreground text-[18px] leading-7">
            {data.description.en}
          </p>
          {data.image ? (
            <img
              src={data.image}
              alt={data.name}
              className="rounded-lg border border-border w-full object-cover aspect-video"
            />
          ) : (
            <ImagePlaceholder label="app screenshot" />
          )}
        </div>
      </section>

      <section className="w-full max-w-3xl border-t border-border-subtle py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
          02
        </p>
        <h2 className="text-foreground text-xl font-semibold mb-7">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.technology.map((technology, i) => (
            <span
              key={i}
              className="border border-border rounded-md px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </section>

      <section className="w-full max-w-3xl border-t border-border-subtle py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
          03
        </p>
        <h2 className="text-foreground text-xl font-semibold mb-7">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ul className="flex flex-col gap-y-3.5">
            {placeholderFeatures.map((feature, i) => (
              <li
                key={i}
                className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary"
              >
                {feature}
              </li>
            ))}
          </ul>
          <ImagePlaceholder label="monitor screen" />
        </div>
      </section>

      <section className="w-full max-w-3xl border-t border-border-subtle py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-primary mb-1">
          04
        </p>
        <h2 className="text-foreground text-xl font-semibold mb-7">
          Gallery
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((src, i) =>
            src ? (
              <button
                key={i}
                onClick={() => setLightboxSrc(src)}
                className="bg-card border border-border rounded-lg overflow-hidden aspect-video cursor-zoom-in hover:border-primary transition-colors"
              >
                <img
                  src={src}
                  alt={`${data.name} screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ) : (
              <ImagePlaceholder key={i} label={`screenshot ${i + 1}`} />
            ),
          )}
        </div>
      </section>

      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 bg-background/96 flex items-center justify-center cursor-zoom-out"
        >
          <button
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
            className="fixed top-5 right-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Times className="h-6 fill-current" />
          </button>
          <img
            src={lightboxSrc}
            alt={data.name}
            className="max-w-[88vw] max-h-[88vh] rounded-lg border border-border object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
