import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogAuthor, blogPosts } from "@/data/Blog-data";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return (
      <main className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-4 px-5 py-24">
        <p className="text-[17px] text-[var(--ink)]">Post not found.</p>
        <Link to="/blog" className="text-[15px] text-[#22c55e]">
          Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="relative z-10 mx-auto max-w-[760px] px-5 pt-8 pb-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to blog
      </Link>

      <h1 className="mt-8 text-[28px] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
        {post.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[var(--ink-mid)]">
        <img
          src={blogAuthor.avatar}
          alt={blogAuthor.name}
          className="h-6 w-6 rounded-full object-cover"
        />
        <span className="text-[var(--ink-soft)]">{blogAuthor.name}</span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} strokeWidth={1.75} />
          <time dateTime={post.isoDate}>{post.date}</time>
        </span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} strokeWidth={1.75} />
          {post.readingTime}
        </span>
      </div>

      <img
        src={post.cover}
        alt={post.title}
        className="mt-8 aspect-[16/9] w-full rounded-xl border border-[var(--line-subtle)] object-cover object-top"
      />

      <article className="mt-8 flex flex-col gap-5">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-[17px] leading-relaxed text-[var(--ink-soft)]">
            {paragraph}
          </p>
        ))}
      </article>

      <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--line-hairline)] pt-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--line)] bg-[var(--chip-bg)] px-2.5 py-1 text-[13px] text-[var(--ink-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </main>
  );
};

export default BlogPostPage;
