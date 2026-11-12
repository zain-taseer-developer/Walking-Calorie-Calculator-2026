"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CalculationMode,
  CalculatorInputs,
  TerrainType,
  UnitSystem,
} from "@/lib/types";
import {
  calculateWalkingCalories,
  TERRAIN_OPTIONS,
  SPEED_PRESETS,
} from "@/lib/calc";
import { detectDefaultUnitSystem, kgToLbs, lbsToKg, cmToFtIn, ftInToCm } from "@/lib/format";
import { SpeedSlider } from "./SpeedSlider";
import { ResultsPanel } from "./ResultsPanel";
import { NumericInput } from "./NumericInput";
import Image from "next/image";
import {
  Clock,
  Compass,
  Footprints,
  Mountain,
  Sliders,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function WalkingCalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Default Inputs
  const [inputs, setInputs] = useState<CalculatorInputs>({
    unitSystem: "imperial",
    mode: "time-speed",
    weightLbs: 154,
    weightKg: 70,
    heightFt: 5,
    heightIn: 9,
    heightCm: 175,
    durationHours: 0,
    durationMinutes: 30,
    speedMph: 3.5,
    speedKmh: 5.6,
    distanceMiles: 1.75,
    distanceKm: 2.8,
    steps: 4000,
    inclinePercent: 0,
    terrain: "pavement",
    backpackWeightLbs: 0,
    backpackWeightKg: 0,
    showNetCalories: false,
  });

  // On mount: check browser locale, stored units and URL search params
  useEffect(() => {
    let resolvedUnits = detectDefaultUnitSystem();

    try {
      const storedUnits = localStorage.getItem("walking_calc_units") as UnitSystem | null;
      if (storedUnits === "imperial" || storedUnits === "metric") {
        resolvedUnits = storedUnits;
      }
    } catch {}

    // Check URL parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlUnits = params.get("units") as UnitSystem | null;
      const urlMode = params.get("mode") as CalculationMode | null;
      const urlWeight = params.get("weight") ? parseFloat(params.get("weight")!) : null;
      const urlSpeed = params.get("speed") ? parseFloat(params.get("speed")!) : null;
      const urlMins = params.get("mins") ? parseInt(params.get("mins")!, 10) : null;
      const urlIncline = params.get("incline") ? parseFloat(params.get("incline")!) : null;
      const urlNet = params.get("net") === "1";

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputs((prev) => {
        const u = urlUnits || resolvedUnits;
        const next = { ...prev, unitSystem: u };
        if (urlMode) next.mode = urlMode;
        if (urlWeight) {
          if (u === "imperial") {
            next.weightLbs = urlWeight;
            next.weightKg = lbsToKg(urlWeight);
          } else {
            next.weightKg = urlWeight;
            next.weightLbs = kgToLbs(urlWeight);
          }
        }
        if (urlSpeed) {
          if (u === "imperial") {
            next.speedMph = urlSpeed;
            next.speedKmh = parseFloat((urlSpeed * 1.609344).toFixed(1));
          } else {
            next.speedKmh = urlSpeed;
            next.speedMph = parseFloat((urlSpeed / 1.609344).toFixed(1));
          }
        }
        if (urlMins !== null) {
          next.durationHours = Math.floor(urlMins / 60);
          next.durationMinutes = urlMins % 60;
        }
        if (urlIncline !== null) next.inclinePercent = urlIncline;
        if (urlNet) next.showNetCalories = true;
        return next;
      });
    }
  }, []);

  // Sync unit switch
  const handleUnitToggle = (system: UnitSystem) => {
    try {
      localStorage.setItem("walking_calc_units", system);
    } catch {}

    setInputs((prev) => {
      if (system === "metric") {
        return {
          ...prev,
          unitSystem: "metric",
          weightKg: lbsToKg(prev.weightLbs),
          heightCm: ftInToCm(prev.heightFt, prev.heightIn),
          speedKmh: parseFloat((prev.speedMph * 1.609344).toFixed(1)),
          distanceKm: parseFloat((prev.distanceMiles * 1.609344).toFixed(2)),
          backpackWeightKg: lbsToKg(prev.backpackWeightLbs),
        };
      } else {
        const { ft, inch } = cmToFtIn(prev.heightCm);
        return {
          ...prev,
          unitSystem: "imperial",
          weightLbs: kgToLbs(prev.weightKg),
          heightFt: ft,
          heightIn: inch,
          speedMph: parseFloat((prev.speedKmh / 1.609344).toFixed(1)),
          distanceMiles: parseFloat((prev.distanceKm / 1.609344).toFixed(2)),
          backpackWeightLbs: kgToLbs(prev.backpackWeightKg),
        };
      }
    });
  };

  // Live calculation results
  const result = useMemo(() => {
    return calculateWalkingCalories(inputs);
  }, [inputs]);

  // Reset to defaults
  const handleReset = () => {
    setInputs({
      unitSystem: inputs.unitSystem,
      mode: "time-speed",
      weightLbs: inputs.unitSystem === "imperial" ? 154 : kgToLbs(70),
      weightKg: inputs.unitSystem === "metric" ? 70 : lbsToKg(154),
      heightFt: 5,
      heightIn: 9,
      heightCm: 175,
      durationHours: 0,
      durationMinutes: 30,
      speedMph: 3.5,
      speedKmh: 5.6,
      distanceMiles: 1.75,
      distanceKm: 2.8,
      steps: 4000,
      inclinePercent: 0,
      terrain: "pavement",
      backpackWeightLbs: 0,
      backpackWeightKg: 0,
      showNetCalories: false,
    });
  };

  const isImperial = inputs.unitSystem === "imperial";

  return (
    <>
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 transition-colors overflow-hidden">
      {/* Top Banner & Mode Segmented Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Unit Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleUnitToggle("imperial")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isImperial
                  ? "bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Imperial (lbs, mi, mph)
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle("metric")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isImperial
                  ? "bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Metric (kg, km, km/h)
            </button>
          </div>

          {/* Gross vs Net Switch */}
          <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto text-xs font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={inputs.showNetCalories}
              onChange={(e) => {
                setInputs({ ...inputs, showNetCalories: e.target.checked });
              }}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700"
            />
            <span>Show Net Calories (Exclude Resting Burn)</span>
          </label>
        </div>

        {/* 4 Mode Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          <button
            type="button"
            onClick={() => {
              setInputs({ ...inputs, mode: "time-speed" });
            }}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              inputs.mode === "time-speed"
                ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time + Speed</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputs({ ...inputs, mode: "distance-time" });
            }}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              inputs.mode === "distance-time"
                ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Distance + Time</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputs({ ...inputs, mode: "steps" });
            }}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              inputs.mode === "steps"
                ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>Steps</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputs({ ...inputs, mode: "treadmill" });
            }}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              inputs.mode === "treadmill"
                ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <Mountain className="w-4 h-4" />
            <span>Treadmill / Incline</span>
          </button>
        </div>
      </div>

      {/* Main Form & Results 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-7">
        {/* Left Column: Interactive Inputs (6 cols on lg) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-5">
          {/* Section: Weight & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weight Input */}
            <div>
              <label htmlFor="user-weight" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Body Weight ({isImperial ? "lbs" : "kg"})
              </label>
              <div className="relative rounded-xl shadow-xs">
                <NumericInput
                  id="user-weight"
                  inputMode="decimal"
                  min={isImperial ? 50 : 25}
                  max={isImperial ? 600 : 280}
                  step={isImperial ? 1 : 0.5}
                  value={isImperial ? inputs.weightLbs : inputs.weightKg}
                  onChange={(val) => {
                    if (isImperial) {
                      setInputs({
                        ...inputs,
                        weightLbs: val,
                        weightKg: lbsToKg(val),
                      });
                    } else {
                      setInputs({
                        ...inputs,
                        weightKg: val,
                        weightLbs: kgToLbs(val),
                      });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                  {isImperial ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            {/* Height (for accurate stride length calculation) */}
            <div>
              <label htmlFor={isImperial ? "user-height-ft" : "user-height"} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Height ({isImperial ? "ft / in" : "cm"})
              </label>
              {isImperial ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <NumericInput
                      id="user-height-ft"
                      inputMode="numeric"
                      min={3}
                      max={7}
                      step={1}
                      value={inputs.heightFt}
                      onChange={(ft) => {
                        setInputs({
                          ...inputs,
                          heightFt: ft,
                          heightCm: ftInToCm(ft, inputs.heightIn),
                        });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">ft</span>
                  </div>
                  <div className="relative">
                    <NumericInput
                      id="user-height-in"
                      inputMode="numeric"
                      min={0}
                      max={11}
                      step={1}
                      value={inputs.heightIn}
                      onChange={(inch) => {
                        setInputs({
                          ...inputs,
                          heightIn: inch,
                          heightCm: ftInToCm(inputs.heightFt, inch),
                        });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">in</span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl shadow-xs">
                  <NumericInput
                    id="user-height"
                    inputMode="numeric"
                    min={100}
                    max={230}
                    step={1}
                    value={inputs.heightCm}
                    onChange={(cm) => {
                      const { ft, inch } = cmToFtIn(cm);
                      setInputs({
                        ...inputs,
                        heightCm: cm,
                        heightFt: ft,
                        heightIn: inch,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                    cm
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mode 1 & 4: Time + Speed / Treadmill */}
          {(inputs.mode === "time-speed" || inputs.mode === "treadmill") && (
            <>
              {/* Duration Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Walking Duration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <NumericInput
                      id="duration-hours"
                      inputMode="numeric"
                      min={0}
                      max={23}
                      step={1}
                      value={inputs.durationHours}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationHours: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">hours</span>
                  </div>
                  <div className="relative">
                    <NumericInput
                      id="duration-minutes"
                      inputMode="numeric"
                      min={0}
                      max={59}
                      step={1}
                      value={inputs.durationMinutes}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationMinutes: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">minutes</span>
                  </div>
                </div>
              </div>

              {/* Speed Slider & Presets */}
              <SpeedSlider
                unitSystem={inputs.unitSystem}
                speedMph={inputs.speedMph}
                speedKmh={inputs.speedKmh}
                onChangeMph={(mph) => {
                  setInputs((prev) => ({ ...prev, speedMph: mph }));
                }}
                onChangeKmh={(kmh) => {
                  setInputs((prev) => ({ ...prev, speedKmh: kmh }));
                }}
              />

              {/* Incline Slider for Treadmill mode */}
              {inputs.mode === "treadmill" && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="treadmill-incline" className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Treadmill Incline (%)
                    </label>
                    <span className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">
                      {inputs.inclinePercent}%
                    </span>
                  </div>
                  <input
                    id="treadmill-incline"
                    type="range"
                    min={0}
                    max={15}
                    step={0.5}
                    value={inputs.inclinePercent}
                    onChange={(e) => {
                      setInputs({
                        ...inputs,
                        inclinePercent: parseFloat(e.target.value) || 0,
                      });
                    }}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0% (Flat)</span>
                    <span>5% (Moderate Hill)</span>
                    <span>12% (12-3-30 Workout)</span>
                    <span>15% (Steep)</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Mode 2: Distance + Time */}
          {inputs.mode === "distance-time" && (
            <>
              {/* Distance Input */}
              <div>
                <label htmlFor="distance-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Distance Walked ({isImperial ? "miles" : "km"})
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <NumericInput
                    id="distance-input"
                    inputMode="decimal"
                    min={0.1}
                    max={100}
                    step={0.1}
                    value={isImperial ? inputs.distanceMiles : inputs.distanceKm}
                    onChange={(val) => {
                      if (isImperial) {
                        setInputs({
                          ...inputs,
                          distanceMiles: val,
                          distanceKm: parseFloat((val * 1.609344).toFixed(2)),
                        });
                      } else {
                        setInputs({
                          ...inputs,
                          distanceKm: val,
                          distanceMiles: parseFloat((val / 1.609344).toFixed(2)),
                        });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                    {isImperial ? "miles" : "km"}
                  </span>
                </div>
              </div>

              {/* Duration Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Time Taken
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <NumericInput
                      id="dist-duration-hours"
                      inputMode="numeric"
                      min={0}
                      max={23}
                      step={1}
                      value={inputs.durationHours}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationHours: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">hours</span>
                  </div>
                  <div className="relative">
                    <NumericInput
                      id="dist-duration-minutes"
                      inputMode="numeric"
                      min={0}
                      max={59}
                      step={1}
                      value={inputs.durationMinutes}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationMinutes: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">minutes</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Mode 3: Steps */}
          {inputs.mode === "steps" && (
            <>
              {/* Steps Input */}
              <div>
                <label htmlFor="step-count-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Total Steps (Pedometer / Apple Watch)
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <NumericInput
                    id="step-count-input"
                    inputMode="numeric"
                    min={100}
                    max={100000}
                    step={250}
                    value={inputs.steps}
                    onChange={(val) => {
                      setInputs({
                        ...inputs,
                        steps: Math.max(0, val),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                    steps
                  </span>
                </div>
              </div>

              {/* Quick Step Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {[5000, 7500, 10000, 20000].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      setInputs({ ...inputs, steps: count });
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-colors ${
                      inputs.steps === count
                        ? "bg-brand-50 dark:bg-brand-950/60 border-brand-600 text-brand-700 dark:text-brand-300 font-bold"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {count.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Optional Custom Duration */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Optional Time Spent (Leave 0 for standard brisk estimate)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <NumericInput
                      id="steps-duration-hours"
                      inputMode="numeric"
                      min={0}
                      max={23}
                      step={1}
                      value={inputs.durationHours}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationHours: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">hours</span>
                  </div>
                  <div className="relative">
                    <NumericInput
                      id="steps-duration-minutes"
                      inputMode="numeric"
                      min={0}
                      max={59}
                      step={1}
                      value={inputs.durationMinutes}
                      onChange={(val) => {
                        setInputs({
                          ...inputs,
                          durationMinutes: Math.max(0, val),
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-brand-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">minutes</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Advanced / Optional Fields Toggle */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 py-1"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Advanced Factors: Terrain, Backpack Load, Stride
              </span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 animate-in fade-in-50">
                {/* Terrain selector */}
                <div>
                  <label htmlFor="terrain-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Walking Surface / Terrain
                  </label>
                  <select
                    id="terrain-select"
                    value={inputs.terrain}
                    onChange={(e) => {
                      setInputs({ ...inputs, terrain: e.target.value as TerrainType });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500"
                  >
                    {TERRAIN_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label} ({opt.multiplier}x burn)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Backpack / rucking weight */}
                <div>
                  <label htmlFor="backpack-weight-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Carried Backpack / Ruck Weight ({isImperial ? "lbs" : "kg"})
                  </label>
                  <NumericInput
                    id="backpack-weight-input"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step={1}
                    value={isImperial ? inputs.backpackWeightLbs : inputs.backpackWeightKg}
                    onChange={(val) => {
                      if (isImperial) {
                        setInputs({
                          ...inputs,
                          backpackWeightLbs: val,
                          backpackWeightKg: lbsToKg(val),
                        });
                      } else {
                        setInputs({
                          ...inputs,
                          backpackWeightKg: val,
                          backpackWeightLbs: kgToLbs(val),
                        });
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono"
                    placeholder="0"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Carrying a loaded backpack increases aerobic demand proportionally.
                  </span>
                </div>
              </div>
            )}
          </div>

          <section
            aria-label="Live walking calculation summary and illustration"
            className="mt-4 overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-slate-50 shadow-xs dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
          >
            <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  Live walking estimate
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
                  Your Walking Calculation
                </h3>
              </div>
              <p className="shrink-0 text-right">
                <span className="block text-2xl font-black tabular-nums text-orange-600 dark:text-orange-400">
                  {result.caloriesToDisplay.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {inputs.showNetCalories ? "net kcal" : "gross kcal"}
                </span>
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Duration</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                  {result.durationTotalMinutes >= 60
                    ? `${Math.floor(result.durationTotalMinutes / 60)} hr ${Math.round(result.durationTotalMinutes % 60)} min`
                    : `${Math.round(result.durationTotalMinutes)} min`}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Speed</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                  {inputs.unitSystem === "imperial" ? `${result.speedMph} mph` : `${result.speedKmh} km/h`}
                </p>
              </div>
              {inputs.inclinePercent > 0 && (
                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Incline</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">{inputs.inclinePercent}%</p>
                </div>
              )}
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Distance</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                  {inputs.unitSystem === "imperial" ? `${result.distanceMiles} mi` : `${result.distanceKm} km`}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Estimated steps</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">~{result.steps.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Intensity</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">{result.met} MET</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Body weight</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                  {inputs.unitSystem === "imperial" ? `${inputs.weightLbs} lbs` : `${inputs.weightKg} kg`}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pace</p>
                <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                  {inputs.unitSystem === "imperial" ? result.paceFormattedMile : result.paceFormattedKm}
                </p>
              </div>
            </div>
            </div>
            <Image
              src="/walking-calorie-calculator-banner.png"
              alt="Walk more, burn more: track calories, steps, distance, pace, and incline"
              width={2242}
              height={701}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </section>
        </div>

        {/* Right Column: Live Results Panel (6 cols on lg) */}
        <div id="results-panel-anchor" className="lg:col-span-6 xl:col-span-6">
          <ResultsPanel
            result={result}
            inputs={inputs}
            unitSystem={inputs.unitSystem}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
    </>
  );
}
