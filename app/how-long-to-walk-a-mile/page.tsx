import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { Callout } from "@/components/content/Callout";
import { MiniCalculator } from "@/components/calculator/MiniCalculator";
import { Clock, Timer, CheckCircle, Navigation } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "How Long Does It Take to Walk a Mile? (1–5 Mile Chart)",
  absoluteTitle: true,
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
    ["1 Mile", "30:00", "24:00", "20:00", "17:08", "15:00", "13:20"],
    ["2 Miles", "1 hr 00 min", "48:00", "40:00", "34:17", "30:00", "26:40"],
    ["3 Miles", "1 hr 30 min", "1 hr 12 min", "1 hr 00 min", "51:25", "45:00", "40:00"],
    ["4 Miles", "2 hrs 00 min", "1 hr 36 min", "1 hr 20 min", "1 hr 08 min", "1 hr 00 min", "53:20"],
    ["5 Miles", "2 hrs 30 min", "2 hrs 00 min", "1 hr 40 min", "1 hr 25 min", "1 hr 15 min", "1 hr 06 min"],
    ["6.2 Miles (10K)", "3 hrs 06 min", "2 hrs 28 min", "2 hrs 04 min", "1 hr 46 min", "1 hr 33 min", "1 hr 22 min"],
    ["10 Miles", "5 hrs 00 min", "4 hrs 00 min", "3 hrs 20 min", "2 hrs 51 min", "2 hrs 30 min", "2 hrs 13 min"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to walk 1 mile at an average pace (how long would it take to walk a mile)?",
      answer:
        "When asking 'how long would it take to walk a mile', 'how many minutes is a mile', 'how many min are in a mile', or 'one mile is how many minutes?', for a healthy adult walking at a standard moderate pace of 3.0 mph, it takes exactly 20 minutes to walk one mile. At an easy stroll (2.5 mph), it takes 24 minutes, while a purposeful brisk walk (3.5 mph) covers a mile in 17 minutes and 8 seconds. By contrast, what is the average time to run 1 mile (what is the average time to run a mile)? The average recreational adult runs a mile in 9 to 11 minutes.",
    },
    {
      question: "How long does it take to walk half a mile?",
      answer:
        "Walking half a mile (0.5 miles) takes approximately 8.5 to 12 minutes depending on your cadence. At a brisk 3.5 mph pace, half a mile takes 8 minutes and 34 seconds.",
    },
    {
      question: "How long does it take to walk 2 miles (how long would it take to walk 2 miles / how long does it take to walk two miles)?",
      answer:
        "Walking 2 miles takes approximately 30 to 40 minutes for most adults. Walking briskly at 3.5 mph takes approximately 34 minutes, burning between 130 and 220 calories depending on your body weight.",
    },
    {
      question: "How long does it take to walk 3 miles (how long does it take to walk three miles / how long would it take to walk 3 miles)?",
      answer:
        "Walking 3 miles takes approximately 45 minutes to 1 hour. At a moderate 3.0 mph pace, 3 miles takes exactly 60 minutes. Maintaining a brisk 3.5 mph pace completes the distance in 51 minutes. Walking three miles a day burns between 210 and 320 calories and provides exceptional cardiovascular conditioning.",
    },
    {
      question: "How long to walk 5 miles (how long would it take to walk 5 miles / how long will it take to walk 5 miles)?",
      answer:
        "Walking 5 miles takes roughly 1 hour and 15 minutes to 1 hour and 40 minutes. At an average brisk pace of 3.2 mph, you will complete 5 miles in approximately 1 hour and 34 minutes.",
    },
    {
      question: "How long does it take to walk 6 miles and how long does it take to walk 7 miles?",
      answer:
        "Walking 6 miles takes about 1 hour and 42 minutes at a brisk pace (or 2 hours at moderate pace). Walking 7 miles takes roughly 2 hours to 2 hours and 20 minutes.",
    },
    {
      question: "How long does it take to walk 10 miles (how long would it take to walk 10 miles), 11 miles, and 20 miles?",
      answer:
        "Walking 10 miles takes between 2 hours and 50 minutes (at a brisk 3.5 mph) and 3 hours and 20 minutes (at 3.0 mph). If wondering how long is 11 miles, it takes approximately 3 hours and 10 minutes to 3 hours and 40 minutes. Walking an ultra-distance like how long does it take to walk 20 miles takes between 5 hours and 45 minutes and 7 hours of continuous walking.",
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
            For an average adult, walking <strong>1 mile takes between 15 and 22 minutes</strong>. At a normal everyday pace (3.0 mph), it takes exactly <strong>20 minutes</strong>; at a brisk aerobic pace (3.5 mph), it takes <strong>17 minutes</strong>; and at an easy stroll (2.5 mph), it takes <strong>24 minutes</strong>.
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
        <h2>Complete Walking Duration Reference Matrix (1 to 10 Miles)</h2>
        <p>
          Whether you are preparing for a charity walk, calculating your commute time, or tracking your aerobic workout duration, the reference matrix below outlines exact split times across speeds:
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

        <h2>Factors That Change How Long It Takes to Walk a Mile</h2>
        <ul>
          <li><strong>Age &amp; Mobility:</strong> Gait velocity naturally slows by ~1.5% per decade after age 60 as stride amplitude shortens.</li>
          <li><strong>Terrain Grade:</strong> Walking up an 8% outdoor grade reduces forward horizontal velocity by approximately 20% to 30%.</li>
          <li><strong>Footwear:</strong> Supportive athletic walking shoes with low heel drop and responsive cushioning improve stride cadence compared to casual sneakers.</li>
        </ul>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/how-long-to-walk-a-mile" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}

