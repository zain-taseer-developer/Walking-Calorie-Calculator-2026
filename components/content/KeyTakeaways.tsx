import React from "react";
import { CheckCircle2, BookmarkCheck } from "lucide-react";

export function KeyTakeaways({
  title = "Key Takeaways",
  points,
}: {
  title?: string;
  points: string[];
}) {
  return (
    <div className="not-prose my-8 p-6 rounded-2xl bg-gradient-to-br from-brand-50/80 to-teal-50/50 dark:from-slate-900/90 dark:to-brand-950/30 border border-brand-200 dark:border-brand-900/50 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-brand-800 dark:text-brand-300">
        <BookmarkCheck className="w-5 h-5" />
        <h3 className="font-bold text-base sm:text-lg tracking-tight">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {points.map((pt, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

