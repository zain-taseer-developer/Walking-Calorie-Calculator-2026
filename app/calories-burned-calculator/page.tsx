import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ActivityCalorieTool } from "@/components/calculator/ActivityCalorieTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Calories Burned Calculator: Calories by Activity & Exercise",
  description:
    "Calculate calories burned across cycling, swimming, jumping rope, hiking, push-ups, and gym workouts. Compare exercise MET values and fat burning efficiency.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/calories-burned-calculator`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/calories-burned-calculator`,
  },
};

const activityTable = [
  { activity: "Jumping Rope / Skipping Rope (Moderate)", met: 11.0, note: "Vigorous rhythmic cardio" },
  { activity: "Running (5.0 mph / 12 min/mile)", met: 8.3, note: "Steady running pace" },
  { activity: "Swimming (Freestyle, Moderate)", met: 7.0, note: "Lap swimming at a moderate effort" },
  { activity: "Rowing Machine (Ergometer)", met: 7.0, note: "Moderate rowing effort" },
  { activity: "Cycling / Biking (Moderate 12-14 mph)", met: 6.8, note: "Moderate cycling effort" },
  { activity: "Hiking (Cross-country / Hills)", met: 6.0, note: "Cross-country or hilly hiking" },
  { activity: "Push-ups, Sit-ups & Calisthenics", met: 5.0, note: "Vigorous calisthenics" },
  { activity: "Walking (Brisk, 3.5 mph)", met: 4.3, note: "Brisk level walking" },
  { activity: "Weight Lifting (Strength Training)", met: 3.5, note: "General strength training" },
];

const durationActivities = [
  "Walking (Brisk, 3.5 mph)",
  "Running (5.0 mph / 12 min/mile)",
  "Cycling / Biking (Moderate 12-14 mph)",
  "Swimming (Freestyle, Moderate)",
  "Jumping Rope / Skipping Rope (Moderate)",
  "Weight Lifting (Strength Training)",
];

function estimateCalories(met: number, weightKg: number, durationMinutes: number) {
  return Math.round(met * weightKg * (durationMinutes / 60));
}

function poundsToKg(pounds: number) {
  return pounds / 2.20462;
}

const durationComparison = activityTable.filter((row) =>
  durationActivities.includes(row.activity)
);

const weightComparison = activityTable.filter((row) =>
  [
    "Jumping Rope / Skipping Rope (Moderate)",
    "Running (5.0 mph / 12 min/mile)",
    "Cycling / Biking (Moderate 12-14 mph)",
    "Hiking (Cross-country / Hills)",
    "Walking (Brisk, 3.5 mph)",
    "Weight Lifting (Strength Training)",
  ].includes(row.activity)
);

const faqs = [
  {
    question: "How do you calculate bike calories (cycling)?",
    answer:
      "The calculator estimates moderate cycling at 6.8 MET. Multiply 6.8 by body weight in kilograms and workout time in hours. For example, 70 kg for 45 minutes gives 6.8 × 70 × 0.75 = 357 estimated kcal.",
  },
  {
    question: "How many calories does swimming burn?",
    answer:
      "The calculator uses 7.0 MET for moderate freestyle swimming. At 154 lb (about 70 kg), that estimates about 245 kcal in 30 minutes using its gross-calorie formula. Stroke, pace, technique, and rest breaks can change actual energy use.",
  },
  {
    question: "How many calories does jumping rope burn?",
    answer:
      "The calculator assigns moderate jumping rope 11.0 MET. At 154 lb (about 70 kg), its estimate is about 128 kcal for 10 minutes or 385 kcal for 30 minutes. Your pace and breaks affect the real total.",
  },
  {
    question: "How many calories do I burn doing push-ups and sit-ups?",
    answer:
      "There is no single value for a set of repetitions because pace and rest vary. This calculator uses 5.0 MET for vigorous calisthenics; for a 154 lb (about 70 kg) person, 15 minutes estimates about 88 kcal. Intermittent sets may average less intensity than continuous vigorous exercise.",
  },
  {
    question: "What is the relationship between weight lifting and calories burned?",
    answer:
      "The calculator uses 3.5 MET for general strength training, but calories during a session vary with load, exercise selection, rest periods, and pace. Its estimate covers the activity period and does not add a separate afterburn or future increase in resting metabolism.",
  },
  {
    question: "How can we burn calories effectively every day?",
    answer:
      "Build activity into your routine in ways you can maintain: walk more when practical, choose cardio you enjoy, and include strength work if it suits your goals. Increase your activity gradually and choose a schedule that fits your health and fitness level.",
  },
  {
    question: "How many calories do you burn running vs. walking?",
    answer:
      "It depends on speed, distance, body weight, and time. In this calculator, brisk walking is 4.3 MET and running at 5 mph is 8.3 MET, so running at those selected intensities has a higher estimated burn per minute. This is not a universal per-mile comparison.",
  },
  {
    question: "What exercise burns the most calories in 30 minutes?",
    answer:
      "There is no universal winner. In this calculator, jumping rope has the highest listed MET, but the activity you can perform safely and consistently—and at what effort—matters more than the ranking.",
  },
  {
    question: "Does body weight affect calories burned?",
    answer:
      "Yes. In the calculator's MET formula, estimated calories increase in direct proportion to body weight when activity and duration stay the same. Individual physiology and movement still make real-world expenditure vary.",
  },
  {
    question: "How accurate are MET-based calorie calculators?",
    answer:
      "They provide estimates based on a standard activity intensity and body weight, not a direct measurement of your metabolism. Personal fitness, technique, and actual effort can make your energy use higher or lower.",
  },
  {
    question: "What does MET mean in exercise?",
    answer:
      "MET stands for metabolic equivalent of task. It expresses an activity's energy cost relative to resting; a higher MET represents greater energy demand per unit of time for the same body weight.",
  },
  {
    question: "Do you burn calories after a workout?",
    answer:
      "Your body continues using energy after exercise, as it does throughout the day. This calculator estimates energy during the selected activity and does not add a separate post-workout amount.",
  },
  {
    question: "Are calories burned during exercise the same as active calories?",
    answer:
      "Not always. Devices may define active calories as energy above resting, while this calculator reports gross activity energy from MET × weight × time, which includes the resting component represented by the MET value.",
  },
];

export default function CaloriesBurnedCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Calories Burned Calculator", href: "/calories-burned-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Calories Burned Calculator: Multi-Exercise & Activity Burn
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Estimate calories burned across cycling, swimming, jumping rope, hiking, running, and other activities. Compare exercise intensity using MET values from the 2011 Compendium of Physical Activities.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <ActivityCalorieTool />
      </div>

      <section className="prose prose-slate mb-10 max-w-none dark:prose-invert">
        <h2>How to Use the Calories Burned Calculator</h2>
        <p>
          Choose an activity, enter your weight and workout time, and the estimates update as you change the inputs. The control in the upper-right switches the weight field between pounds and kilograms.
        </p>
        <ul>
          <li><strong>Select an activity or sport:</strong> Choose from the available walking, hiking, cycling, swimming, running, jump-rope, calisthenics, weight-lifting, and rowing options. Each option uses its displayed MET value.</li>
          <li><strong>Choose lbs or kg:</strong> Switch units to match how you know your body weight. The calculator converts between pounds and kilograms for its calculation.</li>
          <li><strong>Enter body weight and workout duration:</strong> Type your weight and the number of minutes. The duration field accepts custom values.</li>
          <li><strong>Use the quick-duration buttons:</strong> Select 15m, 30m, 45m, or 60m to set the workout time.</li>
          <li><strong>Total Calories Burned:</strong> This is the estimated gross energy for the selected activity, weight, and duration.</li>
          <li><strong>Burn Rate &amp; MET:</strong> The rate is the estimated kcal per minute for your entered weight, and the MET is the activity intensity value used by the calculator.</li>
          <li><strong>Walking Equivalent:</strong> This estimates how many minutes of brisk walking at 3.5 mph (4.3 MET) have the same MET-based energy estimate at the same weight.</li>
        </ul>
        <p>
          To keep a calculation, select <strong>Save to History</strong>. Saved entries appear in Saved History on this device for 28 days; use Load to restore an entry, Delete to remove one, or Clear All to remove the listed history. This tool stores history in the browser, so it is not a synced account or cross-device record.
        </p>
      </section>

      <AdSlot slotId="activity-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Exercise Energy Expenditure Reference Table</h2>
        <p>
          These are estimated gross calories for 30 minutes using each activity&apos;s MET value and the calculator&apos;s formula. Pounds are converted to kilograms before calculating, and results are rounded to the nearest kcal. MET values describe standardized activity categories; actual effort can differ.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Exercise / Sport</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">MET</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">130 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">154 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">180 lbs (30m)</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {activityTable.map((row) => (
                <tr key={row.activity} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{row.activity}</td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{row.met}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{estimateCalories(row.met, poundsToKg(130), 30)} kcal</td>
                  <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-300">{estimateCalories(row.met, poundsToKg(154), 30)} kcal</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{estimateCalories(row.met, poundsToKg(180), 30)} kcal</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How Are Calories Burned Calculated?</h2>
        <p>
          MET means metabolic equivalent of task. It is a standardized way to describe the energy demand of an activity relative to resting; higher MET values represent more energy used per minute at the same body weight. The calculator uses activity MET values based on the 2011 Compendium of Physical Activities, along with your weight and time.
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Estimated gross kcal = MET × weight (kg) × duration (hours)
        </div>
        <p>
          For the calculator&apos;s cycling example, 45 minutes is 0.75 hours. At 6.8 MET and 70 kg: <strong>6.8 MET × 70 kg × 0.75 hours = 357 estimated kcal.</strong> In this simplified formula, more body weight or more time increases the estimate in direct proportion when MET stays constant.
        </p>
        <p>
          The result is a gross estimate: the standard MET value includes energy expenditure associated with resting during that time. A rough net-above-rest estimate would use <strong>(MET − 1) × weight (kg) × duration (hours)</strong>, but this calculator does not report net calories or add a separate after-workout estimate. MET values describe averages and do not capture every person&apos;s physiology or exact effort.
        </p>

        <h2>Calories Burned by Exercise Duration</h2>
        <p>
          The table compares the available activities below for a 154 lb person, using the same MET values and calculation method as the calculator. Longer duration increases the estimate when activity and effort stay constant.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Activity</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">MET</th>
                {[15, 30, 45, 60].map((minutes) => (
                  <th key={minutes} className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{minutes} min</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {durationComparison.map((row) => (
                <tr key={row.activity}>
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{row.activity}</th>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{row.met}</td>
                  {[15, 30, 45, 60].map((minutes) => (
                    <td key={minutes} className="px-4 py-3 text-slate-700 dark:text-slate-300">{estimateCalories(row.met, poundsToKg(154), minutes)} kcal</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Estimates assume a steady activity at the listed MET for the full duration, a body weight of 154 lb converted to kilograms, and no adjustment for rests or changes in effort. They are gross calories rounded to whole numbers, not measurements.
        </p>

        <h2>How Body Weight Affects Calories Burned</h2>
        <p>
          In this MET formula, body weight is multiplied by both activity intensity and time. As a result, a higher body weight generally produces a higher estimate for the same activity and duration. This is a mathematical relationship in the model, not a guarantee of an individual&apos;s measured calorie use.
        </p>
        <p>The following 30-minute comparison uses selected activities and the reference weights used above.</p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Activity</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">MET</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">130 lbs</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">154 lbs</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">180 lbs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {weightComparison.map((row) => (
                <tr key={row.activity}>
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{row.activity}</th>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{row.met}</td>
                  {[130, 154, 180].map((pounds) => (
                    <td key={pounds} className="px-4 py-3 text-slate-700 dark:text-slate-300">{estimateCalories(row.met, poundsToKg(pounds), 30)} kcal</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>These are rounded, gross-calorie estimates using the calculator&apos;s pound-to-kilogram conversion.</p>

        <h2>Which Exercise Burns the Most Calories?</h2>
        <p>
          The calculator&apos;s MET values provide one way to compare activity intensity, not a ranking of what every person will burn. Its selected values range from 4.3 MET for brisk walking to 11.0 MET for moderate jump rope. Running is 8.3 MET; swimming and rowing are 7.0; cycling is 6.8; hiking is 6.0; and general weight lifting is 3.5. A higher MET can mean a higher estimate per minute at a given weight, but actual expenditure also depends on duration and personal effort.
        </p>
        <ul>
          <li><strong>Jumping rope and running</strong> can provide vigorous cardio, but involve repetitive impact and may not feel accessible to everyone.</li>
          <li><strong>Swimming and cycling</strong> can be lower-impact options for many people, though access to a pool or bike and the chosen effort matter.</li>
          <li><strong>Rowing</strong> uses both upper and lower body and depends on technique and resistance.</li>
          <li><strong>Hiking and brisk walking</strong> can be adapted by changing pace or route; hills and terrain change the effort.</li>
          <li><strong>Weight lifting</strong> supports strength and muscular endurance; rest periods mean session-average intensity can differ from continuous cardio.</li>
        </ul>
        <p>
          The activity with the highest estimate for you is not necessarily the most useful choice. Comfort, ability, actual pace, and consistency all matter.
        </p>

        <h2>Factors That Affect Calories Burned</h2>
        <ul>
          <li><strong>Body weight:</strong> The MET estimate increases with body mass when other inputs stay the same.</li>
          <li><strong>Exercise intensity:</strong> Faster pace, greater resistance, or more vigorous effort generally raises energy demand.</li>
          <li><strong>Workout duration:</strong> More time at the same intensity generally increases total expenditure.</li>
          <li><strong>Fitness level:</strong> People can have different physiological responses to the same external workload.</li>
          <li><strong>Terrain and elevation:</strong> Hills, uneven surfaces, and elevation gain can increase the work of outdoor activities.</li>
          <li><strong>Technique:</strong> Movement efficiency and form can change the energy cost of performing an activity.</li>
          <li><strong>Rest and workout structure:</strong> Intervals, breaks, and recovery periods change average effort over the full session.</li>
        </ul>
        <p>
          Two people can therefore perform the same named activity for the same time and still use different amounts of energy. A calculator using a standard MET is a useful comparison tool, not a personalized lab measurement.
        </p>

        <h2>Active Calories vs. Total Calories</h2>
        <p>
          Active calories usually refer to energy used above what your body would have used at rest. Total calories during a period include both activity and resting energy expenditure. Because this calculator uses <strong>MET × weight × time</strong>, its total is a gross activity estimate that includes the resting component represented by the MET value; it does not display net active calories.
        </p>
        <p>
          Watches and calculators may use different activity categories, equations, personal data, and definitions of “active” or “total.” Their numbers can differ without either being a direct measurement of your exact energy use.
        </p>

        <h2>How to Choose the Right Exercise</h2>
        <p>
          Choose an activity that fits your goals and that you can do consistently. For weight management, regular movement can contribute to an overall energy balance; our <Link href="/walking-for-weight-loss">Walking for Weight Loss Guide</Link> discusses sustainable activity habits, and the <Link href="/maintenance-calorie-calculator">Maintenance Calorie &amp; TDEE Calculator</Link> can help estimate daily energy needs.
        </p>
        <ul>
          <li><strong>Cardiovascular fitness:</strong> Walking, running, cycling, swimming, rowing, and jump rope can all raise heart and breathing rate at an appropriate effort.</li>
          <li><strong>Strength and endurance:</strong> Resistance training and calisthenics emphasize muscular work; cardio can complement, rather than replace, strength work.</li>
          <li><strong>Joint comfort and impact:</strong> Consider how an activity feels for you. Swimming and cycling are lower-impact for many participants, but no activity is automatically right for every joint or condition.</li>
          <li><strong>Equipment and access:</strong> Consider what is available, from outdoor walking routes to a treadmill, bike, pool, weights, or rowing machine.</li>
          <li><strong>Fitness and consistency:</strong> Start at a manageable level and build gradually. A sustainable routine is more useful than choosing an activity only because its MET value is high.</li>
        </ul>

        <h2>Hiking Calorie Calculator & Mountain Walking</h2>
        <p>
          This calculator uses 6.0 MET as a reference for cross-country or hilly hiking, but trail energy needs vary. Uneven or soft ground, steepness and total elevation gain, hiking speed, and the weight of a backpack can all increase effort. The selected hiking MET is a general category, not a trail-specific measurement; use the estimate as a rough comparison rather than an exact hiking calorie count.
        </p>

        <h2>Cycling & Swimming for Weight Loss</h2>
        <p>
          Cycling and swimming can be ways to build cardiovascular activity, but neither is required for weight loss or suitable for everyone. For cycling, speed, resistance or gearing, hills, wind, and pedaling effort affect the workload; speed alone cannot precisely determine energy use. The calculator&apos;s 6.8-MET cycling option is a general moderate-pace estimate.
        </p>
        <p>
          Swimming energy expenditure varies with stroke, pace, technique, and time spent resting between lengths. Water supports body weight, so swimming is lower-impact for many people, but it is not accurate to describe it as completely impact-free or appropriate for every person. The calculator&apos;s 7.0-MET freestyle value is a broad estimate, not a measure of an individual swim.
        </p>
        <p>
          For walking-specific estimates, compare the <Link href="/">Walking Calorie Calculator</Link>, the <Link href="/walking-calories-burned-chart">Walking Calories Burned Chart</Link>, and the <Link href="/treadmill-incline-calculator">Treadmill Incline Calculator</Link>. You can also use the <Link href="/walking-pace-calculator">Walking Pace Calculator</Link> to translate speed into pace.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="activity-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Looking to Calculate Walking Calories?</h2>
        <p className="mt-2 text-emerald-100">
          Return to our dedicated homepage calculator to model walking speeds, incline percentages, stride lengths, and step counts.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Go to Walking Calorie Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}

