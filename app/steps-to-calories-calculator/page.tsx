
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { calculateWalkingCalories } from "@/lib/calc";
import { CalculatorInputs } from "@/lib/types";
import { Footprints, Sparkles, Calculator, Info } from "lucide-react";

type UnitSystem = "imperial" | "metric";

export default function StepsToCaloriesPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [steps, setSteps] = useState<number>(10000);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [heightInches, setHeightInches] = useState<number>(69);
  const [paceType, setPaceType] = useState<"casual" | "brisk" | "power">("brisk");

  const speedMph = {
    casual: 2.5,
    brisk: 3.5,
    power: 4.2,
  }[paceType];

  const weightKg = weightLbs * 0.45359237;
  const heightCm = heightInches * 2.54;

  const calcResult = useMemo(() => {
    const heightFt = Math.floor(heightInches / 12);
    const remainingInches = heightInches - heightFt * 12;

    const inputs: CalculatorInputs = {
      unitSystem: "imperial",
      mode: "steps",
      weightLbs,
      weightKg: weightLbs * 0.45359237,
      heightFt,
      heightIn: remainingInches,
      heightCm: Math.round(heightInches * 2.54),
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
  }, [steps, weightLbs, heightInches, speedMph]);

  const matrixWeights = [120, 140, 160, 180, 200, 220, 250];
  const matrixSteps = [2000, 5000, 7500, 10000, 12500, 15000, 20000];

  const matrixRows = matrixSteps.map((stepCount) => {
    const row: (string | number)[] = [
      `${stepCount.toLocaleString()} steps`,
    ];

    matrixWeights.forEach((weight) => {
      const result = calculateWalkingCalories({
        unitSystem: "imperial",
        mode: "steps",
        weightLbs: weight,
        weightKg: weight * 0.45359237,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 0,
        durationMinutes: 0,
        speedMph: 3.5,
        speedKmh: 5.63,
        distanceMiles: 0,
        distanceKm: 0,
        steps: stepCount,
        inclinePercent: 0,
        terrain: "pavement",
        backpackWeightLbs: 0,
        backpackWeightKg: 0,
        showNetCalories: false,
      });

      row.push(result.grossCalories);
    });

    return row;
  });

  const faqs: FAQItem[] = [
    {
      question: "How many calories does one walking step burn?",
      answer:
        "The calories burned per step depend mainly on body weight and walking intensity. A useful estimate for many adults is around 0.04 to 0.055 calories per step, although individual results vary. Multiply this estimate by your step count for a rough daily total.",
    },
    {
      question: "How many calories do 20,000 steps burn?",
      answer:
        "The total depends on your body weight, walking pace, and stride length. At a brisk walking pace, 20,000 steps can burn several hundred calories. Enter your weight and walking intensity in the calculator above to get an estimate based on your inputs.",
    },
    {
      question: "Why do fitness trackers show different calories for the same step count?",
      answer:
        "Fitness trackers can use different information and calculation methods. Some consider body weight, height, walking pace, heart rate, and stride length, while others rely on fewer inputs. These differences can produce different calorie estimates for the same number of steps.",
    },
    {
      question: "Does walking intensity affect calories burned per step?",
      answer:
        "Yes. Walking intensity changes how much energy you use over time. A brisk or power-walking pace generally burns more calories per minute than a casual pace. Your total estimate also depends on body weight and the distance covered.",
    },
  ];

  const handleUnitChange = (nextUnit: UnitSystem) => {
    setUnitSystem(nextUnit);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Steps to Calories Calculator" }]} />

      {/* Page Header */}
      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>Step-Based Calorie Estimator</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Steps to Calories Calculator
        </h1>

        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Estimate calories burned from your daily steps using your body weight,
          walking intensity, and estimated stride length.
        </p>
      </div>

      {/* Calculator */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="space-y-6">
          {/* Unit Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Measurement Units
            </label>

            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => handleUnitChange("imperial")}
                className={`py-2.5 px-3 rounded-lg text-sm font-bold transition-colors ${
                  unitSystem === "imperial"
                    ? "bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                Imperial (lbs, in)
              </button>

              <button
                type="button"
                onClick={() => handleUnitChange("metric")}
                className={`py-2.5 px-3 rounded-lg text-sm font-bold transition-colors ${
                  unitSystem === "metric"
                    ? "bg-white dark:bg-slate-700 text-brand-700 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                Metric (kg, cm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Calculator Inputs */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="step-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Total Steps Taken
                </label>

                <input
                  id="step-input"
                  type="number"
                  min="0"
                  value={steps}
                  onChange={(e) =>
                    setSteps(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
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
                          ? "bg-brand-700 border-brand-600 text-white font-bold"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {s.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="weight-input"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                  </label>

                  <input
                    id="weight-input"
                    type="number"
                    min="1"
                    step="any"
                    value={
                      unitSystem === "imperial"
                        ? Number(weightLbs.toFixed(1))
                        : Number(weightKg.toFixed(1))
                    }
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (Number.isFinite(value) && value > 0) {
                        setWeightLbs(
                          unitSystem === "imperial"
                            ? value
                            : value / 0.45359237
                        );
                      } else if (e.target.value === "") {
                        setWeightLbs(0);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label
                    htmlFor="height-input"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Height ({unitSystem === "imperial" ? "ft / in" : "cm"})
                  </label>

                  {unitSystem === "imperial" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        aria-label="Height in feet"
                        type="number"
                        min="0"
                        value={Math.floor(heightInches / 12)}
                        onChange={(e) => {
                          const feet = Math.max(0, parseInt(e.target.value, 10) || 0);
                          const inches = heightInches % 12;
                          setHeightInches(feet * 12 + inches);
                        }}
                        className="w-full min-w-0 px-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        placeholder="ft"
                      />

                      <input
                        aria-label="Height in inches"
                        type="number"
                        min="0"
                        max="11"
                        value={heightInches % 12}
                        onChange={(e) => {
                          const inches = Math.min(
                            11,
                            Math.max(0, parseInt(e.target.value, 10) || 0)
                          );
                          setHeightInches(
                            Math.floor(heightInches / 12) * 12 + inches
                          );
                        }}
                        className="w-full min-w-0 px-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        placeholder="in"
                      />
                    </div>
                  ) : (
                    <input
                      id="height-input"
                      type="number"
                      min="1"
                      step="any"
                      value={Number(heightCm.toFixed(1))}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (Number.isFinite(value) && value > 0) {
                          setHeightInches(value / 2.54);
                        } else if (e.target.value === "") {
                          setHeightInches(0);
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="pace-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Walking Intensity
                </label>

                <select
                  id="pace-input"
                  value={paceType}
                  onChange={(e) =>
                    setPaceType(e.target.value as "casual" | "brisk" | "power")
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="casual">Casual (2.5 mph)</option>
                  <option value="brisk">Brisk (3.5 mph)</option>
                  <option value="power">Power Walk (4.2 mph)</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-700 to-teal-800 text-white shadow-lg space-y-4 text-center">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                Estimated Calories Burned
              </span>

              <div>
                <div className="text-5xl font-black font-mono tracking-tight">
                  {calcResult.grossCalories}
                </div>
                <div className="text-xl font-bold text-white">
                  Calories (kcal)
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-teal-200 block">Distance</span>
                  <span className="text-sm font-bold font-mono">
                    {unitSystem === "imperial"
                      ? `${calcResult.distanceMiles} mi`
                      : `${(calcResult.distanceMiles * 1.609344).toFixed(2)} km`}
                  </span>
                </div>

                <div>
                  <span className="text-teal-200 block">Time</span>
                  <span className="text-sm font-bold font-mono">
                    ~{calcResult.durationTotalMinutes} min
                  </span>
                </div>

                <div>
                  <span className="text-teal-200 block">Fat Equivalent*</span>
                  <span className="text-sm font-bold font-mono">
                    {calcResult.fatGramsBurned} g
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-teal-100">
                *Estimated energy equivalent, not a direct measurement of fat loss.
              </p>

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
      </div>

      <AdSlot format="horizontal" slotId="steps-to-calories-top" />

      {/* How to Use */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-10">
        <h2>How to Use the Steps to Calories Calculator</h2>

        <ol>
          <li>
            <strong>Select your measurement system:</strong> Choose Imperial
            for pounds and feet/inches, or Metric for kilograms and centimeters.
          </li>
          <li>
            <strong>Enter your step count:</strong> Add the total number of
            steps recorded by your phone, pedometer, or fitness tracker.
          </li>
          <li>
            <strong>Enter your body measurements:</strong> Provide your current
            weight and height to help estimate your walking distance.
          </li>
          <li>
            <strong>Choose your walking intensity:</strong> Select casual,
            brisk, or power walking based on your typical pace.
          </li>
          <li>
            <strong>Read your results:</strong> The calculator estimates
            calories burned, walking distance, and time based on your inputs.
          </li>
        </ol>
      </div>

      {/* Calculation Formula */}
      <div className="my-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-brand-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Steps to Calories Formula
          </h2>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          A step-based calorie estimate involves converting your steps into
          walking distance and time, then estimating energy expenditure using
          body weight and walking intensity.
        </p>

        <div className="space-y-3 text-sm text-slate-800 dark:text-slate-200">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800">
            <strong>1. Distance:</strong>
            <p className="mt-1">
              Steps × estimated stride length = walking distance
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-800">
            <strong>2. Walking time:</strong>
            <p className="mt-1">
              Distance ÷ walking speed = time
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-800">
            <strong>3. Gross calories:</strong>
            <p className="mt-1">
              MET × body weight (kg) × time (hours) = estimated calories burned
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            MET represents the energy cost of an activity. The calculator
            estimates stride length from height and uses the selected walking
            intensity to estimate distance and duration.
          </p>
        </div>
      </div>

      {/* Steps to Calories Matrix */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-10">
        <h2>Steps to Calories Reference Chart</h2>
        <p>
          Use this reference chart to compare estimated calories burned at
          different step counts and body weights. The estimates assume a brisk
          3.5 mph walking pace and a reference height of 5 feet 9 inches.
        </p>
      </div>

      <DataTable
        title="Estimated Calories Burned by Step Count and Body Weight"
        titleLevel={3}
        caption="Estimated gross calories (kcal) at a brisk 3.5 mph pace. Body weight is shown in pounds."
        headers={[
          "Steps",
          "120 lbs",
          "140 lbs",
          "160 lbs",
          "180 lbs",
          "200 lbs",
          "220 lbs",
          "250 lbs",
        ]}
        rows={matrixRows}
        highlightColumnIndex={3}
      />

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        These are reference estimates, not exact measurements. Actual calorie
        expenditure varies with stride length, terrain, walking efficiency,
        and individual characteristics.
      </p>

      {/* Contextual Internal Link */}
      <div className="my-8 prose prose-slate dark:prose-invert max-w-none">
        <p>
          For estimates that also account for incline, terrain, and backpack
          weight, try the full{" "}
          <Link
            href="/"
            className="font-bold text-brand-700 underline"
          >
            walking calorie calculator
          </Link>.
        </p>
      </div>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/steps-to-calories-calculator" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
