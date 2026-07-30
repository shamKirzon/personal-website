// Geometry for the dotted Philippines silhouette.
//
// The shape is built by sampling a lat/lng grid and keeping the points that
// fall inside simplified island polygons, which gives the "constellation of
// the country" look without shipping a heavy GeoJSON atlas.

export const MAP_BOUNDS = {
  minLng: 116.4,
  maxLng: 127.0,
  minLat: 4.2,
  maxLat: 21.4,
};

const LNG_SPAN = MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng;
const LAT_SPAN = MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat;

// viewBox units, kept proportional to the geographic span so the grid reads
// as evenly spaced dots rather than a stretched mesh.
export const MAP_VIEW_WIDTH = 360;
export const MAP_VIEW_HEIGHT = Math.round((LAT_SPAN / LNG_SPAN) * MAP_VIEW_WIDTH);

/** Position as percentages of the map box, for absolutely-positioned overlays. */
export const projectToPercent = (lat: number, lng: number) => ({
  x: ((lng - MAP_BOUNDS.minLng) / LNG_SPAN) * 100,
  y: ((MAP_BOUNDS.maxLat - lat) / LAT_SPAN) * 100,
});

export const isWithinMap = (lat: number, lng: number) =>
  lat >= MAP_BOUNDS.minLat &&
  lat <= MAP_BOUNDS.maxLat &&
  lng >= MAP_BOUNDS.minLng &&
  lng <= MAP_BOUNDS.maxLng;

type Polygon = [number, number][];

// Simplified outlines, [lng, lat]. Impressionistic, not survey-grade.
const ISLANDS: Polygon[] = [
  // Luzon
  [
    [121.6, 18.6], [122.2, 18.3], [122.4, 17.3], [122.3, 16.3], [121.8, 15.6],
    [122.2, 15.0], [122.7, 14.6], [123.1, 14.1], [123.9, 13.9], [124.2, 13.2],
    [124.1, 12.6], [123.5, 12.9], [123.0, 13.4], [122.3, 13.6], [121.6, 13.8],
    [121.0, 13.9], [120.6, 13.7], [120.5, 14.3], [120.1, 14.7], [119.8, 15.3],
    [120.0, 16.0], [120.3, 16.5], [120.4, 17.6], [120.6, 18.3], [121.0, 18.6],
  ],
  // Batanes
  [[121.85, 20.65], [122.15, 20.6], [122.1, 20.25], [121.85, 20.3]],
  // Catanduanes
  [[124.05, 14.1], [124.45, 14.0], [124.35, 13.6], [124.0, 13.7]],
  // Mindoro
  [[120.5, 13.5], [121.4, 13.4], [121.5, 12.8], [121.0, 12.2], [120.5, 12.6], [120.3, 13.1]],
  // Palawan
  [[119.9, 11.4], [120.1, 11.1], [118.6, 9.6], [117.4, 8.5], [117.1, 8.7], [118.3, 10.0], [119.6, 11.5]],
  // Masbate
  [[123.0, 12.6], [124.1, 12.2], [123.9, 11.7], [123.2, 11.9], [122.9, 12.2]],
  // Samar
  [[124.3, 12.5], [125.2, 12.6], [125.7, 11.9], [125.4, 11.1], [124.8, 10.9], [124.4, 11.6]],
  // Panay
  [[122.0, 11.8], [123.1, 11.6], [123.2, 10.9], [122.6, 10.4], [122.0, 10.5], [121.9, 11.2]],
  // Leyte
  [[124.4, 11.5], [125.0, 11.4], [125.3, 10.8], [125.0, 10.0], [124.6, 9.9], [124.3, 10.8]],
  // Cebu
  [[123.9, 11.3], [124.1, 10.7], [123.9, 10.0], [123.6, 9.5], [123.4, 9.9], [123.6, 10.9]],
  // Negros
  [[123.1, 10.9], [123.3, 10.4], [123.2, 9.6], [122.8, 9.0], [122.4, 9.5], [122.6, 10.4]],
  // Bohol
  [[123.8, 10.1], [124.6, 10.2], [124.6, 9.6], [123.9, 9.5]],
  // Mindanao
  [
    [124.0, 9.8], [125.6, 9.9], [126.3, 9.0], [126.6, 7.8], [126.2, 6.9],
    [125.7, 6.2], [125.3, 5.6], [124.8, 6.0], [124.3, 6.4], [123.6, 6.7],
    [122.8, 6.9], [122.0, 6.9], [121.9, 7.4], [122.6, 7.7], [123.3, 7.9],
    [123.7, 8.3], [123.4, 8.7], [123.8, 9.3],
  ],
  // Sulu
  [[121.25, 6.2], [120.8, 6.2], [120.8, 5.9], [121.25, 5.9]],
  // Tawi-Tawi
  [[120.3, 5.35], [119.6, 5.1], [119.7, 4.85], [120.35, 5.1]],
];

const isInside = (lng: number, lat: number, polygon: Polygon) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
};

const GRID_STEP = 0.3;

/**
 * Static dot field, computed once at module load since it never changes.
 * Coordinates are in viewBox units.
 */
export const SILHOUETTE_DOTS: { x: number; y: number }[] = (() => {
  const dots: { x: number; y: number }[] = [];
  for (let lat = MAP_BOUNDS.minLat; lat <= MAP_BOUNDS.maxLat; lat += GRID_STEP) {
    for (let lng = MAP_BOUNDS.minLng; lng <= MAP_BOUNDS.maxLng; lng += GRID_STEP) {
      if (ISLANDS.some((island) => isInside(lng, lat, island))) {
        dots.push({
          x: ((lng - MAP_BOUNDS.minLng) / LNG_SPAN) * MAP_VIEW_WIDTH,
          y: ((MAP_BOUNDS.maxLat - lat) / LAT_SPAN) * MAP_VIEW_HEIGHT,
        });
      }
    }
  }
  return dots;
})();

const CENTER_LAT = (MAP_BOUNDS.minLat + MAP_BOUNDS.maxLat) / 2;
const CENTER_LNG = (MAP_BOUNDS.minLng + MAP_BOUNDS.maxLng) / 2;

/**
 * For visitors outside the map's bounds: project their real bearing onto the
 * edge of the map box, so an arrival from Tokyo sits north-east rather than
 * at an arbitrary spot. `inset` keeps the marker clear of the box corners.
 */
export const projectToEdgePercent = (lat: number, lng: number, inset = 6) => {
  const dx = lng - CENTER_LNG;
  const dy = CENTER_LAT - lat;

  const half = 50 - inset;
  const scale = Math.max(Math.abs(dx) / half, Math.abs(dy) / half) || 1;

  return {
    x: 50 + dx / scale,
    y: 50 + dy / scale,
  };
};
