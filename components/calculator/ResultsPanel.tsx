"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CalculationResult, CalculatorInputs, UnitSystem } from "@/lib/types";
import { SpeedComparisonChart } from "./SpeedComparisonChart";
import { WeightLossProjection } from "./WeightLossProjection";
import {
  Flame,
  Clock,
  Navigation,
  Footprints,
  Activity,
  Share2,
  Copy,
  Check,
  Printer,
  RotateCcw,
  AlertCircle,
  Pizza,
  Coffee,
  Apple,
} from "lucide-react";

interface ResultsPanelProps {
  result: CalculationResult;
  inputs: CalculatorInputs;
  unitSystem: UnitSystem;
  onReset: () => void;
}

export function ResultsPanel({ result, inputs, unitSystem, onReset }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [animatedCal, setAnimatedCal] = useState(result.caloriesToDisplay);

  // Smooth number interpolation on update
  useEffect(() => {
    let start = animatedCal;
    const end = result.caloriesToDisplay;
    if (start === end) return;

    const duration = 250;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.round(start + (end - start) * progress);
      setAnimatedCal(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [result.caloriesToDisplay]);

  // Action: Copy Result Text
  const handleCopy = () => {
    const text = `Walking Calorie Burn: ${result.caloriesToDisplay} kcal (${
      inputs.showNetCalories ? "Net" : "Gross"
    }) in ${result.durationTotalMinutes} min over ${
      unitSystem === "imperial"
        ? `${result.distanceMiles} miles`
        : `${result.distanceKm} km`
    } (~${result.steps.toLocaleString()} steps) via WalkingCalorieCalculator.net`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Action: Share link with URL parameters
  const handleShare = () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("mode", inputs.mode);
    params.set("units", inputs.unitSystem);
    if (inputs.unitSystem === "imperial") {
      params.set("weight", inputs.weightLbs.toString());
      params.set("speed", inputs.speedMph.toString());
    } else {
      params.set("weight", inputs.weightKg.toString());
      params.set("speed", inputs.speedKmh.toString());
    }
    params.set("mins", result.durationTotalMinutes.toString());
    if (inputs.inclinePercent > 0) params.set("incline", inputs.inclinePercent.toString());
    if (inputs.showNetCalories) params.set("net", "1");

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Action: Print view
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // SVG Progress Ring calculations
  // Cap at 1000 kcal for 100% circle gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(result.caloriesToDisplay / 600, 1);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full space-y-6">
      {/* Primary Hero Calorie Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-teal-600 to-emerald-700 p-6 sm:p-7 text-white shadow-xl shadow-brand-900/15">
        {/* Subtle decorative glow */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Main animated number & status */}
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-teal-50 text-xs font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>{inputs.showNetCalories ? "Net Calorie Burn" : "Total Calories Burned"}</span>
            </div>
            
            <div className="flex items-baseline justify-center sm:justify-start gap-2 pt-1">
              <span
                className="text-5xl sm:text-6xl font-black tracking-tight font-mono"
                aria-live="polite"
              >
                {animatedCal.toLocaleString()}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-teal-100">
                kcal
              </span>
            </div>

            <p className="text-xs text-teal-100/90 pt-1">
              {inputs.showNetCalories
                ? "Excludes baseline resting metabolic burn (pure exercise expenditure)."
                : "Includes basal metabolic rate + active walking energy expenditure."}
            </p>
          </div>

          {/* SVG Progress Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              {/* Background ring */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-white/20"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-amber-300 transition-all duration-500 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-teal-100">MET</span>
              <span className="text-lg font-bold font-mono">{result.met}</span>
            </div>
          </div>
        </div>

        {/* Notes / ACSM alerts if any */}
        {result.notes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/15 text-xs text-teal-100 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-300" />
            <span>{result.notes[0]}</span>
          </div>
        )}
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Rate (kcal/min) */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Activity className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Burn Rate</span>
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white font-mono">
            {result.caloriesPerMinute} <span className="text-xs font-normal text-slate-500">kcal/min</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {unitSystem === "imperial" ? `~${result.caloriesPerMile} /mi` : `~${result.caloriesPerKm} /km`}
          </div>
        </div>

        {/* Metric 2: Distance */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Navigation className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Distance</span>
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white font-mono">
            {unitSystem === "imperial" ? `${result.distanceMiles} mi` : `${result.distanceKm} km`}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {unitSystem === "imperial" ? `${result.distanceKm} km` : `${result.distanceMiles} mi`}
          </div>
        </div>

        {/* Metric 3: Steps */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Footprints className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Steps</span>
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white font-mono">
            ~{result.steps.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {unitSystem === "imperial" ? `${result.stepsPerMile} steps/mi` : `${result.stepsPerKm} steps/km`}
          </div>
        </div>

        {/* Metric 4: Pace */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Average Pace</span>
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-white font-mono">
            {unitSystem === "imperial" ? result.paceFormattedMile : result.paceFormattedKm}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {unitSystem === "imperial" ? result.paceFormattedKm : result.paceFormattedMile}
          </div>
        </div>
      </div>

      {/* "What Does This Equal?" Real-World Food & Fat Equivalents */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          What Does This Calorie Burn Equal?
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <span className="text-2xl">🔥</span>
            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white font-mono">
              {result.fatGramsBurned} g
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              body fat ({result.fatLbsBurned} lb)
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <span className="text-2xl">🍌</span>
            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white font-mono">
              {result.foodEquivalents.bananas}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              medium bananas (~105 kcal)
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <span className="text-2xl">🍕</span>
            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white font-mono">
              {result.foodEquivalents.pizzaSlices}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              slices of pizza (~285 kcal)
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <span className="text-2xl">🍪</span>
            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white font-mono">
              {result.foodEquivalents.cookies}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              cookies (~150 kcal)
            </div>
          </div>
        </div>
      </div>

      {/* Speed Comparison Chart */}
      <SpeedComparisonChart
        data={result.speedComparisons}
        currentMph={result.speedMph}
        unitSystem={unitSystem}
      />

      {/* Weight Loss Projection */}
      <WeightLossProjection result={result} unitSystem={unitSystem} />

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Result"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            {shared ? <Check className="w-3.5 h-3.5 text-brand-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{shared ? "Link Copied!" : "Share Link"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Medical disclaimer link */}
      <div className="text-center text-[11px] text-slate-400 dark:text-slate-500">
        Estimates based on Ainsworth 2011 Compendium.{" "}
        <Link href="/medical-disclaimer" className="underline hover:text-brand-600">
          Medical Disclaimer
        </Link>
      </div>
    </div>
  );
}
