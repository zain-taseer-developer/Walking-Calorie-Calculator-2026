import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataTable } from "@/components/content/DataTable";
import { PrintButton } from "@/components/content/PrintButton";
import { calculateWalkingCalories } from "@/lib/calc";
import { Table, Flame, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Calories Burned Walking Chart: Printable Matrix by Weight & Speed",
  description:
    "Comprehensive, printable calories burned walking chart by weight (110–260 lbs) and speed (2.0–4.5 mph) for 30 and 60 minutes based on 2011 Compendium MET data.",
  canonicalPath: "/walking-calories-burned-chart",
  keywords: [
    "calories burned walking chart",
    "calories burned walking by weight",
    "calories burned walking table",
    "walking calorie burn chart",
  ],
});

export default function WalkingCaloriesBurnedChartPage() {
  const chartWeights = [110, 125, 140, 155, 170, 185, 200, 215, 230, 245, 260];
  const chartSpeeds = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5];

  const buildChart = (durationMins: number) => {
    return chartWeights.map((wt) => {
      const row: (string | number)[] = [`${wt} lbs (${Math.round(wt * 0.4536)} kg)`];
      chartSpeeds.forEach((spd) => {
        const res = calculateWalkingCalories({
          unitSystem: "imperial",
          mode: "time-speed",
          weightLbs: wt,
          weightKg: wt * 0.45359237,
          heightFt: 5,
          heightIn: 9,
          heightCm: 175,
          durationHours: 0,
          durationMinutes: durationMins,
          speedMph: spd,
          speedKmh: spd * 1.609344,
          distanceMiles: (spd * durationMins) / 60,
          distanceKm: ((spd * durationMins) / 60) * 1.609344,
          steps: Math.round(((spd * durationMins) / 60) * 2100),
          inclinePercent: 0,
          terrain: "pavement",
          backpackWeightLbs: 0,
          backpackWeightKg: 0,
          showNetCalories: false,
        });
        row.push(res.grossCalories);
      });
      return row;
    });
  };

  const rows30Min = buildChart(30);
  const rows60Min = buildChart(60);

  const faqs: FAQItem[] = [
    {
      question: "How do I read this walking calorie burn chart?",
      answer:
        "Locate your body weight in the left-hand column, then trace across horizontally to find your estimated walking velocity. The intersecting cell indicates the total gross calories expended during that time interval on level ground.",
    },
    {
      question: "Why does body weight impact the numbers so significantly?",
      answer:
        "Calorie expenditure is directly proportional to mass. A 220-pound person burns exactly twice as much energy moving their body across one mile as a 110-pound person, because double the mechanical work is performed by skeletal muscle.",
    },
    {
      question: "Can I print or save this chart as a PDF?",
      answer:
        "Yes, use the print button at the top of the page or press Ctrl+P (Cmd+P on Mac). The page layout automatically strips navigational elements and advertisements, providing a clean, high-contrast printable fitness matrix.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Walking Calories Burned Chart" }]} />

      <div className="my-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
          <Table className="w-3.5 h-3.5" />
          <span>Printable Reference Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Calories Burned Walking Chart
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          High-density reference charts by body weight (110 to 260 lbs) and walking speed for 30-minute and 60-minute workouts.
        </p>
      </div>

      <div className="flex justify-center my-4 no-print">
        <PrintButton />
      </div>

      <AdSlot format="horizontal" slotId="chart-top" />

      {/* 30-Minute Chart */}
      <DataTable
        title="Calories Burned in 30 Minutes of Walking"
        caption="Values based on 2011 Compendium of Physical Activities MET regression on firm, level ground."
        headers={[
          "Body Weight",
          "2.0 mph (Stroll)",
          "2.5 mph (Casual)",
          "3.0 mph (Moderate)",
          "3.5 mph (Brisk)",
          "4.0 mph (Power)",
          "4.5 mph (Fast)",
        ]}
        rows={rows30Min}
        highlightColumnIndex={4}
      />

      <AdSlot format="in-article" slotId="chart-mid" />

      {/* 60-Minute Chart */}
      <DataTable
        title="Calories Burned in 60 Minutes (1 Hour) of Walking"
        caption="Gross energy expenditure across an extended 1-hour continuous walking session."
        headers={[
          "Body Weight",
          "2.0 mph (Stroll)",
          "2.5 mph (Casual)",
          "3.0 mph (Moderate)",
          "3.5 mph (Brisk)",
          "4.0 mph (Power)",
          "4.5 mph (Fast)",
        ]}
        rows={rows60Min}
        highlightColumnIndex={4}
      />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <h2>Using These Tables for Calorie Deficit Planning</h2>
        <p>
          To utilize these charts for targeted fat loss, calculate your total weekly walking volume. For example, if a 170-pound adult walks at a brisk 3.5 mph pace for 30 minutes, 5 days per week:
        </p>
        <ul>
          <li><strong>Single session burn:</strong> 166 kcal</li>
          <li><strong>Weekly caloric deficit:</strong> 166 kcal × 5 sessions = 830 kcal/week</li>
          <li><strong>Monthly cumulative burn:</strong> ~3,600 kcal (~1 full pound of pure body fat loss per month from walking alone)</li>
        </ul>
        <p>
          Want real-time custom results for your exact minutes, incline %, or carried backpack weight? Use our interactive{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>{" "}
          on the homepage.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/walking-calories-burned-chart" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
