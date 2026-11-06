"use client";

import React, { useState } from "react";
import Link from "next/link";

export function TreadmillInclineTool() {
  const [speedMph, setSpeedMph] = useState<number>(3.5);
  const [incline, setIncline] = useState<number>(6);
  const [durationMin, setDurationMin] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

  // Treadmill speed to pace calculation
  // pace min/mile = 60 / speedMph
  const paceTotalMinutes = speedMph > 0 ? 60 / speedMph : 0;
  const paceMinutes = Math.floor(paceTotalMinutes);
  const paceSeconds = Math.round((paceTotalMinutes - paceMinutes) * 60);

  // ACSM Metabolic Walking Incline Equation:
  // VO2 (ml/kg/min) = 0.1 * speed(m/min) + 1.8 * speed(m/min) * grade + 3.5
  // speed m/min = speedMph * 26.8224
  const speedMMin = speedMph * 26.8224;
  const gradeDecimal = incline / 100;
  const vo2 = 0.1 * speedMMin + 1.8 * speedMMin * gradeDecimal + 3.5;
  const kcalPerMin = (vo2 * weightKg) / 1000 * 5;
  const totalCalories = Math.round(kcalPerMin * durationMin);

  // Flat comparison (0% incline)
  const flatVo2 = 0.1 * speedMMin + 3.5;
  const flatKcalPerMin = (flatVo2 * weightKg) / 1000 * 5;
  const flatCalories = Math.round(flatKcalPerMin * durationMin);
  const extraBurn = totalCalories - flatCalories;
  const burnMultiplier = flatCalories > 0 ? (totalCalories / flatCalories).toFixed(1) : "1.0";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Treadmill Incline & Pace Calculator
          </h2>
          <p className="text-xs text-slate-500">Live ACSM metabolic incline equation</p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`rounded-md px-3 py-1 ${unit === "imperial" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            Imperial (mph / lbs)
          </button>
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`rounded-md px-3 py-1 ${unit === "metric" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            Metric (km/h / kg)
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Speed */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Speed ({unit === "imperial" ? "mph" : "km/h"})
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="12"
            value={unit === "imperial" ? speedMph : +(speedMph * 1.60934).toFixed(1)}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setSpeedMph(unit === "imperial" ? val : val / 1.60934);
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-[11px] text-slate-500">
            Pace: {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds} /mi
          </span>
        </div>

        {/* Incline */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Incline (% Grade)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.5"
              min="0"
              max="20"
              value={incline}
              onChange={(e) => setIncline(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <span className="text-sm font-bold text-slate-400">%</span>
          </div>
          <span className="text-[11px] text-slate-500">12% = 12-3-30 protocol</span>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Duration (Minutes)
          </label>
          <input
            type="number"
            step="5"
            min="1"
            max="180"
            value={durationMin}
            onChange={(e) => setDurationMin(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-[11px] text-slate-500">Typical workout: 30-45 min</span>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Weight ({unit === "imperial" ? "lbs" : "kg"})
          </label>
          <input
            type="number"
            step="1"
            min="30"
            max="250"
            value={unit === "imperial" ? Math.round(weightKg * 2.20462) : weightKg}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setWeightKg(unit === "imperial" ? val / 2.20462 : val);
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-[11px] text-slate-500">{weightKg.toFixed(1)} kg body mass</span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Incline Presets:</span>
        {[
          { label: "Flat (0%)", inc: 0, spd: 3.5 },
          { label: "Zone 2 Hill (4%)", inc: 4, spd: 3.2 },
          { label: "Power Hike (8%)", inc: 8, spd: 3.0 },
          { label: "Viral 12-3-30 (12%)", inc: 12, spd: 3.0 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setIncline(p.inc);
              setSpeedMph(p.spd);
            }}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Result Metrics */}
      <div className="mt-6 grid gap-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white sm:grid-cols-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Total Incline Burn
          </span>
          <div className="mt-1 text-4xl font-extrabold">{totalCalories}</div>
          <span className="text-xs text-emerald-100">estimated kcal burned</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Incline Advantage
          </span>
          <div className="mt-1 text-3xl font-bold">+{extraBurn} kcal</div>
          <span className="text-xs text-emerald-100">{burnMultiplier}× vs. flat walking ({flatCalories} kcal)</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Pace & Speed
          </span>
          <div className="mt-1 text-2xl font-bold">
            {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds} /mi
          </div>
          <span className="text-xs text-emerald-100">{speedMph.toFixed(1)} mph ({ (speedMph * 1.60934).toFixed(1) } km/h)</span>
        </div>
      </div>
    </div>
  );
}

