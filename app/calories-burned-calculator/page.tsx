import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ActivityCalorieTool } from "@/components/calculator/ActivityCalorieTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Calories Burned Calculator: Walking, Cycling, Swimming & Exercises",
  description:
    "Calculate calories burned across cycling, swimming, jumping rope, hiking, push-ups, and gym workouts. Compare exercise MET values and fat burning efficiency.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/calories-burned-calculator`,
  },
};

const activityTable = [
  { activity: "Jumping Rope / Skipping Rope (Moderate)", met: 11.0, k130: 325, k154: 385, k180: 450, note: "Top calorie burner per minute" },
  { activity: "Running (5.0 mph / 12 min/mile)", met: 8.3, k130: 245, k154: 290, k180: 340, note: "High cardiovascular conditioning" },
  { activity: "Swimming (Freestyle, Moderate)", met: 7.0, k130: 207, k154: 245, k180: 287, note: "Zero-impact full body resistance" },
  { activity: "Rowing Machine (Ergometer)", met: 7.0, k130: 207, k154: 245, k180: 287, note: "Calculated via erg calculator formulas" },
  { activity: "Cycling / Biking (Moderate 12-14 mph)", met: 6.8, k130: 201, k154: 238, k180: 278, note: "Calculate bike calories easily" },
  { activity: "Hiking (Cross-country / Hills)", met: 6.0, k130: 177, k154: 210, k180: 246, note: "Dedicated hiking calorie calculator baseline" },
  { activity: "Push-ups, Sit-ups & Calisthenics", met: 5.0, k130: 148, k154: 175, k180: 205, note: "Muscular endurance & core strength" },
  { activity: "Walking (Brisk, 3.5 mph)", met: 4.3, k130: 127, k154: 151, k180: 176, note: "Sustainable daily baseline exercise" },
  { activity: "Weight Lifting (Strength Training)", met: 3.5, k130: 103, k154: 123, k180: 143, note: "Lean muscle preservation & EPOC" },
];

const faqs = [
  {
    question: "How do you calculate bike calories (cycling)?",
    answer:
      "To calculate bike calories, multiply the cycling MET (6.8 for moderate 12-14 mph, or 8.0 for vigorous 14-16 mph) by your weight in kilograms and the duration in hours. For a 154 lb (70 kg) rider cycling for 45 minutes at 13 mph, the burn is: 6.8 × 70 × 0.75 = 357 kcal. Is cycling good for weight loss? Yes, cycling for weight loss provides a low-impact, high-calorie cardio burn that is gentle on joints.",
  },
  {
    question: "How many calories does swimming burn (and how many kcal does swimming burn)?",
    answer:
      "Swimming freestyle at a moderate effort has a MET rating of 7.0. A 154 lb (70 kg) swimmer burns about 245 kcal per 30 minutes, or 490 kcal per hour. Swimming calories burned depend on the stroke—butterfly burns up to 770 kcal/hour, while breaststroke burns roughly 400 kcal/hour. Swimming for weight loss builds total-body tone while eliminating pressure on knees and ankles.",
  },
  {
    question: "How many calories does jumping rope burn (calories skipping rope burns)?",
    answer:
      "Jumping rope is one of the most intense cardio activities with a MET of 11.0 to 12.0. If you ask 'how many calories can i burn by jumping rope?', a 154 lb person burns approximately 130 to 140 calories in just 10 minutes, or roughly 770 kcal in an hour of skipping rope.",
  },
  {
    question: "How many calories do i burn doing push ups and sit ups?",
    answer:
      "Vigorous calisthenics have a MET of 5.0. If you wonder 'how many calories can i burn doing push ups?' or 'how many calories do sit ups burn?', doing push-ups and sit-ups continuously burns about 5 to 7 calories per minute, meaning a 15-minute calisthenics circuit burns roughly 75 to 105 calories.",
  },
  {
    question: "What is the relationship between weight lifting and calories burned?",
    answer:
      "Weight lifting and calories burned during the workout averages 3.5 MET (about 200 to 250 kcal/hour). However, strength training triggers excess post-exercise oxygen consumption (EPOC) and increases resting metabolic rate by adding metabolically active lean muscle tissue.",
  },
  {
    question: "How can we burn calories effectively every day?",
    answer:
      "To answer 'how can we burn calories effectively?', the most sustainable strategy combines daily non-exercise physical activity (like 8,000 to 10,000 steps with our walking calorie calculator), 2 to 3 days of resistance training, and moderate cardio like cycling, swimming, or an erg rowing workout using an erg calculator.",
  },
  {
    question: "How many calories do you burn running vs. walking?",
    answer:
      "Running burns roughly 30% to 50% more calories per mile than brisk walking because both feet leave the ground, requiring upward propulsion against gravity. When asking 'how many calories do you burn running?', a 154 lb person burns about 100 to 115 calories per mile running, compared to 75 to 85 calories per mile walking.",
  },
];

export default function CaloriesBurnedCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Calories Burned Calculator", href: "/calories-burned-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Calories Burned Calculator: Multi-Exercise & Activity Burn
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Compare physical activities across cycling, swimming, jumping rope, hiking, running, and bodyweight exercises. Based on the 2011 Compendium of Physical Activities MET standards.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <ActivityCalorieTool />
      </div>

      <AdSlot slotId="activity-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Exercise Energy Expenditure Reference Table</h2>
        <p>
          The table below illustrates 30-minute estimated calorie burns across three common adult weights (130 lbs / 59 kg, 154 lbs / 70 kg, and 180 lbs / 82 kg).
        </p>

        {/* Comparison Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Exercise / Sport</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">MET</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">130 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">154 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">180 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {activityTable.map((row) => (
                <tr key={row.activity} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{row.activity}</td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{row.met}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.k130} kcal</td>
                  <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-300">{row.k154} kcal</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.k180} kcal</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Hiking Calorie Calculator & Mountain Walking</h2>
        <p>
          If you are looking for a specialized <strong>hiking calorie calculator</strong>, remember that uneven terrain, trail roots, elevation gain, and backpacks dramatically amplify walking energy requirements. Standard level walking burns roughly 4.3 MET, whereas cross-country trail hiking averages 6.0 MET, and hiking with a 20-lb pack on steep trails reaches 7.5 to 8.5 MET.
        </p>

        <h2>Cycling & Swimming for Weight Loss</h2>
        <p>
          Both <strong>cycling for weight loss</strong> and <strong>swimming for weight loss</strong> provide intense cardiovascular workouts with virtually zero joint impact forces. When you <strong>calculate bike calories</strong>, road speed, wind resistance, and rolling resistance determine power output. Similarly, <strong>swimming calories burned</strong> reflect water density—water is roughly 800 times denser than air, ensuring full-body muscular activation on every stroke.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="activity-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold">Looking to Calculate Walking Calories?</h3>
        <p className="mt-2 text-emerald-100">
          Return to our dedicated homepage calculator to model walking speeds, incline percentages, stride lengths, and step counts.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Go to Walking Calorie Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}

