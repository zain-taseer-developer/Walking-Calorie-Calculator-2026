"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { estimateStrideLength, getWalkingMet } from "@/lib/calc";
import { lbsToKg, kgToLbs, cmToFtIn, ftInToCm } from "@/lib/format";
import { NumericInput } from "@/components/calculator/NumericInput";
import type { BrandMenu, BrandMenuItem } from "@/data/brands/brand-types";
import {
  Plus,
  Minus,
  Trash2,
  Search,
  Copy,
  RotateCcw,
  ArrowRight,
  Flame,
} from "lucide-react";

/**
 * Generic brand meal -> walking equivalent calculator.
 * A new brand (McDonald's, Starbucks, ...) only needs a new BrandMenu data file
 * and a blog article embedding <BrandMealCalculator menu={brandMenu} ... />.
 */

interface OrderLine {
  key: string;
  item: BrandMenuItem;
  quantity: number;
}

interface CustomLine {
  key: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function BrandMealCalculator({
  menu,
  fullCalculatorHref = "/",
  fullCalculatorLabel = "Open Full Calculator",
}: {
  menu: BrandMenu;
  fullCalculatorHref?: string;
  fullCalculatorLabel?: string;
}) {
  const [categoryId, setCategoryId] = useState(menu.categories[0].id);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<OrderLine[]>([]);
  const [customs, setCustoms] = useState<CustomLine[]>([]);

  // User details
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [weightLbs, setWeightLbs] = useState(160);
  const [weightKg, setWeightKg] = useState(73);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [speedMph, setSpeedMph] = useState(3.5);
  const [net, setNet] = useState(true);

  const category =
    menu.categories.find((c) => c.id === categoryId) ?? menu.categories[0];

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return category.items;
    return category.items.filter((i) => i.name.toLowerCase().includes(q));
  }, [category, search]);

  // ---- Totals ----
  const totals = useMemo(() => {
    const t = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sodium: 0,
      fiber: 0,
    };
    for (const line of order) {
      t.calories += line.item.calories * line.quantity;
      t.protein += line.item.protein * line.quantity;
      t.carbs += line.item.carbs * line.quantity;
      t.fat += line.item.fat * line.quantity;
      t.sodium += line.item.sodium * line.quantity;
      t.fiber += line.item.fiber * line.quantity;
    }
    for (const c of customs) {
      t.calories += c.calories;
      t.protein += c.protein;
      t.carbs += c.carbs;
      t.fat += c.fat;
    }
    return t;
  }, [order, customs]);

  // ---- Validation ----
  const wLbs = unit === "imperial" ? weightLbs : kgToLbs(weightKg);
  const wKg = unit === "imperial" ? lbsToKg(weightLbs) : weightKg;
  const weightError =
    wLbs < 50 || wLbs > 600
      ? "Enter a weight between 50 and 600 lbs (25–280 kg)."
      : "";
  const hCm = unit === "imperial" ? ftInToCm(heightFt, heightIn) : heightCm;
  const heightError =
    hCm < 100 || hCm > 230
      ? "Enter a height between 100 and 230 cm (about 3'3\"–7'7\")."
      : "";
  const speedError =
    speedMph < 1 || speedMph > 6
      ? "Choose a walking speed between 1 and 6 mph."
      : "";

  // ---- Walking equivalent engine (reuses lib/calc) ----
  const stride = estimateStrideLength(hCm);
  const stepsPerMile = Math.round(5280 / (stride.meters * 3.28084));

  const met = getWalkingMet(speedMph);
  const netKcalPerMin = ((met - 1) * wKg) / 60; // net kcal/min
  const grossKcalPerMin = (met * wKg) / 60;
  const kcalPerMin = net ? netKcalPerMin : grossKcalPerMin;

  const walkingFor = (kcal: number) => {
    const minutes = kcalPerMin > 0 ? kcal / kcalPerMin : 0;
    const miles = (speedMph * minutes) / 60;
    return {
      minutes,
      hMin: `${Math.floor(minutes / 60)}h ${String(Math.round(minutes % 60)).padStart(2, "0")}m`,
      miles,
      km: miles * 1.609344,
      steps: Math.round(miles * stepsPerMile),
    };
  };

  const orderWalk = walkingFor(totals.calories);

  // ---- Order actions ----
  const addItem = (item: BrandMenuItem) => {
    setOrder((prev) => {
      const existing = prev.find(
        (l) => l.item.name === item.name && l.item.serving === item.serving,
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          key: `${item.name}-${item.serving}-${prev.length}`,
          item,
          quantity: 1,
        },
      ];
    });
  };

  const changeQty = (key: string, delta: number) => {
    setOrder((prev) =>
      prev
        .map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + delta } : l,
        )
        .filter((l) => l.quantity > 0),
    );
  };

  const removeItem = (key: string) =>
    setOrder((prev) => prev.filter((l) => l.key !== key));

  const [customName, setCustomName] = useState("");
  const [customKcal, setCustomKcal] = useState(0);
  const [customProtein, setCustomProtein] = useState(0);
  const [customCarbs, setCustomCarbs] = useState(0);
  const [customFat, setCustomFat] = useState(0);
  const [customError, setCustomError] = useState("");

  const addCustom = () => {
    if (!customName.trim() || customKcal <= 0) {
      setCustomError("Give the item a name and a calorie value above 0.");
      return;
    }
    setCustomError("");
    setCustoms((prev) => [
      ...prev,
      {
        key: `custom-${Date.now()}`,
        name: customName.trim(),
        calories: customKcal,
        protein: customProtein,
        carbs: customCarbs,
        fat: customFat,
      },
    ]);
    setCustomName("");
    setCustomKcal(0);
    setCustomProtein(0);
    setCustomCarbs(0);
    setCustomFat(0);
  };

  const removeCustom = (key: string) =>
    setCustoms((prev) => prev.filter((c) => c.key !== key));

  const reset = () => {
    setOrder([]);
    setCustoms([]);
    setWeightLbs(160);
    setWeightKg(73);
    setHeightFt(5);
    setHeightIn(9);
    setHeightCm(175);
    setSpeedMph(3.5);
    setNet(true);
  };

  const copyResults = async () => {
    const text = [
      `${menu.brand} order: ${totals.calories} kcal, ${totals.protein}g protein, ${totals.carbs}g carbs, ${totals.fat}g fat, ${totals.sodium}mg sodium, ${totals.fiber}g fiber`,
      `Walking equivalent (${net ? "net" : "gross"}): ${Math.round(orderWalk.minutes)} min, ${orderWalk.miles.toFixed(1)} mi (${orderWalk.km.toFixed(1)} km), ~${orderWalk.steps.toLocaleString()} steps at ${speedMph} mph.`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const switchUnit = (u: "imperial" | "metric") => {
    if (u === unit) return;
    setUnit(u);
    if (u === "metric") {
      setWeightKg(lbsToKg(weightLbs));
      setHeightCm(ftInToCm(heightFt, heightIn));
    } else {
      setWeightLbs(kgToLbs(weightKg));
      const { ft, inch } = cmToFtIn(heightCm);
      setHeightFt(ft);
      setHeightIn(inch);
    }
  };

  const inputCls =
    "w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-brand-500";
  const labelCls =
    "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div
      className="not-prose my-8 rounded-2xl bg-gradient-to-br from-brand-50 via-white to-teal-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-brand-950/40 border border-brand-200 dark:border-brand-900/60 shadow-lg overflow-hidden"
      role="region"
      aria-label={`${menu.brand} calorie calculator`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-brand-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-700 text-white shadow-xs">
            <Flame className="w-4 h-4" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {menu.brand} Calorie Calculator
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-brand-700 dark:text-brand-300 bg-brand-100/60 dark:bg-brand-950 px-2 py-0.5 rounded-full">
          {menu.market} &middot; Updated {menu.lastUpdated}
        </span>
      </div>

      {/* Step 1: Build order */}
      <div className="p-5 border-b border-brand-100 dark:border-slate-800">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Step 1 — Build your order
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="brand-cat" className={labelCls}>
              Menu category
            </label>
            <select
              id="brand-cat"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              {menu.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label htmlFor="brand-search" className={labelCls}>
              Search item
            </label>
            <Search
              className="absolute left-3 top-[2.1rem] w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden
            />
            <input
              id="brand-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items…"
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        {category.items.some((i) => i.isPlaceholder) && (
          <p className="mb-2 text-xs text-amber-700 dark:text-amber-400">
            Some rows in this category are pending official data and cannot be
            added yet.
          </p>
        )}

        <ul className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
          {visibleItems.length === 0 && (
            <li className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
              No items match your search.
            </li>
          )}
          {visibleItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-3 px-3 py-2"
            >
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {item.serving} &middot; {item.calories} kcal &middot;{" "}
                  {item.protein}g protein &middot; {item.fat}g fat
                </span>
              </div>
              {item.isPlaceholder ? (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 shrink-0">
                  TODO
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-700 hover:bg-brand-600 text-white transition-colors"
                  aria-label={`Add ${item.name} to the order`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Custom item row */}
        <div className="mt-3 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Add a custom item
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <input
              aria-label="Custom item name"
              placeholder="Item name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className={`${inputCls} col-span-2 sm:col-span-1`}
            />
            <NumericInput
              aria-label="Custom item calories"
              value={customKcal}
              onChange={setCustomKcal}
              min={0}
              max={3000}
              placeholder="kcal"
              className={inputCls}
            />
            <NumericInput
              aria-label="Custom item protein grams"
              value={customProtein}
              onChange={setCustomProtein}
              min={0}
              max={300}
              placeholder="protein g"
              className={inputCls}
            />
            <NumericInput
              aria-label="Custom item carbs grams"
              value={customCarbs}
              onChange={setCustomCarbs}
              min={0}
              max={400}
              placeholder="carbs g"
              className={inputCls}
            />
            <NumericInput
              aria-label="Custom item fat grams"
              value={customFat}
              onChange={setCustomFat}
              min={0}
              max={300}
              placeholder="fat g"
              className={inputCls}
            />
          </div>
          {customError && (
            <p
              className="mt-2 text-xs text-red-600 dark:text-red-400"
              role="alert"
            >
              {customError}
            </p>
          )}
          <button
            type="button"
            onClick={addCustom}
            className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700"
          >
            <Plus className="w-3.5 h-3.5" /> Add custom item
          </button>
        </div>
      </div>

      {/* Step 2: Totals + breakdown */}
      <div className="p-5 border-b border-brand-100 dark:border-slate-800">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Step 2 — Order nutrition
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {[
            ["Calories", totals.calories, "kcal"],
            ["Protein", totals.protein, "g"],
            ["Carbs", totals.carbs, "g"],
            ["Fat", totals.fat, "g"],
            ["Sodium", totals.sodium, "mg"],
            ["Fiber", totals.fiber, "g"],
          ].map(([label, val, unitLbl]) => (
            <div
              key={label as string}
              className="rounded-xl border border-slate-200/80 bg-white/80 dark:border-slate-700 dark:bg-slate-800/80 p-2 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label as string}
              </p>
              <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                {(val as number).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
                <span className="text-[10px] font-normal text-slate-500">
                  {" "}
                  {unitLbl as string}
                </span>
              </p>
            </div>
          ))}
        </div>

        {order.length === 0 && customs.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your order is empty. Add items above to see nutrition totals and
            your walking equivalent.
          </p>
        ) : (
          <ul className="space-y-2">
            {order.map((line) => {
              const walk = walkingFor(line.item.calories * line.quantity);
              return (
                <li
                  key={line.key}
                  className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {line.quantity} × {line.item.name}
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {line.item.calories * line.quantity} kcal &middot; walk:{" "}
                      {Math.round(walk.minutes)} min / {walk.miles.toFixed(1)}{" "}
                      mi / ~{walk.steps.toLocaleString()} steps
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => changeQty(line.key, -1)}
                      aria-label={`Decrease ${line.item.name}`}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                      disabled={line.item.isPlaceholder}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      className="w-6 text-center text-sm font-bold tabular-nums"
                      aria-live="polite"
                    >
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(line.key, 1)}
                      aria-label={`Increase ${line.item.name}`}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                      disabled={line.item.isPlaceholder}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      aria-label={`Remove ${line.item.name}`}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
            {customs.map((c) => {
              const walk = walkingFor(c.calories);
              return (
                <li
                  key={c.key}
                  className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {c.name} (custom)
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {c.calories} kcal &middot; walk:{" "}
                      {Math.round(walk.minutes)} min / {walk.miles.toFixed(1)}{" "}
                      mi / ~{walk.steps.toLocaleString()} steps
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustom(c.key)}
                    aria-label={`Remove ${c.name}`}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Step 3: User details */}
      <div className="p-5 border-b border-brand-100 dark:border-slate-800">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Step 3 — Your details
        </p>

        <div
          className="inline-flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 mb-4"
          role="group"
          aria-label="Unit system"
        >
          {(["imperial", "metric"] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => switchUnit(u)}
              aria-pressed={unit === u}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                unit === u
                  ? "bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {u === "imperial" ? "Imperial" : "Metric"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="brand-weight" className={labelCls}>
              Body weight ({unit === "imperial" ? "lbs" : "kg"})
            </label>
            {unit === "imperial" ? (
              <NumericInput
                id="brand-weight"
                value={weightLbs}
                onChange={setWeightLbs}
                min={50}
                max={600}
                step={1}
                className={inputCls}
              />
            ) : (
              <NumericInput
                id="brand-weight"
                value={weightKg}
                onChange={setWeightKg}
                min={25}
                max={280}
                step={0.5}
                className={inputCls}
              />
            )}
          </div>
          <div>
            <label htmlFor="brand-height" className={labelCls}>
              Height ({unit === "imperial" ? "ft / in" : "cm"})
            </label>
            {unit === "imperial" ? (
              <div className="grid grid-cols-2 gap-2">
                <NumericInput
                  aria-label="Height feet"
                  value={heightFt}
                  onChange={(v) => setHeightFt(v)}
                  min={3}
                  max={7}
                  step={1}
                  className={inputCls}
                />
                <NumericInput
                  aria-label="Height inches"
                  value={heightIn}
                  onChange={(v) => setHeightIn(v)}
                  min={0}
                  max={11}
                  step={1}
                  className={inputCls}
                />
              </div>
            ) : (
              <NumericInput
                id="brand-height"
                value={heightCm}
                onChange={setHeightCm}
                min={100}
                max={230}
                step={1}
                className={inputCls}
              />
            )}
          </div>
          <div>
            <label htmlFor="brand-speed" className={labelCls}>
              Walking speed (mph)
            </label>
            <select
              id="brand-speed"
              value={speedMph}
              onChange={(e) => setSpeedMph(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              {[2.0, 2.5, 3.0, 3.5, 4.0, 4.5].map((s) => (
                <option key={s} value={s}>
                  {s} mph
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-3 flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={net}
            onChange={(e) => setNet(e.target.checked)}
            className="w-4 h-4 rounded text-brand-700 focus:ring-brand-500 border-slate-300 dark:border-slate-700"
          />
          Show net walking time (excludes resting burn — recommended)
        </label>

        {(weightError || heightError || speedError) && (
          <div
            className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300"
            role="alert"
          >
            {[weightError, heightError, speedError]
              .filter(Boolean)
              .map((e, i) => (
                <p key={i}>{e}</p>
              ))}
          </div>
        )}
      </div>

      {/* Step 4: Walking equivalent */}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Step 4 — Your walking equivalent
        </p>

        {order.length === 0 && customs.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add something to your order to see how much walking matches it.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="rounded-xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/70 dark:bg-brand-950/40 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
                  Minutes
                </p>
                <p className="text-lg font-black tabular-nums text-slate-900 dark:text-white">
                  {Math.round(orderWalk.minutes)}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {orderWalk.hMin}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 dark:border-slate-700 dark:bg-slate-800/80 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Miles
                </p>
                <p className="text-lg font-black tabular-nums text-slate-900 dark:text-white">
                  {orderWalk.miles.toFixed(1)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 dark:border-slate-700 dark:bg-slate-800/80 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Kilometers
                </p>
                <p className="text-lg font-black tabular-nums text-slate-900 dark:text-white">
                  {orderWalk.km.toFixed(1)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/80 dark:border-slate-700 dark:bg-slate-800/80 p-3 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Steps
                </p>
                <p className="text-lg font-black tabular-nums text-slate-900 dark:text-white">
                  ~{orderWalk.steps.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyResults}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand-700 hover:bg-brand-600 text-white"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Results
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              <Link
                href={fullCalculatorHref}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/40"
              >
                {fullCalculatorLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}

        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          These are estimates. Food is fuel, and you do not have to walk off a
          meal.
        </p>
      </div>
    </div>
  );
}
