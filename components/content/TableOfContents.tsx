"use client";

import { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="not-prose my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <ListOrdered className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Table of Contents
        </h4>
      </div>
      <nav aria-label="Table of Contents">
        <ul className="space-y-1.5 text-xs sm:text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 px-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-700 dark:text-brand-300 font-semibold bg-brand-100/50 dark:bg-brand-950/60"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

