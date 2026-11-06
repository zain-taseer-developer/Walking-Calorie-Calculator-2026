"use client";

import React, { useState } from "react";

const raceDistances = [
  { name: "5K", miles: 3.10686, km: 5.0 },
  { name: "10K", miles: 6.21371, km: 10.0 },
  { name: "Half Marathon", miles: 13.1094, km: 21.0975 },
  { name: "Marathon", miles: 26.2188, km: 42.195 },
];

export function RacePaceTool() {
  const [selectedRace, setSelectedRace] = useState<string>("Marathon");
  const [hours, setHours] = useState<number>(3);
  const [minutes, setMinutes] = useState<number>(45);
  const [seconds, setSeconds] = useState<number>(0);
  const [customDistanceMiles, setCustomDistanceMiles] = useState<number>(26.2);

  const activeDist = raceDistances.find((r) => r.name === selectedRace);
  const totalMiles = activeDist ? activeDist.miles : customDistanceMiles;
  const totalHours = hours + minutes / 60 + seconds / 3600;

  // Pace in minutes per mile
  const pacePerMileDecimal = totalHours > 0 && totalMiles > 0 ? (totalHours * 60) / totalMiles : 0;
  const paceMinMile = Math.floor(pacePerMileDecimal);
  const paceSecMile = Math.round((pacePerMileDecimal - paceMinMile) * 60);

  // Pace in minutes per km
  const totalKm = totalMiles * 1.60934;
  const pacePerKmDecimal = totalHours > 0 && totalKm > 0 ? (totalHours * 60) / totalKm : 0;
  const paceMinKm = Math.floor(pacePerKmDecimal);
  const paceSecKm = Math.round((pacePerKmDecimal - paceMinKm) * 60);

  // Speed in mph
  const speedMph = totalHours > 0 ? (totalMiles / totalHours).toFixed(2) : "0.00";
  const speedKmh = totalHours > 0 ? (totalKm / totalHours).toFixed(2) : "0.00";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Race Pace & Speed Distance Time Calculator
          </h2>
          <p className="text-xs text-slate-500">Fast velocity, pace splits, and target finish predictor</p>
        </div>
      </div>

      {/* Race Selector Buttons */}
      <div className="mt-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Target Race Event
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {raceDistances.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setSelectedRace(r.name)}
              className={`rounded-xl border p-3 text-center transition ${selectedRace === r.name ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-200" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"}`}
            >
              <div className="font-bold">{r.name}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {r.miles.toFixed(2)} mi / {r.km} km
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Time Inputs */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Hours
          </label>
          <input
            type="number"
            min="0"
            max="48"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xl font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Minutes
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xl font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Seconds
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xl font-bold text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      {/* Quick Finish Presets for Selected Race */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Popular Marathon Goals:</span>
        {[
          { label: "Sub 3 Hours", h: 2, m: 59, s: 0 },
          { label: "3:30 Pace", h: 3, m: 30, s: 0 },
          { label: "Sub 4 Hours", h: 3, m: 59, s: 0 },
          { label: "4:30 Goal", h: 4, m: 30, s: 0 },
          { label: "5 Hour Pace", h: 5, m: 0, s: 0 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setHours(p.h);
              setMinutes(p.m);
              setSeconds(p.s);
            }}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Output Results */}
      <div className="mt-6 grid gap-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white sm:grid-cols-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Required Mile Pace
          </span>
          <div className="mt-1 text-4xl font-extrabold">
            {paceMinMile}:{paceSecMile < 10 ? `0${paceSecMile}` : paceSecMile}
          </div>
          <span className="text-xs text-emerald-100">min/mile average split</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Required Metric Pace
          </span>
          <div className="mt-1 text-4xl font-extrabold">
            {paceMinKm}:{paceSecKm < 10 ? `0${paceSecKm}` : paceSecKm}
          </div>
          <span className="text-xs text-emerald-100">min/kilometer split</span>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
            Average Speed
          </span>
          <div className="mt-1 text-3xl font-bold">{speedMph} mph</div>
          <span className="text-xs text-emerald-100">{speedKmh} km/h velocity</span>
        </div>
      </div>
    </div>
  );
}

