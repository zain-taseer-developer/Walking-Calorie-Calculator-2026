"use client";

import React, { useState } from "react";

export function MaintenanceCalorieTool() {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState<number>(30);
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(6);
  const [cm, setCm] = useState<number>(168);
  const [weightLbs, setWeightLbs] = useState<number>(150);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [activity, setActivity] = useState<number>(1.375); // Light active
  const [goal, setGoal] = useState<string>("maintain"); // maintain, lose_mild, lose_mod, recomp, bulk

  // Height in cm
  const finalHeightCm = unit === "imperial" ? (feet * 12 + inches) * 2.54 : cm;
  // Weight in kg
  const finalWeightKg = unit === "imperial" ? weightLbs * 0.45359237 : weightKg;

  // Mifflin-St Jeor BMR Equation
  let bmr = 10 * finalWeightKg + 6.25 * finalHeightCm - 5 * age;
  bmr = sex === "male" ? bmr + 5 : bmr - 161;
  const roundedBmr = Math.round(bmr);

  // TDEE (Total Daily Energy Expenditure) = BMR * activity
  const tdee = Math.round(bmr * activity);

  // Goal adjustment
  let goalDelta = 0;
  if (goal === "lose_mild") goalDelta = -350;
  else if (goal === "lose_mod") goalDelta = -500;
  else if (goal === "recomp") goalDelta = -200;
  else if (goal === "bulk") goalDelta = +300;

  const targetCalories = Math.max(1200, tdee + goalDelta);

  // Macros Calculation
  // Protein: 2.0g per kg of body mass (4 kcal/g)
  const proteinGrams = Math.round(finalWeightKg * 2.0);
  const proteinCalories = proteinGrams * 4;
  // Fat: 25% of total target calories (9 kcal/g)
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);
  // Carbs: remainder calories (4 kcal/g)
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Maintenance Calories & TDEE Macro Calculator
          </h2>
          <p className="text-xs text-slate-500">Mifflin-St Jeor energy expenditure & macro split</p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`rounded-md px-3 py-1 ${unit === "imperial" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            Imperial (lbs / in)
          </button>
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`rounded-md px-3 py-1 ${unit === "metric" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            Metric (kg / cm)
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sex & Age */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Sex & Age
          </label>
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={() => setSex("female")}
              className={`flex-1 rounded-lg border py-2 text-xs font-semibold ${sex === "female" ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"}`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => setSex("male")}
              className={`flex-1 rounded-lg border py-2 text-xs font-semibold ${sex === "male" ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"}`}
            >
              Male
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-slate-500">Age:</span>
            <input
              type="number"
              min="15"
              max="110"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 25)}
              className="w-16 rounded border border-slate-300 px-2 py-0.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
            />
            <span className="text-xs text-slate-400">years</span>
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
                min="100"
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
                min="60"
                max="450"
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
                min="30"
                max="220"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">kg ({Math.round(weightKg * 2.20462)} lbs)</span>
            </div>
          )}
        </div>

        {/* Daily Activity Level */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Activity Level
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value={1.2}>Sedentary (desk job, little exercise)</option>
            <option value={1.375}>Light Active (walk 5-7k steps / 1-3 days)</option>
            <option value={1.55}>Moderately Active (walk 8-10k / 3-5 days)</option>
            <option value={1.725}>Very Active (hard daily workout / 12k+)</option>
            <option value={1.9}>Extra Active (physical job & athlete)</option>
          </select>
        </div>
      </div>

      {/* Goal Selector Tabs */}
      <div className="mt-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Your Primary Fitness Goal
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            { id: "maintain", label: "Maintain Weight", delta: "0 kcal" },
            { id: "lose_mild", label: "Mild Deficit", delta: "-350 kcal" },
            { id: "lose_mod", label: "Standard Deficit", delta: "-500 kcal" },
            { id: "recomp", label: "Body Recomposition", delta: "-200 kcal" },
            { id: "bulk", label: "Lean Bulking", delta: "+300 kcal" },
          ].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoal(g.id)}
              className={`rounded-xl border p-2.5 text-center transition ${goal === g.id ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-200" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"}`}
            >
              <div className="text-xs">{g.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{g.delta}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Results Card */}
      <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white dark:bg-slate-950">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Daily Target Calories
            </span>
            <div className="mt-1 text-5xl font-black text-emerald-400">{targetCalories}</div>
            <span className="text-xs text-emerald-200">kcal to eat per day</span>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Maintenance TDEE & BMR
            </span>
            <div className="mt-1 text-2xl font-bold text-slate-100">{tdee} kcal/day</div>
            <div className="mt-1 text-xs text-slate-400">
              Basal Metabolic Rate (BMR): {roundedBmr} kcal
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recommended Daily Macros
            </span>
            <div className="mt-1 space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-teal-300">
                <span>Protein:</span>
                <span>{proteinGrams}g ({proteinCalories} kcal)</span>
              </div>
              <div className="flex justify-between font-semibold text-amber-300">
                <span>Fats:</span>
                <span>{fatGrams}g ({fatCalories} kcal)</span>
              </div>
              <div className="flex justify-between font-semibold text-sky-300">
                <span>Carbs:</span>
                <span>{carbGrams}g ({carbCalories} kcal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

