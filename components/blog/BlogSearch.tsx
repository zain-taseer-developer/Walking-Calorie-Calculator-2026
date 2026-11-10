"use client";

import React, { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { Search } from "lucide-react";

interface BlogSearchProps {
  posts: BlogPost[];
  categories: Array<{ name: string; slug: string; count: number }>;
}

export function BlogSearch({ posts, categories }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.frontmatter.category === selectedCategory;
      const matchesSearch =
        searchTerm === "" ||
        post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.frontmatter.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <section className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
            Search guides
          </label>
          <p className="mt-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
            Search by title, topic, or keyword.
          </p>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search guides"
              placeholder="Try walking calories, steps, or treadmill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </section>

        <section className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Browse by category
          </h2>
          <p className="mt-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
            Choose a category to see guides on that topic.
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === "All"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              All Guides ({posts.length})
            </button>
            {categories.filter((cat) => cat.count > 0).map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.frontmatter.slug} post={post} featured={index === 0 && !searchTerm && selectedCategory === "All"} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No articles found matching &quot;{searchTerm}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

