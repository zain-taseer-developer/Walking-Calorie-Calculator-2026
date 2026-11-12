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
    ["100 kcal", "100 Calories", "100,000 small cal", "418.4 kJ", "About the energy in one medium banana"],
    ["250 kcal", "250 Calories", "250,000 small cal", "1,046 kJ", "Energy value (not a food equivalence)"],
    ["259 kcal to calories", "259 kcal = 259 Calories", "259,000 small cal", "1,083.7 kJ", "Converted energy value"],
    ["500 kcal", "500 Calories", "500,000 small cal", "2,092 kJ", "Energy amount; not a guaranteed weight-loss outcome"],
    ["3,500 kcal", "3,500 Calories", "3,500,000 small cal", "14,644 kJ", "Traditional approximation per pound of body fat"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "Is kcal the same as calories?",
      answer:
        "On US food labels, yes: one dietary Calorie (capital C) equals 1 kilocalorie (kcal). In physics, one small calorie (cal, lowercase c) is one-thousandth of a kcal.",
    },
    {
      question: "What is kcal vs cal?",
      answer:
        "A kcal is 1,000 small calories (cal). Nutrition labels commonly call a kcal a Calorie, while scientific writing may use cal for the smaller unit.",
    },
    {
      question: "What does “kcal en cal” or “kcal of cal” mean on international labels?",
      answer:
        "These phrases may appear in multilingual labeling or searches referring to kilocalories and calories. Check the unit printed beside the number: on nutrition labels, kcal is the larger food-energy unit, while a small cal is 1/1,000 of a kcal.",
    },
    {
      question: "What is the official calorie definition?",
      answer:
        "The calorie is a non-SI unit of energy; the joule is the SI unit. The thermochemical calorie is defined as exactly 4.184 joules, so 1 kcal equals 4.184 kJ. Older water-heating descriptions are approximate because heat capacity depends on conditions.",
    },
    {
      question: "How many calories are in a pound of fat?",
      answer:
        "A traditional estimate is about 3,500 kcal per pound of body fat, but this is not an exact biological rule. Body weight and energy expenditure adapt over time, so a particular calorie deficit does not guarantee a precise amount or rate of fat loss.",
    },
    {
      question: "How many calories are in 1 gram of fat?",
      answer:
        "A common nutrition estimate is about 9 kcal (9 dietary Calories) per gram of fat. Actual food-label energy values use approved calculation methods and can vary with food composition.",
    },
    {
      question: "How many calories are in 1 gram of carbohydrates?",
      answer:
        "A general estimate is about 4 kcal per gram of carbohydrate. The energy listed for a particular food can vary, including due to fiber and the method used to calculate its label value.",
    },
    {
      question: "What is the difference between carbs and calories?",
      answer:
        "Carbohydrates are a nutrient found in foods; calories are units used to describe energy. Carbohydrate is one source of dietary energy, commonly estimated at 4 kcal per gram.",
    },
    {
      question: "What is the difference between active vs total calories?",
      answer:
        "Active calories estimate energy used for movement above rest, while total calories generally include resting energy as well. Definitions vary by tracker and time period; daily total energy expenditure also includes other movement and digestion.",
    },
    {
      question: "How do you convert 259 kcal to calories or kcal to calories?",
      answer:
        "259 kcal equals 259 dietary Calories, 259,000 small calories (cal), or about 1,083.7 kJ. To convert kcal to small cal, multiply by 1,000; to convert kcal to dietary Calories, the number stays the same.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Calories vs kcal Explainer" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Scientific Energy Conversion Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Calories vs kcal: What&apos;s the Difference?
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

      <section className="prose prose-slate dark:prose-invert max-w-none my-8">
        <h2>How to Use the Calories Converter</h2>
        <ol>
          <li>Under <strong>Enter Energy Value</strong>, type a number such as 259.</li>
          <li>Under <strong>Input Unit</strong>, choose <strong>kcal (Calories)</strong>, <strong>Small cal</strong>, or <strong>Kilojoules (kJ)</strong>.</li>
          <li>Read the automatically updated results in <strong>Converted Energy Units</strong>: dietary Calories, kilojoules, and scientific small calories.</li>
        </ol>
        <p>The displayed results are rounded to whole units. For example, 259 kcal is 259,000 small cal and approximately 1,084 kJ.</p>
      </section>

      <AdSlot format="horizontal" slotId="kcal-top" />

      {/* Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none my-12 space-y-4">
        <h2>The Core Rule: 1 kcal = 1 Food Calorie = 1,000 Small Calories</h2>
        <p>
          On US nutrition labels, <strong>Calories</strong> is the dietary unit and is equivalent to <strong>kilocalories (kcal)</strong>. In scientific contexts, a lowercase <strong>calorie (cal)</strong> usually means a much smaller unit: 1 kcal = 1,000 cal. Capitalization helps distinguish a dietary Calorie (Cal) from a small calorie (cal), though everyday usage is not always consistent.
        </p>

        <p>
          The word “calorie” can therefore refer to different-sized units depending on context. Look for kcal, cal, or kJ next to the number rather than relying on the word alone.
        </p>

        <h2>Calories vs kcal vs cal: What&apos;s the Difference?</h2>
        <p>These names describe related energy units, but they are not all the same size.</p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[34rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">Comparison of small calories, kilocalories, and dietary Calories</caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                <th scope="col" className="px-4 py-3 font-semibold">Symbol</th>
                <th scope="col" className="px-4 py-3 font-semibold">Relationship</th>
                <th scope="col" className="px-4 py-3 font-semibold">Common use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr><th scope="row" className="px-4 py-3 font-semibold">Small calorie</th><td className="px-4 py-3">cal</td><td className="px-4 py-3">1/1,000 of a kcal</td><td className="px-4 py-3">Scientific energy measurements</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Kilocalorie</th><td className="px-4 py-3">kcal</td><td className="px-4 py-3">1,000 small cal</td><td className="px-4 py-3">Nutrition and metabolism</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Dietary Calorie</th><td className="px-4 py-3">Cal (often written Calories)</td><td className="px-4 py-3">1 Cal = 1 kcal</td><td className="px-4 py-3">US food labels</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Calories vs Kilojoules (kJ)</h2>
        <p>
          A joule is the SI unit of energy, and a kilojoule (kJ) is 1,000 joules. Some countries use kJ, or show both kJ and kcal, on food labels. The conversion is <strong>1 kcal = 4.184 kJ</strong>. For example, 100 kcal × 4.184 = 418.4 kJ.
        </p>

        <h2>How to Convert Calories to kcal and kJ</h2>
        <ul>
          <li><strong>kcal to small calories:</strong> kcal × 1,000. Example: 2.5 kcal = 2,500 cal.</li>
          <li><strong>Small calories to kcal:</strong> cal ÷ 1,000. Example: 2,500 cal = 2.5 kcal.</li>
          <li><strong>kcal to kJ:</strong> kcal × 4.184. Example: 259 kcal × 4.184 = 1,083.656 kJ, or about 1,083.7 kJ.</li>
          <li><strong>kJ to kcal:</strong> kJ ÷ 4.184. Example: 418.4 kJ ÷ 4.184 = 100 kcal.</li>
        </ul>

        <h2>Grams to Calories: Macronutrient Energy Density</h2>
        <p>
          Common nutrition estimates use about 4 kcal per gram of protein, 4 kcal per gram of carbohydrate, 9 kcal per gram of fat, and 7 kcal per gram of alcohol. These are general factors, not exact values for every food; food composition, fiber, and labeling methods can affect reported energy.
        </p>
        <ul>
          <li><strong>Protein:</strong> about 4 kcal/g.</li>
          <li><strong>Carbohydrates:</strong> about 4 kcal/g.</li>
          <li><strong>Fat:</strong> about 9 kcal/g.</li>
          <li><strong>Alcohol:</strong> about 7 kcal/g.</li>
        </ul>

        <h2>How to Read Calories on US Food Labels</h2>
        <p>
          The Nutrition Facts label lists a serving size, servings per container, and Calories per serving. To estimate the Calories in the whole package, multiply Calories per serving by the number of servings you eat. The % Daily Value (%DV) indicates how much a nutrient in one serving contributes to a general reference based on a 2,000-Calorie daily diet; it is not a personalized target.
        </p>
        <p>
          <strong>Example:</strong> A package lists 2 servings, with 150 Calories per serving. Eating the entire package provides 2 × 150 = <strong>300 Calories</strong>. If the label shows 8% DV for a nutrient per serving, that percentage applies to one serving, not automatically to the whole package.
        </p>
        <p>
          The FDA explains serving sizes and %DV in its{" "}
          <a href="https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label" target="_blank" rel="noopener noreferrer">
            Nutrition Facts label guide
          </a>
          .
        </p>

        <h2>Active Calories vs Resting Calories vs Total Calories</h2>
        <ul>
          <li><strong>Active calories</strong> estimate energy used for movement or exercise above resting needs; device definitions vary.</li>
          <li><strong>Resting calories</strong> estimate energy used to support basic functions while at rest.</li>
          <li><strong>Total daily energy expenditure (TDEE)</strong> is the energy used across a day, including resting needs, movement, and digestion.</li>
        </ul>
        <p>
          A fitness tracker may combine active and resting energy for a session or day, but its labels and methods differ by brand. These are estimates, not exact measurements of energy use.
        </p>

        <h2>Common Calorie Conversion Mistakes</h2>
        <ul>
          <li>Assuming a small cal and a dietary Calorie are the same size: 1 kcal = 1,000 small cal.</li>
          <li>Missing the uppercase C: a dietary Calorie (Cal) equals 1 kcal; a small calorie is written cal.</li>
          <li>Mixing kcal with kJ: multiply kcal by 4.184 to get kJ, or divide kJ by 4.184 to get kcal.</li>
          <li>Ignoring serving size: label Calories are usually stated per serving, not necessarily per package.</li>
        </ul>

        <h2>Calories in Common Foods</h2>
        <p>Values below are approximate; actual amounts vary by brand, portion, and preparation.</p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[28rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">Approximate Calories in common food servings</caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Food</th>
                <th scope="col" className="px-4 py-3 font-semibold">Typical serving</th>
                <th scope="col" className="px-4 py-3 font-semibold">Approx. Calories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr><th scope="row" className="px-4 py-3 font-semibold">Banana</th><td className="px-4 py-3">1 medium</td><td className="px-4 py-3">~105</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Egg</th><td className="px-4 py-3">1 large</td><td className="px-4 py-3">~70</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Milk</th><td className="px-4 py-3">1 cup (whole)</td><td className="px-4 py-3">~150</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Bread</th><td className="px-4 py-3">1 slice</td><td className="px-4 py-3">~80</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Cooked rice</th><td className="px-4 py-3">1 cup</td><td className="px-4 py-3">~205</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Oats</th><td className="px-4 py-3">½ cup dry</td><td className="px-4 py-3">~150</td></tr>
            </tbody>
          </table>
        </div>

        <DataTable
          title="Energy Conversion Equivalents Reference Table"
          caption="Comparative energy values across international scientific and dietary units."
          headers={["Dietary Energy", "Kilocalories (kcal)", "Small Calories (cal)", "Kilojoules (kJ)", "Common Context"]}
          rows={comparisonRows}
          highlightColumnIndex={1}
        />

        <p>
          The 3,500 kcal-per-pound figure is a traditional approximation, not an exact biological rule. A daily 500 kcal deficit does not guarantee exactly one pound of weight loss each week; actual changes vary over time.
        </p>

        <p>
          To estimate energy used during a workout, visit our homepage{" "}
          <Link href="/" className="font-bold text-emerald-600 underline">
            walking calorie calculator
          </Link>.
        </p>

        <h2>Scientific and Labeling References</h2>
        <ul>
            <li><a href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8" target="_blank" rel="noopener noreferrer">NIST conversion factors for non-SI units</a> — calorie and joule conversion references.</li>
            <li><a href="https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label" target="_blank" rel="noopener noreferrer">U.S. FDA: How to Understand and Use the Nutrition Facts Label</a> — serving size, Calories, and %DV.</li>
            <li><a href="https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/section-101.9" target="_blank" rel="noopener noreferrer">21 CFR § 101.9</a> — U.S. nutrition labeling requirements and energy calculation methods.</li>
            <li><a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer">USDA FoodData Central</a> — nutrient data for generic foods and common serving sizes.</li>
        </ul>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/calories-vs-kcal" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
