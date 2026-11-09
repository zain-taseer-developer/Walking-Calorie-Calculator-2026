"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { Callout } from "@/components/content/Callout";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { DataTable } from "@/components/content/DataTable";
import { Footprints, ArrowRightLeft, Sparkles, Ruler, Compass } from "lucide-react";
import { estimateStrideLength } from "@/lib/calc";

export default function StepsToMilesPage() {
  const [steps, setSteps] = useState<number>(10000);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [customStrideFt, setCustomStrideFt] = useState<string>("");

  const heightCm = Math.round((heightFt * 12 + heightIn) * 2.54);
  const naturalStride = estimateStrideLength(heightCm);
  const activeStrideFt = customStrideFt ? parseFloat(customStrideFt) || 2.5 : naturalStride.feet;
  const activeStrideM = activeStrideFt * 0.3048;

  // Conversions
  const distanceMiles = (steps * activeStrideFt) / 5280;
  const distanceKm = (steps * activeStrideM) / 1000;
  const stepsPerMile = Math.round(5280 / activeStrideFt);
  const stepsPerKm = Math.round(1000 / activeStrideM);

  // Reference Table Data: Steps to Miles
  const stepMilestones = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000, 30000,
  ];

  const milestoneRows = stepMilestones.map((s) => {
    const mi = (s * activeStrideFt) / 5280;
    const km = (s * activeStrideM) / 1000;
    const approxTimeMins = Math.round((mi / 3.0) * 60); // at moderate 3.0 mph
    return [s.toLocaleString(), `${mi.toFixed(2)} miles`, `${km.toFixed(2)} km`, `~${approxTimeMins} mins`];
  });

  // Miles to Steps Reference
  const mileList = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10];
  const milesToStepsRows = mileList.map((m) => {
    const st = Math.round(m * stepsPerMile);
    const km = (m * 1.609344).toFixed(2);
    return [`${m} mile${m === 1 ? "" : "s"}`, `${km} km`, `${st.toLocaleString()} steps`];
  });

  const faqs: FAQItem[] = [
    {
      question: "How many steps are in a single mile?",
      answer:
        "For an average adult with a standard walking stride length of 2.2 to 2.5 feet, there are approximately 2,000 to 2,500 steps in one mile. Taller individuals (over 6 feet) take longer strides and average around 1,900 to 2,100 steps per mile, whereas shorter individuals (under 5'4) average roughly 2,300 to 2,600 steps per mile.",
    },
    {
      question: "How many steps is 3 miles?",
      answer:
        "Approximately 6,000 to 7,500 steps for an average adult.",
    },
    {
      question: "How do you calculate your personal stride length?",
      answer:
        "Walk 10 steps, measure the total distance in feet, divide by 10. That is your average stride length. Alternatively, multiply your height in inches by 0.413 for an estimate.",
    },
    {
      question: "How many steps in 5 miles?",
      answer:
        "Approximately 10,000 to 12,500 steps depending on your stride length.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Steps to Miles Calculator" }]} />

      {/* Header */}
      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>Stride-Calibrated Distance Converter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Steps to Miles Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Convert any step count into exact miles and kilometers based on your height and personalized stride length.
        </p>
      </div>

      {/* Interactive Converter Card */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <label htmlFor="step-count" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Number of Steps
              </label>
              <input
                id="step-count"
                type="number"
                inputMode="numeric"
                min={1}
                max={200000}
                value={steps}
                onChange={(e) => setSteps(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-mono font-bold focus:ring-2 focus:ring-brand-500"
              />
              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[3000, 5000, 7500, 10000, 15000, 20000].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSteps(count)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                      steps === count
                        ? "bg-brand-600 border-brand-600 text-white font-bold"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {count.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Height for stride calculation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Your Height (for Stride Calibration)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(parseInt(e.target.value, 10) || 5)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">in</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Estimated stride: {activeStrideFt.toFixed(2)} ft ({activeStrideM.toFixed(2)} m)
              </p>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-lg space-y-4 text-center">
            <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider block">
              Calculated Ground Distance
            </span>
            <div>
              <div className="text-5xl font-black font-mono tracking-tight">
                {distanceMiles.toFixed(2)}
              </div>
              <div className="text-xl font-bold text-teal-100">Miles</div>
            </div>

            <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-teal-200 block">Kilometers</span>
                <span className="text-base font-bold font-mono">{distanceKm.toFixed(2)} km</span>
              </div>
              <div>
                <span className="text-teal-200 block">Steps per Mile</span>
                <span className="text-base font-bold font-mono">{stepsPerMile.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/?steps=${steps}&mode=steps`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Calculate Calories for {steps.toLocaleString()} Steps</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="steps-to-miles-top" />

      {/* Authoritative Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12">
        <h2>How Many Steps in a Mile? (The Anthropometric Science)</h2>
        <p>
          The number of steps required to walk a mile is determined by simple geometry: <strong>5,280 feet divided by your average stride length</strong>. Because human leg length correlates directly with total standing height (accounting for approximately 45% of total stature), taller walkers take longer steps and register fewer steps per mile than shorter walkers.
        </p>

        <p>
          According to published kinesiology and biomechanics research, the average adult walking stride length is roughly <strong>2.2 to 2.5 feet</strong> (26 to 30 inches). This translates into:
        </p>

        <ul>
          <li><strong>Average adult:</strong> ~2,100 to 2,250 steps per mile.</li>
          <li><strong>Under 5&apos;4&quot; (163 cm):</strong> ~2,300 to 2,500 steps per mile.</li>
          <li><strong>Over 6&apos;0&quot; (183 cm):</strong> ~1,900 to 2,050 steps per mile.</li>
          <li><strong>Brisk walking / Jogging:</strong> Pace also extends flight phase and hip extension, slightly decreasing steps per mile compared to casual strolling.</li>
        </ul>

        <p>
          If you also want to see how many calories your daily walk burns, head over to our flagship{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>{" "}
          to input your exact body weight and terrain factors.
        </p>

        <DataTable
          title="Steps to Miles & Kilometers Quick Reference"
          caption="Based on average adult stride length (~2.38 feet / 0.725 meters)."
          headers={["Steps", "Distance (Miles)", "Distance (Kilometers)", "Est. Walking Time (3.0 mph)"]}
          rows={milestoneRows}
          highlightColumnIndex={1}
        />

        <DataTable
          title="Miles to Steps Reference Table"
          caption="Quick guide for popular walking distances."
          headers={["Miles", "Kilometers", "Step Equivalent"]}
          rows={milesToStepsRows}
          highlightColumnIndex={2}
        />

        <h2>Comprehensive Step-to-Miles Conversion Matrix &amp; Mileage Benchmarks</h2>
        <p>
          Use our free <strong>steps to miles converter</strong> and interactive <strong>steps to miles conversion</strong> calculator to <strong>convert steps to miles</strong> accurately. Below are detailed benchmarks for every step volume from 1,000 to 30,000 steps:
        </p>

        <ul>
          <li><strong>1,000 Steps:</strong> How far is 1000 steps? Approximately 0.38 to 0.47 miles (0.61 to 0.76 km).</li>
          <li><strong>2,000 Steps:</strong> How many miles is 2000 steps? Approximately 0.76 to 0.95 miles.</li>
          <li><strong>3,000 Steps:</strong> How many miles is 3000 steps? 3000 steps to miles (or 3000 steps in miles) equals roughly 1.14 to 1.42 miles.</li>
          <li><strong>4,000 Steps:</strong> How many miles is 4000 steps? 4000 steps to miles (how far is 4000 steps) equals roughly 1.52 to 1.89 miles.</li>
          <li><strong>5,000 Steps:</strong> How many miles is 5000 steps? 5000 steps to miles (also searched as 5 000 steps to miles or how far is 5000 steps) equals 1.89 to 2.37 miles.</li>
          <li><strong>6,000 Steps:</strong> How many miles is 6000 steps? 6000 steps to miles (6000 steps in miles) equals 2.27 to 2.84 miles.</li>
          <li><strong>7,000 Steps:</strong> How many miles is 7000 steps? 7000 steps to miles (7000 steps is how many miles, how far is 7000 steps, how far is 7 000 steps, how many miles is 7 000 steps) equals roughly 2.65 to 3.31 miles.</li>
          <li><strong>7,500 Steps:</strong> 7500 steps to miles (how many miles is 7500 steps) equals 2.84 to 3.55 miles.</li>
          <li><strong>8,000 Steps:</strong> How many miles is 8000 steps? 8000 steps to miles (8 000 steps in miles or how many miles is 8k steps) equals roughly 3.03 to 3.79 miles.</li>
          <li><strong>9,000 Steps:</strong> How many miles is 9000 steps? 9000 steps to miles equals roughly 3.41 to 4.26 miles.</li>
          <li><strong>10,000 Steps:</strong> 10 000 steps in miles (10000 steps is how many miles, how many miles is 10 000 steps, how far is 10 000 steps, 10000 steps equals how many miles, how many miles is 10 thousand steps, 10 000 steps is how many miles, 10 000 steps how many miles, how far is 10000 steps in miles, how many miles is ten thousand steps) equals 3.79 to 4.73 miles.</li>
          <li><strong>11,000 Steps:</strong> How many miles is 11000 steps? 11000 steps to miles (how many miles in 11000 steps) equals 4.17 to 5.21 miles.</li>
          <li><strong>12,000 Steps:</strong> How many miles is 12000 steps? 12000 steps to miles (how many miles is 12k steps) equals 4.55 to 5.68 miles.</li>
          <li><strong>13,000 Steps:</strong> How many miles is 13000 steps? 13000 steps to miles (13000 steps miles) equals roughly 4.92 to 6.16 miles.</li>
          <li><strong>14,000 Steps:</strong> How many miles is 14000 steps? 14000 steps to miles (14000 steps is how many miles) equals 5.30 to 6.63 miles.</li>
          <li><strong>15,000 Steps:</strong> 15000 steps to miles (how many miles is 15000 steps, 15000 steps miles, 15 000 steps in miles, how many miles is 15 000 steps, how far is 15000 steps) equals 5.68 to 7.10 miles.</li>
          <li><strong>16,000 Steps:</strong> How many miles is 16000 steps? Equals roughly 6.06 to 7.58 miles.</li>
          <li><strong>17,000 Steps:</strong> How many miles is 17000 steps? 17000 steps to miles (how many miles is 17 000 steps, 17000 steps into miles) equals roughly 6.44 to 8.05 miles.</li>
          <li><strong>18,000 Steps:</strong> 18000 steps to miles (how many miles is 18000 steps, 18000 steps is how many miles) equals roughly 6.82 to 8.52 miles.</li>
          <li><strong>19,000 Steps:</strong> How many miles is 19000 steps? 19000 steps in miles equals 7.20 to 9.00 miles.</li>
          <li><strong>20,000 Steps:</strong> 20000 steps to miles (20k steps to miles, how many miles is 20k steps, how far is 20000 steps, 20 000 steps to miles, how many miles is 20 000 steps, 20000 steps in miles, 20000 steps a day, 20k steps a day) equals 7.58 to 9.47 miles.</li>
          <li><strong>21,000 Steps:</strong> How many miles is 21000 steps? Equals roughly 7.95 to 9.94 miles.</li>
          <li><strong>22,000 Steps:</strong> 22000 steps to miles (how many miles is 22 000 steps, 22000 steps in miles, how many miles is 22000 steps) equals roughly 8.33 to 10.42 miles.</li>
          <li><strong>23,000 Steps:</strong> How many miles is 23000 steps? Equals roughly 8.71 to 10.89 miles.</li>
          <li><strong>25,000 Steps:</strong> 25000 steps to miles (how many miles is 25000 steps) equals roughly 9.47 to 11.84 miles.</li>
          <li><strong>30,000 Steps:</strong> How many miles is 30000 steps? 30 000 steps to miles (30000 steps to miles, 30k steps to miles) equals roughly 11.36 to 14.20 miles.</li>
        </ul>

        <h2>Miles to Steps Distance Benchmarks</h2>
        <ul>
          <li><strong>1 Mile:</strong> How many steps in one mile? (Also searched as: how many steps is 1 mile, how many steps equal a mile, how many steps i n a mile, how many average steps in a mile, how many steps is one mile, how many steps is in 1 mile, how many steps in a mile on average, how many steps is in a mile, how many steps make a mile, how many steps to a mile, how many steps are in 1 mile, average steps per mile, how many steps equal to a mile, on average how many steps are in a mile, 1 mile in steps, average number of steps in a mile, steps in a mile walking, about how many steps in a mile, how many steps are in a mile on average, how many steps is in a mile walking). An average adult takes 2,000 to 2,500 steps per mile.</li>
          <li><strong>1.5 Miles:</strong> How many steps in a mile and a half? Equals roughly 3,000 to 3,750 steps.</li>
          <li><strong>2 Miles:</strong> How many steps in 2 miles (2 miles in steps) equals approximately 4,000 to 5,000 steps.</li>
          <li><strong>3 Miles:</strong> How many steps in 3 miles (how many steps are in 3 miles, 3 miles is how many steps, steps in 3 miles) equals 6,000 to 7,500 steps.</li>
          <li><strong>4 Miles:</strong> How many steps is 4 miles (how many steps in 4 miles) equals 8,000 to 10,000 steps.</li>
          <li><strong>5 Miles:</strong> How many steps is 5 miles (5 miles is how many steps) equals 10,000 to 12,500 steps.</li>
          <li><strong>7 Miles:</strong> How many steps is 7 miles (how many steps in 7 miles) equals 14,000 to 17,500 steps.</li>
          <li><strong>10 Miles:</strong> How many steps is 10 miles equals 20,000 to 25,000 steps.</li>
        </ul>

        <h2>Health &amp; Weight Goals</h2>
        <p>
          Many walkers wonder: <strong>how many miles should i walk per day</strong>? Public health data recommends walking 3 to 5 miles per day (7,000 to 10,000 steps) for longevity. If you ask: <strong>how many steps do i need to lose weight</strong>? Accumulating 10,000 to 12,000 steps consistently burns 350 to 500 extra calories per day, supporting a safe, steady fat-loss rate of roughly 1 pound per week without restrictive diets.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/steps-to-miles-calculator" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
