"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { formatPace } from "@/lib/calc";
import { Compass, Clock, Navigation, Gauge, Sparkles } from "lucide-react";

export default function WalkingPaceCalculatorPage() {
  const [distance, setDistance] = useState<number>(3.0); // miles
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(45);
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");

  const totalMinutes = hours * 60 + minutes;
  const totalHours = totalMinutes / 60;

  // Speed & Pace
  const speed = totalHours > 0 ? distance / totalHours : 0;
  const paceMinutes = speed > 0 ? 60 / speed : 0;
  const paceFormatted = formatPace(paceMinutes);

  // Cross conversions
  const distanceKm = unitSystem === "imperial" ? distance * 1.609344 : distance;
  const speedMph = unitSystem === "imperial" ? speed : speed / 1.609344;
  const speedKmh = unitSystem === "imperial" ? speed * 1.609344 : speed;
  const paceMinPerKm = speedKmh > 0 ? 60 / speedKmh : 0;
  const paceMinPerMile = speedMph > 0 ? 60 / speedMph : 0;

  // Pace Chart Table
  const speedBenchmarks = [
    { label: "Slow stroll", mph: 2.0, kmh: 3.2 },
    { label: "Casual walking", mph: 2.5, kmh: 4.0 },
    { label: "Moderate everyday", mph: 3.0, kmh: 4.8 },
    { label: "Brisk fitness", mph: 3.5, kmh: 5.6 },
    { label: "Very brisk", mph: 4.0, kmh: 6.4 },
    { label: "Power walk", mph: 4.5, kmh: 7.2 },
    { label: "Fast / Race walk", mph: 5.0, kmh: 8.0 },
  ];

  const paceTableRows = speedBenchmarks.map((b) => {
    const minPerMile = formatPace(60 / b.mph) + " /mi";
    const minPerKm = formatPace(60 / b.kmh) + " /km";
    const timeFor1Mile = formatPace(60 / b.mph);
    const timeFor5Km = formatPace((60 / b.kmh) * 5);
    return [b.label, `${b.mph} mph`, `${b.kmh} km/h`, minPerMile, minPerKm, timeFor1Mile, timeFor5Km];
  });

  const faqs: FAQItem[] = [
    {
      question: "What is the formula of speed, time, and distance?",
      answer:
        "The fundamental relationship of motion is: Speed = Distance ÷ Time. Rearranging this formula allows you to solve for any variable: Distance = Speed × Time, and Time = Distance ÷ Speed. When calculating walking pace, Pace = Time ÷ Distance (expressed in minutes per mile or minutes per kilometer).",
    },
    {
      question: "How do you convert mph to minutes per mile?",
      answer:
        "To convert miles per hour (mph) to pace in minutes per mile, divide 60 by your speed in mph. For example, if you walk at 3.5 mph: 60 ÷ 3.5 = 17.14 minutes per mile. To convert the decimal (0.14) into seconds, multiply by 60: 0.14 × 60 ≈ 8 seconds. Your pace is exactly 17:08 per mile.",
    },
    {
      question: "What is considered a normal walking pace for adults?",
      answer:
        "The average walking speed for healthy adults is approximately 2.8 to 3.2 mph (4.5 to 5.1 km/h), which corresponds to a pace between 18:45 and 21:25 per mile (11:45 to 13:20 per kilometer). Walking speeds generally decline by roughly 1% to 2% per decade after age 60.",
    },
    {
      question: "How do you convert miles in minutes to miles per hour (miles per minute to miles per hour)?",
      answer:
        "To convert miles per minute to miles per hour (or miles in minutes to miles per hour), multiply your miles per minute by 60. For example, running 0.1 miles per minute equals 0.1 × 60 = 6.0 mph. Conversely, divide your speed in mph by 60 to find miles covered in one minute (e.g. 3.0 mph ÷ 60 = 0.05 miles per minute).",
    },
    {
      question: "How many miles is 20k and 21k to miles?",
      answer:
        "When asking 'how many miles is 20k', 20 kilometers equals 12.43 miles (20 × 0.621371). A half marathon or '21k to miles' equals 13.05 to 13.11 miles (21.0975 km).",
    },
    {
      question: "How do you convert track distances: 800m to mile, 1600m to miles, and 3000m to miles?",
      answer:
        "On standard athletic tracks: 800m to mile is exactly 0.497 miles (roughly half a mile). 1600m to miles is 0.994 miles (considered the high-school metric mile). A 3000 meter run is how many miles (3000m to miles)? 3,000 meters equals 1.864 miles (almost 1 and 7/8th miles).",
    },
    {
      question: "How do you convert road travel distances: 55miles in km, 130km in miles, 220 km to miles, and 1600 miles to km?",
      answer:
        "Using the metric factor (1 mile = 1.60934 km; 1 km = 0.621371 miles): 55miles in km equals 88.51 km. 130km in miles equals 80.78 miles. 220 km to miles equals 136.70 miles. 1600 miles to km equals 2,574.95 km. A speed of 250 km h to miles (250 km/h) equals 155.34 mph.",
    },
    {
      question: "How to calculate gas mileage vs walking efficiency?",
      answer:
        "To learn how to calculate gas mileage, divide distance driven in miles by fuel gallons consumed (MPG = Miles ÷ Gallons). For human walking, our walking calorie calculator computes metabolic fuel efficiency: the human body consumes roughly 75 to 90 calories per mile walked!",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Walking Pace Calculator" }]} />

      {/* Header */}
      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Gauge className="w-3.5 h-3.5" />
          <span>Speed, Distance &amp; Pace Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Walking Pace Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Calculate your walking speed, pace per mile, pace per kilometer, and splits from distance and time.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="pace-distance" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Distance ({unitSystem === "imperial" ? "miles" : "km"})
              </label>
              <input
                id="pace-distance"
                type="number"
                inputMode="decimal"
                step={0.1}
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-mono font-bold focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Time Taken (Hours : Minutes)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">hours</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mins</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                  unitSystem === "imperial"
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                Miles (mph)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                  unitSystem === "metric"
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                Kilometers (km/h)
              </button>
            </div>
          </div>

          {/* Results Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-lg space-y-4 text-center">
            <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider block">
              Walking Pace &amp; Velocity
            </span>
            <div>
              <div className="text-5xl font-black font-mono tracking-tight">
                {paceFormatted}
              </div>
              <div className="text-xl font-bold text-teal-100">
                per {unitSystem === "imperial" ? "mile" : "km"}
              </div>
            </div>

            <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-teal-200 block">Speed (Velocity)</span>
                <span className="text-base font-bold font-mono">
                  {speed.toFixed(2)} {unitSystem === "imperial" ? "mph" : "km/h"}
                </span>
              </div>
              <div>
                <span className="text-teal-200 block">Alternative Pace</span>
                <span className="text-base font-bold font-mono">
                  {unitSystem === "imperial" ? `${formatPace(paceMinPerKm)} /km` : `${formatPace(paceMinPerMile)} /mi`}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/?speed=${speedMph.toFixed(1)}&mins=${totalMinutes}&mode=time-speed`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Calculate Calories in Walking Calorie Calculator</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="pace-calc-top" />

      {/* Authoritative Pace Reference Table */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12">
        <h2>Speed to Pace Conversion Chart (mph to min/mile &amp; km/h)</h2>
        <p>
          Translating between velocity (speed in mph or km/h) and pace (time required to complete a mile or kilometer) is critical for setting pacing targets, treadmill routines, and endurance training.
        </p>

        <DataTable
          title="Walking Speed, Pace, and Split Times Reference Matrix"
          caption="Conversion benchmarks from 2.0 to 5.0 mph."
          headers={["Intensity Level", "Speed (mph)", "Speed (km/h)", "Pace (min/mi)", "Pace (min/km)", "Time for 1 Mile", "Time for 5 km"]}
          rows={paceTableRows}
          highlightColumnIndex={3}
        />

        <p>
          Check out our main{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>{" "}
          to see how modifying your walking pace affects total calories burned.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/walking-pace-calculator" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}

