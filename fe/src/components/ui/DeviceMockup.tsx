interface MockupProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export const LaptopMockup = ({ src, alt, onClick }: MockupProps) => (
  <figure className="relative h-full">
    <div className="h-full rounded-t-xl rounded-b-[3px] border border-[#a9adb3] bg-[#1d1d1f] p-[6px]">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Preview ${alt}`}
        className="block h-full cursor-zoom-in overflow-hidden rounded-[3px]"
      >
        <img src={src} alt={alt} className="aspect-video h-full" />
      </button>
    </div>

    <div
      aria-hidden
      className="absolute -left-4 -right-4 top-full h-2 rounded-b-lg bg-[#a9adb3]"
    >
      <span className="absolute left-1/2 top-0 h-[5px] w-[13%] -translate-x-1/2 rounded-b-md bg-[#8e9298]" />
    </div>
  </figure>
);

export const PhoneMockup = ({ src, alt, onClick }: MockupProps) => (
  <figure className="h-full shrink-0">
    <div className="h-full rounded-[1.4rem] border border-[#a9adb3] bg-[#1d1d1f] p-[5px]">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Preview ${alt}`}
        className="relative block h-full cursor-zoom-in overflow-hidden rounded-[1.1rem]"
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1.5 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-black"
        />
        <img
          src={src}
          alt={alt}
          className="aspect-[9/19] h-full w-auto object-cover object-top"
        />
      </button>
    </div>
  </figure>
);
