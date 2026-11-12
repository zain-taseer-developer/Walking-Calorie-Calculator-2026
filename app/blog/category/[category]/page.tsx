import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { FolderOpen } from "lucide-react";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.filter((c) => c.count > 0).map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const current = categories.find((c) => c.slug === category);
  const categoryName = current ? current.name : category.replace(/-/g, " ");

  return constructMetadata({
    title: `${categoryName} Guides`,
    description: `Browse all articles, calculators, and research guides filed under ${categoryName}.`,
    canonicalPath: `/blog/category/${category}`,
    noindex: false,
  });
}

export default async function CategoryArchivePage({ params }: Props) {
  const { category } = await params;
  const categories = getAllCategories();
  const current = categories.find((c) => c.slug === category);
  const categoryName = current ? current.name : category.replace(/-/g, " ");
  const posts = getPostsByCategory(categoryName);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: `${categoryName} Archive` },
        ]}
      />

      <div className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Category Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {categoryName}
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Showing {posts.length} article{posts.length === 1 ? "" : "s"} filed under &quot;{categoryName}&quot;.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="category-top" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {posts.map((post) => (
          <BlogCard key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
