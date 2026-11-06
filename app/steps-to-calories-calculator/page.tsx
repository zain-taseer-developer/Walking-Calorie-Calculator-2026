"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { Callout } from "@/components/content/Callout";
import { DataTable } from "@/components/content/DataTable";
import { calculateWalkingCalories } from "@/lib/calc";
import { CalculatorInputs } from "@/lib/types";
import { Footprints, Flame, Sparkles, Scale, Activity } from "lucide-react";

export default function StepsToCaloriesPage() {
  const [steps, setSteps] = useState<number>(10000);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [paceType, setPaceType] = useState<"casual" | "brisk" | "power">("brisk");

  const speedMph = {
    casual: 2.5,
    brisk: 3.5,
    power: 4.2,
  }[paceType];

  const calcResult = useMemo(() => {
    const inputs: CalculatorInputs = {
      unitSystem: "imperial",
      mode: "steps",
      weightLbs,
      weightKg: weightLbs * 0.45359237,
      heightFt,
      heightIn,
      heightCm: Math.round((heightFt * 12 + heightIn) * 2.54),
      durationHours: 0,
      durationMinutes: 0,
      speedMph,
      speedKmh: speedMph * 1.609344,
      distanceMiles: 0,
      distanceKm: 0,
      steps,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightLbs: 0,
      backpackWeightKg: 0,
      showNetCalories: false,
    };
    return calculateWalkingCalories(inputs);
  }, [steps, weightLbs, heightFt, heightIn, speedMph]);

  // Steps by Weight Matrix
  const matrixWeights = [120, 140, 160, 180, 200, 220, 250];
  const matrixSteps = [2000, 5000, 7500, 10000, 12500, 15000, 20000];

  const matrixRows = matrixSteps.map((s) => {
    const row: (string | number)[] = [`${s.toLocaleString()} steps`];
    matrixWeights.forEach((w) => {
      const res = calculateWalkingCalories({
        unitSystem: "imperial",
        mode: "steps",
        weightLbs: w,
        weightKg: w * 0.45359237,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 0,
        durationMinutes: 0,
        speedMph: 3.5,
        speedKmh: 5.63,
        distanceMiles: 0,
        distanceKm: 0,
        steps: s,
        inclinePercent: 0,
        terrain: "pavement",
        backpackWeightLbs: 0,
        backpackWeightKg: 0,
        showNetCalories: false,
      });
      row.push(res.grossCalories);
    });
    return row;
  });

  const faqs: FAQItem[] = [
    {
      question: "How many calories does 1 step burn?",
      answer:
        "On average, one walking step burns roughly 0.04 to 0.055 calories for a typical adult. A 140-pound individual expends approximately 0.04 calories per step, while a 200-pound individual burns approximately 0.053 calories per step. While a single step seems negligible, taking 10,000 steps accumulates to 400 to 530 calories of meaningful energy expenditure.",
    },
    {
      question: "How many calories does 20,000 steps burn?",
      answer:
        "Walking 20,000 steps burns between 700 and 1,100 calories depending on your body weight and pace. Because 20,000 steps covers roughly 8.5 to 10 miles, it represents a substantial metabolic workout that burns more than a pound of fat equivalent per 3 to 4 days.",
    },
    {
      question: "Why do calories from steps vary between fitness trackers?",
      answer:
        "Fitness trackers make different algorithmic assumptions regarding your basal metabolic rate (BMR), walking velocity, and stride length. Trackers that only count arm swings without heart-rate integration often miscalculate step calories by 20% to 30%. Our calculator uses direct MET physiological scaling to ensure mathematical accuracy.",
    },
    {
      question: "Can I reach my weight loss goals just by tracking steps?",
      answer:
        "Yes, tracking daily steps is one of the most reliable methods to increase non-exercise activity thermogenesis (NEAT). Maintaining a daily step average of 10,000 to 12,000 steps while eating at your maintenance calorie level creates a weekly deficit of 2,800 to 3,500 calories, resulting in roughly one pound of fat loss per week.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Steps to Calories Calculator" }]} />

      {/* Header */}
      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>Step-First Energy Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Steps to Calories Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Convert your pedometer, smartwatch, or phone steps into exact calories burned based on body weight, pace, and stride mechanics.
        </p>
      </div>

      {/* Interactive Step-to-Calorie Card */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label htmlFor="step-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Total Steps Taken
              </label>
              <input
                id="step-input"
                type="number"
                value={steps}
                onChange={(e) => setSteps(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xl font-bold focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[5000, 7500, 10000, 15000, 20000].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSteps(s)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                      steps === s
                        ? "bg-brand-600 border-brand-600 text-white font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {s.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="weight-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Weight (lbs)
                </label>
                <input
                  id="weight-input"
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Walking Intensity
                </label>
                <select
                  value={paceType}
                  onChange={(e) => setPaceType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="casual">Casual (2.5 mph)</option>
                  <option value="brisk">Brisk (3.5 mph)</option>
                  <option value="power">Power Walk (4.2 mph)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-lg space-y-4 text-center">
            <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider block">
              Estimated Energy Expended
            </span>
            <div>
              <div className="text-5xl font-black font-mono tracking-tight">
                {calcResult.grossCalories}
              </div>
              <div className="text-xl font-bold text-teal-100">Calories (kcal)</div>
            </div>

            <div className="pt-3 border-t border-white/20 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-teal-200 block">Distance</span>
                <span className="text-sm font-bold font-mono">{calcResult.distanceMiles} mi</span>
              </div>
              <div>
                <span className="text-teal-200 block">Time</span>
                <span className="text-sm font-bold font-mono">~{calcResult.durationTotalMinutes} min</span>
              </div>
              <div>
                <span className="text-teal-200 block">Fat Equiv</span>
                <span className="text-sm font-bold font-mono">{calcResult.fatGramsBurned} g</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/?steps=${steps}&mode=steps`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Open in Full Walking Calorie Calculator</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="steps-to-calories-top" />

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12">
        <h2>How Steps Translate Into Calories Burned</h2>
        <p>
          Calculating calories burned from steps involves three connected physical measurements: <strong>step count</strong>, <strong>stride length</strong>, and <strong>body weight</strong>. When your pedometer registers a step, your leg muscles propel your mass upward and forward against gravity.
        </p>

        <p>
          Because moving a heavier object requires more mechanical force, a 220-pound walker burns approximately 50% more calories per step than a 140-pound walker. Furthermore, walking with high cadence or power arm swings engages the upper torso and core, increasing oxygen intake and overall metabolic rate.
        </p>

        <DataTable
          title="Steps to Calories Reference Matrix"
          caption="Energy burn (kcal) across common body weights at a brisk 3.5 mph pace."
          headers={["Step Count", "120 lbs", "140 lbs", "160 lbs", "180 lbs", "200 lbs", "220 lbs", "250 lbs"]}
          rows={matrixRows}
          highlightColumnIndex={4}
        />

        <p>
          Looking for additional variables such as hill incline, backpack weight, or terrain? Head over to our homepage{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>{" "}
          for complete customization.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/steps-to-calories-calculator" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}

