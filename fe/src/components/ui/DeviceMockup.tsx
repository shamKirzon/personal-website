interface MockupProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export const LaptopMockup = ({ src, alt, onClick }: MockupProps) => (
  <figure className="relative w-full sm:h-full sm:w-auto">
    <div className="rounded-t-xl rounded-b-[3px] border border-[#a9adb3] bg-[#1d1d1f] p-[6px] sm:h-full">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Preview ${alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-[3px] sm:h-full sm:w-auto"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-video w-full object-cover object-top sm:h-full sm:w-auto"
        />
      </button>
    </div>

    <div
      aria-hidden
      className="absolute -left-3 -right-3 top-full h-2 rounded-b-lg bg-[#a9adb3] sm:-left-4 sm:-right-4"
    >
      <span className="absolute left-1/2 top-0 h-[5px] w-[13%] -translate-x-1/2 rounded-b-md bg-[#8e9298]" />
    </div>
  </figure>
);

export const PhoneMockup = ({ src, alt, onClick }: MockupProps) => (
  <figure className="w-[142px] shrink-0 sm:h-full sm:w-auto">
    <div className="rounded-[1.4rem] border border-[#a9adb3] bg-[#1d1d1f] p-[5px] sm:h-full">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Preview ${alt}`}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] sm:h-full sm:w-auto"
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1.5 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-black"
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[9/19] w-full object-cover object-top sm:h-full sm:w-auto"
        />
      </button>
    </div>
  </figure>
);
