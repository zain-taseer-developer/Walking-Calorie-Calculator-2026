import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata, generateWebApplicationSchema } from "@/lib/seo";
import { calculateWalkingCalories } from "@/lib/calc";
import { CalculatorInputs } from "@/lib/types";
import { WalkingCalculator } from "@/components/calculator/WalkingCalculator";
import { TableOfContents, TocItem } from "@/components/content/TableOfContents";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { Callout } from "@/components/content/Callout";
import { DataTable } from "@/components/content/DataTable";
import { FAQSection, FAQItem } from "@/components/content/FAQSection";
import { AuthorBox } from "@/components/content/AuthorBox";
import { RelatedTools } from "@/components/content/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  Flame,
  CheckCircle2,
  TrendingUp,
  Activity,
  Footprints,
  BookOpen,
  Scale,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Walking Calorie Calculator Free – Calories, Steps & Pace",
  description:
    "Calculate calories burned walking with our walking calorie calculator. Track calories, steps, distance, pace, speed, and incline using official 2011 Compendium MET data.",
  canonicalPath: "/",
  keywords: [
    "walking calorie calculator",
    "calories burned walking",
    "steps to calories",
    "step calorie calculator",
    "how many calories does 20000 steps burn",
    "how many calories can i burn walking for an hour",
    "how many calories does walking 10000 steps burn",
  ],
});

export default function HomePage() {
  const tocItems: TocItem[] = [
    { id: "calculator", label: "Interactive Walking Calorie Calculator" },
    { id: "how-it-works", label: "How the Walking Calorie Calculator Works (The Science & Math)" },
    { id: "calorie-tables-duration", label: "Walking Calories Examples & Charts (30 Min & 1 Hour)" },
    { id: "calorie-tables-steps", label: "Calories Burned by Steps Table (1k to 20,000 Steps)" },
    { id: "key-factors", label: "7 Key Factors That Determine Your Caloric Burn" },
    { id: "gross-vs-net", label: "Gross vs. Net Calories: Why the Difference Matters" },
    { id: "walking-for-weight-loss", label: "Walking for Weight Loss: Realistic Caloric Deficits" },
    { id: "tips-burn-more", label: "6 Proven Strategies to Burn More Calories Walking" },
    { id: "tracker-accuracy", label: "Smartwatch Accuracy: Apple Watch, Garmin & Fitbits" },
    { id: "why-use-calculator", label: "Why Use Our Walking Calorie Calculator?" },
    { id: "faq", label: "Frequently Asked Questions" },
    { id: "references", label: "Sources, Methodology & Disclaimer" },
  ];

  // Precompute 30 min and 60 min walking charts using pure lib/calc
  const weightsLb = [120, 140, 160, 180, 200, 220, 250];
  const speedsMph = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5];

  const chart30MinRows = weightsLb.map((wt) => {
    const row: (string | number)[] = [`${wt} lbs (${Math.round(wt * 0.4536)} kg)`];
    speedsMph.forEach((spd) => {
      const res = calculateWalkingCalories({
        unitSystem: "imperial",
        mode: "time-speed",
        weightLbs: wt,
        weightKg: wt * 0.45359237,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 0,
        durationMinutes: 30,
        speedMph: spd,
        speedKmh: spd * 1.609344,
        distanceMiles: (spd * 30) / 60,
        distanceKm: ((spd * 30) / 60) * 1.609344,
        steps: Math.round(((spd * 30) / 60) * 2100),
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

  const chart60MinRows = weightsLb.map((wt) => {
    const row: (string | number)[] = [`${wt} lbs (${Math.round(wt * 0.4536)} kg)`];
    speedsMph.forEach((spd) => {
      const res = calculateWalkingCalories({
        unitSystem: "imperial",
        mode: "time-speed",
        weightLbs: wt,
        weightKg: wt * 0.45359237,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 1,
        durationMinutes: 0,
        speedMph: spd,
        speedKmh: spd * 1.609344,
        distanceMiles: spd,
        distanceKm: spd * 1.609344,
        steps: Math.round(spd * 2100),
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

  // Precompute Step Calorie Table
  const stepCounts = [1000, 5000, 7500, 10000, 15000, 20000];
  const stepChartRows = stepCounts.map((steps) => {
    const row: (string | number)[] = [`${steps.toLocaleString()} steps`];
    weightsLb.forEach((wt) => {
      const res = calculateWalkingCalories({
        unitSystem: "imperial",
        mode: "steps",
        weightLbs: wt,
        weightKg: wt * 0.45359237,
        heightFt: 5,
        heightIn: 9,
        heightCm: 175,
        durationHours: 0,
        durationMinutes: 0,
        speedMph: 3.5,
        speedKmh: 5.63,
        distanceMiles: 0,
        distanceKm: 0,
        steps,
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

  const faqs: FAQItem[] = [
    {
      question: "How many calories do you burn walking a mile?",
      answer:
        "On average, a person burns roughly 65 to 100 calories per mile of walking on flat ground, depending primarily on their body weight and walking velocity. A 140-pound individual typically burns approximately 65 to 75 calories per mile, whereas a 200-pound individual expends between 95 and 110 calories over the same distance. The energy required to move your physical body mass across space remains relatively consistent per mile regardless of whether you walk moderately or briskly, although faster paces recruit additional muscle mass and elevate post-exercise oxygen consumption.",
    },
    {
      question: "How many calories does walking 10,000 steps burn?",
      answer:
        "Walking 10,000 steps typically expends between 300 and 550 calories for most adults. Because 10,000 steps equates to roughly 4.2 to 5.0 miles (depending on height and natural stride length), the total caloric expenditure depends heavily on your body mass. A 130-pound adult will burn approximately 320 to 360 calories, while someone weighing 180 pounds will expend approximately 450 to 510 calories across the same 10,000 steps.",
    },
    {
      question: "Does 20,000 steps burn a lot more calories?",
      answer:
        "Yes, walking 20,000 steps literally doubles the mechanical work performed by your lower limbs, yielding an estimated burn of 650 to 1,100 calories. Covering approximately 8.5 to 10 miles in a single day creates a massive non-exercise activity thermogenesis (NEAT) deficit. However, walking 20,000 steps daily can trigger noticeable appetite compensation and requires proper footwear, arch support, and progressive volume increases to prevent plantar fasciitis or patellofemoral inflammation.",
    },
    {
      question: "How many calories can I burn walking for an hour?",
      answer:
        "Walking for one hour burns anywhere from 200 to 500 calories depending on your walking pace, body weight, and incline. A 160-pound adult walking at a casual 2.5 mph stroll expends roughly 218 calories in 60 minutes. Increasing your speed to a brisk 3.5 mph elevates that expenditure to approximately 312 calories, while walking on a 5% treadmill incline or steep outdoor hills can push the one-hour burn past 480 calories.",
    },
    {
      question: "Can you realistically lose weight by walking?",
      answer:
        "Yes, walking is one of the most sustainable, low-impact, and medically supported exercise modalities for fat reduction and long-term weight management. Creating an energy deficit of 300 to 500 calories per day through a combination of daily brisk walking (45 to 60 minutes) and balanced nutrition leads to safe fat loss of about 0.5 to 1.0 pound per week. Because walking produces minimal central nervous system fatigue and lower cortisol spikes than high-intensity sprints, it rarely triggers the voracious rebound hunger often associated with grueling workouts.",
    },
    {
      question: "How many steps does it take to lose one pound of fat?",
      answer:
        "Because one pound of stored human adipose tissue equates to roughly 3,500 dietary calories, and each walking step burns approximately 0.04 to 0.055 calories (varying with body mass), it takes approximately 70,000 to 90,000 steps to burn one pound of fat if your caloric intake remains strictly at your baseline maintenance level. Accumulating 10,000 steps every day creates that 3,500-calorie deficit in approximately 7 to 9 days.",
    },
    {
      question: "How long does it take to walk a mile?",
      answer:
        "For an average, healthy adult, walking one mile takes between 15 and 20 minutes at a normal to moderate pace (3.0 to 4.0 mph). A leisurely, window-shopping stroll at 2.0 mph takes approximately 30 minutes per mile. A brisk, purposeful walk at 3.5 mph takes approximately 17 minutes and 8 seconds per mile, while a competitive power walk at 4.5 mph covers a mile in just 13 minutes and 20 seconds.",
    },
    {
      question: "What is considered a normal walking pace?",
      answer:
        "Epidemiological studies and clinical gait analyses categorize a normal walking pace for healthy adults between 2.8 and 3.2 mph (4.5 to 5.1 km/h). Walking speeds below 2.5 mph are typically classified as casual strolls, while walking speeds above 3.5 mph are clinically designated as brisk aerobic exercise capable of elevating your heart rate into Zone 2 endurance training.",
    },
    {
      question: "How accurate is the Apple Watch or fitness tracker for walking calories?",
      answer:
        "Peer-reviewed validation studies (including research from Stanford University and the British Journal of Sports Medicine) reveal that commercial smartwatches and fitness bands exhibit an error rate between 15% and 30% when estimating active caloric burn. Devices measure wrist photoplethysmography (heart rate) and multi-axis accelerometry, but cannot measure individual metabolic efficiency, mitochondrial density, or foot ground-reaction forces. Our calculator uses direct MET regression tables from the Compendium of Physical Activities, providing an objective, standardized physiological estimate.",
    },
    {
      question: "Is walking on an incline worth it for burning calories?",
      answer:
        "Absolutely. Walking on an incline dramatically amplifies the mechanical work demanded from your calves, hamstrings, gluteus maximus, and cardiovascular system. According to the ACSM metabolic equations, each 1% increase in treadmill incline increases energy expenditure by roughly 10% to 12% at the same walking speed. Walking at 3.0 mph on a 10% incline burns nearly the same amount of calories as jogging flat at 5.5 mph, with significantly less orthopedic impact on your knee and hip joints.",
    },
  ];

  return (
    <div className="w-full">
      {/* WebApplication JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebApplicationSchema({
              name: "Walking Calorie Calculator",
              url: "/",
              description:
                "Free, scientifically validated walking calorie calculator using 2011 Compendium MET interpolation and ACSM incline formulas.",
            })
          ),
        }}
      />

      {/* Hero Section & Above-the-Fold Calculator Container */}
      <section
        id="calculator"
        className="pt-6 sm:pt-10 pb-12 bg-gradient-to-b from-brand-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title Block */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/70 dark:bg-brand-950/80 text-brand-800 dark:text-brand-300 text-xs font-bold mb-3 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Evidence-Based 2011 Compendium MET Engine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Walking Calorie Calculator
            </h1>
            
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate calories burned while walking based on your body weight, height, walking duration, speed, distance, or steps. Choose your preferred calculation method, adjust treadmill incline and other activity settings, and get estimates for calories burned, distance, steps, and walking pace, along with weight-loss projections.
            </p>
          </div>

          {/* Above-The-Fold Interactive Flagship Calculator */}
          <WalkingCalculator />

          {/* Below-Calculator Ad Slot */}
          <AdSlot format="horizontal" slotId="home-below-calc" label="Sponsor Advertisement" />
        </div>
      </section>

      {/* Main Authoritative Content Section (2,200+ Words) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Table of Contents */}
        <TableOfContents items={tocItems} />

        {/* Section 1: How the Walking Calorie Calculator Works */}
        <section id="how-it-works" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How the Walking Calorie Calculator Works (The Science &amp; Math)
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Estimating your true energy expenditure during a walking session is not guesswork. Human locomotion requires skeletal muscle contractions that consume oxygen and metabolize stored glycogen and lipids. In exercise physiology, this rate of oxygen consumption is quantified using the <strong>Metabolic Equivalent of Task (MET)</strong>.
          </p>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            By international medical convention, <strong>1 MET represents the energy cost of sitting quietly at rest</strong>, which equates to roughly 3.5 milliliters of oxygen per kilogram of body weight per minute (or approximately 1.0 kilocalorie per kilogram per hour for an average adult). When you transition from seated rest to walking, your working quadriceps, glutes, hamstrings, and calves demand significantly more oxygen.
          </p>

          <div className="my-6 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              The Standard Walking Calorie Equation:
            </h3>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm sm:text-base text-brand-700 dark:text-brand-300 font-bold overflow-x-auto">
              Calories (kcal) = MET × Weight (kg) × Duration (hours)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Source: Ainsworth BE, et al. <em>2011 Compendium of Physical Activities</em>. Medicine &amp; Science in Sports &amp; Exercise.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
            Worked Step-by-Step Example
          </h3>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Consider a walker weighing <strong>160 pounds (72.57 kg)</strong> who completes a <strong>45-minute (0.75 hours)</strong> brisk walk at a speed of <strong>3.5 mph (5.6 km/h)</strong> on level asphalt:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-2">
            <li><strong>Determine MET value:</strong> According to the 2011 Compendium (code 17190), walking at 3.5 mph has a benchmark MET of <strong>4.3</strong>.</li>
            <li><strong>Convert body weight:</strong> 160 lbs ÷ 2.20462 = <strong>72.57 kg</strong>.</li>
            <li><strong>Convert duration:</strong> 45 minutes ÷ 60 = <strong>0.75 hours</strong>.</li>
            <li><strong>Calculate gross expenditure:</strong> 4.3 × 72.57 kg × 0.75 hours = <strong>234.04 kcal</strong>.</li>
          </ul>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Our calculator executes this exact calculation with real-time linear interpolation between speeds so you receive smooth, scientifically rigorous numbers whether you walk at 2.8 mph, 3.3 mph, or 4.2 mph.
          </p>
        </section>

        {/* Section 2: Walking Calories Examples and Charts */}
        <section id="calorie-tables-duration" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Walking Calories Examples &amp; Charts (30 Minutes &amp; 1 Hour)
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            These examples show approximate gross calories burned at different body weights, walking durations, and speeds. Estimates use the same calculator engine and official 2011 Compendium MET values for level pavement with no incline; individual results vary.
          </p>

          <DataTable
            title="Calories Burned in 30 Minutes of Walking"
            titleLevel={3}
            caption="Approximate gross calories by body weight and walking speed on level pavement (no incline)."
            headers={[
              "Weight (lbs / kg)",
              "Approx. kcal · 2.0 mph (Stroll)",
              "Approx. kcal · 2.5 mph (Casual)",
              "Approx. kcal · 3.0 mph (Moderate)",
              "Approx. kcal · 3.5 mph (Brisk)",
              "Approx. kcal · 4.0 mph (Power)",
              "Approx. kcal · 4.5 mph (Fast)",
            ]}
            rows={chart30MinRows}
            highlightColumnIndex={4} // highlight 3.5 mph brisk
          />

          <DataTable
            title="Calories Burned in 60 Minutes (1 Hour) of Walking"
            caption="Approximate gross calories by body weight and walking speed on level pavement (no incline)."
            headers={[
              "Weight (lbs / kg)",
              "Approx. kcal · 2.0 mph (Stroll)",
              "Approx. kcal · 2.5 mph (Casual)",
              "Approx. kcal · 3.0 mph (Moderate)",
              "Approx. kcal · 3.5 mph (Brisk)",
              "Approx. kcal · 4.0 mph (Power)",
              "Approx. kcal · 4.5 mph (Fast)",
            ]}
            rows={chart60MinRows}
            highlightColumnIndex={4}
          />

          <Callout type="tip" title="Notice the Speed Threshold">
            Notice how increasing your walking speed from 3.0 mph (3.5 MET) to 4.5 mph (7.0 MET) doubles your caloric burn rate. Power walking introduces significant vertical center-of-mass oscillation and aggressive arm drive, making it substantially more calorically demanding than flat leisure strolling.
          </Callout>
        </section>

        {/* Mid-Content In-Article Ad Slot */}
        <AdSlot format="in-article" slotId="home-mid-article" label="Sponsored Partner" />

        {/* Section 3: Calories Burned by Steps */}
        <section id="calorie-tables-steps" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calories Burned by Steps Table (1,000 to 20,000 Steps)
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Many walkers monitor their daily activity through pedometers, Fitbits, Garmin watches, or Apple Health step counters. Because a step represents an increment of ground distance governed by your stride length (which averages about 2.5 feet or 0.76 meters for an adult of average height), you can reliably map steps into distance and calories.
          </p>

          <DataTable
            title="Calories Burned by Step Count Across Body Weights"
            titleLevel={3}
            caption="Estimates assume a standard brisk pace (3.5 mph) and average adult stride length (5'9 / 175cm height)."
            headers={[
              "Step Count",
              "120 lbs",
              "140 lbs",
              "160 lbs",
              "180 lbs",
              "200 lbs",
              "220 lbs",
              "250 lbs",
            ]}
            rows={stepChartRows}
            highlightColumnIndex={4} // 180 lbs
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Need a dedicated conversion from steps to miles or steps to calories? Explore our dedicated{" "}
            <Link href="/steps-to-miles-calculator" className="text-brand-600 dark:text-brand-400 font-semibold underline">
              steps to miles calculator
            </Link>{" "}
            and{" "}
            <Link href="/steps-to-calories-calculator" className="text-brand-600 dark:text-brand-400 font-semibold underline">
              steps to calories calculator
            </Link>{" "}
            for personalized stride length calibrations.
          </p>
        </section>

        {/* Section 4: Key Factors Influencing Caloric Expenditure */}
        <section id="key-factors" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            7 Key Factors That Determine Your Caloric Burn
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            While generic charts provide useful baselines, your actual caloric burn during any walk is dictated by seven physiological and environmental variables:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">1</span>
                Body Mass (Total Weight)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Weight is the primary multiplier in human locomotion. Moving a 220-pound body across a 3-mile route demands nearly double the gravitational mechanical energy than moving a 110-pound body across that exact same route.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">2</span>
                Walking Velocity (Pace)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                As velocity increases from 2.5 to 4.5 mph, biomechanical efficiency decreases. At higher speeds, your body expends disproportionately more energy overcoming internal muscular resistance and stabilizing the torso.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">3</span>
                Incline &amp; Elevation Grade
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                According to the American College of Sports Medicine (ACSM), walking uphill forces your lower body to overcome gravity vertically. A modest 5% incline elevates calorie burn by over 50%, while a 12% grade more than doubles it.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">4</span>
                Terrain &amp; Surface Resistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hard surfaces like asphalt or treadmills provide high elastic energy return. Walking on loose beach sand requires up to 1.8x more energy due to foot slippage, while uneven dirt trails demand 1.2x more stabilization work.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">5</span>
                Carried Load (Backpack or Rucking)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Wearing a 20-pound backpack effectively increases your total system mass to body weight + 20 lbs. This exercise, known as &quot;rucking,&quot; significantly increases aerobic workload without joint pounding.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">6</span>
                Age &amp; Body Composition
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Lean muscle tissue consumes more oxygen at rest and during locomotion than adipose tissue. Older individuals with lower skeletal muscle mass experience slightly lower total metabolic burns for identical work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Gross vs Net Calories */}
        <section id="gross-vs-net" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Gross vs. Net Calories: Why the Difference Matters
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            One of the most frequent sources of confusion in fitness tracking is the distinction between <strong>Gross Calories</strong> and <strong>Net Calories</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60">
              <h3 className="font-bold text-teal-900 dark:text-teal-200 text-base mb-1">
                Gross Calories (Total Energy)
              </h3>
              <p className="text-xs sm:text-sm text-teal-800 dark:text-teal-300 leading-relaxed">
                Gross expenditure represents every single calorie burned while walking. This includes both the energy required to move your legs <em>plus</em> the baseline calories your body would have burned anyway just keeping your heart beating and lungs breathing.
              </p>
              <div className="mt-3 font-mono text-xs font-semibold text-teal-900 dark:text-teal-200">
                Formula: MET × Weight (kg) × Hours
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-base mb-1">
                Net Calories (Active Exercise Burn)
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Net expenditure subtracts your resting metabolic rate (1.0 MET). It answers the precise question: <em>&quot;How many extra calories did I burn specifically by choosing to walk rather than resting on the couch?&quot;</em>
              </p>
              <div className="mt-3 font-mono text-xs font-semibold text-amber-900 dark:text-amber-200">
                Formula: (MET − 1) × Weight (kg) × Hours
              </div>
            </div>
          </div>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            If you are tracking macros or balancing your daily food intake against a calorie deficit goal, using <strong>Net Calories</strong> prevents &quot;double-counting&quot; your baseline basal metabolic rate (BMR). Our calculator allows you to toggle between Gross and Net outputs with a single click.
          </p>
        </section>

        {/* Section 6: Walking for Weight Loss */}
        <section id="walking-for-weight-loss" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Walking for Weight Loss: Realistic Caloric Deficits
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Walking is one of the most clinically validated interventions for long-term weight loss and visceral fat reduction. Unlike extreme cardio sessions that often lead to exhaustion and subsequent binge eating, walking maintains steady blood glucose levels and keeps cortisol in check.
          </p>

          <KeyTakeaways
            title="The 3,500 Calorie Rule in Perspective"
            points={[
              "One pound of body fat roughly equates to 3,500 dietary kilocalories (~7,700 kcal per kilogram).",
              "A daily 50-minute brisk walk burning approximately 300 kcal creates a cumulative weekly deficit of 2,100 kcal (~0.6 lbs per week without dietary starvation).",
              "Pairing 8,000 to 10,000 daily steps with a modest 250-calorie dietary adjustment achieves the ideal 1-to-1.5 lb weekly fat loss recommended by the CDC.",
              "Walking protects lean muscle tissue when operating in a modest caloric deficit, keeping resting metabolism higher over time.",
            ]}
          />

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Read our full evidence-based{" "}
            <Link href="/walking-for-weight-loss" className="text-brand-600 dark:text-brand-400 font-semibold underline">
              Walking for Weight Loss Guide
            </Link>{" "}
            for structured 4-week progression plans and nutrition strategies.
          </p>
        </section>

        {/* Section 7: Tips to Burn More Calories Walking */}
        <section id="tips-burn-more" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            6 Proven Strategies to Burn More Calories Walking
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            If you have limited time and want to maximize the caloric density of your walking workouts, implement these evidence-based techniques:
          </p>

          <div className="space-y-3 mt-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                1. The 12-3-30 Treadmill Protocol
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Set a treadmill to a <strong>12% incline</strong>, walk at <strong>3.0 mph</strong>, for <strong>30 minutes</strong>. This viral workout is backed by exercise physiology: walking on a steep 12% grade demands roughly 8.5 to 9.5 METs, burning over 350 calories in 30 minutes for a 160-lb adult.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                2. Practice Interval Walking (Fartlek Style)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Alternate between 3 minutes of moderate walking (3.0 mph) and 1 minute of vigorous power walking (4.5 mph). Studies demonstrate that interval walking stimulates greater post-exercise oxygen consumption (EPOC) than steady-state walking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                3. Engage a 90-Degree Arm Swing
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Bending your elbows to 90 degrees and actively driving your arms from the shoulder joint increases upper body muscle recruitment, boosting total calorie expenditure by an estimated 5% to 10%.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                4. Add a Weighted Ruck or Backpack
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Carrying 10% to 15% of your body weight in a secure backpack challenges core stabilizers and lower-extremity musculature without putting excessive rotational shearing forces on joints.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                5. Seek Out Natural Hills &amp; Stairs
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Incorporating outdoor hill climbs or a flight of stairs engages the gluteal muscles intensely. Climbing stairs has a high MET value of 8.8 to 9.0—comparable to high-speed swimming or running.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                6. Walk in Nature / Mixed Terrain
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Trading manicured sidewalks for dirt trails, grass, or gravel forces your stabilizer muscles to compensate for subtle foot rolls, burning 10% to 20% more calories per mile.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Smartwatch & Fitness Tracker Accuracy */}
        <section id="tracker-accuracy" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Smartwatch Accuracy: Apple Watch, Garmin &amp; Fitbits
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Wearable fitness devices like the Apple Watch Ultra, Garmin Forerunner, WHOOP band, and Fitbit Sense have revolutionized how we monitor physical activity. However, when it comes to measuring <strong>active calories burned walking</strong>, consumers should treat watch outputs as estimates rather than laboratory calorimetry.
          </p>

          <Callout type="warning" title="What the Clinical Research Shows" titleLevel={3}>
            A comprehensive clinical trial conducted by researchers at Stanford University School of Medicine evaluated seven popular wrist-worn activity monitors across 60 volunteers. While devices measured heart rate accurately (median error &lt;5%), <strong>not a single device achieved a median error below 20% for energy expenditure</strong>. Some models overestimated walking calories by as much as 27%, while others underestimated by 18%.
          </Callout>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Why do wrist trackers struggle with calorie accuracy?
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-2">
            <li><strong>Heart rate variability artifacts:</strong> Factors such as caffeine intake, anxiety, hot weather, and dehydration elevate heart rate independently of muscle work.</li>
            <li><strong>Arm movement discrepancies:</strong> Holding a stroller handle, pushing a grocery cart, walking with hands in pockets, or holding a smartphone dampens wrist accelerometer signals.</li>
            <li><strong>Unknown individual metabolic efficiency:</strong> Two people of identical weight and speed can vary by 15% in oxygen cost due to differences in walking biomechanics and muscle fiber composition.</li>
          </ul>
        </section>

        <section id="why-use-calculator" className="my-12 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Use Our Walking Calorie Calculator?
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Get a useful estimate for your walk with a free, straightforward calculator designed to work across screen sizes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Free to Use
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate walking estimates without a subscription or payment.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Mobile-Friendly
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Use the calculator on a phone, tablet, or desktop.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                MET-Based Estimates
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Estimates use activity MET values from the 2011 Compendium of Physical Activities.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Simple, Fast Calculations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose a calculation method, enter your walking details, and get estimates for your activity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: FAQ Accordion */}
        <div id="faq" className="scroll-mt-24">
          <FAQSection
            title="Walking & Calorie Burn FAQs"
            description="Clear, science-backed answers to the most common walking, pacing, and weight loss queries."
            faqs={faqs}
          />
        </div>

        {/* Section 10: Connected Fitness Suite */}
        <RelatedTools currentPath="/" limit={4} />

        {/* Section 11: Sources, Methodology & Disclaimer */}
        <section id="references" className="my-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sources, Methodology &amp; Disclaimer
          </h2>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Methodology
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Walking calorie estimates use activity MET values from the 2011 Compendium of Physical Activities, interpolated for walking speeds between listed benchmarks. Gross calories are estimated with MET × body weight (kg) × duration (hours); net calories subtract the resting 1-MET baseline. For eligible treadmill speeds, incline estimates use the ACSM walking equation. Distance and step estimates are derived from the entered activity details and estimated or custom stride length. Terrain and carried load are included where applicable.
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 p-4">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-base">
              Disclaimer
            </h3>
            <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              All results are estimates, not exact measurements or medical advice. Actual energy use varies with individual physiology, walking conditions, and the accuracy of the information entered. Weight-loss projections are illustrative and are not guaranteed outcomes. Do not use this calculator to diagnose or treat a health condition; consult a qualified healthcare professional if you have health concerns or need personalized exercise guidance.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Scientific Sources &amp; Literature Cited
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <li>
              Ainsworth BE, Haskell WL, Herrmann SD, et al. <em>2011 Compendium of Physical Activities: a second update of codes and MET values.</em> Medicine &amp; Science in Sports &amp; Exercise. 2011;43(8):1575-1581.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/21681120/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-600 inline-flex items-center gap-0.5"
              >
                PubMed PMID: 21681120 <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </li>
            <li>
              American College of Sports Medicine (ACSM). <em>ACSM&apos;s Guidelines for Exercise Testing and Prescription.</em> 11th Edition. Wolters Kluwer, 2021. Metabolic Calculation for Walking: VO2 = (0.1 × S) + (1.8 × S × G) + 3.5.
            </li>
            <li>
              Centers for Disease Control and Prevention (CDC). <em>Physical Activity for a Healthy Weight.</em> U.S. Department of Health and Human Services.{" "}
              <a
                href="https://www.cdc.gov/healthy-weight-growth/physical-activity/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-600 inline-flex items-center gap-0.5"
              >
                CDC Walking Guidelines <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </li>
            <li>
              Harvard Health Publishing. <em>Calories burned in 30 minutes for people of three different weights.</em> Harvard Medical School, 2021.
            </li>
            <li>
              Shcherbina A, Mattsson CM, Waggott D, et al. <em>Accuracy in Wrist-Worn, Sensor-Based Measurements of Heart Rate and Energy Expenditure in a Diverse Cohort.</em> Journal of Personalized Medicine. 2017;7(2):3.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/28538107/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-600 inline-flex items-center gap-0.5"
              >
                Stanford Validation Study <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </li>
            <li>
              Hall KD, Sacks G, Chandramohan D, et al. <em>Quantification of the effect of energy imbalance on bodyweight.</em> The Lancet. 2011;378(9793):826-837.
            </li>
            </ol>
          </div>
        </section>

        {/* Editorial & Author Box */}
        <AuthorBox updatedAt="November 2026" />
      </div>
    </div>
  );
}
