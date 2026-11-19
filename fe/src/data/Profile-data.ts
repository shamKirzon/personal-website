import formalPhoto from "../assets/images/profile-formal.png";
import casualPhoto from "../assets/images/profile.jpg";

export type ProfileStatus = "default" | "extra";

export interface ProfilePhoto {
  /** Image file (imported, so Vite bundles and hashes it). */
  path: string;
  alt: string;
  /** "default" is the photo shown on the site; "extra" photos are kept for later. */
  status: ProfileStatus;
}

export const profile: Record<string, ProfilePhoto> = {
  profile1: {
    path: formalPhoto,
    alt: "Shammy Kierson Suyat in formal attire",
    status: "default",
  },
  profile2: {
    path: casualPhoto,
    alt: "Shammy Kierson Suyat",
    status: "extra",
  },
};

const photos = Object.values(profile);

/** The photo to display: the first one marked "default" (falls back to the first photo). */
export const defaultProfile: ProfilePhoto =
  photos.find((photo) => photo.status === "default") ?? photos[0];
