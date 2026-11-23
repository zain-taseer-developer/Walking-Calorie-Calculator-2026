
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RacePaceTool } from "@/components/calculator/RacePaceTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";
import { constructSocialMetadata } from "@/lib/seo";

const pageTitle = "Marathon Pace Calculator: Half & Full Marathon, 5K & 10K";
const pageDescription =
  "Calculate running pace and finish times for 5K, 10K, half marathon, and full marathon races. View mile splits, kilometer pace, and speed charts.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/marathon-pace-chart`,
  },
  ...constructSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.CANONICAL_URL}/marathon-pace-chart`,
  }),
};

const raceDistances = {
  marathonMiles: 26.21875,
  marathonKm: 42.195,
  halfMiles: 13.1094,
  halfKm: 21.0975,
  fiveKmMiles: 3.10686,
  tenKmMiles: 6.21371,
};

const marathonSplits = [
  { finishSeconds: 2 * 3600 + 45 * 60, note: "A fast marathon goal" },
  { finishSeconds: 3 * 3600, note: "A demanding performance; qualifying standards vary" },
  { finishSeconds: 3 * 3600 + 15 * 60, note: "A challenging endurance goal" },
  { finishSeconds: 3 * 3600 + 30 * 60, note: "A common time goal" },
  { finishSeconds: 3 * 3600 + 45 * 60, note: "A steady endurance goal" },
  { finishSeconds: 4 * 3600, note: "A common recreational goal" },
  { finishSeconds: 4 * 3600 + 30 * 60, note: "A longer finish-time goal" },
  { finishSeconds: 5 * 3600, note: "May include planned walk breaks" },
];

const evenPaceCheckpoints = [
  { label: "5 miles", miles: 5 },
  { label: "10 miles", miles: 10 },
  { label: "13.1 miles", miles: 13.1 },
  { label: "15 miles", miles: 15 },
  { label: "20 miles", miles: 20 },
  { label: "25 miles", miles: 25 },
  { label: "Finish", miles: raceDistances.marathonMiles },
];

const splitGoals = marathonSplits.filter((row) =>
  [3, 3.5, 4, 4.5].includes(row.finishSeconds / 3600)
);

const halfMarathonGoals = [90, 105, 120, 135, 150].map(
  (minutes) => minutes * 60
);

const shortRaceGoals = [
  { event: "5K", distanceMiles: raceDistances.fiveKmMiles, finishSeconds: 20 * 60 },
  { event: "5K", distanceMiles: raceDistances.fiveKmMiles, finishSeconds: 25 * 60 },
  { event: "5K", distanceMiles: raceDistances.fiveKmMiles, finishSeconds: 30 * 60 },
  { event: "10K", distanceMiles: raceDistances.tenKmMiles, finishSeconds: 45 * 60 },
  { event: "10K", distanceMiles: raceDistances.tenKmMiles, finishSeconds: 50 * 60 },
  { event: "10K", distanceMiles: raceDistances.tenKmMiles, finishSeconds: 60 * 60 },
];

function formatTime(totalSeconds: number) {
  const roundedSeconds = Math.round(totalSeconds);
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.floor((roundedSeconds % 3600) / 60);
  const seconds = roundedSeconds % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function formatPace(totalSeconds: number, distance: number) {
  const secondsPerUnit = Math.round(totalSeconds / distance);
  const minutes = Math.floor(secondsPerUnit / 60);
  const seconds = secondsPerUnit % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const faqs = [
  {
    question: "What pace is needed for a 4-hour marathon?",
    answer:
      "A 4:00:00 marathon requires an average pace of about 9:09 per mile or 5:41 per kilometer. This is the average across the full official marathon distance; individual splits may vary.",
  },
  {
    question: "What is a 3-hour marathon pace?",
    answer:
      "A 3:00:00 marathon averages approximately 6:52 per mile or 4:16 per kilometer, at about 8.74 mph. A sub-3-hour finish requires a slightly faster average pace.",
  },
  {
    question: "What is a 3:30 marathon pace?",
    answer:
      "A 3:30:00 marathon requires an average pace of approximately 8:01 per mile or 4:59 per kilometer. Actual race splits can vary due to course conditions and pacing strategy.",
  },
  {
    question: "What is a 5-hour marathon pace?",
    answer:
      "A 5:00:00 marathon requires an average pace of approximately 11:27 per mile or 7:07 per kilometer. The overall average includes any planned walking breaks.",
  },
  {
    question: "How do you calculate running pace?",
    answer:
      "Divide your total running time by the distance covered. For example, running 5 miles in 40 minutes gives you an average pace of 8 minutes per mile.",
  },
  {
    question: "How do you calculate speed, distance, and time?",
    answer:
      "Speed equals distance divided by time. Time equals distance divided by speed, and distance equals speed multiplied by time. Keep the units consistent when calculating.",
  },
  {
    question: "What is a good marathon pace for beginners?",
    answer:
      "There is no single ideal beginner marathon pace. Choose a realistic goal based on current fitness, recent race results, training consistency, and your ability to complete long runs. A planned run-walk strategy is also a valid approach.",
  },
  {
    question: "What is an average half marathon pace?",
    answer:
      "Half-marathon pace varies widely by experience, fitness, course, and conditions. For a personal estimate, divide your finish time by 13.1094 miles or 21.0975 kilometers.",
  },
  {
    question: "Should I run a marathon at an even pace?",
    answer:
      "Even pacing is a useful starting strategy, but identical splits are not essential. Hills, weather, crowds, and fatigue can make small pace adjustments appropriate.",
  },
  {
    question: "Is marathon pace the same as easy running pace?",
    answer:
      "Usually not. Marathon pace is a goal-specific sustained effort, while easy running pace should feel comfortable and support recovery. The difference depends on your fitness and training experience.",
  },
  {
    question: "How accurate are race pace charts?",
    answer:
      "Race pace charts calculate mathematical averages from distance and finish time. They are useful for planning, but they cannot predict your actual performance or account for course elevation, weather, fatigue, or race-day conditions.",
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
          Calculate the running pace and average speed needed for 5K, 10K,
          half-marathon, and full-marathon finish times. Explore race pace
          charts and estimated checkpoint splits in miles and kilometers.
        </p>
      </header>

      <div className="mb-8">
        <RacePaceTool />
      </div>

      <section className="prose prose-slate mb-10 max-w-none dark:prose-invert">
        <h2>How to Use the Race Pace Calculator</h2>
        <p>
          Select a race distance and enter your target finish time to calculate
          the average pace and speed required. You can change the distance or
          time to compare different race goals.
        </p>
        <ul>
          <li>
            <strong>Select a race event:</strong> Choose 5K, 10K, Half Marathon,
            or Marathon. Each option uses the distance displayed on its button.
          </li>
          <li>
            <strong>Enter your target time:</strong> Set your hours, minutes,
            and seconds.
          </li>
          <li>
            <strong>Choose a popular goal:</strong> Preset buttons fill in a
            target finish time. They change the time fields but do not select
            the race distance.
          </li>
          <li>
            <strong>Required Mile Pace:</strong> Shows the average minutes and
            seconds needed per mile.
          </li>
          <li>
            <strong>Required Metric Pace:</strong> Shows the equivalent average
            pace per kilometer.
          </li>
          <li>
            <strong>Average Speed:</strong> Displays the required average speed
            in mph and km/h.
          </li>
        </ul>
        <p>
          Treat the result as a planning average rather than a prediction.
          Actual race performance can be affected by hills, weather, stops,
          fatigue, and changes in pace.
        </p>
      </section>

      <AdSlot slotId="pace-top" format="horizontal" />

      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Marathon Pace Chart: Splits & Finish Times</h2>
        <p>
          The official marathon distance is 26.21875 miles (42.195 km).
          This chart compares the average pace, speed, and halfway split for
          common marathon finish times. All pace values are rounded to the
          nearest second.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                {[
                  "Target Finish",
                  "Pace / Mile",
                  "Pace / Km",
                  "Average Speed",
                  "Halfway Split",
                  "Category",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {marathonSplits.map((row) => (
                <tr
                  key={row.finishSeconds}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50"
                >
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                    {formatTime(row.finishSeconds)}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatPace(row.finishSeconds, raceDistances.marathonMiles)} /mi
                  </td>
                  <td className="px-4 py-3 font-mono text-teal-600 dark:text-teal-400">
                    {formatPace(row.finishSeconds, raceDistances.marathonKm)} /km
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {(raceDistances.marathonMiles / (row.finishSeconds / 3600)).toFixed(2)} mph
                    <br />
                    {(raceDistances.marathonKm / (row.finishSeconds / 3600)).toFixed(2)} km/h
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                    {formatTime(row.finishSeconds / 2)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Marathon Checkpoint Split Chart</h2>
        <p>
          These estimated checkpoint times assume an even average pace for
          four common marathon goals. Each split is calculated from the target
          finish time and checkpoint distance. The 13.1-mile checkpoint falls
          slightly before the exact halfway point.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Checkpoint
                </th>
                {splitGoals.map((row) => (
                  <th
                    key={row.finishSeconds}
                    className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {formatTime(row.finishSeconds)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {evenPaceCheckpoints.map((checkpoint) => (
                <tr key={checkpoint.label}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                  >
                    {checkpoint.label}
                  </th>
                  {splitGoals.map((row) => (
                    <td
                      key={row.finishSeconds}
                      className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300"
                    >
                      {formatTime(
                        (row.finishSeconds * checkpoint.miles) /
                          raceDistances.marathonMiles
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Half Marathon Pace Chart</h2>
        <p>
          This chart uses the half-marathon distance of 13.1094 miles
          (21.0975 km). Values show the average pace required for each
          finish time, assuming an even pace throughout the race.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                  Finish Time
                </th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">
                  Pace / Mile
                </th>
                <th className="px-4 py-3 font-semibold text-teal-700 dark:text-teal-400">
                  Pace / Km
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {halfMarathonGoals.map((finishSeconds) => (
                <tr key={finishSeconds}>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                    {formatTime(finishSeconds)}
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">
                    {formatPace(finishSeconds, raceDistances.halfMiles)} /mi
                  </td>
                  <td className="px-4 py-3 font-mono text-teal-600 dark:text-teal-400">
                    {formatPace(finishSeconds, raceDistances.halfKm)} /km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>5K Pace Chart & 10K Pace Chart</h2>
        <p>
          These examples use 5K = 3.10686 miles and 10K = 6.21371 miles.
          Pace and average speed are calculated from each target finish time
          and rounded for display.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                {["Event", "Finish", "Pace / Mile", "Pace / Km", "Average Speed"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {shortRaceGoals.map((goal) => {
                const distanceKm = goal.event === "5K" ? 5 : 10;

                return (
                  <tr key={`${goal.event}-${goal.finishSeconds}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                      {goal.event}
                    </td>
                    <td className="px-4 py-3">{formatTime(goal.finishSeconds)}</td>
                    <td className="px-4 py-3 font-mono">
                      {formatPace(goal.finishSeconds, goal.distanceMiles)} /mi
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {formatPace(goal.finishSeconds, distanceKm)} /km
                    </td>
                    <td className="px-4 py-3">
                      {(goal.distanceMiles / (goal.finishSeconds / 3600)).toFixed(2)} mph
                      <br />
                      {(distanceKm / (goal.finishSeconds / 3600)).toFixed(2)} km/h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>Speed, Distance, and Time Formula</h2>
        <p>
          Race pace calculations use the relationship between distance, time,
          and average speed:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Speed = Distance ÷ Time
          <br />
          Time = Distance ÷ Speed
          <br />
          Distance = Speed × Time
        </div>
        <p>
          For example, covering 26.21875 miles in 4 hours averages about
          6.55 mph. At 8 mph, covering 10 miles takes 1.25 hours, or
          1 hour 15 minutes. Always use matching distance and speed units.
        </p>

        <h2>How to Pace a Marathon</h2>
        <p>
          Your goal pace is an average for the entire race, not a requirement
          to run every mile at exactly the same speed. A controlled approach
          can help you manage effort over the full distance.
        </p>
        <ol>
          <li>
            <strong>Start controlled:</strong> Avoid running too fast during
            the opening miles because of excitement or crowded starting
            conditions.
          </li>
          <li>
            <strong>Stay steady through the middle:</strong> Settle into a
            sustainable rhythm and follow the hydration and fueling plan
            practiced during training.
          </li>
          <li>
            <strong>Manage fatigue after mile 20:</strong> Focus on relaxed
            form and effort. If your pace fades, make measured adjustments
            instead of forcing a sudden surge.
          </li>
          <li>
            <strong>Finish strong if possible:</strong> If you still feel
            controlled late in the race, gradually increase effort. This
            should not be treated as an expectation.
          </li>
        </ol>
        <p>
          Starting too fast can make later miles harder and increase the
          chance of slowing down. Training, course conditions, and individual
          fitness all affect how well a pacing strategy works.
        </p>

        <h2>Negative Splits vs. Even and Positive Splits</h2>
        <p>
          A split is the time taken to complete a section of a race. Comparing
          splits helps runners understand how their pace changes throughout
          the event.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                {["Strategy", "Meaning", "Potential Benefit", "Consideration"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Negative splits
                </th>
                <td className="px-4 py-3">
                  The second half is faster than the first.
                </td>
                <td className="px-4 py-3">
                  A controlled start may leave room to increase effort later.
                </td>
                <td className="px-4 py-3">
                  An overly cautious start can require an aggressive finish.
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Even pacing
                </th>
                <td className="px-4 py-3">
                  Race sections are completed at a similar average pace.
                </td>
                <td className="px-4 py-3">
                  A consistent target can make effort easier to monitor.
                </td>
                <td className="px-4 py-3">
                  Terrain, weather, crowds, and aid stations can affect splits.
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">
                  Positive splits
                </th>
                <td className="px-4 py-3">
                  The second half is slower than the first.
                </td>
                <td className="px-4 py-3">
                  Can occur naturally on difficult courses or as fatigue builds.
                </td>
                <td className="px-4 py-3">
                  A large slowdown may follow an overly fast start.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Even pacing is a practical planning baseline, but runners do not
          need identical splits. Adjusting effort to course conditions can
          be more useful than forcing an exact pace.
        </p>

        <h2>Race Pace vs. Training Pace</h2>
        <p>
          Different running workouts use different effort levels. Your
          marathon goal pace should not automatically become the pace for
          every training session.
        </p>
        <ul>
          <li>
            <strong>Easy running pace:</strong> Comfortable, conversational
            effort that supports recovery and aerobic training.
          </li>
          <li>
            <strong>Long-run pace:</strong> Usually easy or moderate, with
            some training plans adding faster sections.
          </li>
          <li>
            <strong>Tempo pace:</strong> A sustained, comfortably hard effort
            held for a limited period.
          </li>
          <li>
            <strong>Threshold pace:</strong> A controlled hard effort that
            develops the ability to sustain faster running.
          </li>
          <li>
            <strong>Interval pace:</strong> Faster repetitions separated by
            recovery periods.
          </li>
          <li>
            <strong>Goal marathon pace:</strong> The planned average pace for
            your target marathon finish time.
          </li>
        </ul>
        <p>
          Training pace should reflect your current fitness and experience.
          Avoid forcing a goal pace that feels unrealistic for your present
          ability.
        </p>

        <h2>Running Pace Conversion: Minutes per Mile vs. Minutes per Kilometer</h2>
        <p>
          Pace is the time required to cover a unit of distance. Since one
          mile equals approximately 1.60934 kilometers, convert between
          mile and kilometer pace using these formulas:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Minutes per km = Minutes per mile ÷ 1.60934
          <br />
          Minutes per mile = Minutes per km × 1.60934
          <br />
          Speed (km/h) = Speed (mph) × 1.60934
          <br />
          Speed (mph) = Speed (km/h) ÷ 1.60934
        </div>
        <p>
          For example, an 8:00-per-mile pace is approximately 4:58 per
          kilometer. A 5:00-per-kilometer pace is approximately 8:03 per
          mile. These conversions help compare race pace targets when
          switching between metric and imperial units. For walking-specific
          speed and pace conversions, use our{" "}
          <Link
            href="/walking-pace-calculator"
            className="font-medium text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
          >
            Walking Pace Calculator
          </Link>.
        </p>

        <h2>How to Choose a Realistic Marathon Goal</h2>
        <p>
          Shorter race results can help you estimate a possible marathon
          target, but they cannot guarantee a particular finish time. Consider
          your overall training before choosing a goal.
        </p>
        <ul>
          <li>
            <strong>Recent 5K and 10K results:</strong> These provide useful
            information about your current running speed.
          </li>
          <li>
            <strong>Half-marathon performance:</strong> A recent half marathon
            can offer a closer endurance reference.
          </li>
          <li>
            <strong>Training consistency:</strong> Consider how regularly
            you have been running and recovering.
          </li>
          <li>
            <strong>Weekly mileage and long runs:</strong> Your goal should
            match the training volume you can build and sustain.
          </li>
          <li>
            <strong>Running experience:</strong> Newer runners may prioritize
            completing the distance comfortably, while experienced runners
            can use previous race performances to refine their target.
          </li>
        </ul>
        <p>
          Treat shorter race times as one part of your decision. Course
          elevation, weather, training history, and race-day execution can
          all influence your marathon result.
        </p>

        <h2>Common Marathon Pacing Mistakes</h2>
        <ul>
          <li>
            <strong>Starting too fast:</strong> Avoid letting early excitement
            push you far ahead of a sustainable effort.
          </li>
          <li>
            <strong>Ignoring your pacing plan:</strong> Set a target pace or
            effort range, but allow sensible adjustments.
          </li>
          <li>
            <strong>Making sudden pace changes:</strong> Gradual adjustments
            are generally easier to manage than repeated surges.
          </li>
          <li>
            <strong>Not practicing goal effort:</strong> Practice race-pace
            sections during suitable training sessions if your plan includes
            them.
          </li>
          <li>
            <strong>Leaving fueling to chance:</strong> Practice your
            hydration and fueling approach during training.
          </li>
          <li>
            <strong>Choosing an unrealistic goal:</strong> Reassess your
            target if recent performances or training no longer support it.
          </li>
          <li>
            <strong>Ignoring course and weather:</strong> Heat, wind, hills,
            altitude, and surface can change the effort required to maintain
            a pace.
          </li>
        </ul>
        <p>
          Use pace charts as planning references rather than guaranteed
          predictions. A flexible strategy that accounts for race conditions
          is more useful than trying to follow rounded chart values exactly.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="pace-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
