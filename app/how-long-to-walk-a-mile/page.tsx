
import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { Timer } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "How Long Does It Take to Walk a Mile? (1–5 Mile Chart)",
  description:
    "Find out how long it takes to walk 1 mile at different speeds. Compare walking times for 1–10 miles with a practical distance and speed chart.",
  canonicalPath: "/how-long-to-walk-a-mile",
  keywords: [
    "how long to walk a mile",
    "how long does it take to walk 5 miles",
    "how long to walk 3 miles",
    "how long to walk 2 miles",
    "how long does it take to walk 4 miles",
  ],
});

export default function HowLongToWalkMilePage() {
  const distanceMatrix = [
    ["1 Mile", "30:00", "24:00", "20:00", "17:09", "15:00", "13:20"],
    ["2 Miles", "1 hr 00 min", "48:00", "40:00", "34:17", "30:00", "26:40"],
    ["3 Miles", "1 hr 30 min", "1 hr 12 min", "1 hr 00 min", "51:26", "45:00", "40:00"],
    ["4 Miles", "2 hrs 00 min", "1 hr 36 min", "1 hr 20 min", "1 hr 09 min", "1 hr 00 min", "53:20"],
    ["5 Miles", "2 hrs 30 min", "2 hrs 00 min", "1 hr 40 min", "1 hr 26 min", "1 hr 15 min", "1 hr 06 min"],
    ["6.2 Miles (approximately 10K)", "3 hrs 06 min", "2 hrs 29 min", "2 hrs 04 min", "1 hr 46 min", "1 hr 33 min", "1 hr 23 min"],
    ["10 Miles", "5 hrs 00 min", "4 hrs 00 min", "3 hrs 20 min", "2 hrs 51 min", "2 hrs 30 min", "2 hrs 13 min"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to walk 1 mile?",
      answer:
        "At 3 mph, one mile takes 20 minutes. At 2.5 mph, it takes 24 minutes, while at 3.5 mph, it takes about 17 minutes and 9 seconds. Your actual time depends on your walking speed, route, and breaks.",
    },
    {
      question: "How long does it take to walk half a mile?",
      answer:
        "Half a mile takes about 12 minutes at 2.5 mph, 10 minutes at 3 mph, and 8 minutes and 34 seconds at 3.5 mph.",
    },
    {
      question: "How long does it take to walk 2 miles?",
      answer:
        "At 3 mph, walking 2 miles takes 40 minutes. At 2.5 mph, it takes 48 minutes, and at 3.5 mph, about 34 minutes and 17 seconds.",
    },
    {
      question: "How long does it take to walk 3 miles?",
      answer:
        "Walking 3 miles takes 1 hour at 3 mph, 1 hour and 12 minutes at 2.5 mph, or about 51 minutes and 26 seconds at 3.5 mph.",
    },
    {
      question: "How long does it take to walk 5 miles?",
      answer:
        "At 3 mph, walking 5 miles takes 1 hour and 40 minutes. At 3.5 mph, it takes about 1 hour and 26 minutes, while at 2.5 mph, it takes 2 hours.",
    },
    {
      question: "How long does it take to walk 6 miles and 7 miles?",
      answer:
        "At 3 mph, 6 miles takes 2 hours and 7 miles takes 2 hours and 20 minutes. At 3.5 mph, the same distances take about 1 hour and 43 minutes and 2 hours, respectively.",
    },
    {
      question: "How long does it take to walk 10, 11, or 20 miles?",
      answer:
        "At 3 mph, 10 miles takes 3 hours and 20 minutes, 11 miles takes 3 hours and 40 minutes, and 20 miles takes 6 hours and 40 minutes. At 3.5 mph, these distances take approximately 2 hours and 51 minutes, 3 hours and 9 minutes, and 5 hours and 43 minutes. Breaks are not included.",
    },
    {
      question: "How long does it take to run one mile?",
      answer:
        "Running time varies by fitness and experience. For example, running at 6 mph takes 10 minutes to cover one mile, compared with 20 minutes when walking at 3 mph.",
    },
    {
      question: "Why might my walking time differ from the chart?",
      answer:
        "The chart assumes a continuous walk at a steady speed. Hills, uneven surfaces, weather, traffic stops, breaks, and changes in walking speed can make your actual time longer or shorter.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "How Long Does It Take to Walk a Mile?" }]} />

      {/* Answer-First Header Card */}
      <div className="my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-brand-900/15">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-teal-50 text-xs font-semibold mb-3">
            <Timer className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Benchmark Answer</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            How Long Does It Take to Walk a Mile?
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-teal-50 leading-relaxed">
            At common steady walking speeds of 2.5 to 4.0 mph,{" "}
            <strong>1 mile takes about 15 to 24 minutes</strong>. At 3.0 mph,
            it takes <strong>20 minutes</strong>; at 3.5 mph, about{" "}
            <strong>17 minutes and 9 seconds</strong>; and at an easy 2.5 mph,
            <strong> 24 minutes</strong>.
          </p>

          <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">Stroll (2.5 mph)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">
                24:00 min
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">
                Moderate (3.0 mph)
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono">
                20:00 min
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">
                Brisk (3.5 mph)
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono">
                17:09 min
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">
                Power (4.0 mph)
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono">
                15:00 min
              </span>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="walk-mile-top" />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <h2>How to Calculate Walking Time</h2>
        <p>
          You can estimate walking duration by dividing the distance you plan
          to cover by your walking speed. Use miles for distance and miles per
          hour (mph) for speed to get the result in hours.
        </p>

        <p>
          <strong>Walking Time = Distance ÷ Walking Speed</strong>
        </p>

        <p>
          For example, walking 1 mile at 3 mph takes 1 ÷ 3 hours, or{" "}
          <strong>20 minutes</strong>. For a 2-mile walk at the same speed,
          the calculation is 2 ÷ 3 hours, which equals{" "}
          <strong>40 minutes</strong>. Multiply the result in hours by 60
          to convert it into minutes.
        </p>

        <h2>How Walking Speed Affects Mile Time</h2>
        <p>
          Walking speed directly determines how long it takes to cover a
          mile. A slower pace requires more time, while a faster pace reduces
          the duration. These examples show the difference at common steady
          speeds:
        </p>

        <ul>
          <li>
            <strong>2.0 mph:</strong> About 30 minutes per mile.
          </li>
          <li>
            <strong>2.5 mph:</strong> About 24 minutes per mile.
          </li>
          <li>
            <strong>3.0 mph:</strong> About 20 minutes per mile.
          </li>
          <li>
            <strong>3.5 mph:</strong> About 17 minutes and 9 seconds per mile.
          </li>
          <li>
            <strong>4.0 mph:</strong> About 15 minutes per mile.
          </li>
          <li>
            <strong>4.5 mph:</strong> About 13 minutes and 20 seconds per mile.
          </li>
        </ul>

        <p>
          These are estimated speeds, not fixed pace categories. Your
          comfortable walking speed may differ depending on your fitness,
          experience, and walking conditions.
        </p>

        <h2>Walking Time by Distance and Speed</h2>
        <p>
          The following chart compares estimated walking times for distances
          from 1 to 10 miles at six steady speeds. Use the row for your
          planned distance and the column closest to your expected speed.
        </p>

        <DataTable
          title="Walking Time by Distance and Speed"
          caption="Estimated duration for continuous walking without breaks. Times are rounded to the nearest minute or second as displayed."
          headers={[
            "Distance",
            "2.0 mph (Slow)",
            "2.5 mph (Casual)",
            "3.0 mph (Moderate)",
            "3.5 mph (Brisk)",
            "4.0 mph (Power)",
            "4.5 mph (Fast)",
          ]}
          rows={distanceMatrix}
          highlightColumnIndex={4}
        />

        <h2>What Can Affect Your Walking Time?</h2>
        <p>
          The estimates above assume you maintain a steady speed throughout
          the walk. Real-world conditions can change how long a route takes.
          Common factors include:
        </p>

        <ul>
          <li>
            <strong>Terrain:</strong> Hills, slopes, and uneven surfaces can
            slow your progress compared with flat paths.
          </li>
          <li>
            <strong>Walking breaks:</strong> Rest stops, traffic lights, and
            other interruptions add time to the total journey.
          </li>
          <li>
            <strong>Weather:</strong> Heat, rain, wind, and slippery conditions
            may affect your walking speed.
          </li>
          <li>
            <strong>Personal pace:</strong> Fitness, fatigue, comfort, and
            experience can influence how consistently you walk.
          </li>
        </ul>

        <h2>Walking vs. Running: 1 Mile Time</h2>
        <p>
          Walking and running cover the same distance at different speeds.
          For example, walking one mile at 3 mph takes 20 minutes, while
          running one mile at 6 mph takes 10 minutes. These examples show
          how speed affects travel time; actual results vary by individual.
        </p>

        <h2>Walking Time Calculation Limitations</h2>
        <p>
          Walking-time charts provide estimates rather than guaranteed
          arrival times. They assume a consistent speed and do not account
          for stops, changes in terrain, or variations in effort during
          a walk. For outdoor routes, allow additional time when conditions
          may slow you down.
        </p>

        <p>
          If you also want to estimate the energy used during a walk, try
          our{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>
          . It estimates calorie expenditure using details such as body
          weight and walking speed.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/how-long-to-walk-a-mile" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
