import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { MiniCalculator } from "@/components/calculator/MiniCalculator";
import { Footprints, Heart, Shield, Activity, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "How Many Steps a Day Should You Walk? (Science-Backed Guide)",
  description:
    "How many steps a day is good? Research shows 7,500 to 10,000 steps per day provides peak longevity, cardiovascular protection, and metabolic health.",
  canonicalPath: "/how-many-steps-a-day",
  keywords: [
    "average steps per day",
    "how many steps a day is good",
    "how many miles should you walk a day",
    "how many steps should i walk a day",
    "steps a day for health",
  ],
});

export default function HowManyStepsADayPage() {
  const activityTiers = [
    ["Sedentary Lifestyle", "< 5,000 steps", "< 2.25 miles", "Elevated cardiovascular & metabolic risks"],
    ["Low Active", "5,000 – 7,499 steps", "2.25 – 3.4 miles", "Typical daily baseline for non-exercising adults"],
    ["Somewhat Active", "7,500 – 9,999 steps", "3.4 – 4.5 miles", "Significant longevity & blood pressure benefits begin"],
    ["Active", "10,000 – 12,499 steps", "4.5 – 5.6 miles", "Optimal cardiovascular fitness & weight management"],
    ["Highly Active", "12,500+ steps", "5.6+ miles", "Athletic conditioning, high non-exercise thermogenesis"],
  ];

  const faqs: FAQItem[] = [
    {
      question: "What is the average number of steps per day for adults?",
      answer:
        "In the United States, the average adult takes between 3,000 and 4,000 steps per day (roughly 1.5 to 2.0 miles), which falls into the medically sedentary category. In countries with greater public transit infrastructure and walkable cities (such as Japan, Spain, and Switzerland), adults average between 6,000 and 7,500 steps per day.",
    },
    {
      question: "Is 7,000 steps a day enough for longevity?",
      answer:
        "Yes. Landmark studies published in JAMA Network Open and The Lancet Public Health found that taking 7,000 to 8,000 steps per day reduced premature mortality risk by 50% to 70% compared to taking fewer than 4,000 steps. For adults over age 60, mortality benefits plateaued around 6,000 to 8,000 steps, while adults under 60 continued seeing modest incremental benefits up to 10,000 steps.",
    },
    {
      question: "How many miles should you walk a day?",
      answer:
        "A daily target of 3 to 5 miles (approximately 6,500 to 11,000 steps) satisfies the Centers for Disease Control (CDC) guidelines of 150 minutes of moderate-intensity aerobic exercise per week. Walking this distance maintains healthy vascular elasticity, insulin sensitivity, and resting metabolic rate.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "How Many Steps a Day Should You Walk?" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>Epidemiological Fitness Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How Many Steps a Day Should You Take?
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          The medical evidence behind daily step counts: what the latest research says about 5k, 7.5k, 10k, and 15k steps for longevity and fat loss.
        </p>
      </div>

      <KeyTakeaways
        title="Scientific Consensus Summary"
        points={[
          "Longevity curves level off between 7,500 and 8,000 steps per day for adults over 60, and between 8,000 and 10,000 steps for adults under 60.",
          "Walking cadence matters: accumulating steps at a brisk pace (100+ steps per minute) confers greater cardiovascular benefits than slow strolling.",
          "For weight loss and maintenance, 10,000 to 12,000 steps provides the necessary caloric expenditure to offset sedentary desk jobs.",
          "Breaking up sedentary periods with 5-minute walking bouts every hour improves post-meal glucose spikes by up to 34%.",
        ]}
      />

      <AdSlot format="horizontal" slotId="steps-a-day-top" />

      {/* Embedded Mini Calculator */}
      <MiniCalculator
        defaultWeightLbs={160}
        defaultDurationMins={60}
        defaultMph={3.2}
        title="Calculate Calories Burned for Your Daily Steps"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <h2>Physical Activity Classification Tiers</h2>
        <p>
          In clinical research, the landmark Tudor-Locke and Bassett classification index categorizes adult physical activity levels based on 24-hour step volumes:
        </p>

        <DataTable
          title="Daily Physical Activity Step Categories"
          caption="Standard clinical index used in public health epidemiology."
          headers={["Category Tier", "Daily Step Count", "Approx. Mileage", "Health Implications"]}
          rows={activityTiers}
          highlightColumnIndex={1}
        />

        <h2>The Truth About the 10,000 Steps Target</h2>
        <p>
          While the number 10,000 began as a clever marketing slogan in Japan in 1964, large-scale modern cohort analyses have validated that it remains an outstanding goal. However, you do not need to feel discouraged if you currently average 4,000 steps. Moving from 4,000 to 7,000 steps produces the largest relative reduction in disease risk across the entire spectrum.
        </p>

        <h2>Walking Cadence, Stair Climbing & Daily Habits</h2>
        <p>
          Deciding to <strong>go for a walk</strong> (or as some search, <strong>go for a walking</strong> session) is one of the highest-yield health decisions you can make. The <strong>normal person walking speed</strong> is roughly 2.8 to 3.2 mph (110 to 120 steps per minute).
        </p>
        <p>
          Epidemiological trials highlight the immense <strong>benefits of walking 45 minutes a day</strong>, which burns 180 to 240 calories, improves resting blood glucose, and reduces cardiovascular risk by up to 30%.
        </p>
        <p>
          Many fitness trackers also award vertical elevation metrics for climbing stairs. But <strong>what is a flight of stairs</strong> (or a <strong>flight of staircase</strong>)? In architectural standards, a typical flight consists of 12 to 16 vertical steps (averaging roughly 10 vertical feet). When asking <strong>how many stairs in a flight</strong>, <strong>how many stairs is a flight of stairs</strong>, <strong>how many steps in a flight of stairs</strong>, or <strong>how many stairs in a flight of steps</strong>, standard fitness wearables calibrate one flight as 10 to 12 stair steps. Climbing stairs burns roughly 3 to 4 times more energy per minute than level walking!
        </p>

        <p>
          Want to know how many calories your specific daily step volume burns based on your body weight? Head over to our main{" "}
          <Link href="/" className="font-bold text-emerald-600 underline">
            walking calorie calculator
          </Link>{" "}
          for live calculations.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/how-many-steps-a-day" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}

