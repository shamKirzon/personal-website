interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => (
  <span
    aria-hidden
    className={`block animate-pulse rounded bg-[var(--chip-bg)] ${className}`}
  />
);

export default Skeleton;
