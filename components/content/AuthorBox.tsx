import React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { CheckCircle, Calendar, ShieldCheck, UserCheck } from "lucide-react";

export function AuthorBox({
  author = siteConfig.AUTHOR_NAME,
  title = siteConfig.AUTHOR_TITLE,
  bio = siteConfig.AUTHOR_BIO,
  updatedAt = "2026-11-01",
  showReviewBadge = true,
}: {
  author?: string;
  title?: string;
  bio?: string;
  updatedAt?: string;
  showReviewBadge?: boolean;
}) {
  return (
    <div className="not-prose my-8 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
        <UserCheck className="w-6 h-6" />
      </div>

      <div className="space-y-1.5 flex-1 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {author}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-xs ml-2">
              &bull; {title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: {updatedAt}</span>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          {bio}
        </p>

        {showReviewBadge && (
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-brand-700 dark:text-brand-300">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Medically & scientifically referenced</span>
            </span>
            <span>&bull;</span>
            <Link
              href="/editorial-policy-and-methodology"
              className="underline hover:no-underline font-medium"
            >
              Editorial & Methodology Policy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

