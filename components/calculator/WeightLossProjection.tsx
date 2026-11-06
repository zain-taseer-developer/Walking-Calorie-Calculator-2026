"use client";

import React from "react";
import { CalculationResult, UnitSystem } from "@/lib/types";
import { TrendingDown, Info } from "lucide-react";

interface WeightLossProjectionProps {
  result: CalculationResult;
  unitSystem: UnitSystem;
}

export function WeightLossProjection({ result, unitSystem }: WeightLossProjectionProps) {
  const isImperial = unitSystem === "imperial";
  const { projections } = result;

  const days3 = isImperial ? `${projections.days3PerWeekLbs} lbs` : `${projections.days3PerWeekKg} kg`;
  const days5 = isImperial ? `${projections.days5PerWeekLbs} lbs` : `${projections.days5PerWeekKg} kg`;
  const days7 = isImperial ? `${projections.days7PerWeekLbs} lbs` : `${projections.days7PerWeekKg} kg`;

  return (
    <div className="w-full bg-gradient-to-br from-brand-50/70 to-emerald-50/40 dark:from-slate-900/80 dark:to-brand-950/30 rounded-xl p-4 sm:p-5 border border-brand-200/60 dark:border-brand-900/40">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-brand-600 text-white shadow-xs">
          <TrendingDown className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Estimated Monthly Weight-Loss Projections
        </h4>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
        Assuming your current dietary intake remains at maintenance calories:
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-brand-100 dark:border-slate-700/60 shadow-xs">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
            3 Days / Week
          </span>
          <span className="block text-base sm:text-lg font-bold text-brand-700 dark:text-brand-300 font-mono mt-0.5">
            ~{days3}
          </span>
          <span className="text-[10px] text-slate-400">per month</span>
        </div>

        <div className="bg-white/90 dark:bg-slate-800/90 p-2.5 rounded-xl border-2 border-brand-500 dark:border-brand-500/70 shadow-sm relative">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-brand-600 text-[9px] text-white font-semibold rounded-full uppercase tracking-wider">
            Popular
          </span>
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
            5 Days / Week
          </span>
          <span className="block text-base sm:text-lg font-bold text-brand-600 dark:text-brand-400 font-mono mt-0.5">
            ~{days5}
          </span>
          <span className="text-[10px] text-slate-400">per month</span>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-brand-100 dark:border-slate-700/60 shadow-xs">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Every Day (7x)
          </span>
          <span className="block text-base sm:text-lg font-bold text-brand-700 dark:text-brand-300 font-mono mt-0.5">
            ~{days7}
          </span>
          <span className="text-[10px] text-slate-400">per month</span>
        </div>
      </div>

      <div className="flex items-start gap-1.5 mt-3 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-600 dark:text-brand-400" />
        <span>
          Based on the classic rule of thumb (~3,500 kcal per pound / ~7,700 kcal per kg of body fat). Individual metabolic adaptation, appetite compensation, and water retention will vary.
        </span>
      </div>
    </div>
  );
}

