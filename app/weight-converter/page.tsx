import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { WeightConverterTool } from "@/components/calculator/WeightConverterTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Weight Converter: lbs to kg & kg to lbs for Fitness",
  description:
    "Convert lbs to kg or kg to lbs with our fitness weight converter. Get accurate body weight measurements for walking calorie calculations and fitness tracking.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/weight-converter`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/weight-converter`,
  },
};

const commonWeightsLbs = [100, 120, 128, 140, 150, 152, 160, 162, 163, 179, 180, 183, 200, 220];

const faqs = [
  {
    question: "How do you convert pounds to kilograms (lbs to kg)?",
    answer:
      "Multiply the number of pounds by 0.45359237. For example, 150 lbs × 0.45359237 = 68.04 kg, rounded to two decimal places.",
  },
  {
    question: "How much is 152 pounds in kg?",
    answer:
      "152 lbs is 68.946 kg, or 68.95 kg rounded to two decimal places.",
  },
  {
    question: "How much is 128 lbs to kg?",
    answer:
      "128 lbs × 0.45359237 = 58.0598 kg, which rounds to 58.06 kg.",
  },
  {
    question: "How much are 162 lbs and 163 lbs in kg?",
    answer:
      "162 lbs is 73.48 kg, and 163 lbs is 73.94 kg, rounded to two decimal places.",
  },
  {
    question: "What are 179 lbs and 183 lbs in kg?",
    answer:
      "179 lbs is 81.19 kg, and 183 lbs is 83.01 kg, rounded to two decimal places.",
  },
  {
    question: "What is 18.5 kg in lbs?",
    answer:
      "18.5 kg × 2.20462262 = 40.7855 lbs, or 40.79 lbs rounded to two decimal places.",
  },
  {
    question: "Why does body weight in kilograms matter for walking calorie calculations?",
    answer:
      "Some MET-based formulas use kilograms as the body-mass input. Converting pounds with the correct factor keeps units consistent, but calorie estimates also depend on activity intensity, duration, and individual differences.",
  },
  {
    question: "How many kilograms are in one pound?",
    answer:
      "One pound is exactly 0.45359237 kilograms. For everyday use, it is commonly rounded to 0.4536 kg.",
  },
  {
    question: "How many pounds are in one kilogram?",
    answer:
      "One kilogram is approximately 2.20462262 pounds, usually rounded to 2.2046 lbs or 2.20 lbs for a quick estimate.",
  },
  {
    question: "How do I convert lbs to kg without a calculator?",
    answer:
      "For a quick estimate, divide pounds by 2.2. For example, 150 ÷ 2.2 is about 68.18 kg; the exact conversion is about 68.04 kg.",
  },
  {
    question: "Is 2.2 a correct conversion factor?",
    answer:
      "It is a convenient approximation, not the exact factor. One kilogram is 2.20462262 pounds, so using 2.2 introduces a small rounding difference.",
  },
  {
    question: "Should I use lbs or kg in a fitness calculator?",
    answer:
      "Use the unit that matches the calculator field. If it accepts both, enter the unit you know; a correctly designed calculator converts it internally as needed.",
  },
  {
    question: "How many decimal places should I use when converting weight?",
    answer:
      "Two decimal places are sufficient for most everyday fitness tracking. Keep more precision only when a specific calculation or device requires it.",
  },
];

export default function WeightConverterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Weight Converter", href: "/weight-converter" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Weight Converter: Pounds to Kilograms (lbs to kg)
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Convert pounds to kilograms or kilograms to pounds, with quick reference values for fitness tracking and everyday use.
        </p>
      </header>

      {/* Converter Tool */}
      <div className="mb-8">
        <WeightConverterTool />
      </div>

      <section className="prose prose-slate mb-10 max-w-none dark:prose-invert">
        <h2>How to Use the Weight Converter</h2>
        <p>
          Enter a value in either field and the other unit updates automatically, rounded to two decimal places. You can edit either side of the converter.
        </p>
        <ul>
          <li><strong>Pounds to kilograms:</strong> Type a nonnegative value in the Pounds (lbs) field. Its corresponding value appears in Kilograms (kg).</li>
          <li><strong>Kilograms to pounds:</strong> Type in the Kilograms (kg) field to update the Pounds (lbs) value.</li>
          <li><strong>Current Conversion:</strong> The result card summarizes the current values in both units and shows the conversion factors.</li>
          <li><strong>Frequently searched weights:</strong> Select a weight preset to fill the pounds field and update its kilogram conversion.</li>
        </ul>
        <p>
          The converter supports decimal inputs. It does not add or require a separate convert button.
        </p>
      </section>

      <AdSlot slotId="weight-converter-top" format="horizontal" />

      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Pounds vs Kilograms: What&apos;s the Difference?</h2>
        <p>
          A pound (lb) is a customary unit of body weight commonly used in the United States. A kilogram (kg) is the standard metric unit of mass and is used in most countries. People often use “weight” for both in everyday conversation.
        </p>
        <p>
          Fitness and health calculators may accept either unit to match the way people record body weight. Some exercise-science equations use kilograms directly, so converting correctly helps keep the units consistent in the calculation.
        </p>

        <h2>How to Convert Pounds to Kilograms Manually</h2>
        <p>
          Multiply the weight in pounds by the exact pound-to-kilogram conversion factor:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Weight in kg = Weight in lbs × 0.45359237
        </div>
        <ul>
          <li><strong>150 lbs:</strong> 150 × 0.45359237 = 68.0388555 kg ≈ <strong>68.04 kg</strong></li>
          <li><strong>160 lbs:</strong> 160 × 0.45359237 = 72.5747792 kg ≈ <strong>72.57 kg</strong></li>
          <li><strong>180 lbs:</strong> 180 × 0.45359237 = 81.6466266 kg ≈ <strong>81.65 kg</strong></li>
          <li><strong>200 lbs:</strong> 200 × 0.45359237 = 90.718474 kg ≈ <strong>90.72 kg</strong></li>
        </ul>

        <h2>How to Convert Kilograms to Pounds Manually</h2>
        <p>
          Multiply the weight in kilograms by the pounds-per-kilogram conversion factor:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Weight in lbs = Weight in kg × 2.20462262
        </div>
        <ul>
          <li><strong>50 kg:</strong> 50 × 2.20462262 = 110.231131 lbs ≈ <strong>110.23 lbs</strong></li>
          <li><strong>60 kg:</strong> 60 × 2.20462262 = 132.2773572 lbs ≈ <strong>132.28 lbs</strong></li>
          <li><strong>70 kg:</strong> 70 × 2.20462262 = 154.3235834 lbs ≈ <strong>154.32 lbs</strong></li>
          <li><strong>80 kg:</strong> 80 × 2.20462262 = 176.3698096 lbs ≈ <strong>176.37 lbs</strong></li>
          <li><strong>90 kg:</strong> 90 × 2.20462262 = 198.4160358 lbs ≈ <strong>198.42 lbs</strong></li>
        </ul>

        <h2>Common Weight Conversions</h2>
        <p>
          These values use the exact pound-to-kilogram factor and are rounded to two decimal places. The table also retains frequently used examples from the existing converter reference.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Pounds (lbs)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Kilograms (kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {commonWeightsLbs.map((lbs) => (
                <tr key={lbs} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{lbs} lbs</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{(lbs * 0.45359237).toFixed(2)} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Understanding Decimal Places and Rounding</h2>
        <p>
          Converted weights often include decimals because pounds and kilograms use different-sized units and do not convert to whole numbers for most values. The exact factor, 1 lb = 0.45359237 kg, avoids the small difference created by a shortcut.
        </p>
        <p>
          Dividing pounds by 2.2 is a convenient approximation because one kilogram is about 2.2 pounds. For precise conversion, multiply by 0.45359237 (or divide by 2.20462262). Rounding to two decimal places is generally enough for everyday fitness tracking; use more precision only when a specific application requires it.
        </p>

        <h2>Why Accurate Weight Matters in Physical Activity Science</h2>
        <p>
          A common simplified MET estimate is gross calories = MET × body weight in kg × duration in hours. Body mass is one input in this calculation, and some activity-science formulas are written with kilograms, so an accurate conversion keeps the units consistent. Weight is not the only factor: estimated expenditure also depends on activity intensity and duration, and real energy use varies among individuals.
        </p>
        <p>
          Use your converted weight with our <Link href="/" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Walking Calorie Calculator</Link> or the <Link href="/calories-burned-calculator" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Calories Burned Calculator</Link>. You can also explore the <Link href="/maintenance-calorie-calculator" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Maintenance Calorie &amp; TDEE Calculator</Link>, <Link href="/bmi-calculator" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">BMI &amp; FFMI Calculator</Link>, and <Link href="/walking-calories-burned-chart" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Walking Calories Burned Chart</Link>.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="weight-converter-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Calculate Calories Burned for Your Weight</h2>
        <p className="mt-2 text-emerald-100">
          Use your weight in kilograms or pounds to estimate energy expenditure for different walking speeds, step counts, and inclines.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Open Walking Calorie Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}

