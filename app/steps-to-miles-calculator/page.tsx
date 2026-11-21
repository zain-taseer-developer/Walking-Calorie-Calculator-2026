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
import { Footprints, ArrowRightLeft, Sparkles, Ruler, Copy, RefreshCw, Check } from "lucide-react";
import { estimateStrideLength } from "@/lib/calc";

export default function StepsToMilesPage() {
  type Mode = "steps-to-miles" | "miles-to-steps";
  type LengthMode = "height" | "custom";
  type Unit = "inches" | "cm";

  const INCHES_PER_MILE = 63360;
  const INCHES_PER_KM = 39370.07874015748;
  const KM_PER_MILE = 1.609344;
  const CM_PER_INCH = 2.54;

  const PRESET_STEPS = [1000, 5000, 7500, 10000, 15000, 20000];

  const [mode, setMode] = useState<Mode>("steps-to-miles");
  const [steps, setSteps] = useState<number>(10000);
  const [miles, setMiles] = useState<number>(2);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [lengthMode, setLengthMode] = useState<LengthMode>("height");
  const [customLength, setCustomLength] = useState<string>("");
  const [unit, setUnit] = useState<Unit>("inches");
  const [copied, setCopied] = useState<boolean>(false);

  const heightTotalInches = heightFt * 12 + heightIn;
  const heightCm = Math.round(heightTotalInches * 2.54);
  const naturalStrideM = estimateStrideLength(heightCm > 0 ? heightCm : 170).meters;
  const naturalStrideInches = naturalStrideM * 39.37007874015748;

  let stepLengthInches = naturalStrideInches;
  if (lengthMode === "custom") {
    const v = parseFloat(customLength);
    if (Number.isFinite(v) && v > 0) {
      stepLengthInches = unit === "cm" ? v * CM_PER_INCH : v;
    }
  }

  const stepsPerMile = INCHES_PER_MILE / stepLengthInches;
  const stepsPerKm = INCHES_PER_KM / stepLengthInches;
  const stepLengthDisplayCm = stepLengthInches * CM_PER_INCH;

  function validate(): string | null {
    const primaryValue = mode === "steps-to-miles" ? steps : miles;
    if (!Number.isFinite(primaryValue) || primaryValue <= 0) {
      return mode === "steps-to-miles"
        ? "Please enter a valid number of steps (greater than 0)."
        : "Please enter a valid distance in miles (greater than 0).";
    }
    if (lengthMode === "height") {
      if (heightTotalInches <= 0) {
        return "Please enter your height (feet and inches).";
      }
    } else {
      const v = parseFloat(customLength);
      if (!Number.isFinite(v) || v <= 0) {
        return "Please enter a valid step length greater than 0.";
      }
    }
    return null;
  }

  const error = validate();
  const valid = !error;

  let distanceMiles = 0;
  let distanceKm = 0;
  let totalSteps = 0;

  if (valid && stepLengthInches > 0) {
    if (mode === "steps-to-miles") {
      distanceMiles = (steps * stepLengthInches) / INCHES_PER_MILE;
      distanceKm = distanceMiles * KM_PER_MILE;
    } else {
      totalSteps = Math.round((miles * INCHES_PER_MILE) / stepLengthInches);
      distanceMiles = miles;
      distanceKm = miles * KM_PER_MILE;
    }
  }

  const handleReset = () => {
    setMode("steps-to-miles");
    setSteps(10000);
    setMiles(2);
    setHeightFt(5);
    setHeightIn(9);
    setLengthMode("height");
    setCustomLength("");
    setUnit("inches");
    setCopied(false);
  };

  const handleCopy = () => {
    const summary = [
      "Steps to Miles & Miles to Steps Calculator – WalkingCalorieCalc.com",
      `Mode: ${mode === "steps-to-miles" ? "Steps to Miles" : "Miles to Steps"}`,
      mode === "steps-to-miles"
        ? `Steps: ${steps.toLocaleString()}`
        : `Distance: ${miles.toLocaleString()} miles`,
      `Height: ${heightFt} ft ${heightIn} in`,
      `Step Length: ${stepLengthInches.toFixed(2)} in (${stepLengthDisplayCm.toFixed(2)} cm)`,
      mode === "steps-to-miles"
        ? `Distance: ${distanceMiles.toFixed(2)} miles (${distanceKm.toFixed(2)} km)`
        : `Estimated Steps: ${totalSteps.toLocaleString()}`,
      `Steps per Mile: ${Math.round(stepsPerMile).toLocaleString()}`,
      `Steps per Kilometer: ${Math.round(stepsPerKm).toLocaleString()}`,
    ].join("\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Reference Table Data: Steps to Miles
  const stepMilestones = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000, 30000,
  ];

  const milestoneRows = stepMilestones.map((s) => {
    const mi = (s * stepLengthInches) / INCHES_PER_MILE;
    const km = mi * KM_PER_MILE;
    const approxTimeMins = Math.round((mi / 3.0) * 60); // at moderate 3.0 mph
    return [s.toLocaleString(), `${mi.toFixed(2)} miles`, `${km.toFixed(2)} km`, `~${approxTimeMins} mins`];
  });

  // Miles to Steps Reference
  const mileList = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10];
  const milesToStepsRows = mileList.map((m) => {
    const st = Math.round(m * stepsPerMile);
    const km = (m * KM_PER_MILE).toFixed(2);
    return [`${m} mile${m === 1 ? "" : "s"}`, `${km} km`, `${st.toLocaleString()} steps`];
  });

  const heightBenchmarkRows = [
    { height: "5 ft 0 in", totalHeightInches: 60 },
    { height: "5 ft 4 in", totalHeightInches: 64 },
    { height: "5 ft 8 in", totalHeightInches: 68 },
    { height: "6 ft 0 in", totalHeightInches: 72 },
    { height: "6 ft 4 in", totalHeightInches: 76 },
  ].map(({ height, totalHeightInches }) => {
    const strideLengthFt = estimateStrideLength(Math.round(totalHeightInches * 2.54)).feet;
    const strideLengthInches = strideLengthFt * 12;
    const milesAtSteps = (stepCount: number) =>
      `${((stepCount * strideLengthInches) / 63360).toFixed(2)} miles`;

    return [
      height,
      `${strideLengthFt.toFixed(2)} ft (${strideLengthInches.toFixed(1)} in)`,
      milesAtSteps(5000),
      milesAtSteps(10000),
      milesAtSteps(15000),
    ];
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
        "Walking 3 miles equals approximately 6,000 to 7,500 steps for an average adult. At a standard walking pace of 3.0 mph, this takes roughly 60 minutes to complete.",
    },
    {
      question: "How do you calculate your personal stride length?",
      answer:
        "To measure your exact stride length, walk 10 steps on flat ground and measure the total distance in feet, then divide by 10. Alternatively, multiply your height in inches by 0.413 to get a close estimate. For example, a person 5 feet 8 inches (68 inches) tall would have an estimated stride of approximately 2.4 feet.",
    },
    {
      question: "How many steps in 5 miles?",
      answer:
        "Five miles equals approximately 10,000 to 12,500 steps depending on your stride length. For an average adult using a 2.2 to 2.5 foot stride, 5 miles falls right at the popular 10,000-step daily goal mark.",
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
          Convert steps to miles and miles to steps instantly, based on your height and personalized stride length.
        </p>
      </div>

      {/* Interactive Converter Card */}
      <div className="my-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        {/* Conversion Mode Switch */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Conversion Mode
          </label>
          <div className="flex w-full max-w-md items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
            <button
              onClick={() => setMode("steps-to-miles")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold border-r border-transparent transition-colors ${
                mode === "steps-to-miles"
                  ? "bg-brand-700 border-brand-600 text-white shadow-md shadow-brand-600/20"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" /> Steps to Miles
            </button>
            <button
              onClick={() => setMode("miles-to-steps")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${
                mode === "miles-to-steps"
                  ? "bg-brand-700 border-brand-600 text-white shadow-md shadow-brand-600/20"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" /> Miles to Steps
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            Toggle between converting steps into distance, or distance into steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Inputs */}
          <div className="space-y-5">
            {/* Primary input */}
            {mode === "steps-to-miles" ? (
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
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Type a step count or tap a preset below.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PRESET_STEPS.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setSteps(count)}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                        steps === count
                          ? "bg-brand-700 border-brand-600 text-white font-bold"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {count.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="distance-miles" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Distance in Miles
                </label>
                <input
                  id="distance-miles"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min={0}
                  value={miles}
                  onChange={(e) => setMiles(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-mono font-bold focus:ring-2 focus:ring-brand-500"
                />
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Enter a distance and we&rsquo;ll estimate the total steps.
                </p>
              </div>
            )}

            {/* Step length mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Step Length Mode
              </label>
              <div className="inline-flex w-full max-w-md rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                <button
                  onClick={() => setLengthMode("height")}
                  className={`flex-1 py-2.5 text-sm font-semibold border-r border-transparent transition-colors ${
                    lengthMode === "height"
                      ? "bg-brand-700 border-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  Use My Height
                </button>
                <button
                  onClick={() => setLengthMode("custom")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                    lengthMode === "custom"
                      ? "bg-brand-700 border-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  Enter My Step Length
                </button>
              </div>
            </div>

            {/* Height input (height mode) */}
            {lengthMode === "height" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Height
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      aria-label="Height in feet"
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(parseInt(e.target.value, 10) || 5)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 dark:text-slate-400">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      aria-label="Additional height in inches"
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 dark:text-slate-400">in</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Estimated step length: {naturalStrideInches.toFixed(1)} in (
                  {(naturalStrideInches * CM_PER_INCH).toFixed(1)} cm)
                </p>
              </div>
            ) : null}

            {/* Custom step length input (custom mode) */}
            {lengthMode === "custom" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Custom Step Length
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={0}
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. 30"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as Unit)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="inches">Inches</option>
                    <option value="cm">Centimeters</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Step length is the distance of a single step (not stride). Enter in{" "}
                  {unit === "cm" ? "centimeters" : "inches"}.
                </p>
              </div>
            ) : null}
          </div>

          {/* Results Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-700 to-teal-800 text-white shadow-lg space-y-4 text-center">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              {mode === "steps-to-miles" ? "Distance Covered" : "Estimated Total Steps"}
            </span>
            <div className="space-y-1">
              <div className="text-5xl font-black font-mono tracking-tight">
                {valid
                  ? mode === "steps-to-miles"
                    ? distanceMiles.toFixed(2)
                    : totalSteps.toLocaleString()
                  : "–"}
              </div>
              <div className="text-xl font-bold text-white">
                {mode === "steps-to-miles" ? "Miles" : "Steps"}
              </div>
              {mode === "steps-to-miles" && (
                <div className="text-sm text-teal-100 font-mono">
                  {valid ? distanceKm.toFixed(2) + " km" : "–"}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col items-center gap-1">
                <span className="text-teal-200 block">Steps per Mile</span>
                <span className="text-base font-bold font-mono">
                  {valid ? Math.round(stepsPerMile).toLocaleString() : "–"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-teal-200 block">Steps per Kilometer</span>
                <span className="text-base font-bold font-mono">
                  {valid ? Math.round(stepsPerKm).toLocaleString() : "–"}
                </span>
              </div>
            </div>

            {mode === "steps-to-miles" ? (
              <div className="pt-2 border-t border-white/20">
                <span className="text-teal-200 text-xs block">Step Length</span>
                <span className="text-base font-bold font-mono">
                  {valid
                    ? `${stepLengthInches.toFixed(1)} in (${stepLengthDisplayCm.toFixed(1)} cm)`
                    : "–"}
                </span>
              </div>
            ) : (
              <div className="pt-2 border-t border-white/20 grid grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-teal-200 block">Step Length</span>
                  <span className="text-base font-bold font-mono">
                    {valid
                      ? `${stepLengthInches.toFixed(1)} in (${stepLengthDisplayCm.toFixed(1)} cm)`
                      : "–"}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-teal-200 block">Distance in Miles</span>
                  <span className="text-base font-bold font-mono">
                    {valid ? distanceMiles.toFixed(2) : "–"}
                  </span>
                </div>
              </div>
            )}

            {mode === "steps-to-miles" && (
              <div className="pt-2">
                <Link
                  href={`/?steps=${steps}&mode=steps`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Calculate Calories for {steps.toLocaleString()} Steps</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-brand-500"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Results
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-brand-500"
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="steps-to-miles-top" />

      {/* Authoritative Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12">
        <h2>How to Use the Steps to Miles Calculator</h2>
        <ol className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {[
            "Pick Steps to Miles or Miles to Steps using the mode switch, then enter your step count or distance, or tap a preset count.",
            "Enter your height in feet and inches. The calculator uses it to estimate your stride length.",
            "The stride estimate updates automatically with your height, or enter a custom step length in inches or centimeters.",
            "Read your calculated distance in miles and kilometers in the results card.",
          ].map((instruction, index) => (
            <li
              key={instruction}
              className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="leading-relaxed">{instruction}</span>
            </li>
          ))}
        </ol>

        <h2>How Many Steps in a Mile? (The Anthropometric Science)</h2>
        <p>
          The number of steps required to walk a mile is determined by simple geometry: <strong>5,280 feet divided by your average stride length</strong>. Because human leg length correlates directly with total standing height (accounting for approximately 45% of total stature), taller walkers take longer steps and register fewer steps per mile than shorter walkers.
        </p>

        <h2>How to Calculate Miles from Steps</h2>
        <p>
          To convert steps to miles, multiply your step count by your stride length in inches, then divide by the number of inches in a mile:
        </p>
        <div className="not-prose my-6 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 p-5 sm:p-6">
          <p className="text-center text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-200">
            Miles = (Number of Steps × Stride Length in Inches) ÷ 63,360
          </p>
          <p className="mt-3 text-sm text-blue-800 dark:text-blue-300">
            <strong>Number of steps</strong> is the count you enter. <strong>Stride length</strong> is the distance covered per step, measured in inches. <strong>63,360</strong> is the number of inches in one mile.
          </p>
          <p className="mt-3 text-sm text-blue-800 dark:text-blue-300">
            <strong>Example:</strong> Using an assumed 28-inch stride, 2,000 steps × 28 inches ÷ 63,360 = approximately 0.88 miles.
          </p>
        </div>
        <p>
          This is an estimate: your actual distance varies with your individual stride length, which can change with height, walking pace, and terrain.
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
          <Link href="/" className="font-bold text-brand-700 underline">
            walking calorie calculator
          </Link>{" "}
          to input your exact body weight and terrain factors.
        </p>

        <DataTable
          title="Steps to Miles & Kilometers Quick Reference"
          titleLevel={3}
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

        <h2>Steps to Miles by Height</h2>
        <p>
          The chart below compares estimated walking distances at common heights. Stride length is estimated using the calculator&apos;s height-based model (0.414 × height in meters), assuming a typical walking step on level ground. These are illustrative estimates, not exact measurements; your personal stride may differ.
        </p>
        <DataTable
          title="Estimated Steps-to-Miles Distances by Height"
          titleLevel={3}
          caption="Height-based stride estimates; individual results vary."
          headers={["Height", "Estimated Stride Length", "5,000 Steps", "10,000 Steps", "15,000 Steps"]}
          rows={heightBenchmarkRows}
          highlightColumnIndex={3}
        />

        {/* <h2>Comprehensive Step-to-Miles Conversion Matrix &amp; Mileage Benchmarks</h2>
        <p>
          Use our free <strong>steps to miles converter</strong> and interactive <strong>steps to miles conversion</strong> calculator to <strong>convert steps to miles</strong> accurately. Below are detailed benchmarks for every step volume from 1,000 to 30,000 steps:
        </p>

        <ul>
          <li><strong>1,000 Steps:</strong> How far is 1000 steps? Approximately 0.38 to 0.47 miles (0.61 to 0.76 km).</li>
          <li><strong>2,000 Steps:</strong> How many miles is 2000 steps? Approximately 0.76 to 0.95 miles.</li>
          <li><strong>3,000 Steps:</strong> How many miles is 3,000 steps? Walking 3,000 steps covers roughly 1.14 to 1.42 miles.</li>
          <li><strong>4,000 Steps:</strong> How many miles is 4,000 steps? Walking 4,000 steps covers roughly 1.52 to 1.89 miles.</li>
          <li><strong>5,000 Steps:</strong> How many miles is 5,000 steps? Walking 5,000 steps covers approximately 1.89 to 2.37 miles.</li>
          <li><strong>6,000 Steps:</strong> How many miles is 6,000 steps? Walking 6,000 steps covers approximately 2.27 to 2.84 miles.</li>
          <li><strong>7,000 Steps:</strong> How many miles is 7,000 steps? Walking 7,000 steps covers roughly 2.65 to 3.31 miles.</li>
          <li><strong>7,500 Steps:</strong> How many miles is 7,500 steps? Walking 7,500 steps covers approximately 2.84 to 3.55 miles.</li>
          <li><strong>8,000 Steps:</strong> How many miles is 8,000 steps? Walking 8,000 steps covers roughly 3.03 to 3.79 miles.</li>
          <li><strong>9,000 Steps:</strong> How many miles is 9000 steps? 9000 steps to miles equals roughly 3.41 to 4.26 miles.</li>
          <li><strong>10,000 Steps:</strong> How many miles is 10,000 steps? Walking 10,000 steps covers approximately 3.79 to 4.73 miles depending on your stride length. This is the most popular daily step goal recommended by health organizations worldwide.</li>
          <li><strong>11,000 Steps:</strong> How many miles is 11,000 steps? Walking 11,000 steps covers approximately 4.17 to 5.21 miles.</li>
          <li><strong>12,000 Steps:</strong> How many miles is 12,000 steps? Walking 12,000 steps covers approximately 4.55 to 5.68 miles.</li>
          <li><strong>13,000 Steps:</strong> How many miles is 13,000 steps? Walking 13,000 steps covers roughly 4.92 to 6.16 miles.</li>
          <li><strong>14,000 Steps:</strong> How many miles is 14,000 steps? Walking 14,000 steps covers approximately 5.30 to 6.63 miles.</li>
          <li><strong>15,000 Steps:</strong> How many miles is 15,000 steps? Walking 15,000 steps covers approximately 5.68 to 7.10 miles.</li>
          <li><strong>16,000 Steps:</strong> How many miles is 16000 steps? Equals roughly 6.06 to 7.58 miles.</li>
          <li><strong>17,000 Steps:</strong> How many miles is 17,000 steps? Walking 17,000 steps covers roughly 6.44 to 8.05 miles.</li>
          <li><strong>18,000 Steps:</strong> How many miles is 18,000 steps? Walking 18,000 steps covers roughly 6.82 to 8.52 miles.</li>
          <li><strong>19,000 Steps:</strong> How many miles is 19000 steps? 19000 steps in miles equals 7.20 to 9.00 miles.</li>
          <li><strong>20,000 Steps:</strong> How many miles is 20,000 steps? Walking 20,000 steps covers approximately 7.58 to 9.47 miles.</li>
          <li><strong>21,000 Steps:</strong> How many miles is 21000 steps? Equals roughly 7.95 to 9.94 miles.</li>
          <li><strong>22,000 Steps:</strong> How many miles is 22,000 steps? Walking 22,000 steps covers roughly 8.33 to 10.42 miles.</li>
          <li><strong>23,000 Steps:</strong> How many miles is 23000 steps? Equals roughly 8.71 to 10.89 miles.</li>
          <li><strong>25,000 Steps:</strong> How many miles is 25,000 steps? Walking 25,000 steps covers roughly 9.47 to 11.84 miles.</li>
          <li><strong>30,000 Steps:</strong> How many miles is 30,000 steps? Walking 30,000 steps covers roughly 11.36 to 14.20 miles.</li>
        </ul> */}

        {/* <h2>Miles to Steps Distance Benchmarks</h2>
        <ul>
          <li><strong>1 Mile:</strong> How many steps is 1 mile? An average adult takes approximately 2,000 to 2,500 steps to walk one mile. This varies by height — taller adults average around 2,000 steps per mile, while shorter adults may take closer to 2,500 steps per mile.</li>
          <li><strong>1.5 Miles:</strong> How many steps in a mile and a half? Equals roughly 3,000 to 3,750 steps.</li>
          <li><strong>2 Miles:</strong> How many steps in 2 miles? Approximately 4,000 to 5,000 steps.</li>
          <li><strong>3 Miles:</strong> How many steps in 3 miles? Approximately 6,000 to 7,500 steps.</li>
          <li><strong>4 Miles:</strong> How many steps is 4 miles? Approximately 8,000 to 10,000 steps.</li>
          <li><strong>5 Miles:</strong> How many steps is 5 miles? Approximately 10,000 to 12,500 steps.</li>
          <li><strong>7 Miles:</strong> How many steps is 7 miles? Approximately 14,000 to 17,500 steps.</li>
          <li><strong>10 Miles:</strong> How many steps is 10 miles equals 20,000 to 25,000 steps.</li>
        </ul> */}

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
