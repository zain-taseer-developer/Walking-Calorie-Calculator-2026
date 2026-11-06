"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { Sparkles, Zap } from "lucide-react";

export default function CaloriesVsKcalPage() {
  const [val, setVal] = useState<number>(259);
  const [unit, setUnit] = useState<"kcal" | "cal" | "kj">("kcal");

  // Normalized to kcal
  const kcal = unit === "kcal" ? val : unit === "cal" ? val / 1000 : val / 4.184;
  const smallCal = kcal * 1000;
  const dietaryCal = kcal;
  const kilojoules = kcal * 4.184;

  const comparisonRows = [
    ["1 Dietary Calorie (Cal)", "1 kcal", "1,000 small cal", "4.184 kJ", "Standard US nutrition label unit"],
    ["100 kcal", "100 Calories", "100,000 small cal", "418.4 kJ", "Energy in 1 medium banana"],
    ["250 kcal", "250 Calories", "250,000 small cal", "1,046 kJ", "Burned in ~35 min of brisk walking"],
    ["259 kcal to calories", "259 kcal = 259 Calories", "259,000 small cal", "1,083.7 kJ", "Common snack nutrition entry"],
    ["500 kcal", "500 Calories", "500,000 small cal", "2,092 kJ", "Standard daily deficit for 1 lb/wk loss"],
    ["3,500 kcal", "3,500 Calories", "3,500,000 small cal", "14,644 kJ", "Energy stored in 1 lb of body fat"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "Is kcal the same as calories (is kilocalorie the same as calorie / are kcals the same as calories)?",
      answer:
        "Yes, in dietary and food contexts! If you ask 'is kcal and calories the same', 'is calorie same as kcal', 'are kcal and calories the same', or 'is kilocalories and calories the same', food labels use 'calorie' (often capitalized Calorie) as a direct synonym for kilocalorie (kcal). 1 food Calorie = 1 kcal = 1,000 scientific small calories.",
    },
    {
      question: "What is kcal vs cal (difference between kcal and cal / is kcal the same as cal)?",
      answer:
        "When exploring 'what is kcal vs cal', 'cal vs kcal', or 'difference between kcal and cal', 1 kcal contains exactly 1,000 small calories (cal). While 1 small cal warms 1 gram of water by 1°C, 1 kcal warms 1 kilogram (1 liter) of water by 1°C.",
    },
    {
      question: "What does 'kcal en cal' or 'kcal of cal' mean on international labels?",
      answer:
        "In Dutch, Flemish, and German packaging, 'kcal en cal' (kcal and cal) or 'kcal of cal' (kcal or cal) reflects multilingual labeling laws. In Italian, it is called 'calorie chilocalorie'. Across all these languages, 1 kcal equals 1 kilocalorie, directly translating kilocalories to calories for nutrition tracking.",
    },
    {
      question: "What is the official calorie definition?",
      answer:
        "The scientific calorie definition describes a pre-SI unit of heat energy: 1 calorie is the amount of energy required at 1 atmosphere of pressure to raise the temperature of 1 gram of pure water by 1 degree Celsius. Because this is too tiny for human metabolism, nutritionists use the kilocalorie (kcal).",
    },
    {
      question: "How many calories are in a pound of fat (how much calories is a pound / how many calories to equal a pound)?",
      answer:
        "One pound of human adipose body fat contains approximately 3,500 calories (3,500 kcal). When asking 'how many calories are in a pound of fat?' or 'how many calories to equal a pound?', a sustained deficit of 500 kcal per day equals 3,500 kcal per week, resulting in about 1 lb of fat loss.",
    },
    {
      question: "1 gm of fat is how many calories?",
      answer:
        "1 gm of fat is how many calories? Pure dietary fat contains 9 calories per gram (9 kcal/g). By contrast, 1 gram of protein contains 4 calories, and 1 gram of carbohydrates contains 4 calories.",
    },
    {
      question: "How many calories are in 1 gram of carbohydrates (how many calories are in one gram of carbohydrates)?",
      answer:
        "Carbohydrates provide 4 calories per gram (4 kcal/g). If you wonder 'how many calories are in 1 gram of carbohydrates' or 'how many calories are in one gram of carbohydrates', a food with 25 grams of carbs yields 100 kcal of energy. When converting grams to calories, multiply protein and carbs by 4, and fats by 9.",
    },
    {
      question: "What is the difference between carbs and calories?",
      answer:
        "The difference between carbs and calories is that carbohydrates are a chemical macronutrient (sugars, starches, and fiber), while calories are the unit of measurement used to quantify the energy those carbohydrates release when metabolized by your body.",
    },
    {
      question: "What is the difference between active vs total calories?",
      answer:
        "Active vs total calories: Active calories represent only the extra energy burned through movement, exercise, and walking. Total calories include those active calories PLUS your resting Basal Metabolic Rate (BMR) burned simply staying alive during that same time window.",
    },
    {
      question: "How do you convert 259 kcal to calories or kcal to calories?",
      answer:
        "To convert kcal to calories, in dietary contexts 259 kcal to calories equals 259 food Calories (or 259,000 scientific small calories). If someone asks 'how many calories in ak cal', 1 kcal = 1 food Calorie.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Calories vs. kcal Explainer" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Scientific Energy Conversion Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Calories vs. kcal: What&apos;s the Difference?
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Demystifying food labels, dietary Calories, scientific small calories (cal), kilocalories (kcal), and energy conversion math.
        </p>
      </div>

      {/* Interactive Converter Card */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label htmlFor="energy-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Enter Energy Value
              </label>
              <input
                id="energy-input"
                type="number"
                value={val}
                onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Input Unit
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUnit("kcal")}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    unit === "kcal"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  kcal (Calories)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("cal")}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    unit === "cal"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Small cal
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("kj")}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    unit === "kj"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Kilojoules (kJ)
                </button>
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-3 text-center">
            <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider block">
              Converted Energy Units
            </span>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">Dietary Calories</span>
                <span className="text-xl font-bold font-mono">{Math.round(dietaryCal).toLocaleString()} kcal</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">Kilojoules</span>
                <span className="text-xl font-bold font-mono">{Math.round(kilojoules).toLocaleString()} kJ</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs col-span-2">
                <span className="text-xs text-teal-200 block">Scientific Small Calories</span>
                <span className="text-xl font-bold font-mono">{Math.round(smallCal).toLocaleString()} cal</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Calculate Your Walking Calories</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="kcal-top" />

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12 space-y-4">
        <h2>The Core Rule: 1 kcal = 1 Food Calorie = 1,000 Small Calories</h2>
        <p>
          In everyday language, people constantly ask: <strong>calories vs kcal</strong>, <strong>calories vs kilocalories</strong>, and <strong>is kcal the same as calories</strong>? The short answer is yes: on any food container or fitness tracker, 1 Calorie equals 1 kilocalorie (kcal).
        </p>

        <p>
          Whether written in Dutch as <strong>kcal en cal</strong> or <strong>kcal of cal</strong>, in English as <strong>kcal and cal</strong>, or in Italian as <strong>calorie chilocalorie</strong>, the underlying physics remains identical.
        </p>

        <h2>Grams to Calories: Macronutrient Energy Density</h2>
        <p>
          When converting <strong>grams to calories</strong>, each macronutrient provides a specific thermodynamic yield:
        </p>
        <ul>
          <li><strong>Protein:</strong> 4 calories per gram (4 kcal/g).</li>
          <li><strong>Carbohydrates:</strong> 4 calories per gram (4 kcal/g).</li>
          <li><strong>Fats:</strong> 9 calories per gram (9 kcal/g).</li>
          <li><strong>Alcohol:</strong> 7 calories per gram (7 kcal/g).</li>
        </ul>

        <DataTable
          title="Energy Conversion Equivalents Reference Table"
          caption="Comparative energy values across international scientific and dietary units."
          headers={["Dietary Energy", "Kilocalories (kcal)", "Small Calories (cal)", "Kilojoules (kJ)", "Common Context"]}
          rows={comparisonRows}
          highlightColumnIndex={1}
        />

        <p>
          To calculate the exact dietary kilocalories your workouts burn, visit our homepage{" "}
          <Link href="/" className="font-bold text-emerald-600 underline">
            walking calorie calculator
          </Link>.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/calories-vs-kcal" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
