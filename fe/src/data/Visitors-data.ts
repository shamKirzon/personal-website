// Visitor location data for the Visitors tab.
//
// PRIVACY: city + ISO country code only. No names, no IPs, no accounts, no
// per-visitor identifiers. `lat`/`lng` are the city's centroid — never the
// visitor's exact position — and exist only to place a dot on the map.
//
// Backed by /api/visitors (see fe/api/visitors.ts), which reads Vercel's edge
// geolocation headers and keeps the shared rolling list in Upstash Redis.

export interface Visitor {
  id: string;
  city: string;
  /** ISO 3166-1 alpha-2, e.g. "PH". */
  country: string;
  lat: number;
  lng: number;
  isLive: boolean;
  /** Unix ms of arrival, used for the relative-time labels. */
  arrivedAt: number;
}

const ENDPOINT = "/api/visitors";

/** The shared list of recent visitor locations. */
export const fetchVisitors = async (): Promise<Visitor[]> => {
  try {
    const response = await fetch(ENDPOINT);
    if (!response.ok) return [];
    return (await response.json()) as Visitor[];
  } catch {
    return [];
  }
};

/**
 * Precise position from the browser (GPS on phones, WiFi positioning on
 * laptops). Resolves to null if unsupported, denied, or too slow — the
 * server then falls back to far less precise IP-based geolocation.
 */
const getBrowserCoords = (): Promise<{ lat: number; lng: number } | null> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => resolve(null),
      { timeout: 6000, maximumAge: 0 },
    );
  });

/**
 * Registers this visitor and returns their location. Only ever called after
 * explicit consent — see the consent gate in VisitorsSection.
 *
 * Resolves to null when the location can't be determined (or the visitor was
 * already counted recently), in which case the map simply shows everyone else.
 */
export const resolveMyLocation = async (): Promise<Visitor | null> => {
  try {
    const coords = await getBrowserCoords();

    const response = await fetch(ENDPOINT, {
      method: "POST",
      ...(coords && {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coords),
      }),
    });

    if (response.status !== 200) return null;
    return (await response.json()) as Visitor;
  } catch {
    return null;
  }
};
