import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MaintenanceCalorieTool } from "@/components/calculator/MaintenanceCalorieTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Maintenance Calories Calculator & TDEE Macro Calculator",
  description:
    "Free maintenance calories calculator and daily calorie intake estimator. Calculate BMR, TDEE, calorie deficit for weight loss, body recomposition, and macros.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/maintenance-calorie-calculator`,
  },
};

const activityLevels = [
  { level: "Sedentary", multiplier: "1.20", description: "Desk job, minimal intentional movement, < 4,000 steps/day" },
  { level: "Lightly Active", multiplier: "1.375", description: "Walking 5,000 to 7,500 steps/day, light exercise 1–3 days/week" },
  { level: "Moderately Active", multiplier: "1.55", description: "Walking 8,000 to 11,000 steps/day, moderate workouts 3–5 days/week" },
  { level: "Very Active", multiplier: "1.725", description: "Heavy daily training, 12,000+ steps/day, or physical labor job" },
  { level: "Extra Active", multiplier: "1.90", description: "Endurance athletes training twice daily, competitive sports" },
];

const faqs = [
  {
    question: "How many calories i should eat per day (how many calories should i have / how many calories a day)?",
    answer:
      "To know how many calories i should eat per day or calculate how many calories do i eat to lose weight, calculate your Total Daily Energy Expenditure (TDEE). The average calories per day needed by an adult female is roughly 1,800 to 2,200 kcal, and 2,400 to 2,800 kcal for an adult male. When asking 'how many calories should i eat daily?' or 'how many calories to consume to lose weight?', a moderate calorie deficit of 350 to 500 kcal below maintenance produces steady, healthy fat loss.",
  },
  {
    question: "How to figure out maintenance calories (and how to calculate bmr)?",
    answer:
      "To figure out maintenance calories, first calculate BMR using the Mifflin-St Jeor formula: For men, 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5; for women, 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161. Then multiply your BMR by your physical activity factor (1.2 to 1.9) using our maintenance calories calculator.",
  },
  {
    question: "How many calories per gram of protein (each gram of protein is how many calories)?",
    answer:
      "Each gram of protein is how many calories? Protein contains exactly 4 calories per gram (4 kcal/g). Carbohydrates also yield 4 kcal/g, while dietary fats contain 9 kcal/g. Using a fat intake calculator and macro calculators ensures your daily calorie intake aligns with your fitness goals.",
  },
  {
    question: "What is macros, what is macro counting, and how to calculate macros?",
    answer:
      "When people ask 'what is macros?' or 'what is macro counting?', it refers to macronutrients: proteins, fats, and carbohydrates. Calculating macros (counting macros) involves allocating your target daily calories across these three pillars. For body recomposition or weight loss, aim for 1.6 to 2.2 grams of protein per kilogram of body weight, 25% of calories from healthy fats, and the remaining calories from complex carbohydrates.",
  },
  {
    question: "Why am I exercising but gaining weight (gaining weight while working out / gaining weight after working out)?",
    answer:
      "If you notice gaining weight while working out or gaining weight after working out, you are not accumulating sudden body fat. When beginning a new fitness or walking program, micro-tears in muscle fibers trigger temporary inflammation and glycogen-bound water retention (each gram of stored glycogen holds 3 to 4 grams of water). This temporary water weight resolves naturally after 2 to 4 weeks.",
  },
  {
    question: "What is free water deficit (free water deficit calculator / calculate free water deficit)?",
    answer:
      "In clinical nephrology and intensive care, free water deficit measures dehydration levels in hypernatremic patients: Deficit = Total Body Water × [(Serum Na / 140) - 1]. For everyday walkers and runners, using a daily water calculator to drink 2.5 to 3.5 liters of fluid maintains healthy hydration.",
  },
  {
    question: "How does body recomposition calculator and bulking calculator work?",
    answer:
      "A body recomp calculator (body recomposition calculator) targets simultaneous fat loss and muscle gain by setting calories at a small deficit (-200 kcal) paired with high protein (2.0g/kg) and resistance training. A bulking calculator prescribes a controlled caloric surplus (+300 to +500 kcal) to maximize skeletal muscle hypertrophy while minimizing fat gain.",
  },
  {
    question: "What about keto diet calculator, net carb calculator, and breastfeeding calorie calculator?",
    answer:
      "A keto diet calculator and net carb calculator limit carbohydrates to under 20-50g per day to induce nutritional ketosis. For nursing mothers, a breastfeeding calorie calculator (calories for breastfeeding calculator) adds 400 to 500 kcal/day to support milk production.",
  },
  {
    question: "How does this compare to caloriecalculator.net and commercial diet apps?",
    answer:
      "Popular web platforms like caloriecalculator.net provide basic BMR estimations. Our tool integrates physical activity science, walking step counts, and precision nutrition calculator principles without paywalls, helping users who wish to cancel Weight Watchers or find a free, honest calorie friend and fitness planner.",
  },
];

export default function MaintenanceCalorieCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Maintenance Calorie Calculator", href: "/maintenance-calorie-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Maintenance Calories Calculator & Daily Intake Estimator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Find your exact maintenance calories, Total Daily Energy Expenditure (TDEE), and macronutrient distribution. Calculate your personal calorie deficit for healthy, sustainable weight loss.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <MaintenanceCalorieTool />
      </div>

      <AdSlot slotId="maintenance-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>How to Figure Out Maintenance Calories & TDEE</h2>
        <p>
          Your <strong>maintenance calories calculator</strong> baseline represents the total caloric energy needed to maintain your current body weight without losing or gaining fat. This is mathematically defined as your <strong>Total Daily Energy Expenditure (TDEE)</strong>:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          TDEE = Basal Metabolic Rate (BMR) × Physical Activity Multiplier
        </div>
        <p>
          Whether searching for a <strong>tdee weight loss calculator</strong>, a <strong>macronutrient calculator</strong>, or Spanish tools like <strong>calculadora de macros</strong> and <strong>calculadora fast</strong>, understanding this relationship empowers you to direct your metabolism.
        </p>

        {/* Activity Multiplier Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Activity Level</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">TDEE Multiplier</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Daily Steps & Lifestyle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {activityLevels.map((row) => (
                <tr key={row.level} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{row.level}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.multiplier}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Precision Nutrition Macro Calculator & Macronutrient Splits</h2>
        <p>
          Using a <strong>precision nutrition macro calculator</strong> or <strong>macros calculator for weight loss</strong> breaks down your target energy into functional fuel:
        </p>
        <ul>
          <li><strong>Protein:</strong> Essential for tissue repair and preserving lean muscle during a caloric deficit. 1 gram = 4 calories.</li>
          <li><strong>Dietary Fat:</strong> Critical for hormone synthesis and cell membrane integrity. 1 gram = 9 calories.</li>
          <li><strong>Carbohydrates:</strong> Primary fuel for athletic performance and glycogen replenishment. 1 gram = 4 calories.</li>
        </ul>

        <h2>Weight Loss, Recomposition & Fasting Metrics</h2>
        <p>
          Users tracking long-term progress often use tools like a <strong>weight loss percentage calculator</strong> or consider protocols such as a <strong>water fast weight loss calculator</strong>. Extreme deficits or fasting often cause rapid initial drops on the scale that are primarily water weight rather than pure adipose tissue loss. In fact, people often wonder why they are <strong>exercising but gaining weight</strong> during the first few weeks—intense walking and training increases blood volume and causes intramuscular glycogen storage, masking true fat loss.
        </p>
        <p>
          For dining out, resources like an <strong>in n out calorie calculator</strong> or <strong>in n out nutrition calculator</strong> help estimate fast-food choices. You can also utilize utility tools like a <strong>recipe converter</strong>, <strong>recipe divider</strong>, or <strong>food cost calculator</strong> (to calculate est cost of meal prep), or evaluate efficiency benchmarks like <strong>mpg fuel economy gov</strong> or calcute formulas using our calculators. While a <strong>macroeconomics calculator</strong> analyzes financial indicators, our biological calculators focus entirely on human metabolic health.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="maintenance-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold">Incorporate Walking Into Your Daily TDEE</h3>
        <p className="mt-2 text-emerald-100">
          Walking is the most sustainable way to increase your daily energy expenditure. Use our flagship calculator to find your exact caloric burn.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Launch Walking Calorie Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
