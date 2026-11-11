"use client";

import React, { useEffect, useState } from "react";
import {
  ACTIVITY_HISTORY_STORAGE_KEY,
  isSavedActivityCalculation,
  removeExpiredActivityCalculations,
  SavedActivityCalculation,
} from "@/lib/activity-history";
import { requestPersistentHistoryStorage } from "@/lib/history";

export interface ActivityOption {
  id: string;
  name: string;
  met: number;
  category: string;
}

const activities: ActivityOption[] = [
  { id: "walking_brisk", name: "Walking (Brisk, 3.5 mph)", met: 4.3, category: "Walking & Hiking" },
  { id: "hiking", name: "Hiking (Cross-country / Hills)", met: 6.0, category: "Walking & Hiking" },
  { id: "cycling_moderate", name: "Cycling / Biking (Moderate, 12-14 mph)", met: 6.8, category: "Cycling" },
  { id: "swimming_freestyle", name: "Swimming (Freestyle, Moderate)", met: 7.0, category: "Water Sports" },
  { id: "running_5mph", name: "Running / Jogging (5.0 mph)", met: 8.3, category: "Running" },
  { id: "jump_rope", name: "Jumping Rope / Skipping Rope (Moderate)", met: 11.0, category: "Cardio" },
  { id: "push_ups_calisthenics", name: "Push-ups, Sit-ups & Calisthenics (Vigorous)", met: 5.0, category: "Bodyweight" },
  { id: "weight_lifting", name: "Weight Lifting (Resistance Training)", met: 3.5, category: "Strength" },
  { id: "erg_rowing", name: "Rowing Machine / Ergometer (Moderate)", met: 7.0, category: "Cardio" },
];

export function ActivityCalorieTool() {
  const [selectedActivity, setSelectedActivity] = useState<string>("cycling_moderate");
  const [weightKg, setWeightKg] = useState<number>(70);
  const [durationMin, setDurationMin] = useState<number>(45);
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [history, setHistory] = useState<SavedActivityCalculation[]>([]);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawHistory = localStorage.getItem(ACTIVITY_HISTORY_STORAGE_KEY);
      if (!rawHistory) return;

      const parsed: unknown = JSON.parse(rawHistory);
      if (!Array.isArray(parsed)) {
        throw new Error("Saved activity history is not a valid list.");
      }

      const validRecords = parsed
        .filter(isSavedActivityCalculation)
        .filter((record) => activities.some((activity) => activity.id === record.activityId));
      const retainedRecords = removeExpiredActivityCalculations(validRecords);
      // Browser storage is only available after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory(retainedRecords);
      if (retainedRecords.length !== parsed.length) {
        localStorage.setItem(ACTIVITY_HISTORY_STORAGE_KEY, JSON.stringify(retainedRecords));
      }

      if (retainedRecords.length > 0) {
        void requestPersistentHistoryStorage().catch((error) => {
          console.error("Could not request persistent history storage.", error);
        });
      }
    } catch (error) {
      console.error("Could not load activity history.", error);
      setHistoryError("Saved history could not be loaded from this browser.");
    }
  }, []);

  const currentAct = activities.find((a) => a.id === selectedActivity) || activities[0];

  // Main calculation: kcal = MET * weightKg * hours
  const hours = durationMin / 60;
  const totalCalories = Math.round(currentAct.met * weightKg * hours);
  const kcalPerMinute = ((currentAct.met * weightKg) / 60).toFixed(1);

  // Equivalent brisk walking duration (MET 4.3)
  const walkingHoursEquivalent = (currentAct.met * hours) / 4.3;
  const walkingMinutesEquivalent = Math.round(walkingHoursEquivalent * 60);

  const saveHistory = (records: SavedActivityCalculation[]) => {
    try {
      localStorage.setItem(ACTIVITY_HISTORY_STORAGE_KEY, JSON.stringify(records));
      setHistory(records);
      setHistoryError(null);
    } catch (error) {
      console.error("Could not save activity history.", error);
      setHistoryError("Saved history could not be stored in this browser.");
    }
  };

  const handleSave = () => {
    const record: SavedActivityCalculation = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(),
      activityId: currentAct.id,
      weightKg,
      durationMinutes: durationMin,
      calories: totalCalories,
      unit,
    };
    const updatedHistory = removeExpiredActivityCalculations([...history, record]);
    saveHistory(updatedHistory);
    void requestPersistentHistoryStorage().catch((error) => {
      console.error("Could not request persistent history storage.", error);
    });
  };

  const handleLoad = (record: SavedActivityCalculation) => {
    setSelectedActivity(record.activityId);
    setWeightKg(record.weightKg);
    setDurationMin(record.durationMinutes);
    setUnit(record.unit);
  };

  const handleDelete = (id: string) => {
    saveHistory(history.filter((record) => record.id !== id));
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Multi-Activity Calorie Burned Calculator
          </h2>
          <p className="text-xs text-slate-500">Compendium of Physical Activities MET standard</p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`rounded-md px-3 py-1 ${unit === "imperial" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            lbs
          </button>
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`rounded-md px-3 py-1 ${unit === "metric" ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            kg
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {/* Activity Selection */}
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Select Physical Activity / Sport
          </label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-semibold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {activities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.name} (MET {act.met})
              </option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Your Body Weight ({unit === "imperial" ? "lbs" : "kg"})
          </label>
          <input
            type="number"
            step="1"
            min="30"
            max="300"
            value={unit === "imperial" ? Math.round(weightKg * 2.20462) : weightKg}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setWeightKg(unit === "imperial" ? val / 2.20462 : val);
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-[11px] text-slate-500">{weightKg.toFixed(1)} kg body mass</span>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Duration (Minutes)
          </label>
          <input
            type="number"
            step="5"
            min="1"
            max="300"
            value={durationMin}
            onChange={(e) => setDurationMin(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-[11px] text-slate-500">{hours.toFixed(2)} hours active</span>
        </div>

        {/* Quick presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Quick Duration
          </label>
          <div className="mt-1 flex gap-2">
            {[15, 30, 45, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDurationMin(m)}
                className={`flex-1 rounded-lg border py-2 text-xs font-semibold ${durationMin === m ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300" : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"}`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Box */}
      <div className="mt-6 grid gap-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white sm:grid-cols-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Total Calories Burned
          </span>
          <div className="mt-1 text-4xl font-extrabold">{totalCalories}</div>
          <span className="text-xs text-emerald-100">kcal total energy</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Burn Rate & MET
          </span>
          <div className="mt-1 text-3xl font-bold">{kcalPerMinute} kcal/min</div>
          <span className="text-xs text-emerald-100">Activity MET: {currentAct.met}</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Walking Equivalent
          </span>
          <div className="mt-1 text-2xl font-bold">{walkingMinutesEquivalent} min</div>
          <span className="text-xs text-emerald-100">of brisk walking (3.5 mph)</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Saved activity history is kept on this device for 28 days.
        </p>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Save to History
        </button>
      </div>

      {historyError && (
        <p role="alert" className="mt-3 text-sm text-rose-600 dark:text-rose-400">
          {historyError}
        </p>
      )}

      <section className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800" aria-label="Saved activity history">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Saved History ({history.length})
          </h3>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Your saved activity calculations will appear here.
          </p>
        ) : (
          <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto">
            {[...history].reverse().map((record) => {
              const activity = activities.find((item) => item.id === record.activityId);
              if (!activity) return null;

              return (
                <li
                  key={record.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {activity.name} · {record.calories} kcal
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {record.durationMinutes} min · {record.weightKg.toFixed(1)} kg ·{" "}
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(record.timestamp))}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoad(record)}
                      className="rounded-md px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(record.id)}
                      className="rounded-md px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950"
                      aria-label={`Delete saved ${activity.name} calculation`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
