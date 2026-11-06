import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const { frontmatter, readingTimeMinutes } = post;

  return (
    <article
      className={`group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg hover:border-brand-500/50 transition-all flex flex-col justify-between ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Reading Time */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {frontmatter.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight ${
              featured ? "text-xl sm:text-2xl mb-3" : "text-base sm:text-lg mb-2"
            }`}
          >
            <Link href={`/blog/${frontmatter.slug}`}>
              {frontmatter.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {frontmatter.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{frontmatter.publishedAt}</span>
          </div>

          <Link
            href={`/blog/${frontmatter.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

