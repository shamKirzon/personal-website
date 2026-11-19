import { MapPin } from "lucide-react";
import { defaultProfile } from "@/data/Profile-data";
import { useLanguage } from "@/i18n/LanguageContext";

const ProfileSection = () => {
  const { t } = useLanguage();

  return (
  <section className="mx-auto max-w-[760px] px-5 sm:px-10 pt-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <img
        src={defaultProfile.path}
        alt={defaultProfile.alt}
        className="h-[105px] w-[105px] shrink-0 self-stretch rounded-2xl object-cover sm:h-auto"
      />

      <div className="min-w-0">
        <h1 className="mb-1.5 text-[24px] font-semibold leading-tight tracking-tight text-[var(--ink)]">
          Shammy Kierson Suyat
        </h1>

        <p className="mb-3 text-[16px] leading-relaxed text-[var(--ink-mid)]">
          {t.profile.bio}
        </p>

        <p className="flex items-center gap-2 text-[16px] text-[var(--ink-soft)]">
          {/* Drawn with currentColor, so it always matches the text color in both themes. */}
          <MapPin aria-hidden size={17} strokeWidth={1.8} className="shrink-0" />
          {t.getInTouch.locationValue}
        </p>
      </div>
    </div>
  </section>
  );
};

export default ProfileSection;
