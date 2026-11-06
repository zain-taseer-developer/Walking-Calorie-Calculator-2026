import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BMICalculatorTool } from "@/components/calculator/BMICalculatorTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "BMI Calculator: Body Mass Index & FFMI Calculator for Men & Women",
  description:
    "Free Body Mass Index (BMI) and FFMI calculator for men and women. Check healthy height and weight charts, obesity classifications, and lean muscle mass.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/bmi-calculator`,
  },
};

const femaleBmiChart = [
  { height: "4'11\" (150 cm)", under: "< 91 lbs", healthy: "91 - 123 lbs", over: "124 - 147 lbs", obese: "148+ lbs" },
  { height: "5'1\" (155 cm)", under: "< 98 lbs", healthy: "98 - 131 lbs", over: "132 - 157 lbs", obese: "158+ lbs" },
  { height: "5'3\" (160 cm)", under: "< 104 lbs", healthy: "104 - 140 lbs", over: "141 - 168 lbs", obese: "169+ lbs (5 3 150 lbs female is slightly overweight)" },
  { height: "5'4\" (163 cm)", under: "< 108 lbs", healthy: "108 - 145 lbs (normal weight for 5'4 female)", over: "146 - 174 lbs", obese: "175+ lbs" },
  { height: "5'5\" (165 cm)", under: "< 111 lbs", healthy: "111 - 150 lbs (5 5 weight for female)", over: "151 - 179 lbs", obese: "180+ lbs" },
  { height: "5'6\" (168 cm)", under: "< 115 lbs", healthy: "115 - 154 lbs (when height is 5 6; 150 lbs 5 6 female is healthy; 180 5'6 / 180 5 6 is overweight)", over: "155 - 185 lbs", obese: "186+ lbs" },
  { height: "5'7\" (170 cm)", under: "< 118 lbs", healthy: "118 - 159 lbs (ideal weight for 5 7 female / correct weight for 5'7 female)", over: "160 - 190 lbs", obese: "191+ lbs" },
  { height: "5'9\" (175 cm)", under: "< 125 lbs", healthy: "125 - 169 lbs", over: "170 - 202 lbs", obese: "203+ lbs" },
];

const maleBmiChart = [
  { height: "5'6\" (168 cm)", under: "< 115 lbs", healthy: "115 - 154 lbs", over: "155 - 185 lbs", obese: "186+ lbs" },
  { height: "5'8\" (173 cm)", under: "< 122 lbs", healthy: "122 - 164 lbs", over: "165 - 196 lbs", obese: "197+ lbs" },
  { height: "5'10\" (178 cm)", under: "< 129 lbs", healthy: "129 - 173 lbs (average weight for 5'10 male / body mass index for 5 10 male)", over: "174 - 208 lbs", obese: "209+ lbs" },
  { height: "6'0\" (183 cm)", under: "< 136 lbs", healthy: "136 - 184 lbs", over: "185 - 220 lbs", obese: "221+ lbs" },
  { height: "6'2\" (188 cm)", under: "< 144 lbs", healthy: "144 - 194 lbs", over: "195 - 232 lbs", obese: "233+ lbs" },
];

const faqs = [
  {
    question: "What is a BMI (whats bmi / whats a bmi / bmi 是 什麼)?",
    answer:
      "Body mass index (BMI) is a standardized screening metric established by the World Health Organization (WHO) and Belgian mathematician Adolphe Quetelet. By dividing body weight in kilograms by height in meters squared (kg/m²), BMI estimates whether an adult's overall mass falls into underweight (< 18.5), normal healthy range (18.5 - 24.9), overweight (25.0 - 29.9), or obese (≥ 30.0) categories.",
  },
  {
    question: "What is the correct weight for 5'7 female (appropriate weight for 5' 7 female / ideal weight for 5 7 female)?",
    answer:
      "For a 5 7 height (170 cm), a healthy normal BMI range (18.5 to 24.9) corresponds to a body weight between 118 lbs (53.5 kg) and 159 lbs (72.1 kg). Most clinical guides consider 130 to 148 lbs the ideal weight for 5 7 female individuals depending on bone frame structure.",
  },
  {
    question: "What is the average weight for 5'10 male (body mass index for 5 10 male)?",
    answer:
      "The normal healthy weight range for a 5'10\" male (178 cm) is 129 to 173 lbs (BMI 18.5 to 24.9). The statistical average weight for 5'10 male adults in the United States is approximately 195 to 200 lbs, which places the average man into the overweight BMI classification.",
  },
  {
    question: "What is a good BMI (what should my bmi be)?",
    answer:
      "For general adult health and longevity, a good BMI is generally between 18.5 and 24.9. For example, a bmi 22 female represents the statistical center of optimal cardiovascular health. A bmi 25 marks the exact boundary between normal weight and overweight.",
  },
  {
    question: "What is an FFMI calculator (ffmi calc / ffmi) and why is it better for athletic bodies?",
    answer:
      "The Fat-Free Mass Index (FFMI) evaluates muscular development independent of height and fat mass. While a muscular weightlifter might be misclassified as overweight by a standard determining bmi calculator, an FFMI calculator subtracts body fat percentage to reveal true lean skeletal muscle mass. Natural drug-free athletic ceilings typically peak around 24 to 25 FFMI.",
  },
  {
    question: "Is 200 pounds overweight?",
    answer:
      "Whether 200 pounds is overweight depends entirely on your height and body composition. For someone 5'8\" or 5'9\", 200 pounds yields a BMI over 29.5 (borderline obesity). However, for an athlete standing 6'4\" or taller, 200 pounds falls squarely into a normal healthy weight category.",
  },
  {
    question: "How much should a 13 year old weigh?",
    answer:
      "Adult BMI formulas do not apply directly to teenagers because children grow at rapid, variable rates. Pediatricians use the CDC pediatric bmi calculator and percentile growth charts (evaluating age and sex specific percentiles). A healthy 13-year-old typically weighs between 75 and 145 lbs depending on their growth spurt timing and biological sex.",
  },
  {
    question: "What is the average u.s. female weight?",
    answer:
      "According to National Center for Health Statistics (CDC) surveys, the average U.S. female weight is approximately 170.8 lbs (77.5 kg) at an average height of 5'3.5\" (161 cm), yielding an average BMI of roughly 29.6.",
  },
  {
    question: "How do you calculate Asian BMI?",
    answer:
      "Because individuals of Asian descent tend to carry a higher percentage of visceral adipose tissue at lower body weights, the WHO Western Pacific Region recommends lower thresholds: Normal BMI is 18.5 to 22.9, Overweight is 23.0 to 27.4, and Obesity begins at 27.5. You can toggle our tool above to calculate Asian BMI automatically.",
  },
];

export default function BMICalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "BMI Calculator", href: "/bmi-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          BMI Calculator: Body Mass Index & FFMI Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Find your exact Body Mass Index (BMI), healthy weight range, and Fat-Free Mass Index (FFMI). Built for both men and women with WHO, CDC, and Asian metabolic guidelines.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <BMICalculatorTool />
      </div>

      <AdSlot slotId="bmi-top" format="horizontal" />

      {/* Main Editorial Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>BMI Definition: What Is Body Mass Index?</h2>
        <p>
          If you are searching for <strong>bmi definition</strong>, <strong>what is a bmi</strong>, <strong>whats bmi</strong>, or <strong>whats a bmi</strong> (or in Chinese: <strong>bmi 是 什麼</strong>), Body Mass Index is a universal screening ratio used by healthcare systems worldwide. Many people look up <strong>how to measure bmi</strong> or seek to <strong>measure bmi online</strong> accurately without registration.
        </p>
        <p>
          Whether typed as <strong>bmi bmi bmi</strong>, <strong>determining bmi calculator</strong>, <strong>weight calculator bmi</strong>, or common typos like <strong>bmi calculatir</strong> or <strong>bm1</strong>, the underlying mathematical formula divides body weight by height squared:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Metric Formula: BMI = Weight (kg) ÷ [Height (m)]²
          <br />
          Imperial Formula: BMI = [Weight (lbs) ÷ Height (inches)²] × 703
        </div>

        <h2>BMI Index Chart for Females & Women BMI Calculator</h2>
        <p>
          When women seek a specialized <strong>women bmi calculator</strong>, <strong>calculate bmi women</strong>, or <strong>bmi measurement female</strong>, body composition changes across reproductive life stages, bone density, and pregnancy play vital roles. The <strong>body mass index table for female</strong> and <strong>senior female weight chart</strong> below provides target healthy boundaries across heights.
        </p>

        {/* Female Reference Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Female Height</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Underweight (&lt;18.5)</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">Normal Range (18.5 - 24.9)</th>
                <th className="px-4 py-3 font-semibold text-amber-700 dark:text-amber-400">Overweight (25 - 29.9)</th>
                <th className="px-4 py-3 font-semibold text-rose-700 dark:text-rose-400">Obesity (&ge;30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {femaleBmiChart.map((row) => (
                <tr key={row.height} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{row.height}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.under}</td>
                  <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">{row.healthy}</td>
                  <td className="px-4 py-3 text-amber-600 dark:text-amber-400">{row.over}</td>
                  <td className="px-4 py-3 text-rose-600 dark:text-rose-400">{row.obese}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>BMI Calculator for Men & Weight Chart for Men</h2>
        <p>
          For male fitness enthusiasts looking up a <strong>bmi calculator for men</strong>, <strong>bmi chart for men</strong>, or <strong>weight chart for men</strong>, men naturally possess higher bone density and skeletal muscle mass. The table below outlines standard weight expectations for men by height:
        </p>

        {/* Male Reference Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Male Height</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Underweight</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">Healthy Weight (BMI 18.5 - 24.9)</th>
                <th className="px-4 py-3 font-semibold text-amber-700 dark:text-amber-400">Overweight (BMI 25 - 29.9)</th>
                <th className="px-4 py-3 font-semibold text-rose-700 dark:text-rose-400">Obese (BMI &ge; 30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {maleBmiChart.map((row) => (
                <tr key={row.height} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{row.height}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.under}</td>
                  <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">{row.healthy}</td>
                  <td className="px-4 py-3 text-amber-600 dark:text-amber-400">{row.over}</td>
                  <td className="px-4 py-3 text-rose-600 dark:text-rose-400">{row.obese}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Obesity Chart & Clinical Classifications</h2>
        <p>
          In clinical medicine, the official <strong>obesity chart</strong> categorizes elevated body weight into three progressive stages to assess cardiometabolic risk:
        </p>
        <ul>
          <li><strong>Class 1 Obesity (BMI 30.0 – 34.9):</strong> Moderate elevation in health risk. Increased likelihood of developing type 2 diabetes and hypertension.</li>
          <li><strong>Class 2 Obesity (BMI 35.0 – 39.9):</strong> Severe risk. Daily joint wear on hips and knees accelerates.</li>
          <li><strong>Class 3 Obesity (BMI &ge; 40.0):</strong> Very severe / morbid obesity. Medical intervention and low-impact walking routines are strongly indicated.</li>
        </ul>

        <h2>Understanding Body Mass Intake & Energy Balance</h2>
        <p>
          Searches for <strong>body mass intake</strong> refer to the relationship between the caloric energy you consume and your metabolic maintenance burn. Maintaining a healthy body mass index requires aligning energy intake with energy expenditure. Walking 7,500 to 10,000 steps daily contributes 300 to 500 kcal of lean expenditure that keeps your BMI stable over decades.
        </p>
        <p>
          If you are wondering <strong>how heavy</strong> you should be or are searching for an objective <strong>human weight scale</strong> or taking an informal <strong>am i fat quiz</strong>, our calculator provides grounded clinical science free of aesthetic commercial bias or <strong>perfect body me</strong> marketing claims. You can also explore age-graded guidelines using our <strong>bmi converter with age</strong> and the official <strong>cdc pediatric bmi calculator</strong> standards.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="bmi-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold">Use Your BMI to Calculate Walking Calorie Burn</h3>
        <p className="mt-2 text-emerald-100">
          Now that you know your BMI and weight in kilograms and pounds, discover exactly how many calories you burn walking at different speeds and inclines.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Calculate Walking Calories Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
