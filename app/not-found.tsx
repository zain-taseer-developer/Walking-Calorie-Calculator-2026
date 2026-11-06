import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Flame, Compass, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Compass className="w-8 h-8" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="text-base text-slate-600 dark:text-slate-400 mt-3 max-w-md mx-auto">
        The fitness tool or article you are looking for may have been moved or updated. Let&apos;s get you back on track!
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Go to Walking Calorie Calculator</span>
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          <span>Browse Fitness Guides</span>
        </Link>
      </div>

      <div className="mt-16 text-left border-t border-slate-200 dark:border-slate-800 pt-8">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Popular Fitness Calculators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {siteConfig.allTools.slice(0, 4).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500/50 flex items-center justify-between text-sm"
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.title}</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

