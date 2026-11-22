
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
import { calculateWalkingCalories, getWalkingMet } from "@/lib/calc";
import { Table } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Calories Burned Walking Chart (30 Min & 1 Hour) by Weight",
  description:
    "Free printable walking calories burned chart. Find calories burned in 30 minutes or 1 hour by body weight (110–260 lbs) and speed, plus calories per mile.",
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
      const row: (string | number)[] = [
        `${wt} lbs (${Math.round(wt * 0.4536)} kg)`,
      ];

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

  const rowsPerMile = chartWeights.map((wt) => {
    const weightKg = wt * 0.45359237;

    return [
      `${wt} lbs (${Math.round(wt * 0.4536)} kg)`,
      ...chartSpeeds.map((speed) =>
        Math.round((getWalkingMet(speed) * weightKg) / speed)
      ),
    ];
  });

  const faqs: FAQItem[] = [
    {
      question: "How do I read this walking calorie burn chart?",
      answer:
        "Locate your body weight in the left-hand column, then trace across horizontally to find your walking speed. The intersecting cell shows the estimated gross calories burned for that duration on level ground. If your weight falls between two rows, estimate between the nearest values to find your approximate calorie burn.",
      answerContent: (
        <>
          Locate your body weight in the left-hand column, then trace across horizontally to find your walking speed. The intersecting cell shows the estimated gross calories burned for that duration on level ground. If your weight falls between two rows, estimate between the nearest values to find your approximate calorie burn.
        </>
      ),
    },
    {
      question: "What if my weight is not listed in the chart?",
      answer:
        "If your weight falls between two listed values, you can estimate your calorie burn by comparing the nearest rows. For example, if you weigh 160 lbs, your estimated result will fall between the 155 lb and 170 lb rows. For a more specific estimate, enter your exact body weight and walking details into our walking calorie calculator.",
      answerContent: (
        <>
          If your weight falls between two listed values, you can estimate your calorie burn by comparing the nearest rows. For example, if you weigh 160 lbs, your estimated result will fall between the 155 lb and 170 lb rows. For a more specific estimate, enter your exact body weight and walking details into our{" "}
          <Link href="/" className="font-bold text-brand-600 underline">
            walking calorie calculator
          </Link>.
        </>
      ),
    },
    {
      question: "Can I print or save this chart as a PDF?",
      answer:
        "Yes. Use the Print / Save as PDF button at the top of the page, or press Ctrl+P (Cmd+P on Mac) and choose Save as PDF. The print layout hides the navigation and displays the chart tables in a clean format.",
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

      <div className="not-prose my-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-5">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong>Quick answer:</strong> A 155 lb (70.3 kg) person burns about 169 calories in 30 minutes, or about 337 calories in 60 minutes, walking at a brisk 3.5 mph. Heavier body weights and faster paces burn more calories. Find your weight in the tables below.
        </p>
      </div>

      <AdSlot format="horizontal" slotId="chart-top" />

      {/* 30-Minute Chart */}
      <DataTable
        title="Calories Burned in 30 Minutes of Walking"
        caption="Values use 2024 Adult Compendium walking MET reference points with linear interpolation on firm, level ground."
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
        <h2>Gross vs. Net Calories in This Chart</h2>
        <p>
          All values in the tables above are gross calories, which include the energy your body would burn at rest anyway. To estimate the extra (net) calories burned specifically by walking, multiply a chart value by the factor for your speed:
        </p>
      </div>

      <DataTable
        headers={[
          "Speed",
          "2.0 mph",
          "2.5 mph",
          "3.0 mph",
          "3.5 mph",
          "4.0 mph",
          "4.5 mph",
        ]}
        rows={[
          ["Net factor", "0.64", "0.67", "0.74", "0.79", "0.82", "0.86"],
        ]}
        highlightColumnIndex={4}
      />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <p>
          Example: a 155 lb person walking for 30 minutes at 3.5 mph burns 169 calories gross, or about 134 calories net (169 x 0.79). Our walking calorie calculator can show net calories with its Show Net Calories toggle.
        </p>

        <h2>Calories Burned Walking One Mile</h2>
        <p>
          These values show approximate gross calories burned per mile at each walking speed, using the same MET values as the tables above (calories per mile = MET x weight in kg / speed in mph). Per-mile burn is lowest around 3.0 mph: gross values include resting energy, which adds up over more minutes at slow speeds, while faster walking uses more energy each minute.
        </p>
      </div>

      <DataTable
        headers={[
          "Body Weight",
          "2.0 mph (Stroll)",
          "2.5 mph (Casual)",
          "3.0 mph (Moderate)",
          "3.5 mph (Brisk)",
          "4.0 mph (Power)",
          "4.5 mph (Fast)",
        ]}
        rows={rowsPerMile}
        highlightColumnIndex={4}
      />

      <div className="prose prose-slate dark:prose-invert max-w-none my-10 space-y-4">
        <h2>How This Chart Is Calculated</h2>
        <p>
          Calories burned = MET x body weight (kg) x time (hours). Walking MET reference points come from the 2024 Adult Compendium: 2.0 mph = 2.8, 2.5 mph = 3.0, 3.0 mph = 3.8, 3.5 mph = 4.8, 4.0 mph = 5.5, 4.5 mph = 7.0, and 5.0 mph = 8.5. Intermediate speeds are estimated by linear interpolation.
        </p>

        <p>
          Example: a 155 lb (70.3 kg) person walking at 3.5 mph for 30 minutes burns 4.8 x 70.3 x 0.5 = about 169 calories.
        </p>

        <p>
          Values assume level, firm ground with no backpack, and are rounded to the nearest whole calorie. Incline, terrain, and carried load increase calorie burn. Use our{" "}
          <Link
            href="/treadmill-incline-calculator"
            className="font-bold text-brand-600 underline"
          >
            Treadmill Incline Calculator &amp; Pace Chart
          </Link>{" "}
          for treadmill grades. All figures are estimates, not exact measurements.
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Source:{" "}
          <a
            href="https://pacompendium.com/walking/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-600"
          >
            2024 Adult Compendium of Physical Activities, Walking
          </a>.
        </p>
      </div>

      <FAQSection faqs={faqs} />

      <RelatedTools currentPath="/walking-calories-burned-chart" />

      <AuthorBox updatedAt="November 2026" />
    </div>
  );
}
