import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Link2 } from "lucide-react";
import { SiX, SiFacebook } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { blogAuthor, blogPosts } from "@/data/Blog-data";
import BlogImageGallery from "@/components/ui/BlogImageGallery";
import ReadingProgressBar from "@/components/ui/ReadingProgressBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center gap-4 px-5 sm:px-10 py-24">
        <p className="text-[17px] text-[var(--ink)]">Post not found.</p>
        <Link to="/blog" className="text-[15px] text-[#22c55e]">
          Back to blog
        </Link>
      </main>
    );
  }

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = [
    {
      label: "Share on X",
      Icon: SiX,
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`,
          "_blank",
          "noreferrer",
        ),
    },
    {
      label: "Share on Facebook",
      Icon: SiFacebook,
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
          "_blank",
          "noreferrer",
        ),
    },
    {
      label: "Share on LinkedIn",
      Icon: FaLinkedin,
      onClick: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
          "_blank",
          "noreferrer",
        ),
    },
    {
      label: "Copy link",
      Icon: Link2,
      onClick: async () => {
        await navigator.clipboard.writeText(pageUrl);
        toast.success("Link copied to clipboard");
      },
    },
  ];

  return (
    <main className="relative z-10 mx-auto max-w-[760px] px-5 sm:px-10 pt-8 pb-16">
      <ReadingProgressBar />

      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[15px] text-[var(--ink-mid)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Back to blog
      </Link>

      <div className="mt-8">
        <BlogImageGallery images={post.images} alt={post.title} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-[28px]">
          {post.title}
        </h1>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <span className="text-[13px] text-[var(--ink-faint)]">Share</span>
          <div className="flex items-center gap-1 sm:gap-3">
            <TooltipProvider>
              {shareLinks.map(({ label, Icon, onClick }) => {
                const button = (
                  <button
                    type="button"
                    aria-label={label}
                    onClick={onClick}
                    className="grid h-11 w-11 place-items-center text-[var(--ink)] transition-colors hover:text-[var(--ink-mid)] sm:h-auto sm:w-auto"
                  >
                    <Icon size={18} />
                  </button>
                );

                if (label !== "Copy link") {
                  return <span key={label}>{button}</span>;
                }

                return (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent>Copy Link</TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </div>

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

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--line)] bg-[var(--chip-bg)] px-2.5 py-1 text-[13px] text-[var(--ink-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <article className="mt-8 flex flex-col gap-5">
        {post.content.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="mt-2 text-[21px] font-bold leading-snug text-[var(--ink)]"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ol key={index} className="flex flex-col gap-2 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="list-decimal text-[17px] leading-relaxed text-[var(--ink-soft)]"
                  >
                    <span className="font-semibold text-[var(--ink)]">
                      {item.title}
                    </span>{" "}
                    — {item.text}
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <p
              key={index}
              className="text-[17px] leading-relaxed text-[var(--ink-soft)]"
            >
              {block.text}
            </p>
          );
        })}
      </article>
    </main>
  );
};

export default BlogPostPage;
