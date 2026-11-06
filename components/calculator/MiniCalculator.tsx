"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateWalkingCalories } from "@/lib/calc";
import { CalculatorInputs } from "@/lib/types";
import { NumericInput } from "./NumericInput";
import { Flame, ArrowRight, Sparkles } from "lucide-react";

export function MiniCalculator({
  defaultWeightLbs = 160,
  defaultDurationMins = 45,
  defaultMph = 3.5,
  title = "Quick Walking Calorie Estimator",
}: {
  defaultWeightLbs?: number;
  defaultDurationMins?: number;
  defaultMph?: number;
  title?: string;
}) {
  const [weight, setWeight] = useState(defaultWeightLbs);
  const [minutes, setMinutes] = useState(defaultDurationMins);
  const [speed, setSpeed] = useState(defaultMph);

  const inputs: CalculatorInputs = useMemo(
    () => ({
      unitSystem: "imperial",
      mode: "time-speed",
      weightLbs: weight,
      weightKg: weight * 0.45359237,
      heightFt: 5,
      heightIn: 9,
      heightCm: 175,
      durationHours: Math.floor(minutes / 60),
      durationMinutes: minutes % 60,
      speedMph: speed,
      speedKmh: speed * 1.609344,
      distanceMiles: (speed * minutes) / 60,
      distanceKm: ((speed * minutes) / 60) * 1.609344,
      steps: Math.round(((speed * minutes) / 60) * 2100),
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightLbs: 0,
      backpackWeightKg: 0,
      showNetCalories: false,
    }),
    [weight, minutes, speed]
  );

  const result = useMemo(() => calculateWalkingCalories(inputs), [inputs]);

  return (
    <div className="not-prose my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-brand-50 via-white to-teal-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-brand-950/40 border border-brand-200 dark:border-brand-900/60 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-brand-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-600 text-white shadow-xs">
            <Flame className="w-4 h-4" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-brand-700 dark:text-brand-300 bg-brand-100/60 dark:bg-brand-950 px-2 py-0.5 rounded-full">
          Interactive Tool
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Weight (lbs)
          </label>
          <NumericInput
            value={weight}
            onChange={(val) => setWeight(val)}
            min={40}
            max={500}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Duration (minutes)
          </label>
          <NumericInput
            value={minutes}
            onChange={(val) => setMinutes(val)}
            min={1}
            max={360}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Pace / Speed
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
          >
            <option value={2.0}>Stroll (2.0 mph)</option>
            <option value={2.5}>Casual (2.5 mph)</option>
            <option value={3.0}>Moderate (3.0 mph)</option>
            <option value={3.5}>Brisk (3.5 mph)</option>
            <option value={4.0}>Power Walk (4.0 mph)</option>
            <option value={4.5}>Fast (4.5 mph)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-brand-100 dark:border-slate-800 bg-white/70 dark:bg-slate-800/50 p-3 rounded-xl">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 font-mono">
            {result.grossCalories}
          </span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            kcal burned
          </span>
          <span className="text-xs text-slate-500">
            ({result.distanceMiles} miles, ~{result.steps.toLocaleString()} steps)
          </span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200"
        >
          <span>Open Full Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

