import BlogListing from "@/components/sections/BlogListing";

const BlogPage = () => (
  <main className="relative z-10 mx-auto max-w-[760px] px-5 sm:px-10 pt-8 pb-16">
    <h1 className="text-[24px] font-extrabold sm:text-[28px] leading-tight tracking-tight text-[var(--ink)]">
      Blog
    </h1>
    <p className="mt-2 text-[16px] text-[var(--ink-mid)]">
      Thoughts on full-stack development, agentic AI, and things I learn along
      the way.
    </p>

    <BlogListing />
  </main>
);

export default BlogPage;
