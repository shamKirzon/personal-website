import { useState } from "react";
import { Search } from "lucide-react";
import { blogPosts } from "@/data/Blog-data";
import BlogCard from "../ui/BlogCard";
import TagFilterPill from "../ui/TagFilterPill";

/** Tag list built from the posts themselves, so counts can never drift. */
const tagCounts = blogPosts
  .flatMap((post) => post.tags)
  .reduce<Record<string, number>>((counts, tag) => {
    counts[tag] = (counts[tag] ?? 0) + 1;
    return counts;
  }, {});

const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

const BlogListing = () => {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );

  const search = query.trim().toLowerCase();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesQuery =
      search === "" ||
      [post.title, post.excerpt, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(search);

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => post.tags.includes(tag));

    return matchesQuery && matchesTags;
  });

  return (
    <>
      <div className="relative mt-8">
        <Search
          size={17}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-faint)]"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts..."
          className="h-12 w-full rounded-lg border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] pl-11 pr-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)]"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map(([tag, count]) => (
          <TagFilterPill
            key={tag}
            label={tag}
            count={count}
            active={activeTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-[var(--ink-faint)]">
          No posts match your filters.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogListing;
