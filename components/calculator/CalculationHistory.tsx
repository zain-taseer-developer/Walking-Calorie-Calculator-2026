"use client";

import React from "react";
import { History, Trash2, ArrowUpRight, ArrowRight } from "lucide-react";
import { SavedCalculation } from "@/lib/history";

export interface CalculationHistoryProps {
  history: SavedCalculation[];
  loadedRecordId: string | null;
  recentlyUpdatedId: string | null;
  isOpen: boolean;
  onToggleOpen: () => void;
  onLoadCalculation: (calc: SavedCalculation) => void;
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
}

export function CalculationHistory({
  history,
  loadedRecordId,
  recentlyUpdatedId,
  isOpen,
  onToggleOpen,
  onLoadCalculation,
  onDeleteRecord,
  onClearHistory,
}: CalculationHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          aria-expanded={isOpen}
        >
          <History className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>
            Saved History ({history.length} {history.length === 1 ? "record" : "records"} / 28 max)
          </span>
          <span className="text-[10px] text-slate-400 font-normal">
            (Oldest to Newest, retained 28 days)
          </span>
        </button>

        {isOpen && history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="flex items-center gap-1 text-[11px] font-medium text-rose-500 hover:text-rose-600 transition-colors"
            title="Clear all saved history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Retained Records Container with Scrollbar */}
      {isOpen && (
        <div className="mt-3 space-y-2 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
          {history.map((item, index) => {
            const isLoaded = loadedRecordId === item.id;
            const isRecentlyUpdated = recentlyUpdatedId === item.id;
            const rowNumber = index + 1;

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  isLoaded
                    ? "bg-brand-50/80 dark:bg-brand-950/40 border-brand-500/80 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Left side: Sequential row number and metrics */}
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className="shrink-0 font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    #{rowNumber}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-extrabold text-brand-600 dark:text-brand-400">
                        {item.calories} kcal
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        · {item.durationMinutes} min @ {item.speedMph} mph (
                        {item.unitSystem === "imperial"
                          ? `${item.weightLbs} lbs`
                          : `${item.weightKg} kg`}
                        )
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{item.distanceMiles} mi ({item.distanceKm} km)</span>
                      <span>·</span>
                      <span>
                        {(() => {
                          const d = new Date(item.timestamp);
                          if (!isNaN(d.getTime())) {
                            return d.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            });
                          }
                          const idNum = Number(item.id);
                          if (!isNaN(idNum) && idNum > 1000000000000) {
                            return new Date(idNum).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            });
                          }
                          return item.timestamp || "";
                        })()}
                      </span>

                      {/* 10-second "Data updated" badge with arrow */}
                      {isRecentlyUpdated && (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.5 rounded animate-pulse">
                          <ArrowRight className="w-3 h-3" />
                          <span>Data updated</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side action buttons */}
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {/* Load / Restore Button */}
                  <button
                    type="button"
                    onClick={() => onLoadCalculation(item)}
                    className={`p-1.5 rounded-lg transition-all ${
                      isLoaded
                        ? "bg-brand-600 text-white shadow-xs ring-2 ring-brand-500/50"
                        : "text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                    }`}
                    title={isLoaded ? "Currently loaded in calculator" : "Load record into calculator"}
                    aria-label={`Load record #${rowNumber} into calculator`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {/* Individual Delete Button */}
                  <button
                    type="button"
                    onClick={() => onDeleteRecord(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={`Remove record #${rowNumber}`}
                    aria-label={`Remove record #${rowNumber}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export type { SavedCalculation };
