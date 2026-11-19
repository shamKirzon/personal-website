import itsDatabases from "../assets/images/certifications/its-databases.png";
import itsDatabasesCertificate from "../assets/images/certifications/its-databases-certificate.png";

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A CERTIFICATION
// 1. Put the badge/logo (square) and the full certificate image in
//    src/assets/images/certifications/ and import them above.
// 2. Add an object to `items` in the right category below (or add a new category).
// 3. `id` must be unique. Everything marked with `?` is optional; the card and
//    the modal hide whatever is missing, so a half-filled entry never breaks the page.
// ─────────────────────────────────────────────────────────────────────────────

export interface LocalizedText {
  en: string;
  fil: string;
}

export type CertificationType = "certification" | "course" | "badge";
export type CertificationStatus = "earned" | "in-progress";

export interface Certification {
  /** Unique slug, e.g. "its-databases". Used as the React key and to open the modal. */
  id: string;
  title: string;
  issuer: string;
  /** Small square logo or badge shown on the card. */
  logo: string;
  /** Full certificate image shown in the center of the modal. Falls back to `logo`. */
  certificateImage?: string;
  type: CertificationType;
  status: CertificationStatus;
  /** ISO date the credential was awarded (YYYY-MM-DD). */
  awarded?: string;
  /** One or two sentences about what it covers. */
  description?: LocalizedText;
  /** Short topic chips, e.g. ["Python", "Programming"]. */
  tags?: string[];
  /** Public verification page. The "Verify on …" button opens it in a new tab. */
  url?: string;
}

export interface CertificationGroup {
  category: LocalizedText;
  items: Certification[];
}

export const myCertifications: CertificationGroup[] = [
  {
    category: { en: "Database", fil: "Database" },
    items: [
      {
        id: "its-databases",
        title: "IT Specialist: Databases",
        issuer: "Certiport",
        logo: itsDatabases,
        certificateImage: itsDatabasesCertificate,
        type: "certification",
        status: "earned",
        awarded: "2026-11-07",
        description: {
          en: "Validates database design, creating and managing tables and other objects, and writing SQL to retrieve and manipulate data.",
          fil: "Pinapatunayan ang kakayahan sa disenyo ng database, paggawa at pamamahala ng mga table at iba pang object, at pagsulat ng SQL para kumuha at magbago ng data.",
        },
        tags: ["Databases", "SQL"],
        url: "https://www.credly.com/badges/dea1b0a4-b45d-4315-8993-a21ad1be554f/public_url",
      },
    ],
  },
];

/** Every certification in one flat list (empty groups are fine). */
export const allCertifications: Certification[] = myCertifications.flatMap(
  (group) => group.items ?? [],
);

/** Look up one certification; returns undefined for unknown ids instead of throwing. */
export const findCertification = (id: string | null) =>
  id === null ? undefined : allCertifications.find((item) => item.id === id);

// Catch copy-paste mistakes while developing: two entries with the same id would
// open the wrong certificate.
if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const { id } of allCertifications) {
    if (seen.has(id)) console.warn(`[certifications] duplicate id "${id}" — ids must be unique.`);
    seen.add(id);
  }
}
