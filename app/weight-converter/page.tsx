import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { WeightConverterTool } from "@/components/calculator/WeightConverterTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Weight Converter: Pounds to Kilograms (lbs to kg) & kg to lbs",
  description:
    "Convert pounds to kilograms (lbs to kg) and kg to lbs with our free live weight converter. Includes reference charts for 128 lbs, 152 lbs, 179 lbs, 183 lbs to kg.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/weight-converter`,
  },
};

const weightTable = [
  { lbs: "128 lbs to kg", lbVal: 128, kg: "58.06 kg", note: "Healthy weight benchmark for 5'1 - 5'5 individuals" },
  { lbs: "144 lbs to kg", lbVal: 144, kg: "65.32 kg", note: "Common fitness target; 10 stone 4 lbs" },
  { lbs: "149 lbs kg", lbVal: 149, kg: "67.59 kg", note: "Standard mid-range adult body mass" },
  { lbs: "152 pounds kg", lbVal: 152, kg: "68.95 kg", note: "Also searched as 152 lb to kg, 152 pounds in kg, 152 pounds to kg" },
  { lbs: "153 lbs to kg", lbVal: 153, kg: "69.40 kg", note: "Also searched as 153 pounds to kg" },
  { lbs: "162 lbs to kg", lbVal: 162, kg: "73.48 kg", note: "Popular adult reference weight" },
  { lbs: "163 lbs to kg", lbVal: 163, kg: "73.94 kg", note: "Also searched as 163 pounds in kg" },
  { lbs: "164 pounds kg", lbVal: 164, kg: "74.39 kg", note: "Standard recreational walker baseline" },
  { lbs: "169 lbs to kg", lbVal: 169, kg: "76.66 kg", note: "Also searched as 169 pounds in kg" },
  { lbs: "173 lbs to kg", lbVal: 173, kg: "78.47 kg", note: "Also searched as 173 pounds kg" },
  { lbs: "174 lbs in kg", lbVal: 174, kg: "78.93 kg", note: "78.93 kilograms adult mass" },
  { lbs: "178 lb to kg", lbVal: 178, kg: "80.74 kg", note: "80.74 kilograms" },
  { lbs: "179 lbs to kg", lbVal: 179, kg: "81.19 kg", note: "Also searched as 179 pounds kg and 179 pounds to kg" },
  { lbs: "183 lbs to kg", lbVal: 183, kg: "83.01 kg", note: "Also searched as 183 pounds in kg, 183 pounds to kg, and 183 pounds kg" },
  { lbs: "193 lbs to kg", lbVal: 193, kg: "87.54 kg", note: "Also searched as 193 pounds in kg" },
  { lbs: "194 pounds in kg", lbVal: 194, kg: "88.00 kg", note: "88.00 kilograms" },
  { lbs: "202 lbs to kg", lbVal: 202, kg: "91.63 kg", note: "91.63 kilograms" },
  { lbs: "227 lbs to kg", lbVal: 227, kg: "102.97 kg", note: "102.97 kilograms" },
  { lbs: "232 lbs to kg", lbVal: 232, kg: "105.23 kg", note: "105.23 kilograms" },
];

const faqs = [
  {
    question: "How do you convert pounds to kilograms (lbs to kg)?",
    answer:
      "To convert pounds to kilograms, multiply your weight in pounds by 0.45359237 (or divide by 2.20462). For quick everyday calculations, dividing by 2.2 gives an accurate approximation within 0.2%. For example, 152 pounds kg equals 68.95 kg.",
  },
  {
    question: "How much is 152 pounds in kg (152 lb to kg)?",
    answer:
      "152 pounds in kg is exactly 68.946 kg (commonly rounded to 68.95 kg). Whether written as 152 pounds to kg, 152 lb to kg, or 152 pounds kg, the calculation is 152 × 0.45359237 = 68.95 kilograms.",
  },
  {
    question: "How much is 128 lbs to kg?",
    answer:
      "128 lbs to kg equals 58.06 kilograms (128 × 0.45359237 = 58.0598 kg). A 128-pound individual walking at 3.5 mph burns approximately 250 calories per hour.",
  },
  {
    question: "How much is 162 lbs to kg and 163 lbs to kg?",
    answer:
      "162 lbs to kg is 73.48 kg, and 163 lbs to kg (163 pounds in kg) is 73.94 kg. Both weights fall right around 73.5 to 74 kilograms in international metric standards.",
  },
  {
    question: "What is 179 lbs to kg and 183 lbs to kg?",
    answer:
      "179 lbs to kg (179 pounds kg or 179 pounds to kg) equals 81.19 kg. 183 lbs to kg (searched as 183 pounds in kg, 183 pounds to kg, and 183 pounds kg) equals 83.01 kg.",
  },
  {
    question: "What is 18.5 kg lbs (18.5 kilograms in pounds)?",
    answer:
      "18.5 kg lbs equals 40.79 pounds (18.5 × 2.20462 = 40.785 lbs). 18.5 kg is also a common metric BMI threshold number in clinical nutrition.",
  },
  {
    question: "Why does body weight in kilograms matter for walking calorie calculations?",
    answer:
      "The scientific Compendium of Physical Activities and ACSM metabolic equations define energy expenditure as: kcal = MET × weight in kg × duration in hours. Because physiological formulas are metric, converting your weight from lbs to kg ensures exact calorie calculation without rounding errors.",
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
          Fast, two-way instant conversion between pounds (lbs) and kilograms (kg). Built for fitness tracking, metabolic equations, and accurate walking calorie estimates.
        </p>
      </header>

      {/* Converter Tool */}
      <div className="mb-8">
        <WeightConverterTool />
      </div>

      <AdSlot slotId="weight-converter-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Pounds to Kilograms Conversion Formula</h2>
        <p>
          The international avoirdupois pound is officially defined as exactly <strong>0.45359237 kilograms</strong>. Conversely, one kilogram equals approximately <strong>2.20462262 pounds</strong>.
        </p>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pounds to Kilograms Formula
            </span>
            <div className="mt-2 font-mono text-base font-bold text-slate-800 dark:text-slate-100">
              Weight in kg = Weight in lbs × 0.45359237
            </div>
            <p className="mt-1 text-xs text-slate-500">Quick approximation: divide pounds by 2.2</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Kilograms to Pounds Formula
            </span>
            <div className="mt-2 font-mono text-base font-bold text-slate-800 dark:text-slate-100">
              Weight in lbs = Weight in kg × 2.20462262
            </div>
            <p className="mt-1 text-xs text-slate-500">Quick approximation: multiply kilograms by 2.2</p>
          </div>
        </div>

        <h2>Popular Pounds to Kilograms Reference Table</h2>
        <p>
          The table below provides exact conversions for frequently searched adult body weights, including queries like <strong>152 pounds kg</strong>, <strong>128 lbs to kg</strong>, <strong>162 lbs to kg</strong>, and <strong>183 lbs to kg</strong>.
        </p>

        {/* Reference Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Search Query</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Pounds (lbs)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Exact Kilograms (kg)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Notes & Variations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {weightTable.map((row) => (
                <tr key={row.lbs} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.lbs}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.lbVal} lbs</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{row.kg}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Why Accurate Weight Matters in Physical Activity Science</h2>
        <p>
          When you use our <Link href="/" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Walking Calorie Calculator</Link>, body mass is the single most influential variable determining total energy expenditure. In physics and exercise physiology, walking requires your skeletal muscles to generate force against gravity to propel your center of mass forward with each stride.
        </p>
        <p>
          A person weighing <strong>183 lbs to kg (83.01 kg)</strong> expends approximately 43% more energy per mile than someone weighing <strong>128 lbs to kg (58.06 kg)</strong> at the exact same walking speed. Whether you track your metrics in imperial pounds or metric kilograms, our tools convert units seamlessly so you never face rounding discrepancies.
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
        <h3 className="text-2xl font-bold">Calculate Calories Burned for Your Weight</h3>
        <p className="mt-2 text-emerald-100">
          Now that you know your weight in kilograms and pounds, calculate your exact energy burn across different walking speeds, step counts, and inclines.
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

