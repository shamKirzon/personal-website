import { useLanguage } from "@/i18n/LanguageContext";

const VisitorsPage = () => {
  const { t } = useLanguage();

  return (
    <main className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-2 px-5 sm:px-10 py-32 text-center">
      <h1 className="text-[24px] font-semibold text-[var(--ink)]">
        {t.visitors.title}
      </h1>
      <p className="text-[16px] text-[var(--ink-mid)]">{t.visitors.subtitle}</p>
    </main>
  );
};

export default VisitorsPage;
