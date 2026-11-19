import { useCallback, useState } from "react";
import { findCertification, myCertifications } from "@/data/Certifications-data";
import CertificationCard from "../ui/CertificationCard";
import CertificationModal from "../ui/CertificationModal";
import { StaggerGroup, StaggerItem } from "../ui/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

// Fixed per-position tilts so the cards look hand-placed but never jump on re-render.
const TILTS = [-1.5, 1, -0.75, 1.5, -1, 0.75];

const CertificationsSection = () => {
  const { language, t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const close = useCallback(() => setSelectedId(null), []);

  // Empty categories are skipped, and the whole section hides if there is nothing to show.
  const groups = myCertifications.filter((group) => group.items?.length > 0);
  if (groups.length === 0) return null;

  return (
    <section id="certifications" className="mx-auto max-w-[760px] px-5 sm:px-10 pt-16">
      <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
        {t.certifications.label}
      </p>
      <p className="mb-6 text-[14px] leading-relaxed text-[var(--ink-faint)]">
        {t.certifications.subtitle}
      </p>

      <div className="flex flex-col gap-7">
        {groups.map((group) => (
          <div key={group.category.en}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
              {group.category[language] || group.category.en}
            </p>
            <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {group.items.map((item, index) => (
                <StaggerItem key={item.id} className="h-full">
                  <CertificationCard
                    title={item.title}
                    issuer={item.issuer}
                    logo={item.logo}
                    tilt={TILTS[index % TILTS.length]}
                    viewLabel={t.certifications.view}
                    onOpen={() => setSelectedId(item.id)}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </div>

      <CertificationModal certification={findCertification(selectedId)} onClose={close} />
    </section>
  );
};

export default CertificationsSection;
