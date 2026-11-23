
"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { Sparkles, Zap } from "lucide-react";

export default function CaloriesVsKcalPage() {
  const [val, setVal] = useState("259");
  const [unit, setUnit] = useState<"kcal" | "cal" | "kj">("kcal");

  const parsedValue = val.trim() === "" ? null : Number(val);

  const isValid =
    parsedValue !== null &&
    Number.isFinite(parsedValue) &&
    parsedValue >= 0;

  const inputValue = isValid ? parsedValue : 0;

  // Normalize the selected input to kilocalories.
  const kcal =
    unit === "kcal"
      ? inputValue
      : unit === "cal"
        ? inputValue / 1000
        : inputValue / 4.184;

  const dietaryCal = kcal;
  const smallCal = kcal * 1000;
  const kilojoules = kcal * 4.184;

  const formatEnergy = (value: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);

  const displayEnergy = (value: number, suffix: string) =>
    isValid ? `${formatEnergy(value)} ${suffix}` : "—";

  const comparisonRows = [
    [
      "1 Dietary Calorie (Cal)",
      "1 kcal",
      "1,000 small cal",
      "4.184 kJ",
      "US nutrition labels",
    ],
    [
      "100 kcal",
      "100 Calories",
      "100,000 small cal",
      "418.4 kJ",
      "Energy conversion example",
    ],
    [
      "250 kcal",
      "250 Calories",
      "250,000 small cal",
      "1,046 kJ",
      "Energy conversion example",
    ],
    [
      "259 kcal",
      "259 Calories",
      "259,000 small cal",
      "1,083.66 kJ",
      "Converter example",
    ],
    [
      "500 kcal",
      "500 Calories",
      "500,000 small cal",
      "2,092 kJ",
      "Energy conversion example",
    ],
  ];

  const faqs: FAQItem[] = [
    {
      question: "Is kcal the same as calories?",
      answer:
        "On US food labels, one dietary Calorie (capital C) equals one kilocalorie (kcal). In scientific contexts, a small calorie (cal, lowercase c) is one-thousandth of a kilocalorie.",
    },
    {
      question: "What is the difference between kcal and cal?",
      answer:
        "One kilocalorie (kcal) equals 1,000 small calories (cal). Nutrition labels commonly use Calories to mean kilocalories, while scientific measurements may use the smaller calorie unit.",
    },
    {
      question: "What does kcal mean on food labels?",
      answer:
        "Kcal stands for kilocalorie, a unit of energy. On US nutrition labels, Calories and kilocalories represent the same amount of food energy: 1 kcal equals 1 dietary Calorie.",
    },
    {
      question: "How do you convert kcal to kJ?",
      answer:
        "Multiply kilocalories by 4.184 to get kilojoules. For example, 100 kcal equals 418.4 kJ. To convert kJ back to kcal, divide by 4.184.",
    },
    {
      question: "How do you convert 259 kcal to calories?",
      answer:
        "259 kcal equals 259 dietary Calories (Cal), 259,000 small calories (cal), or approximately 1,083.66 kilojoules (kJ).",
    },
    {
      question: "What is the official calorie definition?",
      answer:
        "The calorie is a non-SI unit of energy, while the joule is the SI unit. The thermochemical calorie is defined as exactly 4.184 joules. Therefore, one kilocalorie equals 4,184 joules or 4.184 kilojoules.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Kcal vs Calories" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Scientific Energy Conversion Guide</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Kcal vs Calories: What&apos;s the Difference?
        </h1>

        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Understand the difference between kcal, food Calories, and small
          calories. Convert energy values to kilocalories, calories, and
          kilojoules with this free converter.
        </p>
      </div>

      {/* Interactive Energy Converter */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="energy-input"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Enter Energy Value
              </label>

              <input
                id="energy-input"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                aria-describedby="energy-input-help"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xl font-bold"
              />

              <p
                id="energy-input-help"
                className="mt-1 text-xs text-slate-500 dark:text-slate-400"
              >
                Enter a non-negative number.
              </p>
            </div>

            <div>
              <label
                id="energy-unit-label"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1"
              >
                Input Unit
              </label>

              <div
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                role="group"
                aria-labelledby="energy-unit-label"
              >
                <button
                  type="button"
                  aria-pressed={unit === "kcal"}
                  onClick={() => setUnit("kcal")}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border ${
                    unit === "kcal"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Food Calories (kcal)
                </button>

                <button
                  type="button"
                  aria-pressed={unit === "cal"}
                  onClick={() => setUnit("cal")}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border ${
                    unit === "cal"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Small cal
                </button>

                <button
                  type="button"
                  aria-pressed={unit === "kj"}
                  onClick={() => setUnit("kj")}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border ${
                    unit === "kj"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Kilojoules (kJ)
                </button>
              </div>
            </div>

            {!isValid && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                Enter a valid number greater than or equal to zero.
              </p>
            )}
          </div>

          {/* Conversion Results */}
          <div
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-3 text-center"
            aria-live="polite"
          >
            <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider block">
              Conversion Results
            </span>

            <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">
                  Food Calories (Cal)
                </span>
                <span className="text-xl font-bold font-mono">
                  {displayEnergy(dietaryCal, "Cal")}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">
                  Kilocalories (kcal)
                </span>
                <span className="text-xl font-bold font-mono">
                  {displayEnergy(kcal, "kcal")}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">
                  Kilojoules
                </span>
                <span className="text-xl font-bold font-mono">
                  {displayEnergy(kilojoules, "kJ")}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span className="text-xs text-teal-200 block">
                  Small Calories
                </span>
                <span className="text-xl font-bold font-mono">
                  {displayEnergy(smallCal, "cal")}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-teal-100">
              1 kcal = 1 dietary Calorie = 1,000 small cal = 4.184 kJ.
            </p>

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
          <li>
            Enter a value in the <strong>Energy Value</strong> field.
          </li>
          <li>
            Select <strong>Food Calories (kcal)</strong>,{" "}
            <strong>Small cal</strong>, or <strong>Kilojoules (kJ)</strong> as
            your input unit.
          </li>
          <li>
            Read the converted values for dietary Calories, kilocalories,
            kilojoules, and small calories.
          </li>
        </ol>

        <p>
          Results are rounded to a maximum of two decimal places. For example,
          entering 259 kcal gives 259 dietary Calories, 259,000 small
          calories, and 1,083.66 kJ.
        </p>
      </section>

      <AdSlot format="horizontal" slotId="kcal-top" />

      <div className="prose prose-slate dark:prose-invert max-w-none my-12 space-y-4">
        <h2>The Core Rule: 1 kcal = 1 Food Calorie</h2>

        <p>
          On US nutrition labels, <strong>Calories</strong> refers to dietary
          energy and is equivalent to <strong>kilocalories (kcal)</strong>.
          Therefore, 100 kcal is the same amount of energy as 100 food
          Calories.
        </p>

        <p>
          A scientific small calorie, written with a lowercase{" "}
          <strong>cal</strong>, is different. One kilocalorie contains 1,000
          small calories. This distinction is important when reading
          scientific measurements, nutrition information, and energy
          conversions.
        </p>

        <h2>Calories vs kcal vs cal: What&apos;s the Difference?</h2>

        <p>
          These terms describe units of energy, but their sizes and common uses
          differ.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[34rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">
              Comparison of small calories, kilocalories, and dietary Calories
            </caption>

            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Symbol
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Relationship
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Common Use
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Small calorie
                </th>
                <td className="px-4 py-3">cal</td>
                <td className="px-4 py-3">1/1,000 of a kcal</td>
                <td className="px-4 py-3">Scientific energy measurements</td>
              </tr>

              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Kilocalorie
                </th>
                <td className="px-4 py-3">kcal</td>
                <td className="px-4 py-3">1,000 small cal</td>
                <td className="px-4 py-3">Nutrition and metabolism</td>
              </tr>

              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Dietary Calorie
                </th>
                <td className="px-4 py-3">Cal</td>
                <td className="px-4 py-3">1 Cal = 1 kcal</td>
                <td className="px-4 py-3">US food labels</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Calories vs Kilojoules (kJ)</h2>

        <p>
          The joule is the International System of Units (SI) unit of energy.
          A kilojoule (kJ) equals 1,000 joules. Some countries use kilojoules
          on food labels, while others display both kJ and kcal.
        </p>

        <p>
          The standard conversion is <strong>1 kcal = 4.184 kJ</strong>.
          For example, 100 kcal equals 418.4 kJ. To convert kilojoules back
          to kilocalories, divide the kJ value by 4.184.
        </p>

        <h2>How to Convert Calories to kcal and kJ</h2>

        <p>
          Use these formulas when converting between dietary Calories,
          scientific small calories, kilocalories, and kilojoules.
        </p>

        <ul>
          <li>
            <strong>kcal to small calories:</strong> Multiply kcal by 1,000.
            Example: 2.5 kcal = 2,500 cal.
          </li>
          <li>
            <strong>Small calories to kcal:</strong> Divide cal by 1,000.
            Example: 2,500 cal = 2.5 kcal.
          </li>
          <li>
            <strong>kcal to kJ:</strong> Multiply kcal by 4.184.
            Example: 259 kcal = 1,083.656 kJ.
          </li>
          <li>
            <strong>kJ to kcal:</strong> Divide kJ by 4.184.
            Example: 418.4 kJ = 100 kcal.
          </li>
          <li>
            <strong>Dietary Calories to kcal:</strong> The numerical value
            stays the same. Example: 150 Calories = 150 kcal.
          </li>
        </ul>

        <h2>Grams to Calories: Macronutrient Energy Density</h2>

        <p>
          Food energy is commonly estimated using the energy provided by
          macronutrients. These general factors help explain how grams of
          protein, carbohydrates, fat, and alcohol contribute to the
          Calories listed on food labels.
        </p>

        <ul>
          <li>
            <strong>Protein:</strong> About 4 kcal per gram.
          </li>
          <li>
            <strong>Carbohydrates:</strong> About 4 kcal per gram.
          </li>
          <li>
            <strong>Fat:</strong> About 9 kcal per gram.
          </li>
          <li>
            <strong>Alcohol:</strong> About 7 kcal per gram.
          </li>
        </ul>

        <p>
          These are general energy factors rather than exact values for every
          food. Fiber content, food composition, and labeling methods can
          affect the energy value reported on a nutrition label.
        </p>

        <h2>How to Read Calories on US Food Labels</h2>

        <p>
          The Nutrition Facts label lists serving size, servings per
          container, and Calories per serving. The listed Calories generally
          refer to one serving, not automatically to the entire package.
        </p>

        <p>
          <strong>Example:</strong> A package contains 2 servings and lists
          150 Calories per serving. Eating the entire package provides
          2 × 150 = <strong>300 Calories</strong>.
        </p>

        <p>
          The % Daily Value (%DV) indicates how much a nutrient in one serving
          contributes to a general reference based on a 2,000-Calorie daily
          diet. It is a general guide, not a personalized daily target.
        </p>

        <p>
          For more information, see the{" "}
          <a
            href="https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label"
            target="_blank"
            rel="noopener noreferrer"
          >
            FDA Nutrition Facts label guide
          </a>
          .
        </p>

        <h2>Active Calories vs Resting Calories vs Total Calories</h2>

        <p>
          Fitness trackers and health apps may divide energy expenditure into
          different categories:
        </p>

        <ul>
          <li>
            <strong>Active calories:</strong> Energy attributed to movement
            and physical activity above resting needs.
          </li>
          <li>
            <strong>Resting calories:</strong> Energy used to support basic
            body functions while at rest.
          </li>
          <li>
            <strong>Total daily energy expenditure (TDEE):</strong> Estimated
            energy used throughout the day, including resting needs,
            movement, and digestion.
          </li>
        </ul>

        <p>
          Definitions and calculation methods can vary between devices.
          These values are estimates, not exact measurements. To understand
          daily energy needs in more detail, use our{" "}
          <Link
            href="/maintenance-calorie-calculator"
            className="font-bold text-emerald-600 underline"
          >
            Maintenance Calorie &amp; TDEE Calculator
          </Link>
          .
        </p>

        <h2>Common Calorie Conversion Mistakes</h2>

        <ul>
          <li>
            <strong>Confusing cal with kcal:</strong> One kcal equals 1,000
            small calories, not one small calorie.
          </li>
          <li>
            <strong>Missing the uppercase C:</strong> A dietary Calorie (Cal)
            equals one kcal, while a scientific small calorie is written cal.
          </li>
          <li>
            <strong>Mixing kcal with kJ:</strong> Multiply kcal by 4.184 to
            get kJ, or divide kJ by 4.184 to get kcal.
          </li>
          <li>
            <strong>Ignoring serving size:</strong> Food-label Calories are
            generally listed per serving, not necessarily per package.
          </li>
        </ul>

        <DataTable
          title="Energy Conversion Equivalents Reference Table"
          caption="Common energy values expressed in dietary Calories, kilocalories, small calories, and kilojoules."
          headers={[
            "Energy Value",
            "Kilocalories (kcal)",
            "Small Calories (cal)",
            "Kilojoules (kJ)",
          ]}
          rows={[
            ["1 Dietary Calorie", "1 kcal", "1,000 cal", "4.184 kJ"],
            ["100 Calories", "100 kcal", "100,000 cal", "418.4 kJ"],
            ["250 Calories", "250 kcal", "250,000 cal", "1,046 kJ"],
            ["259 Calories", "259 kcal", "259,000 cal", "1,083.66 kJ"],
            ["500 Calories", "500 kcal", "500,000 cal", "2,092 kJ"],
            ["1,000 Calories", "1,000 kcal", "1,000,000 cal", "4,184 kJ"],
          ]}
          highlightColumnIndex={1}
        />

        <h2>Scientific and Labeling References</h2>

        <ul>
          <li>
            <a
              href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8"
              target="_blank"
              rel="noopener noreferrer"
            >
              NIST conversion factors for non-SI units
            </a>{" "}
            — reference information for converting energy units.
          </li>

          <li>
            <a
              href="https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. FDA: How to Understand and Use the Nutrition Facts Label
            </a>{" "}
            — serving sizes, Calories, and %DV.
          </li>

          <li>
            <a
              href="https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/section-101.9"
              target="_blank"
              rel="noopener noreferrer"
            >
              21 CFR § 101.9
            </a>{" "}
            — US nutrition labeling requirements and energy calculations.
          </li>
        </ul>

        <p>
          To estimate energy used during a walk, visit our{" "}
          <Link
            href="/"
            className="font-bold text-emerald-600 underline"
          >
            Walking Calorie Calculator
          </Link>
          . For step-based activity estimates, try the{" "}
          <Link
            href="/steps-to-calories-calculator"
            className="font-bold text-emerald-600 underline"
          >
            Steps to Calories Calculator
          </Link>
          .
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/calories-vs-kcal" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
