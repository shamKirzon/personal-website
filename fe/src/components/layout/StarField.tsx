import { useMemo } from "react";

const DOTS_PER_LAYER = 3;

const LAYER_TIERS = [
  { depth: 14, size: [1, 1.5] as const, opacity: [0.15, 0.32] as const, tile: [210, 340] as const },
  { depth: 30, size: [1.5, 2] as const, opacity: [0.26, 0.42] as const, tile: [300, 450] as const },
  { depth: 52, size: [2, 2.5] as const, opacity: [0.5, 0.7] as const, tile: [420, 620] as const },
];

interface LayerConfig {
  depth: number;
  backgroundImage: string;
  backgroundSize: string;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const buildLayer = (tier: (typeof LAYER_TIERS)[number]): LayerConfig => {
  const gradients: string[] = [];
  const sizes: string[] = [];

  for (let i = 0; i < DOTS_PER_LAYER; i++) {
    const dotSize = randomBetween(tier.size[0], tier.size[1]).toFixed(2);
    const opacity = randomBetween(tier.opacity[0], tier.opacity[1]).toFixed(2);
    const x = randomBetween(5, 95).toFixed(1);
    const y = randomBetween(5, 95).toFixed(1);
    const tileSize = Math.round(randomBetween(tier.tile[0], tier.tile[1]));

    gradients.push(
      `radial-gradient(${dotSize}px ${dotSize}px at ${x}% ${y}%, rgba(var(--star-rgb),${opacity}) 50%, transparent 50%)`,
    );
    sizes.push(`${tileSize}px ${tileSize}px`);
  }

  return {
    depth: tier.depth,
    backgroundImage: gradients.join(","),
    backgroundSize: sizes.join(","),
  };
};

const StarField = () => {
  const layers = useMemo(() => LAYER_TIERS.map(buildLayer), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {layers.map((layer) => (
        <div
          key={layer.depth}
          className="absolute -inset-20"
          style={{
            backgroundImage: layer.backgroundImage,
            backgroundSize: layer.backgroundSize,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
