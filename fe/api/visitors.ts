import { createHash, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// PRIVACY: only city + country + that city's centroid is ever stored or
// returned. The requester's IP is hashed for short-lived dedupe and is never
// persisted in readable form or attached to a visitor record.

const VISITORS_KEY = "visitors";
const MAX_VISITORS = 40;
const RETENTION_MS = 24 * 60 * 60 * 1000;
const LIVE_WINDOW_MS = 10 * 60 * 1000;
const DEDUPE_TTL_SECONDS = 30 * 60;

interface StoredVisitor {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  arrivedAt: number;
}

// Created lazily: Redis.fromEnv() throws when the env vars are missing, and at
// module scope that would crash the function before it can answer with a 503.
let client: Redis | null = null;
const getRedis = () => (client ??= Redis.fromEnv());

const toPublicVisitor = (visitor: StoredVisitor, now: number) => ({
  id: visitor.id,
  city: visitor.city,
  country: visitor.country,
  lat: visitor.lat,
  lng: visitor.lng,
  isLive: now - visitor.arrivedAt < LIVE_WINDOW_MS,
});

const firstHeader = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const readGeo = (req: VercelRequest) => {
  // Vercel's edge network sets these on every request; no external geo API.
  const city = firstHeader(req.headers["x-vercel-ip-city"]);
  const country = firstHeader(req.headers["x-vercel-ip-country"]);
  const lat = firstHeader(req.headers["x-vercel-ip-latitude"]);
  const lng = firstHeader(req.headers["x-vercel-ip-longitude"]);

  if (city && country && lat && lng) {
    return {
      city: decodeURIComponent(city),
      country,
      lat: Number(lat),
      lng: Number(lng),
    };
  }

  // Geo headers only exist on Vercel's real edge network, so below are two
  // local-dev escape hatches. Both are unreachable in production.
  if (process.env.VERCEL_ENV !== "production") {
    // 1. Query overrides, for testing the API directly with curl.
    const { debugCity, debugCountry, debugLat, debugLng } = req.query;
    if (debugCity && debugCountry && debugLat && debugLng) {
      return {
        city: String(debugCity),
        country: String(debugCountry),
        lat: Number(debugLat),
        lng: Number(debugLng),
      };
    }

    // 2. A fixed fallback from .env, so the real UI works under `vercel dev`
    //    (the frontend can't pass query params).
    const { DEV_FALLBACK_CITY, DEV_FALLBACK_COUNTRY, DEV_FALLBACK_LAT, DEV_FALLBACK_LNG } =
      process.env;
    if (DEV_FALLBACK_CITY && DEV_FALLBACK_COUNTRY && DEV_FALLBACK_LAT && DEV_FALLBACK_LNG) {
      return {
        city: DEV_FALLBACK_CITY,
        country: DEV_FALLBACK_COUNTRY,
        lat: Number(DEV_FALLBACK_LAT),
        lng: Number(DEV_FALLBACK_LNG),
      };
    }
  }

  return null;
};

const hashIp = (req: VercelRequest) => {
  const forwarded = firstHeader(req.headers["x-forwarded-for"]) ?? "";
  const ip = forwarded.split(",")[0].trim() || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
};

const readVisitors = async (now: number): Promise<StoredVisitor[]> => {
  await getRedis().zremrangebyscore(VISITORS_KEY, 0, now - RETENTION_MS);

  // Newest first, capped to what the UI can show.
  const entries = await getRedis().zrange<StoredVisitor[]>(
    VISITORS_KEY,
    0,
    MAX_VISITORS - 1,
    { rev: true },
  );

  // Upstash auto-parses JSON members, but tolerate raw strings too.
  return entries
    .map((entry) =>
      typeof entry === "string" ? (JSON.parse(entry) as StoredVisitor) : entry,
    )
    .filter((entry): entry is StoredVisitor => Boolean(entry?.city));
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return res.status(503).json({ error: "Visitor store not configured" });
  }

  const now = Date.now();

  try {
    if (req.method === "GET") {
      const visitors = await readVisitors(now);
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(visitors.map((v) => toPublicVisitor(v, now)));
    }

    if (req.method === "POST") {
      const geo = readGeo(req);
      if (!geo || Number.isNaN(geo.lat) || Number.isNaN(geo.lng)) {
        return res.status(204).end();
      }

      const isNewArrival = await getRedis().set(`dedupe:${hashIp(req)}`, 1, {
        ex: DEDUPE_TTL_SECONDS,
        nx: true,
      });

      if (!isNewArrival) {
        // Already counted recently — echo back their existing entry so the
        // map still lights up for them, without adding a duplicate.
        const existing = (await readVisitors(now)).find(
          (visitor) =>
            visitor.city === geo.city && visitor.country === geo.country,
        );
        return existing
          ? res.status(200).json(toPublicVisitor(existing, now))
          : res.status(204).end();
      }

      const visitor: StoredVisitor = {
        id: randomUUID(),
        ...geo,
        arrivedAt: now,
      };

      await getRedis().zadd(VISITORS_KEY, { score: now, member: visitor });
      await getRedis().zremrangebyrank(VISITORS_KEY, 0, -(MAX_VISITORS + 1));

      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(toPublicVisitor(visitor, now));
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("visitors endpoint failed:", error);
    return res.status(500).json({ error: "Visitor lookup failed" });
  }
}
