import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MaintenanceCalorieTool } from "@/components/calculator/MaintenanceCalorieTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: { absolute: "Maintenance Calorie Calculator & TDEE Macro Calculator" },
  description:
    "Free maintenance calories calculator and daily calorie intake estimator. Calculate BMR, TDEE, calorie deficit for weight loss, body recomposition, and macros.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/maintenance-calorie-calculator`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/maintenance-calorie-calculator`,
  },
};

const activityLevels = [
  { level: "Sedentary", multiplier: "1.20", description: "Mostly seated work and little planned exercise; daily steps vary." },
  { level: "Lightly Active", multiplier: "1.375", description: "Some regular daily walking or light exercise about 1–3 days/week." },
  { level: "Moderately Active", multiplier: "1.55", description: "Regular movement and moderate exercise about 3–5 days/week." },
  { level: "Very Active", multiplier: "1.725", description: "A physically demanding routine, frequent hard workouts, or both." },
  { level: "Extra Active", multiplier: "1.90", description: "Very high daily activity, such as a physical job plus frequent training." },
];

const faqs = [
  {
    question: "How many calories should I eat per day?",
    answer:
      "There is no single daily calorie requirement for all women or men. Needs vary with age, body size, body composition, activity, health, and goals. Use the calculator as a starting estimate, then compare it with weight trends and adjust gradually if appropriate.",
  },
  {
    question: "How do I figure out maintenance calories and calculate BMR?",
    answer:
      "BMR can be estimated from age, sex, height, and weight using an equation such as Mifflin–St Jeor. A TDEE estimate then accounts for activity. Because both the equation and activity factor are estimates, use the result as a starting point rather than a measured value.",
  },
  {
    question: "How many calories are in a gram of protein?",
    answer:
      "A common nutrition estimate is about 4 kcal per gram of protein. Food energy values can vary with composition and calculation methods; this conversion is useful for estimating macros.",
  },
  {
    question: "What are macros, macro counting, and how do I calculate macros?",
    answer:
      "Macros are protein, fat, and carbohydrates. Macro counting tracks their amounts, often in grams. To estimate grams from calories, use roughly 4 kcal/g for protein and carbohydrate and 9 kcal/g for fat. Appropriate targets depend on individual needs and preferences.",
  },
  {
    question: "Why might I be exercising but gaining weight?",
    answer:
      "Scale weight can rise temporarily from fluid shifts, stored glycogen, food in digestion, or changes in routine. Longer-term changes may also reflect energy intake and body composition. Look at consistent weekly averages over several weeks rather than one reading.",
  },
  {
    question: "What is a free water deficit?",
    answer:
      "Free water deficit is a clinical estimate used by healthcare professionals in specific situations involving elevated blood sodium. It is unrelated to calorie maintenance and requires clinical context; this page is not a hydration or medical calculator.",
  },
  {
    question: "How do body recomposition and bulking calculators work?",
    answer:
      "These tools estimate calorie targets above or below maintenance to support different goals. This calculator offers a Body Recomposition and Lean Bulking option, but the result is only an estimate; training, nutrition, recovery, and individual response also matter.",
  },
  {
    question: "What about keto, net-carb, or breastfeeding calorie calculators?",
    answer:
      "Those tools address different questions: keto or net-carb tools estimate carbohydrate intake, while breastfeeding tools address needs during lactation. This calculator does not account for a ketogenic diet, pregnancy, or breastfeeding; consult a qualified healthcare professional for individualized guidance.",
  },
  {
    question: "How does this compare to caloriecalculator.net and commercial diet apps?",
    answer:
      "Different calculators and diet apps may use different equations, activity categories, and features, so their estimates can differ. This page provides a Mifflin–St Jeor-based starting estimate with activity and goal options; it is not a direct comparison or substitute for individualized professional advice.",
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
          Maintenance Calorie Calculator & Daily Intake Estimator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Estimate your maintenance calories, Total Daily Energy Expenditure (TDEE), and daily macronutrients. Use the results as a starting point and adjust based on your goals and real-world trends.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <MaintenanceCalorieTool />
      </div>

      <section className="prose prose-slate mb-8 max-w-none dark:prose-invert">
        <h2>How to Use the Maintenance Calorie Calculator</h2>
        <ol>
          <li><strong>Unit Selection:</strong> Choose Imperial (lbs / in) or Metric (kg / cm).</li>
          <li><strong>Sex &amp; Age:</strong> Select Female or Male and enter your age.</li>
          <li><strong>Height and Weight:</strong> Enter your height using the selected units and your current body weight.</li>
          <li><strong>Activity Level:</strong> Choose the option that best represents both your usual daily movement and planned exercise. In the activity choices, step counts refer to total steps per day, while ranges such as 1–3 or 3–5 days refer to exercise sessions per week. Treat the categories as approximate examples.</li>
          <li><strong>Your Primary Fitness Goal:</strong> Choose Maintain Weight (no adjustment), Mild Deficit (−350 kcal), Standard Deficit (−500 kcal), Body Recomposition (−200 kcal), or Lean Bulking (+300 kcal). These are the calculator&apos;s estimated adjustments to maintenance, not guaranteed results or individualized prescriptions.</li>
          <li><strong>Review the results:</strong> Daily Target Calories is the selected goal estimate. Maintenance TDEE is estimated daily energy use, and BMR is estimated resting energy use. Recommended Daily Macros shows estimated grams of Protein, Fats, and Carbs with their approximate energy values.</li>
        </ol>
      </section>

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
          The calculator uses a TDEE multiplier as an estimate. Daily steps are one indicator of movement, while exercise sessions, job demands, and other routine activity also contribute. The multiplier is not a direct measurement of your energy use.
        </p>
        <p>
          In the activity choices, a daily step count and a number of exercise days describe different things: steps refer to your total everyday movement, while exercise days refer to planned workouts during a week. Consider both along with work and household activity when choosing a category.
        </p>

        {/* Activity Multiplier Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Activity Level</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">TDEE Multiplier</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Typical Daily Movement and Exercise</th>
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

        <h2>BMR vs TDEE: What&apos;s the Difference?</h2>
        <p>
          <strong>Basal Metabolic Rate (BMR)</strong> estimates the energy your body uses at rest to support essential functions. <strong>Total Daily Energy Expenditure (TDEE)</strong> estimates energy used across the day, including resting needs plus movement and exercise. TDEE is therefore generally higher than BMR, though actual values vary.
        </p>
        <p>
          For example, if an estimated BMR is 1,500 kcal/day and a selected activity multiplier is 1.4, estimated TDEE is 1,500 × 1.4 = <strong>2,100 kcal/day</strong>. The extra 600 kcal represents estimated activity-related expenditure in this simplified model, not a precisely measured amount.
        </p>

        <h2>Understanding the Macronutrient Split</h2>
        <p>
          This calculator estimates protein, fat, and carbohydrate amounts from your body weight and calorie target:
        </p>
        <ul>
          <li><strong>Protein:</strong> Essential for tissue repair and preserving lean muscle during a caloric deficit. 1 gram = 4 calories.</li>
          <li><strong>Dietary Fat:</strong> Critical for hormone synthesis and cell membrane integrity. 1 gram = 9 calories.</li>
          <li><strong>Carbohydrates:</strong> Primary fuel for athletic performance and glycogen replenishment. 1 gram = 4 calories.</li>
        </ul>

        <h2>How to Calculate Your Daily Macronutrients</h2>
        <p>
          The calculator estimates protein at 2 grams per kilogram of body weight, assigns about 25% of its calorie target to fat, and uses the remaining calories for carbohydrates. These are the calculator&apos;s chosen assumptions, not universal prescriptions. Macro targets may differ based on goals, health, food preferences, and professional guidance.
        </p>
        <p>
          For calorie-to-gram estimates, use approximately <strong>4 kcal per gram of protein</strong>, <strong>9 kcal per gram of fat</strong>, and <strong>4 kcal per gram of carbohydrate</strong>.
        </p>
        <p>
          <strong>Example:</strong> For a 2,000 kcal target and a 75 kg person, the calculator&apos;s protein estimate is 75 × 2 = 150 g, or about 600 kcal. If 25% of the target (500 kcal) comes from fat, that is about 500 ÷ 9 = 56 g. The remaining 900 kcal provides about 900 ÷ 4 = 225 g of carbohydrates. Rounding means displayed grams and calories may not sum perfectly.
        </p>

        <h2>Calorie Deficit vs Calorie Surplus</h2>
        <p>
          These terms compare calorie intake with estimated maintenance needs. They describe energy balance, not a guaranteed rate or type of body change.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[34rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">Comparison of calorie deficit, maintenance, surplus, and body recomposition</caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Approach</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Compared with estimated maintenance</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">General purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr><th scope="row" className="px-4 py-3 font-semibold">Deficit</th><td className="px-4 py-3">Intake below maintenance</td><td className="px-4 py-3">May support weight loss over time</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Maintenance</th><td className="px-4 py-3">Intake near maintenance</td><td className="px-4 py-3">May support weight stability over time</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Surplus</th><td className="px-4 py-3">Intake above maintenance</td><td className="px-4 py-3">May support weight gain, including with resistance training</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Recomposition</th><td className="px-4 py-3">Often near maintenance or a modest deficit</td><td className="px-4 py-3">Aims to change body composition while scale weight may change slowly</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The calculator&apos;s calorie targets are estimates, and real weight changes vary with intake, activity, health, and individual response. Its goal options do not guarantee weight loss, muscle gain, or recomposition.
        </p>

        <h2>How to Adjust Calories Based on Weight Changes</h2>
        <p>
          Body weight naturally changes from day to day with hydration, sodium and carbohydrate intake, digestion, and other factors. If weighing is appropriate for you, use consistent conditions and compare weekly averages instead of reacting to one reading.
        </p>
        <p>
          Track the trend for about 2–4 weeks while keeping your routine reasonably consistent. If the trend is not moving toward your goal and the approach is manageable, consider a small, gradual adjustment to intake or activity. Avoid making aggressive changes in response to short-term fluctuations; consult a qualified professional if you need individualized advice.
        </p>

        <h2>How to Track Daily Calories and Macros</h2>
        <ul>
          <li>Record foods and drinks consistently, including snacks and cooking additions.</li>
          <li>Read the nutrition label and check whether values apply per serving or per package.</li>
          <li>Measure or estimate portions consistently; serving sizes can differ from the amount eaten.</li>
          <li>Track protein, carbohydrates, and fats in grams if macro tracking is useful for your goals.</li>
          <li>Focus on repeatable habits and longer-term patterns rather than perfect precision at every meal.</li>
        </ul>

        <h2>How Accurate Are Maintenance Calorie Calculators?</h2>
        <p>
          Mifflin–St Jeor is an equation used to estimate resting energy needs from a person&apos;s age, sex, height, and weight; it does not measure metabolism directly. Activity multipliers are broad estimates, and actual energy expenditure varies with body composition, non-exercise movement, exercise, and individual differences.
        </p>
        <p>
          Treat the calculator result as an initial estimate. Comparing it with consistent intake records and weight trends over several weeks can help you judge whether it is a useful starting point. For related context, see our{" "}
          <Link href="/walking-for-weight-loss" className="font-semibold text-emerald-700 underline dark:text-emerald-400">Walking for Weight Loss Guide</Link>,{" "}
          <Link href="/bmi-calculator" className="font-semibold text-emerald-700 underline dark:text-emerald-400">BMI &amp; FFMI Calculator</Link>, and{" "}
          <Link href="/calories-vs-kcal" className="font-semibold text-emerald-700 underline dark:text-emerald-400">Calories vs kcal explainer</Link>.
        </p>

        <h2>Using Calorie Estimates for Weight Management</h2>
        <p>
          Weight management involves more than a calculator result. Daily weight can fluctuate, and extreme diets or fasting are not required to use this tool. If you are exercising but seeing a short-term increase, water, glycogen, food volume, and other factors can contribute; look at trends rather than assuming a single cause. Walking can be one part of a routine—estimate walking energy with the{" "}
          <Link href="/" className="font-semibold text-emerald-700 underline dark:text-emerald-400">Walking Calorie Calculator</Link>.
        </p>

        <h2>Scientific References</h2>
        <ul>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer">Mifflin et al., “A new predictive equation for resting energy expenditure in healthy individuals,” 1990</a> — describes the equation used to estimate resting energy expenditure.</li>
          <li><a href="https://www.niddk.nih.gov/bwp" target="_blank" rel="noopener noreferrer">NIDDK Body Weight Planner</a> — illustrates how energy needs and body weight change over time.</li>
          <li><a href="https://nap.nationalacademies.org/catalog/10490/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids" target="_blank" rel="noopener noreferrer">National Academies Dietary Reference Intakes</a> — reference material on energy and macronutrients.</li>
        </ul>
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
          Walking can be one way to add movement to your routine. Use our calculator to estimate energy used while walking.
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
