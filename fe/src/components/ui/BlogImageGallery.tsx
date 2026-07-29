import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./carousel";

interface BlogImageGalleryProps {
  images: string[];
  alt: string;
}

const DOT_THRESHOLD = 6;

const arrowClass =
  "border-[var(--line-subtle)] bg-[var(--panel-bg)] text-[var(--ink-soft)] shadow-[var(--panel-shadow)] hover:border-[var(--line-strong)] hover:bg-[var(--panel-bg)] hover:text-[var(--ink)]";

const ImageBox = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-muted)]">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-contain object-center"
    />
  </div>
);

const BlogImageGallery = ({ images, alt }: BlogImageGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 1) {
    return <ImageBox src={images[0]} alt={alt} />;
  }

  return (
    <div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <ImageBox
                src={src}
                alt={`${alt} — image ${index + 1} of ${images.length}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={arrowClass} />
        <CarouselNext className={arrowClass} />
      </Carousel>

      <div className="mt-4 flex items-center justify-center">
        {images.length <= DOT_THRESHOLD ? (
          <div className="flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-5 bg-[var(--ink)]"
                    : "w-1.5 bg-[var(--line-strong)]"
                }`}
              />
            ))}
          </div>
        ) : (
          <span className="font-mono text-[13px] text-[var(--ink-faint)]">
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogImageGallery;
