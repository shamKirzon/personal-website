import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { blogAuthor, type BlogPost } from "@/data/Blog-data";
import { useLanguage } from "@/i18n/LanguageContext";

const BlogCard = ({
  slug,
  title,
  excerpt,
  images,
  date,
  isoDate,
  readingTime,
  tags,
}: BlogPost) => {
  const { language } = useLanguage();

  return (
  <Link
    to={`/blog/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] shadow-[var(--panel-shadow)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-xl"
  >
    <div className="overflow-hidden">
      <img
        src={images[0]}
        alt={title[language]}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h2 className="line-clamp-2 text-[19px] font-bold leading-snug text-[var(--ink)]">
        {title[language]}
      </h2>

      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--ink-mid)]">
        {excerpt[language]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[var(--ink-mid)]">
        <img
          src={blogAuthor.avatar}
          alt={blogAuthor.name}
          loading="lazy"
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="text-[var(--ink-soft)]">{blogAuthor.name}</span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <Calendar size={13} strokeWidth={1.75} />
          <time dateTime={isoDate}>{date[language]}</time>
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} strokeWidth={1.75} />
          {readingTime[language]}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--line)] bg-[var(--chip-bg)] px-2 py-1 text-[12px] text-[var(--ink-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
  );
};

export default BlogCard;
