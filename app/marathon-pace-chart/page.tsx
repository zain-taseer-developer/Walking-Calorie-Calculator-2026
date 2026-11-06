import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RacePaceTool } from "@/components/calculator/RacePaceTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Marathon Pace Chart: 5K, 10K, Half & Full Marathon Pace Calculator",
  description:
    "Official marathon pace chart and race pace calculator. Find exact min/mile and min/km splits for 3 hour, 3:30, 4 hour, and 5 hour marathon finishes.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/marathon-pace-chart`,
  },
};

const marathonSplits = [
  { finish: "2:45:00", paceMile: "6:18 /mi", paceKm: "3:55 /km", speedMph: "9.53 mph", halfSplit: "1:22:30", note: "Elite competitive amateur" },
  { finish: "3:00:00 (3 hour marathon pace / marathon sub 3 hours pace)", paceMile: "6:52 /mi", paceKm: "4:16 /km", speedMph: "8.74 mph", halfSplit: "1:30:00", note: "Boston Marathon BQ benchmark" },
  { finish: "3:15:00", paceMile: "7:26 /mi", paceKm: "4:37 /km", speedMph: "8.07 mph", halfSplit: "1:37:30", note: "Strong age-group standard" },
  { finish: "3:30:00 (3:30 marathon pace)", paceMile: "8:00 /mi", paceKm: "4:59 /km", speedMph: "7.49 mph", halfSplit: "1:45:00", note: "Popular 8-minute mile target" },
  { finish: "3:45:00", paceMile: "8:35 /mi", paceKm: "5:20 /km", speedMph: "6.99 mph", halfSplit: "1:52:30", note: "Solid endurance split" },
  { finish: "4:00:00 (sub 4 hour marathon pace / what pace is a 4 hour marathon / marathon pace for sub 4 hours)", paceMile: "9:09 /mi", paceKm: "5:41 /km", speedMph: "6.55 mph", halfSplit: "2:00:00", note: "Benchmark milestone for recreational runners" },
  { finish: "4:30:00", paceMile: "10:18 /mi", paceKm: "6:24 /km", speedMph: "5.83 mph", halfSplit: "2:15:00", note: "Comfortable long-distance cadence" },
  { finish: "5:00:00 (5 hour marathon pace)", paceMile: "11:27 /mi", paceKm: "7:07 /km", speedMph: "5.24 mph", halfSplit: "2:30:00", note: "Run-walk interval strategy" },
];

const faqs = [
  {
    question: "What pace is a 4 hour marathon (sub 4 hour marathon pace / marathon pace for sub 4 hours)?",
    answer:
      "To run a sub-4-hour marathon (3:59:59), you must average a pace of 9:09 per mile (5:41 per kilometer). Your halfway split at the half marathon mark (13.1 miles) must be 1:59:59 or faster.",
  },
  {
    question: "What is a 3 hour marathon pace (marathon sub 3 hours pace)?",
    answer:
      "A 3 hour marathon pace requires maintaining 6:52 per mile (4:16 per kilometer) across the entire 26.219-mile distance, running at a sustained velocity of 8.74 mph.",
  },
  {
    question: "What is a 3:30 marathon pace and 5 hour marathon pace?",
    answer:
      "A 3:30 marathon pace requires exactly an 8:00 min/mile split (4:59 min/km). A 5 hour marathon pace requires maintaining 11:27 per mile (7:07 min/km), which many runners achieve using a structured run-walk strategy.",
  },
  {
    question: "How do you calculate speed, distance, and time (formula of speed time and distance / formula distance time speed)?",
    answer:
      "In physics and athletic mechanics, the fundamental relationship is: Speed = Distance ÷ Time. Using our speed distance time calculator or calculating velocity calculator, Time = Distance ÷ Speed, and Distance = Speed × Time. When converting units, remember that 1 mph = 1.60934 km/h.",
  },
  {
    question: "How many steps is a 5k (how many steps is 5k)?",
    answer:
      "A 5K race (3.1 miles or 5 kilometers) typically takes between 6,000 and 7,500 running steps, or roughly 6,200 to 7,000 brisk walking steps depending on stride length. Use our steps to miles calculator to model your exact stride.",
  },
  {
    question: "How many miles is 10k steps (how many miles is 10k steps / 10k steps in miles / 10k steps to miles / how far is 10k steps)?",
    answer:
      "For an average adult stride length (roughly 2.1 to 2.5 feet), 10,000 steps equals approximately 4.5 to 5.0 miles (7.2 to 8.0 kilometers). Whether searched as how many miles is a 10k steps, how many miles in 10k steps, how long is 10k steps, 10k steps is how many miles, or how much is 10k steps in miles, the rule of thumb is roughly 2,000 to 2,200 steps per mile.",
  },
  {
    question: "How many miles is 15k steps (15k steps to miles) and how many miles is 5k steps?",
    answer:
      "15,000 steps (15k steps to miles) equals approximately 6.8 to 7.5 miles (11 to 12 km). Meanwhile, 5,000 steps (how many miles is 5k steps) equals roughly 2.3 to 2.5 miles.",
  },
  {
    question: "How many miles in 20k and 1.5km to miles?",
    answer:
      "A 20K road race (20 kilometers) equals 12.43 miles (searched as miles in 20k). A shorter distance like 1.5km to miles equals 0.93 miles (1,500 meters or about 15/16ths of a mile).",
  },
  {
    question: "How does this compare to McMillan running calculator and Strava pace calculator?",
    answer:
      "Our race pace calculator, fast calculator, and time average calculator use equivalent mathematical pace splits to tools like the McMillan running calculator, McMillan pace calculator, Strava pace calculator, and Atlanta Track Club pace calculator, while remaining 100% free and mobile-friendly.",
  },
];

export default function MarathonPaceChartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Marathon Pace Chart", href: "/marathon-pace-chart" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Marathon Pace Chart & Race Pace Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Complete pace splits for 5K, 10K, half marathon, and full marathon race distances. Compute exact mile splits, metric kilometer rates, and finish times.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <RacePaceTool />
      </div>

      <AdSlot slotId="pace-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Official Marathon Pace Chart: Splits & Finish Times</h2>
        <p>
          Whether targeting a <strong>sub 4 hour marathon pace</strong>, an ambitious <strong>3 hour marathon pace</strong>, or a steady <strong>5 hour marathon pace</strong>, pacing discipline over 26.2 miles is paramount. The <strong>marathon pace chart</strong> below breaks down essential finish targets into per-mile and per-kilometer checkpoints.
        </p>

        {/* Pace Chart Table */}
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Target Finish</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">Pace / Mile</th>
                <th className="px-4 py-3 font-semibold text-teal-700 dark:text-teal-400">Pace / Km</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Average Speed</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Half Marathon Split</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {marathonSplits.map((row) => (
                <tr key={row.finish} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{row.finish}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.paceMile}</td>
                  <td className="px-4 py-3 font-mono text-teal-600 dark:text-teal-400">{row.paceKm}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.speedMph}</td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{row.halfSplit}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>5K Pace Chart & 10K Pace Chart</h2>
        <p>
          Before tackling 26.2 miles, runners build speed on shorter courses or train for a specific <strong>half marathon pace</strong> (13.1 miles). A dedicated <strong>5k pace chart</strong> and <strong>10k pace chart</strong> (or <strong>pace chart 10km</strong> and <strong>5k running pace chart</strong>) helps calibrate early splits:
        </p>
        <ul>
          <li><strong>20-Minute 5K Pace:</strong> 6:26 per mile (4:00 per km) at 9.32 mph.</li>
          <li><strong>25-Minute 5K Pace:</strong> 8:03 per mile (5:00 per km) at 7.46 mph.</li>
          <li><strong>30-Minute 5K Pace:</strong> 9:39 per mile (6:00 per km) at 6.21 mph.</li>
          <li><strong>45-Minute 10K Pace:</strong> 7:15 per mile (4:30 per km) at 8.28 mph.</li>
          <li><strong>50-Minute 10K Pace:</strong> 8:03 per mile (5:00 per km) at 7.46 mph.</li>
          <li><strong>60-Minute 10K Pace:</strong> 9:39 per mile (6:00 per km) at 6.21 mph.</li>
        </ul>

        <h2>Physics: How to Calculate Speed, Distance, and Time</h2>
        <p>
          When you want to know <strong>how to calculate speed</strong> using our <strong>speed distance time calculator</strong>, <strong>fast calculator</strong>, <strong>time average calculator</strong>, or <strong>time calculator from speed and distance</strong>, use the classic <strong>formula of speed time and distance</strong> (also referred to as the <strong>formula distance time speed</strong>):
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Velocity = Distance ÷ Time
          <br />
          Time = Distance ÷ Velocity
          <br />
          Distance = Velocity × Time
        </div>
        <p>
          Athletes using a <strong>calculator running pace</strong>, <strong>race pace calculator</strong>, or training for a milestone race can record their split progress in their <strong>pace calendar</strong> or compare against platforms like the <strong>mcmillan running calculator</strong>, <strong>mcmillan pace calculator</strong>, <strong>strava pace calculator</strong>, and <strong>atlanta track club pace calculator</strong>.
        </p>
        <p>
          Note: If you are an endurance walker aiming for a <strong>marathon pace for 2 hours</strong> (which would be half marathon territory for elite runners, as the world record full marathon pace is just over 2 hours at 4:35/mile), our tools adjust for every athletic speed and walking pace.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="pace-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold">Calculate Walking Energy Burn</h3>
        <p className="mt-2 text-emerald-100">
          Whether you walk 5,000 steps, a full 10K, or train for a marathon walk, calculate your exact calories burned with our flagship tool.
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
