import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getAllCategories, getPostsByCategory, slugifyCategory, FLAT_CATEGORY_NAMES } from "@/lib/blog";
import { constructMetadata, generateArticleSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents, TocItem } from "@/components/content/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { MDXContent } from "@/components/blog/MDXContent";
import { BlogCard } from "@/components/blog/BlogCard";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Flame,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

function getFlatCategoryBySlug(slug: string) {
  return getAllCategories().find(
    (category) => FLAT_CATEGORY_NAMES.includes(category.name) && category.slug === slug
  );
}

function getCategoryHref(categoryName: string) {
  const categorySlug = slugifyCategory(categoryName);
  return FLAT_CATEGORY_NAMES.includes(categoryName)
    ? `/blog/${categorySlug}`
    : `/blog/category/${categorySlug}`;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const slugs = new Set([
    ...posts.map((post) => post.frontmatter.slug),
    ...getAllCategories()
      .filter((category) => FLAT_CATEGORY_NAMES.includes(category.name))
      .map((category) => category.slug),
  ]);
  return Array.from(slugs, (slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    const category = getFlatCategoryBySlug(slug);
    if (!category) return {};

    return constructMetadata({
      title: `${category.name} Guides`,
      description: `Browse all articles, calculators, and research guides filed under ${category.name}.`,
      canonicalPath: `/blog/${category.slug}`,
      noindex: false,
    });
  }

  return constructMetadata({
    title: post.frontmatter.seoTitle || post.frontmatter.title,
    description: post.frontmatter.description,
    canonicalPath: `/blog/${post.frontmatter.slug}`,
    ogType: "article",
    publishedTime: post.frontmatter.publishedAt,
    modifiedTime: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
    keywords: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const category = post ? undefined : getFlatCategoryBySlug(slug);
  if (!post && category) {
    const posts = getPostsByCategory(category.name);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: category.name }]} />
        <div className="my-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
            <span>Category Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            Showing {posts.length} article{posts.length === 1 ? "" : "s"} filed under &quot;{category.name}&quot;.
          </p>
        </div>
        <AdSlot format="horizontal" slotId="category-top" />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {posts.map((categoryPost) => (
              <BlogCard key={categoryPost.frontmatter.slug} post={categoryPost} />
            ))}
          </div>
        ) : (
          <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300">Articles in this category are coming soon.</p>
          </div>
        )}
      </div>
    );
  }

  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.frontmatter.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Extract headings from markdown content for the sticky TOC
  const headingRegex = /^##\s+(.+)$/gm;
  const tocItems: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const title = match[1].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    tocItems.push({ id, label: title });
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.frontmatter.title,
              description: post.frontmatter.description,
              url: `/blog/${post.frontmatter.slug}`,
              publishedAt: post.frontmatter.publishedAt,
              updatedAt: post.frontmatter.updatedAt,
              authorName: post.frontmatter.author,
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.frontmatter.category, href: getCategoryHref(post.frontmatter.category) },
          { label: post.frontmatter.title },
        ]}
      />

      {/* Article Header */}
      <header className="max-w-4xl mx-auto my-6 text-center">
        <Link
          href={getCategoryHref(post.frontmatter.category)}
          className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 mb-3 hover:bg-brand-100"
        >
          {post.frontmatter.category}
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.frontmatter.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {post.frontmatter.description}
        </p>

        {/* Metadata bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {post.frontmatter.author}
            </span>
          </div>

          <span>&bull;</span>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.frontmatter.publishedAt}</span>
          </div>

          <span>&bull;</span>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-6">
          <ShareButtons title={post.frontmatter.title} slug={post.frontmatter.slug} />
        </div>
      </header>

      {/* Top Ad Slot */}
      <div className="max-w-4xl mx-auto my-6">
        <AdSlot format="horizontal" slotId="blog-post-top" />
      </div>

      {/* 2-Column Desktop Layout (Sticky TOC + Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Sticky Desktop Table of Contents (3 cols) */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <TableOfContents items={tocItems} />
              <AdSlot format="rectangle" slotId="blog-sidebar-ad" />
            </div>
          </aside>
        )}

        {/* Main Article Content (9 cols if TOC exists, else 12) */}
        <div className={tocItems.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
          <div className="max-w-3xl">
            {/* Render Parsed MDX Blocks */}
            <MDXContent content={post.content} />

            {/* Optional FAQ Accordion */}
            {post.frontmatter.faq && post.frontmatter.faq.length > 0 && (
              <div className="my-10">
                <FAQSection faqs={post.frontmatter.faq} />
              </div>
            )}

            {/* Mid-Article Ad Slot */}
            <AdSlot format="in-article" slotId="blog-post-mid" />

            {/* Primary CTA Block */}
            <div className="not-prose my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-brand-900/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>Free Fitness Tool</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Try the Walking Calorie Calculator
                </h3>
                <p className="text-xs sm:text-sm text-teal-100 max-w-md">
                  Input your exact body weight, duration, speed, and treadmill incline to calculate live calories burned.
                </p>
              </div>

              <Link
                href="/"
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition-colors shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Open Calculator</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>

            {/* Author Box */}
            <AuthorBox
              author={post.frontmatter.author}
              bio={post.frontmatter.authorBio}
              updatedAt={post.frontmatter.updatedAt || post.frontmatter.publishedAt}
            />

            {/* Prev / Next Article Navigation */}
            <nav className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.frontmatter.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-colors flex flex-col"
                >
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous Article</span>
                  </span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
                    {prevPost.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.frontmatter.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-right transition-colors flex flex-col items-end"
                >
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
                    {nextPost.frontmatter.title}
                  </span>
                </Link>
              )}
            </nav>

            {/* Related Tools Grid */}
            <RelatedTools currentPath={`/blog/${post.frontmatter.slug}`} limit={4} />

            {/* Bottom Ad Slot */}
            <AdSlot format="horizontal" slotId="blog-post-bottom" />
          </div>
        </div>
      </div>
    </article>
  );
}
