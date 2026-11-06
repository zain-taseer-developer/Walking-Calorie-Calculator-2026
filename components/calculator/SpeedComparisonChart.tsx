"use client";

import React from "react";
import { UnitSystem } from "@/lib/types";

interface SpeedComparisonChartProps {
  data: Array<{
    label: string;
    mph: number;
    kmh: number;
    calories: number;
  }>;
  currentMph: number;
  unitSystem: UnitSystem;
}

export function SpeedComparisonChart({
  data,
  currentMph,
  unitSystem,
}: SpeedComparisonChartProps) {
  if (!data || data.length === 0) return null;

  const maxCalories = Math.max(...data.map((d) => d.calories), 1);
  const chartHeight = 140;
  const barWidth = 32;
  const gap = 16;
  const totalWidth = data.length * (barWidth + gap);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Calories at Different Speeds (Same Time)
        </h4>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Compendium MET scale
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${totalWidth} ${chartHeight + 35}`}
          className="w-full max-w-lg mx-auto overflow-visible"
          style={{ minWidth: "300px" }}
        >
          {data.map((item, idx) => {
            const isCurrent = Math.abs(item.mph - currentMph) < 0.25;
            const barHeight = Math.max(8, (item.calories / maxCalories) * chartHeight);
            const x = idx * (barWidth + gap) + 8;
            const y = chartHeight - barHeight;

            return (
              <g key={item.label} className="transition-all duration-300">
                {/* Bar Value Tooltip / Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${
                    isCurrent
                      ? "fill-brand-600 dark:fill-brand-400"
                      : "fill-slate-600 dark:fill-slate-400"
                  }`}
                >
                  {item.calories}
                </text>

                {/* SVG Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={6}
                  className={`transition-all duration-300 ${
                    isCurrent
                      ? "fill-brand-600 dark:fill-brand-500"
                      : "fill-slate-300 dark:fill-slate-700 hover:fill-slate-400 dark:hover:fill-slate-600"
                  }`}
                />

                {/* X Axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 16}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    isCurrent
                      ? "font-bold fill-slate-900 dark:fill-white"
                      : "fill-slate-500 dark:fill-slate-400"
                  }`}
                >
                  {unitSystem === "imperial" ? `${item.mph}m` : `${item.kmh}k`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-1">
        Highlighted bar represents your currently selected pace.
      </p>
    </div>
  );
}

