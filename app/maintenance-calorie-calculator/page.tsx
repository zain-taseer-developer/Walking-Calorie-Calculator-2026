
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MaintenanceCalorieTool } from "@/components/calculator/MaintenanceCalorieTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";
import { constructSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Maintenance Calorie Calculator & TDEE Macro Calculator",
  },
  description:
    "Free maintenance calorie calculator and daily intake estimator. Calculate BMR, TDEE, calorie targets, and daily macros using your body measurements and activity level.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/maintenance-calorie-calculator`,
  },
  ...constructSocialMetadata({
    title: "Maintenance Calorie Calculator & TDEE Macro Calculator",
    description:
      "Estimate your maintenance calories, BMR, TDEE, and daily macronutrients with this free calculator.",
    url: `${siteConfig.CANONICAL_URL}/maintenance-calorie-calculator`,
  }),
};

const activityLevels = [
  {
    level: "Sedentary",
    multiplier: "1.20",
    description:
      "Mostly seated work and little planned exercise; daily steps vary.",
  },
  {
    level: "Lightly Active",
    multiplier: "1.375",
    description:
      "Some regular daily walking or light exercise about 1–3 days/week.",
  },
  {
    level: "Moderately Active",
    multiplier: "1.55",
    description:
      "Regular movement and moderate exercise about 3–5 days/week.",
  },
  {
    level: "Very Active",
    multiplier: "1.725",
    description:
      "A physically demanding routine, frequent hard workouts, or both.",
  },
  {
    level: "Extra Active",
    multiplier: "1.90",
    description:
      "Very high daily activity, such as a physical job plus frequent training.",
  },
];

const faqs = [
  {
    question: "How many calories should I eat per day?",
    answer:
      "There is no single daily calorie requirement for everyone. Your needs depend on age, sex, height, weight, activity, health, and goals. Use the calculator's result as an initial estimate and compare it with your longer-term weight trends.",
  },
  {
    question: "How do I figure out maintenance calories and calculate BMR?",
    answer:
      "BMR can be estimated from age, sex, height, and weight using an equation such as Mifflin–St Jeor. To estimate maintenance calories, multiply BMR by an activity factor to calculate Total Daily Energy Expenditure (TDEE). Both values are estimates rather than direct measurements.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR estimates the energy your body uses at rest to support essential functions. TDEE estimates your total daily energy use, including resting needs, everyday movement, exercise, and other activity. TDEE is generally higher than BMR.",
  },
  {
    question: "How many calories are in a gram of protein?",
    answer:
      "Protein provides approximately 4 kcal per gram. Carbohydrates also provide about 4 kcal per gram, while fat provides about 9 kcal per gram. These values are commonly used to estimate the energy provided by macronutrients.",
  },
  {
    question: "What are macros and how do I calculate them?",
    answer:
      "Macros are protein, fat, and carbohydrates. To estimate their grams from calories, divide protein and carbohydrate calories by 4 and fat calories by 9. Your appropriate macro targets depend on your body weight, goals, activity, and individual needs.",
  },
  {
    question: "Why might I be exercising but gaining weight?",
    answer:
      "Scale weight can temporarily increase because of fluid shifts, stored glycogen, digestion, and changes in routine. Longer-term changes can also reflect energy intake and body composition. Compare consistent weekly averages over several weeks instead of relying on a single reading.",
  },
  {
    question: "How accurate are maintenance calorie calculators?",
    answer:
      "Maintenance calorie calculators use equations and activity multipliers to estimate energy needs. Actual expenditure varies between individuals, so treat the result as a starting point. Comparing it with consistent food records and weight trends over several weeks can help you assess the estimate.",
  },
  {
    question: "What is the difference between a calorie deficit and a calorie surplus?",
    answer:
      "A calorie deficit means eating below estimated maintenance calories, while a surplus means eating above them. A deficit may support weight loss over time, while a surplus may support weight gain. Results vary with activity, nutrition, training, and individual response.",
  },
  {
    question: "How many calories should I eat to lose or gain weight?",
    answer:
      "For weight loss, a calorie target below estimated maintenance may be used; for weight gain, a target above maintenance may be appropriate. This calculator provides preset adjustments, but they are estimates rather than guaranteed outcomes or individualized medical advice.",
  },
];

export default function MaintenanceCalorieCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: "Maintenance Calorie Calculator",
            href: "/maintenance-calorie-calculator",
          },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Maintenance Calorie Calculator & Daily Intake Estimator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Estimate your maintenance calories, Total Daily Energy Expenditure
          (TDEE), and daily macronutrients. Use the results as a starting
          estimate and compare them with your real-world trends.
        </p>
      </header>

      {/* Interactive Calculator */}
      <div className="mb-8">
        <MaintenanceCalorieTool />
      </div>

      <section className="prose prose-slate mb-8 max-w-none dark:prose-invert">
        <h2>How to Use the Maintenance Calorie Calculator</h2>
        <ol>
          <li>
            <strong>Unit Selection:</strong> Choose Imperial (lbs / in) or
            Metric (kg / cm).
          </li>
          <li>
            <strong>Sex &amp; Age:</strong> Select Female or Male and enter
            your age.
          </li>
          <li>
            <strong>Height and Weight:</strong> Enter your height using the
            selected units and your current body weight.
          </li>
          <li>
            <strong>Activity Level:</strong> Choose the option that best
            represents your usual daily movement and planned exercise. Step
            counts refer to total daily steps, while exercise-day ranges refer
            to planned workouts per week. Treat these categories as approximate
            examples.
          </li>
          <li>
            <strong>Your Primary Fitness Goal:</strong> Choose Maintain Weight
            (no adjustment), Mild Deficit (−350 kcal), Standard Deficit
            (−500 kcal), Body Recomposition (−200 kcal), or Lean Bulking
            (+300 kcal). These are the calculator&apos;s estimated adjustments
            to maintenance, not guaranteed results or individualized
            prescriptions.
          </li>
          <li>
            <strong>Review the results:</strong> Daily Target Calories shows
            the selected goal estimate. Maintenance TDEE estimates daily
            energy use, while BMR estimates resting energy use. Recommended
            Daily Macros displays estimated protein, fat, and carbohydrate
            amounts.
          </li>
        </ol>
      </section>

      <AdSlot slotId="maintenance-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>How to Figure Out Maintenance Calories &amp; TDEE</h2>
        <p>
          Your <strong>maintenance calories</strong> represent the estimated
          daily energy intake needed to maintain your current body weight over
          time. This amount is commonly described as your{" "}
          <strong>Total Daily Energy Expenditure (TDEE)</strong>.
        </p>

        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          TDEE = Basal Metabolic Rate (BMR) × Physical Activity Multiplier
        </div>

        <p>
          The calculator uses an activity multiplier to estimate energy
          expenditure. Daily steps are one indicator of movement, but exercise
          sessions, job demands, and other routine activities also contribute.
          The multiplier is an estimate, not a direct measurement of your
          energy use.
        </p>

        <p>
          Daily step counts and exercise days describe different types of
          activity. Steps represent everyday movement, while exercise days
          refer to planned workouts during a week. Consider both, along with
          work and household activity, when choosing an activity category.
        </p>

        {/* Activity Multiplier Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Activity Level
                </th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">
                  TDEE Multiplier
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Typical Daily Movement and Exercise
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {activityLevels.map((row) => (
                <tr
                  key={row.level}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50"
                >
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                    {row.level}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {row.multiplier}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>BMR vs TDEE: What&apos;s the Difference?</h2>
        <p>
          <strong>Basal Metabolic Rate (BMR)</strong> estimates the energy your
          body uses at rest to support essential functions.{" "}
          <strong>Total Daily Energy Expenditure (TDEE)</strong> estimates
          energy used across the day, including resting needs, movement, and
          exercise. TDEE is generally higher than BMR, although actual values
          vary.
        </p>

        <p>
          For example, if an estimated BMR is 1,500 kcal/day and the selected
          activity multiplier is 1.4, estimated TDEE is 1,500 × 1.4 ={" "}
          <strong>2,100 kcal/day</strong>. This is a simplified estimate, not
          a precise measurement of activity-related energy use.
        </p>

        <h2>How to Calculate Your Daily Macronutrients</h2>
        <p>
          Macronutrients, commonly called macros, are protein, fat, and
          carbohydrates. They provide energy and serve different functions in
          the body. For general calorie calculations, the commonly used energy
          values are:
        </p>

        <ul>
          <li>
            <strong>Protein:</strong> Approximately 4 kcal per gram. Protein
            supports tissue repair and helps maintain lean muscle.
          </li>
          <li>
            <strong>Dietary Fat:</strong> Approximately 9 kcal per gram. Fat
            supports cell membranes, hormone production, and other essential
            functions.
          </li>
          <li>
            <strong>Carbohydrates:</strong> Approximately 4 kcal per gram.
            Carbohydrates provide energy for everyday activity and exercise.
          </li>
        </ul>

        <p>
          This calculator estimates protein at 2 grams per kilogram of body
          weight, assigns about 25% of its calorie target to fat, and uses the
          remaining calories for carbohydrates. These are the calculator&apos;s
          chosen assumptions, not universal prescriptions. Suitable macro
          targets vary with individual needs, goals, health, and food
          preferences.
        </p>

        <p>
          <strong>Example:</strong> For a 2,000 kcal target and a 75 kg person,
          the calculator&apos;s protein estimate is 75 × 2 = 150 g, providing
          about 600 kcal. If 25% of the target (500 kcal) comes from fat, that
          equals about 500 ÷ 9 = 56 g. The remaining 900 kcal provides about
          900 ÷ 4 = 225 g of carbohydrates. Rounding means displayed grams
          and calories may not sum perfectly.
        </p>

        <h2>Calorie Deficit vs Calorie Surplus</h2>
        <p>
          A calorie deficit means consuming fewer calories than your estimated
          maintenance needs. A calorie surplus means consuming more. These
          terms describe energy balance, not a guaranteed rate or type of body
          change.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[34rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">
              Comparison of calorie deficit, maintenance, surplus, and body
              recomposition
            </caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  Approach
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  Compared with estimated maintenance
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  General purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Deficit
                </th>
                <td className="px-4 py-3">Intake below maintenance</td>
                <td className="px-4 py-3">
                  May support weight loss over time
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Maintenance
                </th>
                <td className="px-4 py-3">Intake near maintenance</td>
                <td className="px-4 py-3">
                  May support weight stability over time
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Surplus
                </th>
                <td className="px-4 py-3">Intake above maintenance</td>
                <td className="px-4 py-3">
                  May support weight gain, including with resistance training
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Recomposition
                </th>
                <td className="px-4 py-3">
                  Often near maintenance or a modest deficit
                </td>
                <td className="px-4 py-3">
                  Aims to change body composition while scale weight may
                  change slowly
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The calculator&apos;s calorie targets are estimates. Actual changes
          depend on food intake, activity, training, health, and individual
          response. Its goal options do not guarantee weight loss, muscle
          gain, or body recomposition.
        </p>

        <h2>How to Adjust Calories Based on Weight Changes</h2>
        <p>
          Body weight naturally fluctuates because of hydration, sodium and
          carbohydrate intake, digestion, and other factors. If weighing is
          appropriate for you, use consistent conditions and compare weekly
          averages rather than reacting to a single reading.
        </p>

        <p>
          Allow about 2–4 weeks of reasonably consistent habits to assess a
          trend. If results are not moving toward your goal, consider a small,
          gradual adjustment rather than making aggressive changes in response
          to short-term fluctuations. Seek qualified professional advice when
          you need individualized guidance.
        </p>

        <h2>How to Track Daily Calories and Macros</h2>
        <ul>
          <li>
            Record foods, drinks, snacks, and cooking additions consistently.
          </li>
          <li>
            Check nutrition labels and serving sizes so you know whether the
            listed values apply to one serving or the whole package.
          </li>
          <li>
            Track protein, carbohydrates, and fat in grams if macro tracking
            is useful for your goals. Focus on consistent habits rather than
            perfect precision.
          </li>
        </ul>

        <h2>How Accurate Are Maintenance Calorie Calculators?</h2>
        <p>
          Mifflin–St Jeor is an equation used to estimate resting energy needs
          from a person&apos;s age, sex, height, and weight. It does not
          measure metabolism directly. Activity multipliers are broad
          estimates, and actual energy expenditure varies with body
          composition, non-exercise movement, exercise, and individual
          differences.
        </p>

        <p>
          Treat the calculator result as an initial estimate. Comparing it
          with consistent intake records and weight trends over several weeks
          can help you judge whether it is a useful starting point.
        </p>

        <p>
          For related information, see our{" "}
          <Link
            href="/walking-for-weight-loss"
            className="font-semibold text-emerald-700 underline dark:text-emerald-400"
          >
            Walking for Weight Loss Guide
          </Link>
          ,{" "}
          <Link
            href="/bmi-calculator"
            className="font-semibold text-emerald-700 underline dark:text-emerald-400"
          >
            BMI &amp; FFMI Calculator
          </Link>
          , and{" "}
          <Link
            href="/calories-vs-kcal"
            className="font-semibold text-emerald-700 underline dark:text-emerald-400"
          >
            Calories vs kcal explainer
          </Link>
          .
        </p>

        <h2>Scientific References</h2>
        <ul>
          <li>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/2305711/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mifflin et al., “A new predictive equation for resting energy
              expenditure in healthy individuals,” 1990
            </a>{" "}
            — describes the equation used to estimate resting energy
            expenditure.
          </li>
          <li>
            <a
              href="https://www.niddk.nih.gov/bwp"
              target="_blank"
              rel="noopener noreferrer"
            >
              NIDDK Body Weight Planner
            </a>{" "}
            — illustrates how energy needs and body weight change over time.
          </li>
          <li>
            <a
              href="https://nap.nationalacademies.org/catalog/10490/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Academies Dietary Reference Intakes
            </a>{" "}
            — reference material on energy and macronutrients.
          </li>
        </ul>
      </section>

      <div className="my-8">
        <AdSlot slotId="maintenance-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Walking Calculator */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Incorporate Walking Into Your Daily TDEE
        </h2>
        <p className="mt-2 text-white">
          Walking can be one way to add movement to your routine. Use our
          calculator to estimate energy used while walking.
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
