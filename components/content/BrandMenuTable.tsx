"use client";

import React, { useMemo, useState } from "react";
import { subwayMenu } from "@/data/brands/subway";
import { Search } from "lucide-react";

/**
 * Searchable render of a brand's full nutrition chart. H3 per menu category
 * (used inside the article's "Menu Nutrition Table" H2 section).
 */
export function BrandMenuTable({
  menu = subwayMenu,
}: {
  menu?: typeof subwayMenu;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu.categories;
    return menu.categories
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => i.name.toLowerCase().includes(q)),
      }))
      .filter((c) => c.items.length > 0);
  }, [menu.categories, query]);

  return (
    <div className="not-prose my-6">
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the nutrition table…"
          aria-label="Search menu nutrition table"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        {menu.disclaimer} &middot; {menu.market}, last updated{" "}
        {menu.lastUpdated}.
      </p>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No menu items match your search.
        </p>
      )}

      {filtered.map((category) => (
        <section key={category.id} className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {category.label}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/80">
                <tr>
                  {[
                    "Item",
                    "Serving",
                    "Calories",
                    "Protein (g)",
                    "Carbs (g)",
                    "Fat (g)",
                    "Sodium (mg)",
                    "Fiber (g)",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {category.items.map((item) => (
                  <tr
                    key={`${category.id}-${item.name}`}
                    className="bg-white dark:bg-slate-900/40"
                  >
                    <td className="px-3 py-2 font-medium text-slate-800 dark:text-slate-100">
                      {item.name}
                      {item.isPlaceholder && (
                        <span className="ml-2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          TODO
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {item.serving}
                    </td>
                    <td className="px-3 py-2 font-bold tabular-nums text-slate-900 dark:text-white">
                      {item.calories}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 dark:text-slate-300">
                      {item.protein}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 dark:text-slate-300">
                      {item.carbs}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 dark:text-slate-300">
                      {item.fat}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 dark:text-slate-300">
                      {item.sodium}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 dark:text-slate-300">
                      {item.fiber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
