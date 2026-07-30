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
 * Registers this visitor and returns their location. Only ever called after
 * explicit consent — see the consent gate in VisitorsSection.
 *
 * Resolves to null when the location can't be determined (or the visitor was
 * already counted recently), in which case the map simply shows everyone else.
 */
export const resolveMyLocation = async (): Promise<Visitor | null> => {
  try {
    const response = await fetch(ENDPOINT, { method: "POST" });
    if (response.status !== 200) return null;
    return (await response.json()) as Visitor;
  } catch {
    return null;
  }
};
