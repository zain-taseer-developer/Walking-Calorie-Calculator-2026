"use client";

import React, { useState } from "react";

export function WeightConverterTool() {
  const [lbs, setLbs] = useState<string>("154");
  const [kg, setKg] = useState<string>("69.85");
  const [lastChanged, setLastChanged] = useState<"lbs" | "kg">("lbs");

  const handleLbsChange = (val: string) => {
    setLbs(val);
    setLastChanged("lbs");
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setKg((num * 0.45359237).toFixed(2));
    } else {
      setKg("");
    }
  };

  const handleKgChange = (val: string) => {
    setKg(val);
    setLastChanged("kg");
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setLbs((num / 0.45359237).toFixed(2));
    } else {
      setLbs("");
    }
  };

  const quickPresets = [
    { label: "128 lbs", val: "128" },
    { label: "144 lbs", val: "144" },
    { label: "152 lbs", val: "152" },
    { label: "162 lbs", val: "162" },
    { label: "173 lbs", val: "173" },
    { label: "179 lbs", val: "179" },
    { label: "183 lbs", val: "183" },
    { label: "193 lbs", val: "193" },
    { label: "202 lbs", val: "202" },
    { label: "227 lbs", val: "227" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Pounds Input */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-emerald-950 dark:bg-emerald-950/20">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Pounds (lbs)
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-inner focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950">
            <input
              type="number"
              step="any"
              min="0"
              value={lbs}
              onChange={(e) => handleLbsChange(e.target.value)}
              className="w-full bg-transparent text-2xl font-bold text-slate-900 outline-none dark:text-white"
              placeholder="150"
            />
            <span className="text-sm font-semibold text-slate-400">lbs</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Imperial mass standard (US / UK)</p>
        </div>

        {/* Kilograms Input */}
        <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-5 dark:border-teal-950 dark:bg-teal-950/20">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Kilograms (kg)
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-inner focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950">
            <input
              type="number"
              step="any"
              min="0"
              value={kg}
              onChange={(e) => handleKgChange(e.target.value)}
              className="w-full bg-transparent text-2xl font-bold text-slate-900 outline-none dark:text-white"
              placeholder="68"
            />
            <span className="text-sm font-semibold text-slate-400">kg</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Metric standard (SI / Scientific MET)</p>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Frequently Searched Weights:
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {quickPresets.map((p) => (
            <button
              key={p.val}
              type="button"
              onClick={() => handleLbsChange(p.val)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Summary Card */}
      <div className="mt-6 rounded-xl bg-slate-900 p-4 text-white dark:bg-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Current Conversion</span>
            <div className="text-lg font-bold text-emerald-400">
              {lbs || "0"} lbs = {kg || "0"} kg
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-300 sm:mt-0 sm:text-right">
            <span>Exact Factor: 1 lb = 0.45359237 kg</span>
            <br />
            <span className="text-slate-400">1 kg = 2.20462262 lbs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

