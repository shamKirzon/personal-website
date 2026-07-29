import BlogListing from "@/components/sections/BlogListing";
import { useLanguage } from "@/i18n/LanguageContext";

const BlogPage = () => {
  const { t } = useLanguage();

  return (
    <main className="relative z-10 mx-auto max-w-[760px] px-5 sm:px-10 pt-8 pb-16">
      <h1 className="text-[24px] font-extrabold sm:text-[28px] leading-tight tracking-tight text-[var(--ink)]">
        {t.blogPage.title}
      </h1>
      <p className="mt-2 text-[16px] text-[var(--ink-mid)]">
        {t.blogPage.subtitle}
      </p>

      <BlogListing />
    </main>
  );
};

export default BlogPage;
