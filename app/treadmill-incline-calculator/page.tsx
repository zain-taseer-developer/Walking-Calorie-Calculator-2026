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
    "Calculate treadmill calories burned with our incline calculator. Convert treadmill speed to pace, compare incline levels, and explore the 12-3-30 workout.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/treadmill-incline-calculator`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/treadmill-incline-calculator`,
  },
};

const paceChartSpeeds = [2.0, 2.5, 3.0, 3.2, 3.5, 4.0, 4.5, 5.0];

function formatPace(minutes: number) {
  const totalSeconds = Math.round(minutes * 60);
  const wholeMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${wholeMinutes}:${seconds.toString().padStart(2, "0")}`;
}

function estimateInclineCalories(mph: number, inclinePercent: number) {
  const speedMMin = mph * 26.8224;
  const grade = inclinePercent / 100;
  const vo2 = 0.1 * speedMMin + 1.8 * speedMMin * grade + 3.5;
  return Math.round((vo2 * 70) / 1000 * 5 * 30);
}

const faqs = [
  {
    question: "How does treadmill incline increase calorie burn?",
    answer:
      "Walking uphill requires additional work against gravity, so the ACSM equation estimates a higher energy cost at the same speed. For example, at 3 mph for 30 minutes at 154 lb, the calculator estimates about 121 calories at 0%, 212 at 6%, and 304 at 12%. These are model estimates, not measured personal results; changing speed, body weight, or time changes the comparison.",
  },
  {
    question: "What are the benefits of zone 2 incline walk?",
    answer:
      "A Zone 2 walk can provide steady aerobic exercise at a manageable effort. An incline is one way to raise effort without necessarily walking faster, but there is no incline or speed that guarantees Zone 2 for everyone. Use the talk test and, if helpful, a heart-rate monitor to adjust the workload.",
  },
  {
    question: "How does treadmill speed to pace conversion work?",
    answer:
      "For miles, divide 60 by speed in mph to get minutes per mile. For example, 60 ÷ 3.5 = 17.14 minutes, which rounds to about 17:09 per mile. For metric pace, divide 60 by speed in km/h to get minutes per kilometer.",
  },
  {
    question: "What is the 12-3-30 treadmill incline workout?",
    answer:
      "It is a treadmill routine of walking at a 12% grade, 3 mph, for 30 minutes. That is a demanding workload for many people; use a lower incline, slower speed, or shorter intervals if needed, and do not treat it as a requirement for fitness or weight loss.",
  },
  {
    question: "What does speed on running machine mean?",
    answer:
      "The speed setting is the treadmill belt's rate of travel, usually shown in mph in the US or km/h in metric mode. It is not the same as pace: pace is the time needed to cover a mile or kilometer. This calculator displays both mph and km/h alongside minutes per mile.",
  },
  {
    question: "What is a good incline for walking on a treadmill?",
    answer:
      "There is no single best setting. Choose a grade that lets you walk with a natural stride at a sustainable effort; that may be 0% for an easy session or a modest incline for more challenge. Start low and adjust based on your fitness, comfort, and goals.",
  },
  {
    question: "Is walking on a 12% incline good?",
    answer:
      "A 12% grade can make a short treadmill walk very demanding and may suit some experienced walkers. It is not necessary for a useful workout, and it may be too strenuous for beginners. Lower the grade or stop if you cannot maintain comfortable form.",
  },
  {
    question: "Does incline walking burn more calories than flat walking?",
    answer:
      "At the same speed, incline walking generally requires more energy than level walking. The difference depends on the grade and the person's weight, speed, and workout duration; calculator results are estimates rather than a guarantee of calories burned.",
  },
  {
    question: "How long should beginners walk on an incline?",
    answer:
      "Start with a few minutes of gentle incline within a comfortable 15- to 20-minute session, including warm-up and cooldown. Keep most or all of the walk level if needed, then gradually add time or grade as the effort feels manageable.",
  },
  {
    question: "Can you lose weight by walking on an incline?",
    answer:
      "Incline walking can contribute to overall activity and energy expenditure, but weight change depends on long-term energy balance and many individual factors. It is one possible form of exercise, not a guaranteed or required weight-loss method.",
  },
  {
    question: "Is incline walking better than running?",
    answer:
      "Neither is universally better. Incline walking may offer a challenging walking workout at a slower belt speed, while running is a different, higher-impact activity. Choose an option you can do safely and consistently, based on your preferences and health.",
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
          Estimate calorie burn at different treadmill speeds and inclines. Use the pace calculator and conversion chart to translate treadmill speed into pace.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <TreadmillInclineTool />
      </div>

      <section className="prose prose-slate mb-10 max-w-none dark:prose-invert">
        <h2>How to Use the Treadmill Incline Calculator</h2>
        <p>
          Enter your workout details or use an incline preset, then change any field to update the estimates. The calculator keeps its underlying values in miles per hour and kilograms, converting the display when you switch units.
        </p>
        <ul>
          <li><strong>Imperial and Metric:</strong> Choose mph and pounds or km/h and kilograms. Switching units changes the display; it does not reset your workout.</li>
          <li><strong>Speed:</strong> Set the treadmill belt speed. The tool also displays the corresponding pace in minutes per mile.</li>
          <li><strong>Incline:</strong> Enter the grade as a percentage, from level walking to the incline available on your treadmill.</li>
          <li><strong>Duration:</strong> Enter workout time in minutes.</li>
          <li><strong>Body weight:</strong> Enter your weight in the selected unit; the calculator converts it for the estimate.</li>
          <li><strong>Incline presets:</strong> Flat (0%), Zone 2 Hill (4%), Power Hike (8%), and Viral 12-3-30 (12%) set both the incline and preset speed. Duration and body weight stay as entered. Preset labels are starting points, not intensity guarantees.</li>
        </ul>
        <p>
          <strong>Total Incline Burn</strong> is estimated gross energy for the entered workout. <strong>Incline Advantage</strong> compares that estimate with the same speed, time, and weight at 0% grade; it is not an additional measured burn. <strong>Pace &amp; Speed</strong> shows minutes per mile and both speed units. Estimates depend on the ACSM equation and will not exactly match an individual&apos;s measured energy use.
        </p>
      </section>

      <AdSlot slotId="treadmill-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Treadmill Pace Chart & Speed to Pace Conversion</h2>
        <p>
          Treadmill consoles display belt speed, while pace tells you how long it takes to cover a mile or kilometer. This chart converts common treadmill speeds and estimates 30-minute calorie expenditure at three grades for a 154 lb (70 kg) person. Values use the same ACSM walking equation as the calculator and are rounded; they are estimates, not exact measurements.
        </p>

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
              {paceChartSpeeds.map((mph) => (
                <tr key={mph} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{mph.toFixed(1)} mph</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{(mph * 1.60934).toFixed(1)} km/h</td>
                  <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">{formatPace(60 / mph)}</td>
                  <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">{formatPace(60 / (mph * 1.60934))}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{estimateInclineCalories(mph, 0)} kcal</td>
                  <td className="px-4 py-3 font-medium text-emerald-700 dark:text-emerald-300">{estimateInclineCalories(mph, 6)} kcal</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{estimateInclineCalories(mph, 12)} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          To convert mph to minutes per mile, divide 60 by the speed: at 3.5 mph, 60 ÷ 3.5 is about 17 minutes 9 seconds per mile. For metric pace, divide 60 by speed in km/h to get minutes per kilometer. The calorie values apply the calculator&apos;s formula at every listed speed; the ACSM walking equation is generally intended for steady walking speeds of about 1.9–3.7 mph, so estimates above that range are less reliable. For more pace conversions, try the <Link href="/walking-pace-calculator">Walking Pace Calculator</Link>.
        </p>

        <h2>What Is a Good Treadmill Incline?</h2>
        <p>
          A useful incline is one that fits your current ability and lets you walk with a comfortable, controlled stride. A higher grade generally makes the same speed feel harder, but no one percentage is best for every person or every workout.
        </p>
        <ul>
          <li><strong>0%:</strong> Level walking; a practical choice for warm-ups, cooldowns, recovery, or building a walking habit.</li>
          <li><strong>3%:</strong> A gentle grade that adds some uphill effort for many walkers.</li>
          <li><strong>6%:</strong> A moderate hill that can noticeably raise effort at the same speed.</li>
          <li><strong>8%:</strong> A steeper grade that challenges the legs and breathing; many people will need to slow down.</li>
          <li><strong>10%:</strong> A demanding climb. Use a speed that allows steady steps and good posture.</li>
          <li><strong>12%:</strong> A steep setting used in workouts such as 12-3-30; it can be strenuous and is not a necessary target.</li>
        </ul>
        <p>Beginners can start at 0–2% and raise the grade gradually, adjusting speed or duration if the effort becomes uncomfortable.</p>

        <h2>12-3-30 Treadmill Workout Explained</h2>
        <p>
          The 12-3-30 workout means walking at a 12% incline, 3 mph, for 30 minutes. Set a pace that feels safe, increase the belt speed and grade gradually, and walk for the planned duration; a warm-up and cooldown can be done at a lower speed or incline. You can enter the same settings in the calculator, or select its Viral 12-3-30 preset, which sets 12% and 3 mph.
        </p>
        <p>
          The steep grade can increase cardiovascular and lower-body demands compared with level walking, offering a structured, time-based challenge. It can also be too difficult for beginners or anyone for whom that workload is unsuitable. Try a lower incline, slower speed, or shorter intervals, and build up only if it feels comfortable. This routine is optional and is not required for weight loss.
        </p>

        <h2>Incline Walking vs. Flat Walking</h2>
        <p>
          At the same belt speed, adding incline typically raises the effort and estimated energy cost. It also changes the muscular and cardiovascular demands. The size of any calorie difference depends on speed, incline, body weight, and duration.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Factor</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Flat walking</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Incline walking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr><th scope="row" className="px-4 py-3 font-semibold">Calorie expenditure</th><td className="px-4 py-3">Usually lower at the same speed.</td><td className="px-4 py-3">Usually higher at the same speed; the difference varies with the workout and person.</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Workout intensity</th><td className="px-4 py-3">Easy to adjust with speed and time.</td><td className="px-4 py-3">Often feels harder without increasing belt speed.</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Muscle involvement</th><td className="px-4 py-3">Uses the muscles that support ordinary walking.</td><td className="px-4 py-3">Requires more uphill work from the calves, thighs, and hip muscles.</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Cardiovascular demand</th><td className="px-4 py-3">Depends on pace and fitness.</td><td className="px-4 py-3">Often increases at the same speed; individual response varies.</td></tr>
              <tr><th scope="row" className="px-4 py-3 font-semibold">Workout difficulty</th><td className="px-4 py-3">Can be a comfortable starting point or a brisk workout.</td><td className="px-4 py-3">Can become strenuous quickly as grade rises.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Beginner Treadmill Incline Walking Workout Plan</h2>
        <p>
          Use this gentle example as a starting point, not a prescribed target. Choose a pace that allows you to walk naturally, and keep the treadmill at 0% if an incline does not feel comfortable.
        </p>
        <ol>
          <li><strong>Warm up for 5 minutes:</strong> Walk easily on a flat or very gentle grade.</li>
          <li><strong>Start modestly:</strong> Try 1–3% incline at an easy, conversational speed for 5–10 minutes. A speed around 2.0–2.5 mph is only an example; use the speed that suits you.</li>
          <li><strong>Progress gradually:</strong> Once this feels manageable, add a few minutes or a small amount of incline in a later session—not both at once. Repeat an easy week or reduce the workload whenever needed.</li>
          <li><strong>Cool down for 5 minutes:</strong> Reduce the incline and speed before stepping off.</li>
        </ol>
        <p>
          This example totals about 15–20 minutes. Shorten it, take breaks, or stay on level ground to match your fitness and comfort. For a broader activity plan, see our <Link href="/walking-for-weight-loss">Walking for Weight Loss Guide</Link>.
        </p>

        <h2>Zone 2 Incline Walking</h2>
        <p>
          Zone 2 is a commonly used term for steady, moderate aerobic exercise that can be sustained for a while. Training-zone definitions vary, so use effort as well as any numbers from a device.
        </p>
        <ul>
          <li><strong>Talk test:</strong> At a manageable moderate effort, you should generally be able to speak in sentences, though singing may feel difficult. If you can only say a few words at a time, ease off.</li>
          <li><strong>Heart-rate estimates:</strong> A monitor can help you observe your response. Some guides use roughly 60–70% of estimated maximum heart rate as a broad starting range, but age-based estimates and zone boundaries are imprecise and vary by person.</li>
          <li><strong>Adjust to your response:</strong> Incline walking is not automatically Zone 2. A steep grade or fast pace may push effort above a sustainable level; lower speed or incline until your breathing is manageable.</li>
        </ul>
        <p>
          People taking heart-rate-affecting medication or managing a health condition should not rely on generic heart-rate zones alone; ask a qualified clinician for individualized guidance.
        </p>

        <h2>How Incline Affects Calorie Burn</h2>
        <p>
          Calorie estimates rise or fall with the workout inputs: greater body weight, faster speed, a steeper incline, or more time generally increases the equation&apos;s estimate. These factors interact, so changing one input does not produce the same result for every workout.
        </p>
        <p>
          This calculator uses the ACSM metabolic walking equation to estimate oxygen use from speed and grade, then converts that estimate to calories using body weight and duration. It is a population-based model, not a direct measurement; fitness, walking mechanics, treadmill calibration, and other individual factors affect actual energy use. Use our <Link href="/walking-calories-burned-chart">Walking Calories Burned Chart</Link> for level-walking comparisons or the <Link href="/">Walking Calorie Calculator</Link> for other walking inputs.
        </p>

        <h2>Treadmill Incline Walking Safety and Common Mistakes</h2>
        <ul>
          <li><strong>Starting too steep:</strong> Begin at a low grade and build gradually instead of jumping straight to a challenging setting.</li>
          <li><strong>Changing too much at once:</strong> Increase speed, incline, or duration in small steps so you can judge how your body responds.</li>
          <li><strong>Supporting your weight on the handrails:</strong> Lightly touching a rail for balance is different from leaning on it. Holding your body up changes the exercise and may make the displayed estimate less representative; lower the workload if you need to hold on.</li>
          <li><strong>Letting posture collapse:</strong> Keep a comfortable upright position and a natural stride; avoid excessive forward leaning or reaching for the console.</li>
          <li><strong>Skipping warm-up and cooldown:</strong> Start easily and gradually reduce effort at the end rather than beginning or stopping abruptly.</li>
          <li><strong>Ignoring warning signs:</strong> Stop if you develop pain, dizziness, unusual shortness of breath, chest discomfort, or other concerning symptoms. Seek medical advice when appropriate.</li>
        </ul>
        <p>
          Calorie numbers are estimates, and exercise does not guarantee a particular change in body weight. For more on estimating walking energy, visit the <Link href="/walking-calories-burned-chart">walking calorie chart</Link>.
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

