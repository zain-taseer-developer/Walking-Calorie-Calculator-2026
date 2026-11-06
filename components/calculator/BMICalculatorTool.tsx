"use client";

import React, { useState } from "react";

export function BMICalculatorTool() {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [gender, setGender] = useState<"male" | "female">("female");
  const [age, setAge] = useState<number>(30);
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(7);
  const [cm, setCm] = useState<number>(170);
  const [weightLbs, setWeightLbs] = useState<number>(150);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [bodyFat, setBodyFat] = useState<string>("22");
  const [isAsianStandard, setIsAsianStandard] = useState<boolean>(false);

  // Compute Height in meters
  const heightM = unit === "imperial" ? (feet * 12 + inches) * 0.0254 : cm / 100;
  // Compute Weight in kg
  const finalWeightKg = unit === "imperial" ? weightLbs * 0.45359237 : weightKg;

  // Calculate BMI
  const bmi = heightM > 0 ? +(finalWeightKg / (heightM * heightM)).toFixed(1) : 0;

  // Healthy weight range (BMI 18.5 to 24.9)
  const minHealthyKg = +(18.5 * heightM * heightM).toFixed(1);
  const maxHealthyKg = +(24.9 * heightM * heightM).toFixed(1);
  const minHealthyLbs = Math.round(minHealthyKg * 2.20462);
  const maxHealthyLbs = Math.round(maxHealthyKg * 2.20462);

  // Classification
  let category = "Normal weight";
  let colorClass = "text-emerald-500";
  let bgClass = "bg-emerald-500";

  if (isAsianStandard) {
    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-amber-500";
      bgClass = "bg-amber-500";
    } else if (bmi <= 22.9) {
      category = "Normal / Healthy";
      colorClass = "text-emerald-500";
      bgClass = "bg-emerald-500";
    } else if (bmi <= 27.4) {
      category = "Overweight (Increased Risk)";
      colorClass = "text-orange-500";
      bgClass = "bg-orange-500";
    } else {
      category = "Obesity (High Risk)";
      colorClass = "text-rose-500";
      bgClass = "bg-rose-500";
    }
  } else {
    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-amber-500";
      bgClass = "bg-amber-500";
    } else if (bmi <= 24.9) {
      category = "Normal weight (Good BMI)";
      colorClass = "text-emerald-500";
      bgClass = "bg-emerald-500";
    } else if (bmi <= 29.9) {
      category = "Overweight";
      colorClass = "text-orange-500";
      bgClass = "bg-orange-500";
    } else if (bmi <= 34.9) {
      category = "Obese (Class 1)";
      colorClass = "text-rose-500";
      bgClass = "bg-rose-500";
    } else {
      category = "Obese (Class 2 / 3)";
      colorClass = "text-rose-600";
      bgClass = "bg-rose-600";
    }
  }

  // FFMI Calculation (Fat-Free Mass Index)
  const bfNum = parseFloat(bodyFat);
  let ffmi: number | null = null;
  let normalizedFfmi: number | null = null;
  if (!isNaN(bfNum) && bfNum > 3 && bfNum < 60 && heightM > 0) {
    const fatFreeMass = finalWeightKg * (1 - bfNum / 100);
    ffmi = +(fatFreeMass / (heightM * heightM)).toFixed(1);
    // Normalized FFMI (Kouri et al. 1995 formula): FFMI + 6.1 * (1.8 - heightM)
    normalizedFfmi = +(ffmi + 6.1 * (1.8 - heightM)).toFixed(1);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Body Mass Index & FFMI Calculator
          </h2>
          <p className="text-xs text-slate-500">WHO & CDC adult and pediatric guidelines</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAsianStandard(!isAsianStandard)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${isAsianStandard ? "border-teal-500 bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"}`}
          >
            {isAsianStandard ? "Asian BMI Standard Active" : "WHO Standard"}
          </button>
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setUnit("imperial")}
              className={`rounded-md px-3 py-1 ${unit === "imperial" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
            >
              Imperial
            </button>
            <button
              type="button"
              onClick={() => setUnit("metric")}
              className={`rounded-md px-3 py-1 ${unit === "metric" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
            >
              Metric
            </button>
          </div>
        </div>
      </div>

      {/* Input Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sex & Age */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Sex & Age
          </label>
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`flex-1 rounded-lg border py-2 text-xs font-semibold ${gender === "female" ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"}`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`flex-1 rounded-lg border py-2 text-xs font-semibold ${gender === "male" ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"}`}
            >
              Male
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-slate-500">Age:</span>
            <input
              type="number"
              min="2"
              max="120"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 20)}
              className="w-16 rounded border border-slate-300 px-2 py-0.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
            />
            <span className="text-xs text-slate-400">yrs</span>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Height
          </label>
          {unit === "imperial" ? (
            <div className="mt-1 flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min="3"
                  max="7"
                  value={feet}
                  onChange={(e) => setFeet(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <span className="text-[10px] text-slate-400">ft</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={inches}
                  onChange={(e) => setInches(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <span className="text-[10px] text-slate-400">in</span>
              </div>
            </div>
          ) : (
            <div className="mt-1">
              <input
                type="number"
                min="90"
                max="240"
                value={cm}
                onChange={(e) => setCm(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">cm</span>
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Weight
          </label>
          {unit === "imperial" ? (
            <div className="mt-1">
              <input
                type="number"
                min="40"
                max="500"
                value={weightLbs}
                onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">lbs ({finalWeightKg.toFixed(1)} kg)</span>
            </div>
          ) : (
            <div className="mt-1">
              <input
                type="number"
                min="20"
                max="250"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">kg ({Math.round(weightKg * 2.20462)} lbs)</span>
            </div>
          )}
        </div>

        {/* Optional Body Fat for FFMI */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Body Fat % (Optional)
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="number"
              step="0.5"
              min="4"
              max="60"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="e.g. 20"
            />
            <span className="ml-2 text-sm font-bold text-slate-400">%</span>
          </div>
          <span className="text-[10px] text-slate-400">Enables FFMI muscle index</span>
        </div>
      </div>

      {/* Results Box */}
      <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white dark:bg-slate-950">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Your Body Mass Index (BMI)
            </span>
            <div className="mt-2 text-5xl font-black text-emerald-400">{bmi}</div>
            <div className={`mt-1 text-sm font-bold ${colorClass}`}>{category}</div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Healthy Weight for Your Height
            </span>
            <div className="mt-2 text-lg font-bold text-slate-100">
              {unit === "imperial"
                ? `${minHealthyLbs} - ${maxHealthyLbs} lbs`
                : `${minHealthyKg} - ${maxHealthyKg} kg`}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Represents standard normal BMI range (18.5 - 24.9)
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Fat-Free Mass Index (FFMI)
            </span>
            <div className="mt-2 text-lg font-bold text-teal-300">
              {normalizedFfmi ? `${normalizedFfmi} (Normalized)` : "Add BF% above"}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {normalizedFfmi
                ? normalizedFfmi > 22
                  ? "Superior lean muscular development"
                  : "Average to healthy muscularity"
                : "Enter body fat % to calculate muscular FFMI"}
            </p>
          </div>
        </div>

        {/* Gauge bar */}
        <div className="mt-6">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full ${bgClass} transition-all duration-300`}
              style={{ width: `${Math.min(Math.max((bmi / 40) * 100, 5), 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-slate-400">
            <span>&lt; 18.5 (Underweight)</span>
            <span>18.5 - 24.9 (Normal)</span>
            <span>25.0 - 29.9 (Overweight)</span>
            <span>&ge; 30.0 (Obese)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

