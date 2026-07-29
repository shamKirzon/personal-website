import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { blogAuthor, type BlogPost } from "@/data/Blog-data";

const BlogCard = ({
  slug,
  title,
  excerpt,
  images,
  date,
  isoDate,
  readingTime,
  tags,
}: BlogPost) => (
  <Link
    to={`/blog/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] shadow-[var(--panel-shadow)] transition-colors hover:border-[var(--line-strong)]"
  >
    <img
      src={images[0]}
      alt={title}
      loading="lazy"
      className="aspect-[16/9] w-full object-cover object-top"
    />

    <div className="flex flex-1 flex-col p-5">
      <h2 className="line-clamp-2 text-[19px] font-bold leading-snug text-[var(--ink)]">
        {title}
      </h2>

      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--ink-mid)]">
        {excerpt}
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
          <time dateTime={isoDate}>{date}</time>
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} strokeWidth={1.75} />
          {readingTime}
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

export default BlogCard;
