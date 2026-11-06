"use client";

import React from "react";
import { UnitSystem } from "@/lib/types";
import { SPEED_PRESETS } from "@/lib/calc";

interface SpeedSliderProps {
  unitSystem: UnitSystem;
  speedMph: number;
  speedKmh: number;
  onChangeMph: (mph: number) => void;
  onChangeKmh: (kmh: number) => void;
}

export function SpeedSlider({
  unitSystem,
  speedMph,
  speedKmh,
  onChangeMph,
  onChangeKmh,
}: SpeedSliderProps) {
  const currentSpeed = unitSystem === "imperial" ? speedMph : speedKmh;
  const minSpeed = unitSystem === "imperial" ? 1.0 : 1.6;
  const maxSpeed = unitSystem === "imperial" ? 6.0 : 9.6;
  const step = unitSystem === "imperial" ? 0.1 : 0.1;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (unitSystem === "imperial") {
      onChangeMph(val);
      onChangeKmh(parseFloat((val * 1.609344).toFixed(1)));
    } else {
      onChangeKmh(val);
      onChangeMph(parseFloat((val / 1.609344).toFixed(1)));
    }
  };

  const handlePresetClick = (preset: typeof SPEED_PRESETS[0]) => {
    onChangeMph(preset.mph);
    onChangeKmh(preset.kmh);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="speed-slider" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Walking Speed
        </label>
        <span className="text-base font-bold text-brand-600 dark:text-brand-400 font-mono">
          {currentSpeed.toFixed(1)} {unitSystem === "imperial" ? "mph" : "km/h"}
        </span>
      </div>

      {/* Slider */}
      <div className="relative pt-1">
        <input
          id="speed-slider"
          type="range"
          min={minSpeed}
          max={maxSpeed}
          step={step}
          value={currentSpeed}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 dark:accent-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          <span>{minSpeed} {unitSystem === "imperial" ? "mph" : "km/h"} (Stroll)</span>
          <span>{maxSpeed} {unitSystem === "imperial" ? "mph" : "km/h"} (Race)</span>
        </div>
      </div>

      {/* Speed Presets Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1">
        {SPEED_PRESETS.map((preset) => {
          const isSelected =
            unitSystem === "imperial"
              ? Math.abs(speedMph - preset.mph) < 0.15
              : Math.abs(speedKmh - preset.kmh) < 0.25;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center justify-center border ${
                isSelected
                  ? "bg-brand-600 border-brand-600 text-white shadow-sm ring-2 ring-brand-500/20"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60"
              }`}
            >
              <span className="font-semibold">{preset.label}</span>
              <span className={`text-[10px] ${isSelected ? "text-teal-100" : "text-slate-400 dark:text-slate-500"}`}>
                {unitSystem === "imperial" ? `${preset.mph} mph` : `${preset.kmh} km/h`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

