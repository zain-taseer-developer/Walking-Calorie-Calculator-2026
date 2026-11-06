import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { AdSlot } from "@/components/ads/AdSlot";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Walking & Fitness Research Blog | Evidence-Based Guides",
  description:
    "Explore in-depth exercise physiology articles, step benchmarks, treadmill workout breakdowns, and fat-loss science from the WalkingCalorieCalculator.net research team.",
  canonicalPath: "/blog",
  keywords: [
    "walking blog",
    "calories burned walking articles",
    "step workout guide",
    "fitness research",
  ],
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Blog & Guides" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Exercise Science &amp; Health Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Walking, Steps &amp; Calorie Research
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          In-depth, peer-reviewed articles and practical protocols to help you optimize your daily step volume and physical well-being.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="blog-hub-top" />

      {/* Interactive Search & Filterable Card Grid */}
      <div className="my-8">
        <BlogSearch posts={posts} categories={categories} />
      </div>
    </div>
  );
}

