import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

interface BlogImageGalleryProps {
  images: string[];
  alt: string;
}

const arrowClass =
  "border-[var(--line-subtle)] bg-[var(--panel-bg)] text-[var(--ink-soft)] shadow-[var(--panel-shadow)] hover:border-[var(--line-strong)] hover:bg-[var(--panel-bg)] hover:text-[var(--ink)]";

const ImageBox = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-muted)]">
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain object-center"
    />
  </div>
);

const BlogImageGallery = ({ images, alt }: BlogImageGalleryProps) => {
  if (images.length === 1) {
    return <ImageBox src={images[0]} alt={alt} />;
  }

  return (
    <Carousel className="w-full">
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
  );
};

export default BlogImageGallery;
