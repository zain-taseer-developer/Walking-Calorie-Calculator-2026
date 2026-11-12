import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { MiniCalculator } from "@/components/calculator/MiniCalculator";
import { Timer } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "How Long Does It Take to Walk a Mile? (1–5 Mile Chart)",
  description:
    "It takes 15 to 22 minutes to walk one mile for an average adult. See exact duration charts for 1, 2, 3, 4, 5, and 10 miles across casual, moderate, and brisk paces.",
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

  const quickDistanceMatrix = [
    ["0.5 mile", "12:00", "10:00", "8:34"],
    ["1 mile", "24:00", "20:00", "17:09"],
    ["2 miles", "48:00", "40:00", "34:17"],
    ["3 miles", "1 hr 12 min", "1 hr 00 min", "51:26"],
    ["5 miles", "2 hrs 00 min", "1 hr 40 min", "1 hr 25 min 43 sec"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to walk 1 mile?",
      answer:
        "At 3 mph, one mile takes 20 minutes. At 2.5 mph it takes 24 minutes, and at 3.5 mph it takes about 17 minutes and 9 seconds. Your actual time depends on pace, route, and breaks.",
    },
    {
      question: "How long does it take to walk half a mile?",
      answer:
        "At 2.5 mph, half a mile takes about 12 minutes; at 3 mph, 10 minutes; and at 3.5 mph, about 8 minutes and 34 seconds.",
    },
    {
      question: "How long does it take to walk 2 miles?",
      answer:
        "At 3 mph, two miles takes 40 minutes. At 2.5 mph it takes 48 minutes, and at 3.5 mph it takes about 34 minutes and 17 seconds.",
    },
    {
      question: "How long does it take to walk 3 miles?",
      answer:
        "At 3 mph, three miles takes one hour. At 3.5 mph, it takes about 51 minutes and 26 seconds; at 2.5 mph, about 1 hour and 12 minutes.",
    },
    {
      question: "How long does it take to walk 5 miles?",
      answer:
        "At 3 mph, five miles takes 1 hour and 40 minutes. At 3.5 mph, it takes about 1 hour and 25 minutes and 43 seconds; at 2.5 mph, 2 hours.",
    },
    {
      question: "How long does it take to walk 6 miles and how long does it take to walk 7 miles?",
      answer:
        "At 3.5 mph, six miles takes about 1 hour and 43 minutes; at 3 mph, 2 hours. Seven miles takes 2 hours at 3.5 mph or 2 hours and 20 minutes at 3 mph.",
    },
    {
      question: "How long does it take to walk 10, 11, or 20 miles?",
      answer:
        "At 3.5 mph, 10 miles takes about 2 hours and 51 minutes; at 3 mph, 3 hours and 20 minutes. Eleven miles takes about 3 hours and 9 minutes at 3.5 mph or 3 hours and 40 minutes at 3 mph. Twenty miles takes about 5 hours and 43 minutes at 3.5 mph or 6 hours and 40 minutes at 3 mph, not including breaks.",
    },
    {
      question: "How long does it take to run one mile?",
      answer:
        "Running time varies widely with fitness and individual ability. As a simple comparison, running at 6 mph covers a mile in 10 minutes, while walking at 3 mph takes 20 minutes. These are pace examples, not standards everyone should meet.",
    },
    {
      question: "Is walking one mile a day enough exercise?",
      answer:
        "A daily mile can be a useful way to build a consistent activity habit and add movement to your day. Whether it is enough depends on your health, pace, and other activity. Public-health guidance recommends regular weekly activity, and one mile alone may not meet everyone’s needs.",
    },
    {
      question: "Why might my walking time differ from the chart?",
      answer:
        "The chart assumes a steady speed on a continuous route. Hills, surface, weather, traffic stops, breaks, fitness, and fatigue can all change your actual time.",
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
            At common steady walking speeds of 2.5 to 4.0 mph, <strong>1 mile takes about 15 to 24 minutes</strong>. At 3.0 mph, it takes <strong>20 minutes</strong>; at 3.5 mph, about <strong>17 minutes</strong>; and at an easy 2.5 mph, <strong>24 minutes</strong>.
          </p>

          <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">Stroll (2.5 mph)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">24:00 min</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">Moderate (3.0 mph)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">20:00 min</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">Brisk (3.5 mph)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">17:08 min</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-xs text-teal-200 block">Power (4.0 mph)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">15:00 min</span>
            </div>
          </div>
        </div>
      </div>

      <AdSlot format="horizontal" slotId="walk-mile-top" />

      {/* Embedded Mini Calculator */}
      <MiniCalculator
        defaultWeightLbs={160}
        defaultDurationMins={20}
        defaultMph={3.0}
        title="Check Calories Burned in 1 Mile of Walking"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <h2>How to Calculate Walking Time</h2>
        <p>
          Use <strong>Walking Time = Distance ÷ Walking Speed</strong>. Keep distance and speed in compatible units—for example, miles and miles per hour. The result is in hours, so multiply by 60 to convert it to minutes.
        </p>
        <p>
          For example, 1 mile ÷ 3 mph = ⅓ hour, or <strong>20 minutes</strong>. For 2 miles at the same speed, 2 ÷ 3 hours is 40 minutes. To estimate a different trip, divide its distance by your expected speed and convert the hours to minutes. Add time for breaks or stops separately.
        </p>

        <h2>Walking Pace: Slow, Moderate, and Brisk</h2>
        <p>
          Pace labels are approximate; comfort, fitness, terrain, and individual ability affect what a speed feels like. These ranges are practical examples, not fixed medical definitions:
        </p>
        <ul>
          <li><strong>Slow or easy (about 2.0–2.5 mph):</strong> A relaxed pace; one mile takes about 24–30 minutes.</li>
          <li><strong>Moderate (about 2.5–3.5 mph):</strong> A steady everyday walk; one mile takes about 17–24 minutes.</li>
          <li><strong>Brisk (about 3.5–4.5 mph):</strong> A purposeful faster walk; one mile takes about 13 minutes 20 seconds to 17 minutes 9 seconds.</li>
        </ul>

        <h2>Walking Time by Distance</h2>
        <p>
          Use this quick reference for common distances at three steady walking speeds. Times are calculated as distance divided by speed and rounded to the nearest second where shown.
        </p>
        <DataTable
          title="Estimated Walking Time at Common Speeds"
          caption="Estimates assume a continuous walk without stops."
          headers={["Distance", "2.5 mph", "3.0 mph", "3.5 mph"]}
          rows={quickDistanceMatrix}
        />

        <h2>Complete Walking Duration Reference Matrix (1 to 10 Miles)</h2>
        <p>
          For more distance and speed combinations, use the larger reference matrix below. It includes estimates from 2.0 to 4.5 mph.
        </p>

        <DataTable
          title="Walking Time by Distance and Speed Matrix"
          caption="Times formatted in hours and minutes across 6 walking pace benchmarks."
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
          highlightColumnIndex={4} // 3.5 mph brisk
        />

        <p>
          Curious how many calories your 2-mile, 3-mile, or 5-mile walk expends based on your weight? Try our{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>{" "}
          to see your live metabolic burn.
        </p>

        <h2>How to Walk a Mile Faster</h2>
        <ul>
          <li><strong>Build consistency:</strong> Regular walks make it easier to maintain a comfortable routine.</li>
          <li><strong>Use relaxed posture:</strong> Look ahead, keep your shoulders relaxed, and let your arms swing naturally.</li>
          <li><strong>Choose comfortable footwear:</strong> Shoes that fit well can make walking more comfortable.</li>
          <li><strong>Increase pace gradually:</strong> Try brief, slightly faster intervals and return to an easy pace as needed. Increase effort over time rather than forcing speed.</li>
        </ul>

        <h2>Walking vs. Running: 1 Mile Time</h2>
        <p>
          At 3 mph, a one-mile walk takes 20 minutes. At 6 mph, a one-mile run takes 10 minutes. These examples illustrate how speed changes time; actual walking and running times vary with fitness, experience, route, and individual ability.
        </p>

        <h2>Is Walking One Mile a Day Enough?</h2>
        <p>
          Walking a mile each day can add regular movement to your routine and may be a manageable way to build consistency. Its benefits depend on your pace and overall activity, and one mile does not necessarily meet everyone’s physical-activity needs. Consider your health and goals, and build toward an activity level that works for you.
        </p>

        <h2>Walking Time Calculation Limitations</h2>
        <p>
          The chart and formula estimate time at a steady speed. Hills, uneven or soft terrain, weather, traffic lights, other stops, walking breaks, fitness level, and fatigue can all change your actual pace. Allow extra time for these conditions; your real trip may take longer or shorter than the estimate.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/how-long-to-walk-a-mile" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}

