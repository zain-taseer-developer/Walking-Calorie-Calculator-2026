"use client";

import React, { useState } from "react";

export interface DataTableProps {
  title?: string;
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
  highlightColumnIndex?: number;
}

export function DataTable({
  title,
  caption,
  headers,
  rows,
  highlightColumnIndex,
}: DataTableProps) {
  const [filter, setFilter] = useState("");

  const filteredRows = filter
    ? rows.filter((row) =>
        row.some((cell) => cell.toString().toLowerCase().includes(filter.toLowerCase()))
      )
    : rows;

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      {(title || caption) && (
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {title && (
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {title}
              </h4>
            )}
            {caption && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {caption}
              </p>
            )}
          </div>
          {rows.length > 8 && (
            <input
              type="text"
              placeholder="Search in table..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white max-w-xs focus:ring-2 focus:ring-brand-500"
            />
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`py-3 px-4 font-semibold ${
                    highlightColumnIndex === i
                      ? "text-brand-700 dark:text-brand-300 bg-brand-50/50 dark:bg-brand-950/30"
                      : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
            {filteredRows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-2.5 px-4 ${cIdx === 0 ? "font-medium text-slate-900 dark:text-white" : "font-mono"} ${
                      highlightColumnIndex === cIdx
                        ? "font-bold text-brand-700 dark:text-brand-400 bg-brand-50/20 dark:bg-brand-950/20"
                        : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

