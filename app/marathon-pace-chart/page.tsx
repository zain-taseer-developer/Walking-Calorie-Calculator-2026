import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RacePaceTool } from "@/components/calculator/RacePaceTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Marathon Pace Calculator: Half & Full Marathon, 5K & 10K",
  description:
    "Calculate your race pace with our marathon pace calculator. Get pace splits, finish times, and speed charts for 5K, 10K, half and full marathons.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/marathon-pace-chart`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/marathon-pace-chart`,
  },
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

const halfMarathonGoals = [90, 105, 120, 135, 150].map((minutes) => minutes * 60);
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
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
      "A 4:00:00 finish requires averaging about 9:09 per mile or 5:41 per kilometer over the official marathon distance. A sub-4 finish requires a slightly faster average, and actual splits may vary.",
  },
  {
    question: "What is a 3-hour marathon pace?",
    answer:
      "A 3:00:00 marathon averages about 6:52 per mile or 4:16 per kilometer, at roughly 8.74 mph. A sub-3 finish requires a little more speed on average. Boston qualifying standards are separate and vary by age group and gender.",
  },
  {
    question: "What is a 3:30 marathon pace?",
    answer:
      "A 3:30:00 marathon averages about 8:01 per mile or 4:59 per kilometer. The displayed pace is rounded to the nearest second; using a GPS watch or course markers can produce slightly different splits.",
  },
  {
    question: "What is a 5-hour marathon pace?",
    answer:
      "A 5:00:00 marathon averages about 11:27 per mile or 7:07 per kilometer. Some runners use planned walk breaks; the overall average pace includes those breaks.",
  },
  {
    question: "How do you calculate speed, distance, and time?",
    answer:
      "Use speed = distance ÷ time, time = distance ÷ speed, or distance = speed × time. Keep units consistent: for example, 10 miles in 2 hours is 5 mph, and at that speed 15 miles takes 3 hours.",
  },
  {
    question: "How many steps is a 5K?",
    answer:
      "A 5K race is 3.10686 miles. The number of running steps varies with stride and cadence; a broad estimate is around 5,000–7,000 steps.",
    answerContent: (
      <>
        A 5K race is 3.10686 miles. The number of running steps varies with stride and cadence; a broad estimate is around 5,000–7,000 steps. Use the{" "}
        <Link href="/steps-to-miles-calculator">Steps to Miles Calculator</Link> to estimate distance from your own step count.
      </>
    ),
  },
  {
    question: "How many miles is 10K steps?",
    answer:
      "For many adults, 10,000 steps is roughly 4.5–5 miles, but stride length changes the distance.",
    answerContent: (
      <>
        For many adults, 10,000 steps is roughly 4.5–5 miles, but stride length changes the distance. Use our{" "}
        <Link href="/steps-to-miles-calculator">Steps to Miles Calculator</Link> for a personalized estimate.
      </>
    ),
  },
  {
    question: "How many miles is 15K steps?",
    answer:
      "15,000 steps is approximately 6.8–7.5 miles for common adult stride lengths. The result is only a rule of thumb; use a stride-specific conversion for a closer estimate.",
    answerContent: (
      <>
        15,000 steps is approximately 6.8–7.5 miles for common adult stride lengths. The result is only a rule of thumb; use the{" "}
        <Link href="/steps-to-miles-calculator">Steps to Miles Calculator</Link> with your stride for a closer estimate.
      </>
    ),
  },
  {
    question: "How many miles is 20K?",
    answer:
      "A 20-kilometer race is about 12.43 miles. If you mean 20,000 steps instead, the distance depends on stride length and is often roughly 9–10 miles.",
  },
  {
    question: "How does this compare to the McMillan or Strava pace calculators?",
    answer:
      "This page calculates average pace and speed from the selected distance and finish time. Other services may offer additional predictions or training features; their methods and settings can differ, so compare the inputs and definitions rather than assuming identical results.",
  },
  {
    question: "What is a good marathon pace for beginners?",
    answer:
      "There is no single beginner pace. Choose a finish goal that fits your recent running, training consistency, and ability to complete long runs comfortably; a run-walk plan is also a valid pacing approach.",
  },
  {
    question: "What is an average half marathon pace?",
    answer:
      "There is no one pace that represents every half-marathon field. Pace varies widely with experience, course, weather, and goals; calculate yours by dividing finish time by 13.1094 miles or 21.0975 kilometers.",
  },
  {
    question: "Should I run a marathon at an even pace?",
    answer:
      "Even pacing is a useful planning baseline, especially for recreational runners, but it is not mandatory. Hills, crowding, weather, and how you feel may make small pace changes sensible.",
  },
  {
    question: "How do I calculate my 5K or 10K pace?",
    answer:
      "Divide your total race time by 3.10686 miles for a 5K or 6.21371 miles for a 10K to get minutes per mile. For minutes per kilometer, divide by 5 or 10 kilometers, respectively.",
  },
  {
    question: "Is marathon pace the same as easy running pace?",
    answer:
      "Usually not. Marathon pace is a goal-specific sustained effort, while easy pace should feel comfortable and allow recovery. The gap between them depends on fitness and training experience.",
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
          Complete pace splits for 5K, 10K, half marathon, and full marathon race distances. Compute exact mile splits, metric kilometer rates, and finish times.
        </p>
      </header>

      {/* Interactive Tool */}
      <div className="mb-8">
        <RacePaceTool />
      </div>

      <section className="prose prose-slate mb-10 max-w-none dark:prose-invert">
        <h2>How to Use the Race Pace Calculator</h2>
        <p>
          Select the race distance and enter a target finish time to see the average pace and speed needed to cover that distance. You can change any input to compare different race goals.
        </p>
        <ul>
          <li><strong>Select a race event:</strong> Choose 5K, 10K, Half Marathon, or Marathon. Each option uses the distance shown on its button.</li>
          <li><strong>Enter your target time:</strong> Set hours, minutes, and seconds in the three fields.</li>
          <li><strong>Use a popular marathon goal:</strong> The preset buttons fill in a target time: Sub 3 Hours (2:59), 3:30 Pace, Sub 4 Hours (3:59), 4:30 Goal, or 5 Hour Pace. They change the time fields; they do not select a race event.</li>
          <li><strong>Required Mile Pace:</strong> The average minutes and seconds per mile needed for your selected distance and finish time.</li>
          <li><strong>Required Metric Pace:</strong> The corresponding average minutes and seconds per kilometer.</li>
          <li><strong>Average Speed:</strong> The average travel speed in mph and km/h over the full race.</li>
        </ul>
        <p>
          Use the pace as a planning average, then decide how to distribute effort across the course. These outputs do not predict your finish or account for hills, weather, stops, or pace variation.
        </p>
      </section>

      <AdSlot slotId="pace-top" format="horizontal" />

      {/* Main Content */}
      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Marathon Pace Chart: Splits & Finish Times</h2>
        <p>
          This chart uses the official marathon distance of 26.21875 miles (42.195 km). Paces and speeds are rounded to the nearest second or hundredth, and the half-marathon split assumes even pacing. Your actual race splits can vary with course conditions and race-day decisions.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Target Finish</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">Pace / Mile</th>
                <th className="px-4 py-3 font-semibold text-teal-700 dark:text-teal-400">Pace / Km</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Average Speed</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Halfway Split</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {marathonSplits.map((row) => (
                <tr key={row.finishSeconds} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{formatTime(row.finishSeconds)}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatPace(row.finishSeconds, raceDistances.marathonMiles)} /mi</td>
                  <td className="px-4 py-3 font-mono text-teal-600 dark:text-teal-400">{formatPace(row.finishSeconds, raceDistances.marathonKm)} /km</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{(raceDistances.marathonMiles / (row.finishSeconds / 3600)).toFixed(2)} mph<br />{(raceDistances.marathonKm / (row.finishSeconds / 3600)).toFixed(2)} km/h</td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">{formatTime(row.finishSeconds / 2)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Marathon Mile-by-Mile Split Chart</h2>
        <p>
          These are estimated even-pace checkpoint splits for four common finish goals. Each time is calculated as target finish time multiplied by the checkpoint distance divided by 26.21875 miles, then rounded to the nearest second. The 13.1-mile checkpoint is slightly before the exact halfway point.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Checkpoint</th>
                {marathonSplits
                  .filter((row) => [3, 3.5, 4, 4.5].includes(row.finishSeconds / 3600))
                  .map((row) => (
                    <th key={row.finishSeconds} className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{formatTime(row.finishSeconds)}</th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {evenPaceCheckpoints.map((checkpoint) => (
                <tr key={checkpoint.label}>
                  <th scope="row" className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{checkpoint.label}</th>
                  {marathonSplits
                    .filter((row) => [3, 3.5, 4, 4.5].includes(row.finishSeconds / 3600))
                    .map((row) => (
                      <td key={row.finishSeconds} className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                        {formatTime(row.finishSeconds * checkpoint.miles / raceDistances.marathonMiles)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Half Marathon Pace Chart</h2>
        <p>
          These rounded pace estimates use the half-marathon distance of 13.1094 miles (21.0975 km) and assume an even average pace.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Finish Time</th>
                <th className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">Pace / Mile</th>
                <th className="px-4 py-3 font-semibold text-teal-700 dark:text-teal-400">Pace / Km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {halfMarathonGoals.map((finishSeconds) => (
                <tr key={finishSeconds}>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{formatTime(finishSeconds)}</td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">{formatPace(finishSeconds, raceDistances.halfMiles)} /mi</td>
                  <td className="px-4 py-3 font-mono text-teal-600 dark:text-teal-400">{formatPace(finishSeconds, raceDistances.halfKm)} /km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>5K Pace Chart & 10K Pace Chart</h2>
        <p>
          These examples use 5K = 3.10686 miles and 10K = 6.21371 miles. Pace and average speed are calculated from each finish time; displayed values are rounded.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Event</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Finish</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Pace / Mile</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Pace / Km</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Average Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {shortRaceGoals.map((goal) => (
                <tr key={`${goal.event}-${goal.finishSeconds}`}>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{goal.event}</td>
                  <td className="px-4 py-3">{formatTime(goal.finishSeconds)}</td>
                  <td className="px-4 py-3 font-mono">{formatPace(goal.finishSeconds, goal.distanceMiles)} /mi</td>
                  <td className="px-4 py-3 font-mono">{formatPace(goal.finishSeconds, goal.event === "5K" ? 5 : 10)} /km</td>
                  <td className="px-4 py-3">{(goal.distanceMiles / (goal.finishSeconds / 3600)).toFixed(2)} mph<br />{((goal.event === "5K" ? 5 : 10) / (goal.finishSeconds / 3600)).toFixed(2)} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Speed, Distance, and Time Formula</h2>
        <p>
          These formulas describe the relationship between distance, time, and average speed:
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Speed = Distance ÷ Time
          <br />
          Time = Distance ÷ Speed
          <br />
          Distance = Speed × Time
        </div>
        <p>
          For example, covering 26.21875 miles in 4 hours averages 6.55 mph. At 8 mph, covering 10 miles takes 1.25 hours, or 1 hour 15 minutes. Keep distance and speed units consistent.
        </p>
        <p>A 2-hour marathon is a full-marathon performance, not a half-marathon distance. A 2-hour half marathon is a different event and requires a much slower average pace.</p>

        <h2>How to Pace a Marathon</h2>
        <p>
          Treat goal pace as an average, not a demand to hit an identical split every mile. A controlled plan can help you avoid spending too much effort early, when the race still feels easy.
        </p>
        <ol>
          <li><strong>Start controlled:</strong> Crowds and race-day excitement can make the opening miles feel effortless. Settle in near your planned effort instead of banking time with a fast start.</li>
          <li><strong>Stay steady through the middle:</strong> Find a sustainable rhythm, take fluids and fuel according to your practiced plan, and make small adjustments for hills, turns, and weather.</li>
          <li><strong>Manage fatigue after mile 20:</strong> Focus on relaxed form and effort. If your pace begins to fade, make a measured adjustment or use planned walk breaks rather than forcing a sudden surge.</li>
          <li><strong>Finish strong if you can:</strong> If you still feel controlled late in the race, gradually increase effort. Finishing strong is an option, not an expectation.</li>
        </ol>
        <p>
          Starting too fast can use more energy than intended and make later miles feel harder, increasing the chance that pace drops. Training, conditions, and individual response matter; even pacing is a useful baseline rather than a guarantee.
        </p>

        <h2>Negative Splits vs. Positive Splits</h2>
        <p>
          Splits compare how long different parts of a race take. Here, “faster” means covering the same distance in less time.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Strategy</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Meaning</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Potential benefit</th>
                <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Consideration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">Negative splits</th>
                <td className="px-4 py-3">The second half is faster than the first.</td>
                <td className="px-4 py-3">A conservative start may leave room to increase effort later.</td>
                <td className="px-4 py-3">An overly cautious first half can require an aggressive finish.</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">Even pacing</th>
                <td className="px-4 py-3">Race segments are run at a similar average pace.</td>
                <td className="px-4 py-3">A simple target can make effort easier to monitor.</td>
                <td className="px-4 py-3">Terrain, weather, crowds, and aid stations disrupt exact splits.</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-semibold">Positive splits</th>
                <td className="px-4 py-3">The second half is slower than the first.</td>
                <td className="px-4 py-3">Can happen naturally on hilly courses or as fatigue builds.</td>
                <td className="px-4 py-3">A large late slowdown may follow an overly fast early pace.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Controlled pacing gives recreational runners a practical way to manage effort across a long event. It does not require identical splits or guarantee a particular result.
        </p>

        <h2>Race Pace vs. Training Pace</h2>
        <p>
          Training includes different effort levels, each serving a different purpose. A target marathon pace is not the pace for every run, and the right speeds depend on current fitness and race goals.
        </p>
        <ul>
          <li><strong>Easy running pace:</strong> Comfortable, conversational effort that supports recovery and aerobic volume.</li>
          <li><strong>Long-run pace:</strong> Often easy or moderate; some plans include sections at a faster effort. Long runs build endurance, not just race-pace practice.</li>
          <li><strong>Tempo pace:</strong> A sustained “comfortably hard” effort, typically held for a limited duration.</li>
          <li><strong>Threshold pace:</strong> A controlled hard effort around the intensity a runner can sustain for a limited period; it is not an all-out sprint.</li>
          <li><strong>Interval pace:</strong> Faster repetitions with recovery periods, adjusted to the workout and runner’s experience.</li>
          <li><strong>Goal marathon pace:</strong> The planned average pace for a specific marathon finish time. Some training plans include it, but not every run should be at this pace.</li>
        </ul>
        <p>
          Use a plan appropriate to your experience, and base training speeds on current ability rather than forcing a goal pace that no longer feels realistic.
        </p>

        <h2>Running Pace Conversion: Minutes per Mile vs. Minutes per Kilometer</h2>
        <p>
          Pace is elapsed time divided by distance. To convert a pace expressed per mile to the equivalent time per kilometer, multiply by 1.60934. To convert per-kilometer pace to per-mile pace, divide by 1.60934.
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Minutes per km = minutes per mile ÷ 1.60934
          <br />
          Minutes per mile = minutes per km × 1.60934
          <br />
          Speed (km/h) = speed (mph) × 1.60934
          <br />
          Speed (mph) = speed (km/h) ÷ 1.60934
        </div>
        <p>
          For example, 8:00 per mile is 8 × 1.60934 = 12.87 minutes per kilometer, or about 12:52/km. A 5:00/km pace is 5 × 1.60934 = 8.05 minutes per mile, or about 8:03/mi. For speed, 8 mph is about 12.87 km/h. The{" "}
          <Link href="/walking-pace-calculator">Walking Pace Calculator</Link> can also help convert walking speeds and paces.
        </p>

        <h2>How to Choose a Realistic Marathon Goal</h2>
        <p>
          Shorter races can provide useful context for a marathon goal, but they cannot guarantee a marathon result. Choose a target by looking at the whole training picture:
        </p>
        <ul>
          <li><strong>Previous 5K and 10K results:</strong> These show current speed over shorter distances, but a marathon also requires endurance and fueling preparation.</li>
          <li><strong>Half-marathon performance:</strong> A recent half can offer a closer endurance reference, though marathon outcomes still vary.</li>
          <li><strong>Training consistency:</strong> Consider how regularly you have been able to run and recover over recent months.</li>
          <li><strong>Weekly mileage and long runs:</strong> A goal should fit the training volume you can build and sustain safely.</li>
          <li><strong>Running experience:</strong> Newer runners may prioritize completing the distance comfortably; experienced runners can weigh prior race execution and training history.</li>
        </ul>
        <p>
          Use shorter race times as one input, not a promise. Course elevation, weather, health, and race-day execution can all affect the result. For walking and general activity context, see our <Link href="/walking-for-weight-loss">Walking for Weight Loss Guide</Link> and <Link href="/">Walking Calorie Calculator</Link>.
        </p>

        <h2>Common Marathon Pacing Mistakes</h2>
        <ul>
          <li><strong>Starting too fast:</strong> Do not let early excitement push you well ahead of a sustainable effort.</li>
          <li><strong>Ignoring the plan:</strong> Have a pace or effort range, but allow reasonable adjustments for real conditions.</li>
          <li><strong>Making sudden pace changes:</strong> Gradual adjustments are usually easier to manage than repeated surges.</li>
          <li><strong>Never practicing goal effort:</strong> If your training plan includes race-pace segments, practice them in appropriate workouts rather than improvising on race day.</li>
          <li><strong>Leaving hydration and fueling to chance:</strong> Practice a suitable plan during training; needs and tolerances differ.</li>
          <li><strong>Choosing an unrealistic finish goal:</strong> Reassess if current training or recent performances no longer support the original target.</li>
          <li><strong>Ignoring course and weather:</strong> Heat, wind, hills, altitude, and surface can change the effort required for a given pace.</li>
        </ul>
        <p>
          Pace charts are planning references, not guarantees. For walking-specific information, explore <Link href="/how-long-to-walk-a-mile">How Long Does It Take to Walk a Mile?</Link> and the <Link href="/walking-pace-calculator">Walking Pace Calculator</Link>.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="pace-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      {/* Internal Navigation to Flagship Tool */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Calculate Walking Energy Burn</h2>
        <p className="mt-2 text-emerald-100">
          Estimate calories burned for walking pace, duration, distance, and terrain with our flagship tool. See the <Link href="/walking-calories-burned-chart" className="font-semibold underline">Walking Calories Burned Chart</Link> for reference estimates.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-emerald-800 shadow transition hover:bg-emerald-50"
          >
            Open Walking Calorie Calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}
