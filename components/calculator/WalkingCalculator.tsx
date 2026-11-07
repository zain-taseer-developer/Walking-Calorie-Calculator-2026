"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { CalculationHistory } from "./CalculationHistory";
import { NumericInput } from "./NumericInput";
import {
  SavedCalculation,
  loadHistoryFromStorage,
  saveHistoryToStorage,
  addRecord,
  updateRecord,
  deleteRecord,
  MAX_HISTORY_RECORDS,
} from "@/lib/history";
import {
  Clock,
  Compass,
  Footprints,
  Mountain,
  Sliders,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";

export function WalkingCalculator() {
  const [mounted, setMounted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // History states
  const [history, setHistory] = useState<SavedCalculation[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [loadedRecordId, setLoadedRecordId] = useState<string | null>(null);
  const [isRecordEdited, setIsRecordEdited] = useState(false);
  const [updateButtonStatus, setUpdateButtonStatus] = useState<"idle" | "updated">("idle");
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  const updateStatusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recentlyUpdatedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (updateStatusTimeoutRef.current) clearTimeout(updateStatusTimeoutRef.current);
      if (recentlyUpdatedTimeoutRef.current) clearTimeout(recentlyUpdatedTimeoutRef.current);
    };
  }, []);

  // On mount: check browser locale, localStorage, history and URL search params
  useEffect(() => {
    setMounted(true);
    let resolvedUnits = detectDefaultUnitSystem();

    try {
      const storedUnits = localStorage.getItem("walking_calc_units") as UnitSystem | null;
      if (storedUnits === "imperial" || storedUnits === "metric") {
        resolvedUnits = storedUnits;
      }
    } catch {}

    // Load saved history
    const storedHistory = loadHistoryFromStorage();
    if (storedHistory.records) {
      setHistory(storedHistory.records);
    }
    if (storedHistory.error) {
      setStorageError(storedHistory.error);
    }

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

  // Track edits to loaded records
  const markInputsEdited = () => {
    if (loadedRecordId) {
      setIsRecordEdited(true);
    }
    if (updateButtonStatus === "updated") {
      setUpdateButtonStatus("idle");
    }
  };

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
    markInputsEdited();
  };

  // Live calculation results
  const result = useMemo(() => {
    return calculateWalkingCalories(inputs);
  }, [inputs]);

  // Action button click: "Save to History" or "Update Record"
  const handleActionButtonClick = () => {
    setStorageError(null);

    // Case 1: Updating an existing loaded record
    if (loadedRecordId && isRecordEdited) {
      const existing = history.find((r) => r.id === loadedRecordId);
      const updatedRecord: SavedCalculation = {
        id: loadedRecordId,
        timestamp: existing ? existing.timestamp : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        calories: result.caloriesToDisplay,
        durationMinutes: result.durationTotalMinutes,
        speedMph: result.speedMph,
        weightLbs: inputs.weightLbs,
        weightKg: inputs.weightKg,
        distanceMiles: result.distanceMiles,
        distanceKm: result.distanceKm,
        unitSystem: inputs.unitSystem,
        inputs: { ...inputs }, // Full input snapshot
      };

      const updateRes = updateRecord(history, updatedRecord);
      if (!updateRes.success) {
        setStorageError(updateRes.error || "Failed to update record.");
        return;
      }

      const saveRes = saveHistoryToStorage(updateRes.history);
      if (!saveRes.success) {
        setStorageError(saveRes.error || "Unable to save update to browser storage.");
        return;
      }

      setHistory(updateRes.history);
      setIsRecordEdited(false);
      setUpdateButtonStatus("updated");
      setRecentlyUpdatedId(loadedRecordId);
      setIsHistoryOpen(true);

      if (updateStatusTimeoutRef.current) clearTimeout(updateStatusTimeoutRef.current);
      updateStatusTimeoutRef.current = setTimeout(() => {
        setUpdateButtonStatus("idle");
      }, 3000);

      if (recentlyUpdatedTimeoutRef.current) clearTimeout(recentlyUpdatedTimeoutRef.current);
      recentlyUpdatedTimeoutRef.current = setTimeout(() => {
        setRecentlyUpdatedId(null);
      }, 10000);

      return;
    }

    // Case 2: Saving a new record
    if (history.length >= MAX_HISTORY_RECORDS) {
      setStorageError(`History limit reached (${MAX_HISTORY_RECORDS}/${MAX_HISTORY_RECORDS} records). Please remove a saved record before adding a new one.`);
      return;
    }

    const newRecord: SavedCalculation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      calories: result.caloriesToDisplay,
      durationMinutes: result.durationTotalMinutes,
      speedMph: result.speedMph,
      weightLbs: inputs.weightLbs,
      weightKg: inputs.weightKg,
      distanceMiles: result.distanceMiles,
      distanceKm: result.distanceKm,
      unitSystem: inputs.unitSystem,
      inputs: { ...inputs }, // Full input snapshot
    };

    const addRes = addRecord(history, newRecord, MAX_HISTORY_RECORDS);
    if (!addRes.success) {
      setStorageError(addRes.error || "Unable to save record.");
      return;
    }

    const saveRes = saveHistoryToStorage(addRes.history);
    if (!saveRes.success) {
      setStorageError(saveRes.error || "Unable to save record to browser storage.");
      return;
    }

    setHistory(addRes.history);
    setIsHistoryOpen(true);
    setLoadedRecordId(null);
    setIsRecordEdited(false);

    // Scroll to results on mobile devices if needed
    const element = document.getElementById("results-panel-anchor");
    if (element && window.innerWidth < 1024) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setLoadedRecordId(null);
    setIsRecordEdited(false);
    setUpdateButtonStatus("idle");
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

  // Load from history: restores full input snapshot or falls back gracefully for older records
  const handleLoadHistory = (calc: SavedCalculation) => {
    setLoadedRecordId(calc.id);
    setIsRecordEdited(false);
    setUpdateButtonStatus("idle");

    if (calc.inputs) {
      setInputs({ ...calc.inputs });
    } else {
      // Legacy records fallback
      setInputs((prev) => ({
        ...prev,
        unitSystem: calc.unitSystem || prev.unitSystem,
        weightLbs: calc.weightLbs || prev.weightLbs,
        weightKg: calc.weightKg || prev.weightKg,
        speedMph: calc.speedMph || prev.speedMph,
        speedKmh: parseFloat(((calc.speedMph || prev.speedMph) * 1.609344).toFixed(1)),
        durationHours: Math.floor((calc.durationMinutes || 0) / 60),
        durationMinutes: (calc.durationMinutes || 0) % 60,
        distanceMiles: calc.distanceMiles || prev.distanceMiles,
        distanceKm: calc.distanceKm || prev.distanceKm,
      }));
    }
  };

  // Delete individual record
  const handleDeleteRecord = (id: string) => {
    const updated = deleteRecord(history, id);
    const saveRes = saveHistoryToStorage(updated);
    if (!saveRes.success) {
      setStorageError(saveRes.error || "Unable to update browser storage.");
      return;
    }
    setHistory(updated);
    if (loadedRecordId === id) {
      setLoadedRecordId(null);
      setIsRecordEdited(false);
      setUpdateButtonStatus("idle");
    }
    if (recentlyUpdatedId === id) {
      setRecentlyUpdatedId(null);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    const saveRes = saveHistoryToStorage([]);
    if (!saveRes.success) {
      setStorageError(saveRes.error || "Unable to clear browser storage.");
      return;
    }
    setHistory([]);
    setLoadedRecordId(null);
    setIsRecordEdited(false);
    setUpdateButtonStatus("idle");
    setRecentlyUpdatedId(null);
  };

  const isImperial = inputs.unitSystem === "imperial";
  const isUpdating = Boolean(loadedRecordId && isRecordEdited);
  const isLimitReached = history.length >= MAX_HISTORY_RECORDS && !isUpdating;

  return (
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
                markInputsEdited();
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
              markInputsEdited();
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
              markInputsEdited();
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
              markInputsEdited();
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
              markInputsEdited();
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
                    markInputsEdited();
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
                        markInputsEdited();
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
                        markInputsEdited();
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
                      markInputsEdited();
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
                        markInputsEdited();
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
                        markInputsEdited();
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
                  markInputsEdited();
                }}
                onChangeKmh={(kmh) => {
                  setInputs((prev) => ({ ...prev, speedKmh: kmh }));
                  markInputsEdited();
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
                      markInputsEdited();
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
                      markInputsEdited();
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
                        markInputsEdited();
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
                        markInputsEdited();
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
                      markInputsEdited();
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
                      markInputsEdited();
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
                        markInputsEdited();
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
                        markInputsEdited();
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
                      markInputsEdited();
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
                      markInputsEdited();
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

          {/* Primary Action Button Area */}
          <div className="pt-2">
            {/* Storage Error Banner */}
            {storageError && (
              <div className="mb-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-2">
                <span>{storageError}</span>
                <button
                  type="button"
                  onClick={() => setStorageError(null)}
                  className="font-bold underline hover:no-underline shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* 28-record limit notice above button */}
            {isLimitReached && (
              <div className="mb-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>History limit reached (28/28 records). You must remove a saved record before adding a new one.</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleActionButtonClick}
              disabled={isLimitReached}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                updateButtonStatus === "updated"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 focus:ring-emerald-500/30"
                  : isUpdating
                  ? "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/25 focus:ring-brand-500/30"
                  : "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-accent-500/25 hover:shadow-accent-500/40 focus:ring-accent-500/30"
              }`}
            >
              {updateButtonStatus === "updated" ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>Record Updated</span>
                </>
              ) : isUpdating ? (
                <>
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Update Record</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Save to History</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Results update live above &amp; below as you adjust values.
            </p>
          </div>

          {/* Calculation History */}
          <CalculationHistory
            history={history}
            loadedRecordId={loadedRecordId}
            recentlyUpdatedId={recentlyUpdatedId}
            isOpen={isHistoryOpen}
            onToggleOpen={() => setIsHistoryOpen((prev) => !prev)}
            onLoadCalculation={handleLoadHistory}
            onDeleteRecord={handleDeleteRecord}
            onClearHistory={handleClearHistory}
          />
          <section
              aria-label="Walking calorie calculator summary"
              className="overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-slate-50 p-4 shadow-xs dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:p-5"
            >
              <div className="grid items-center gap-3 sm:grid-cols-[1fr_150px]">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                    Live walking estimate
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
                    Your Walking Calculation
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Updates as you change your calculator settings.
                  </p>
                </div>
                <div className="flex items-baseline gap-1 sm:justify-end">
                  <span className="text-3xl font-black tabular-nums text-orange-600 dark:text-orange-400">
                    {result.caloriesToDisplay.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {inputs.showNetCalories ? "net kcal" : "gross kcal"}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-2.5 dark:border-slate-700 dark:bg-slate-800/80">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Duration</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                    {result.durationTotalMinutes >= 60
                      ? `${Math.floor(result.durationTotalMinutes / 60)} hr ${result.durationTotalMinutes % 60} min`
                      : `${result.durationTotalMinutes} min`}
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

              <div className="mt-3 flex items-center justify-center gap-2 border-t border-orange-200/70 pt-3 dark:border-slate-700">
                <svg
                  viewBox="0 0 220 92"
                  role="img"
                  aria-label="Person walking with estimated calorie, pace, distance, and step metrics"
                  className="h-[76px] w-[190px]"
                >
                  <path d="M12 78c30-8 52 6 80 0s47-7 70 0 32 2 46-2" fill="none" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="3" />
                  <path d="M25 67h15m120 0h18" stroke="#f97316" strokeDasharray="3 5" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="104" cy="17" r="8" fill="#f6c7a8" />
                  <path d="m98 14 2-6 10 1 4 7-8-3-7 5z" fill="#334155" />
                  <path d="m99 28 15-3 10 22-20 5-10-12z" fill="#f97316" />
                  <path d="m102 47-8 13-15 3m29-13 9 12 15-2" fill="none" stroke="#334155" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
                  <path d="m99 30-12 9 7 9m21-20 10 8-7 8" fill="none" stroke="#f6c7a8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                  <rect x="151" y="27" width="39" height="24" rx="8" fill="#fff" stroke="#fed7aa" strokeWidth="2" />
                  <path d="M159 40h7l4-7 6 13 4-6h5" fill="none" stroke="#f97316" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
                <p className="max-w-[150px] text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Walking calorie, pace, distance, and step estimates based on your inputs.
                </p>
              </div>
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
  );
}
