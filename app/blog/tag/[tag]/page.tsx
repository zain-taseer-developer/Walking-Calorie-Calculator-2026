import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { Tag } from "lucide-react";

interface Props {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({
    tag: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tags = getAllTags();
  const current = tags.find((t) => t.slug === tag);
  const tagName = current ? current.name : tag.replace(/-/g, " ");

  return constructMetadata({
    title: `Posts Tagged #${tagName}`,
    description: `Articles tagged with #${tagName} on WalkingCalorieCalc.com.`,
    canonicalPath: `/blog/tag/${tag}`,
    noindex: true, // As specified in brief to avoid thin archive dilution
  });
}

export default async function TagArchivePage({ params }: Props) {
  const { tag } = await params;
  const tags = getAllTags();
  const current = tags.find((t) => t.slug === tag);
  const tagName = current ? current.name : tag.replace(/-/g, " ");
  const posts = getPostsByTag(tagName);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: `Tag #${tagName}` },
        ]}
      />

      <div className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Tag Archive (noindex)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          #{tagName}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Showing {posts.length} article{posts.length === 1 ? "" : "s"} tagged with &quot;{tagName}&quot;.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {posts.map((post) => (
          <BlogCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
