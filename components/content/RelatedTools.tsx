import React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { ArrowRight, Calculator } from "lucide-react";

export function RelatedTools({
  currentPath = "",
  limit = 4,
  title = "Explore More Free Walking & Health Calculators",
}: {
  currentPath?: string;
  limit?: number;
  title?: string;
}) {
  const tools = siteConfig.allTools
    .filter((tool) => tool.href !== currentPath)
    .slice(0, limit);

  return (
    <section className="not-prose my-12" aria-labelledby="related-tools-heading">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1">
            Connected Fitness Suite
          </span>
          <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500/60 dark:hover:border-brand-500/60 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
                  <Calculator className="w-4 h-4" />
                </div>
                {tool.badge && (
                  <span className="text-[10px] font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 mt-4 group-hover:translate-x-0.5 transition-transform">
              <span>Open Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

