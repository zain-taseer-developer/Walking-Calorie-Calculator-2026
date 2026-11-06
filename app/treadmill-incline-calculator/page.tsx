import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TreadmillInclineTool } from "@/components/calculator/TreadmillInclineTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Treadmill Incline Calculator & Pace Chart: Speed to Pace",
  description:
    "Calculate calories burned on treadmill incline workouts with our ACSM equation calculator. Includes comprehensive treadmill pace chart and speed to pace conversion.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/treadmill-incline-calculator`,
  },
};

const paceChart = [
  { mph: 2.0, kmh: 3.2, minMile: "30:00", minKm: "18:38", flatKcal: 140, inc6Kcal: 235, inc12Kcal: 330 },
  { mph: 2.5, kmh: 4.0, minMile: "24:00", minKm: "14:54", flatKcal: 175, inc6Kcal: 295, inc12Kcal: 410 },
  { mph: 3.0, kmh: 4.8, minMile: "20:00", minKm: "12:25", flatKcal: 210, inc6Kcal: 355, inc12Kcal: 495 },
  { mph: 3.2, kmh: 5.1, minMile: "18:45", minKm: "11:39", flatKcal: 224, inc6Kcal: 378, inc12Kcal: 528 },
  { mph: 3.5, kmh: 5.6, minMile: "17:09", minKm: "10:39", flatKcal: 245, inc6Kcal: 415, inc12Kcal: 580 },
  { mph: 4.0, kmh: 6.4, minMile: "15:00", minKm: "9:19", flatKcal: 280, inc6Kcal: 475, inc12Kcal: 660 },
  { mph: 4.5, kmh: 7.2, minMile: "13:20", minKm: "8:17", flatKcal: 315, inc6Kcal: 535, inc12Kcal: 745 },
  { mph: 5.0, kmh: 8.0, minMile: "12:00", minKm: "7:27", flatKcal: 350, inc6Kcal: 595, inc12Kcal: 825 },
];

const faqs = [
  {
    question: "How does treadmill incline increase calorie burn?",
    answer:
      "Treadmill incline forces your glutes, hamstrings, and calves to fight gravitational resistance on every step. According to the ACSM metabolic equation, walking at a 6% incline burns approximately 1.7× more calories than flat ground, and a 12% incline burns more than 2.3× the energy of 0% grade at the exact same walking speed.",
  },
  {
    question: "What are the benefits of zone 2 incline walk?",
    answer:
      "The primary benefits of zone 2 incline walk include maximal fat oxidation without high joint impact. Walking at a 4% to 8% incline at 2.8 to 3.4 mph keeps your heart rate strictly inside cardiovascular Zone 2 (60% to 70% of maximum heart rate). This stimulates mitochondrial biogenesis, burns body fat as primary fuel, and preserves joint cartilage compared to running.",
  },
  {
    question: "How does treadmill speed to pace conversion work?",
    answer:
      "To convert treadmill speed (mph) to running or walking pace (minutes per mile), divide 60 by your speed. For example, 60 / 3.0 mph = 20:00 min/mile. For 3.5 mph, 60 / 3.5 = 17.14 minutes, or 17 minutes and 9 seconds per mile. Use our treadmill pace chart below for instant lookups.",
  },
  {
    question: "What is the 12-3-30 treadmill incline workout?",
    answer:
      "The 12-3-30 treadmill incline workout involves setting your treadmill incline to 12%, your speed to 3.0 mph, and walking for 30 minutes. For a 154 lb (70 kg) adult, this single workout burns approximately 250 to 280 calories while building lower-body endurance with zero pounding on the knees.",
  },
  {
    question: "What does speed on running machine mean?",
    answer:
      "Speed on running machine displays how fast the belt moves, usually calibrated in miles per hour (mph) in the US and UK or kilometers per hour (km/h) across Europe and international gyms. You can toggle between mph and km/h in our treadmill pace calculator above to verify your exact pace.",
  },
];

export default function TreadmillInclinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Treadmill Incline Calculator", href: "/treadmill-incline-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Treadmill Incline Calculator & Pace Chart
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Calculate the exact calorie burn and metabolic advantages of incline walking. Use our treadmill pace calculator and conversion table to translate treadmill speed to pace.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <TreadmillInclineTool />
      </div>

      <AdSlot slotId="treadmill-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Treadmill Pace Chart & Speed to Pace Conversion</h2>
        <p>
          Unlike outdoor road walking where pace is measured in minutes per mile, treadmill consoles display belt velocity. The <strong>treadmill pace chart</strong> below shows exact <strong>treadmill speed to pace</strong> translations alongside estimated 30-minute calorie burns across flat (0%), moderate (6%), and steep (12%) grades for a 154 lb (70 kg) walker.
        </p>

        {/* Pace Chart Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Speed (mph)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Speed (km/h)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Treadmill Pace (/mi)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Metric Pace (/km)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Flat (0%)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">6% Incline</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">12% Incline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {paceChart.map((row) => (
                <tr key={row.mph} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{row.mph} mph</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.kmh} km/h</td>
                  <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">{row.minMile}</td>
                  <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">{row.minKm}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.flatKcal} kcal</td>
                  <td className="px-4 py-3 font-medium text-emerald-700 dark:text-emerald-300">{row.inc6Kcal} kcal</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{row.inc12Kcal} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Why Add Treadmill Incline to Your Routine?</h2>
        <p>
          Standard level walking is wonderful for health, but elevating your <strong>treadmill incline</strong> shifts muscle recruitment backward toward your posterior chain—specifically the gluteus maximus, biceps femoris, and soleus muscles.
        </p>
        <p>
          A well-structured <strong>treadmill incline workout</strong> allows you to achieve the cardiovascular training heart rates usually reserved for running, but with minimal impact forces on joints. This makes incline walking one of the premier low-injury exercise modalities for sustained weight management.
        </p>

        <h2>Scientific Benefits of Zone 2 Incline Walk</h2>
        <p>
          When you walk up a grade at moderate speeds, your heart rate naturally settles into Zone 2 (roughly 60% to 70% of max heart rate). The <strong>benefits of zone 2 incline walk</strong> include:
        </p>
        <ul>
          <li><strong>Mitochondrial Density:</strong> Zone 2 training trains your muscle cells to build more mitochondria, improving cellular energy production.</li>
          <li><strong>Higher Lipid Oxidation:</strong> Because your breathing remains steady, oxygen delivery remains sufficient for pure fat oxidation without accumulating blood lactate.</li>
          <li><strong>Low Orthopedic Stress:</strong> Unlike running or jogging on concrete, walking on an inclined treadmill belt reduces peak impact force by up to 50%.</li>
        </ul>

        <h2>Treadmill Pace Conversion Formula</h2>
        <p>
          If you want to perform manual <strong>treadmill pace conversion</strong>, use this simple formula:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Pace (minutes per mile) = 60 ÷ Speed (mph)
          <br />
          Pace (minutes per km) = 60 ÷ Speed (km/h)
        </div>
        <p>
          Whether adjusting your <strong>treadmill pace</strong> for interval training or checking the <strong>speed on running machine</strong> at your local gym, our live tool ensures accurate metabolic tracking.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="treadmill-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold">Calculate Outdoor or Treadmill Walking Calories</h3>
        <p className="mt-2 text-emerald-100">
          Explore our flagship walking calculator for fine-grained terrain adjustments, backpack loads, gross vs. net calories, and step tracking.
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

