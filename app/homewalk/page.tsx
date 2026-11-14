import type { Metadata } from "next";
import Link from "next/link";
import { Activity, House, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HomeWalkTracker } from "@/components/calculator/HomeWalkTracker";
import { FAQSection, type FAQItem } from "@/components/content/FAQSection";
import { RelatedTools } from "@/components/content/RelatedTools";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "HomeWalk: Indoor Walking Steps & Calorie Tracker",
  description: "Learn the benefits of walking at home, build an indoor walking routine, and estimate your steps, distance, and calories with our tracker.",
  canonicalPath: "/homewalk",
  keywords: [
    "HomeWalk",
    "walking at home",
    "indoor walking tracker",
    "home walking routine",
    "walking steps",
    "calories burned walking at home",
  ],
});

const faqs: FAQItem[] = [
  {
    question: "Can I count my steps while walking at home?",
    answer: "Yes. A phone motion sensor or fitness tracker may count indoor steps. HomeWalk's live mode estimates steps from phone motion when the browser and device expose sensor data; manual mode lets you enter a step count from another device.",
  },
  {
    question: "Does my phone count steps without a fitness tracker?",
    answer: "Some phones count steps through built-in health or fitness features. This page's live tracker uses browser motion data where available, but support and results differ by phone, browser, permissions, and how you carry the phone.",
  },
  {
    question: "Can I measure indoor walking distance with my phone?",
    answer: "Distance can be estimated from steps multiplied by stride length. This is not an indoor GPS measurement, and the result changes if your actual stride differs from the estimate or you walk in place.",
  },
  {
    question: "How many calories does 30 minutes of home walking burn?",
    answer: "It depends on body weight and walking intensity. Enter your weight, duration, and speed or steps in the manual calculator to get an estimate based on the site's walking MET calculation.",
  },
  {
    question: "Can I walk at home without a treadmill?",
    answer: "Yes. You can walk through a clear room or hallway, or march in place. A treadmill is optional; choose a safe space and a pace that feels manageable.",
  },
  {
    question: "Does walking in place count as exercise?",
    answer: "Walking in place is physical activity. Its effort depends on pace, duration, and how actively you move. A step-based distance estimate may not represent forward distance when you stay in one spot.",
  },
  {
    question: "Why is my phone not detecting my steps?",
    answer: "The browser may not support motion events, permission may be denied, the page may not be using HTTPS, or the phone may be held too steadily or in a position that hides walking motion. Use Manual Calculator mode if live data is unavailable.",
  },
  {
    question: "Can I use HomeWalk on an iPhone?",
    answer: "You can try it in a supported iPhone browser. iOS may ask for motion permission after you press Start Walking. If permission or sensor data is unavailable, use Manual Calculator mode.",
  },
  {
    question: "Can I use HomeWalk on Android?",
    answer: "You can try live tracking in a supported Android browser over HTTPS. Sensor behavior varies by device and browser. Manual Calculator mode is available as a fallback.",
  },
];

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="my-8">
      <div className="flex min-h-40 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:min-h-52">
        Image placeholder — add your own image here
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">{caption}</figcaption>
    </figure>
  );
}

export default function HomeWalkPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "HomeWalk" }]} />

      <header className="my-7 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
          <House className="h-3.5 w-3.5" aria-hidden="true" /> Walking Basics
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          HomeWalk: Benefits, Tips, Steps &amp; Calorie Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          HomeWalk makes it easier to plan indoor walking, understand walking steps and duration, and estimate calories burned at home. Learn how to build a practical home walking routine, then use the tracker below for a live estimate or manual calculation.
        </p>
      </header>

      <article className="prose prose-slate my-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-brand-700 dark:prose-a:text-brand-300">
        <h2>HomeWalk: Benefits, Tips, and How to Walk at Home</h2>
        <p>
          Home walking is a simple way to stay active without leaving your house. Whether you have a busy schedule, limited outdoor space, or prefer exercising indoors, walking at home can help you maintain a regular daily physical activity routine. You can walk through different rooms, use a hallway, or try walking in place while watching television. You do not need expensive equipment or a gym membership to get started.
        </p>

        <h3>Benefits of Walking at Home</h3>
        <p>
          Regular indoor walking offers several benefits for your overall fitness. It supports cardiovascular health, improves endurance, and helps you stay physically active throughout the day. It can also support weight management by increasing your daily movement and energy expenditure. One major advantage is convenience: you can exercise regardless of weather conditions, traffic, or outdoor walking routes. For beginners, home walking is a practical way to build a consistent walking routine.
        </p>

        <h3>How to Start a Home Walking Routine</h3>
        <p>
          Start by choosing a clear and comfortable space where you can move safely. Walk at a relaxed walking pace for a few minutes before gradually increasing your speed. You can walk around your rooms, move along a hallway, or perform simple marching movements. Keep your posture upright, move your arms naturally, and wear comfortable shoes for support. As your fitness improves, gradually increase your walking duration and intensity.
        </p>

        <h3>How Many Calories Does Walking at Home Burn?</h3>
        <p>
          The number of calories burned during home walking depends on your body weight, walking speed, walking duration, and overall intensity. A person walking at a slow pace generally burns fewer calories than someone walking briskly for the same amount of time. For example, a 30-minute session will usually burn fewer calories than a 60-minute session at a similar pace. Your actual calorie expenditure will vary depending on your individual characteristics and activity level. Use the <Link href="/">Walking Calorie Calculator</Link> for other walking scenarios.
        </p>

        <h3>Home Walking Without a Treadmill</h3>
        <p>
          You do not need a treadmill to enjoy the benefits of indoor walking. You can walk around your home, use a hallway, march in place, or follow a simple indoor walking routine. Adding natural arm movements and gradually increasing your pace can make the activity more challenging. Try to keep moving continuously for several minutes instead of stopping frequently. These simple activities can help increase your daily steps without requiring outdoor exercise.
        </p>
        <ImagePlaceholder caption="Suggested image: a clear indoor walking space or hallway." />

        <h3>How Long Should You Walk at Home?</h3>
        <p>
          Your ideal walking duration depends on your current fitness level, schedule, and personal goals. Beginners can start with 10 to 15 minutes per session and gradually build up their endurance. You can also divide your walking into shorter sessions throughout the day. Setting a realistic daily step goal can help you track your progress and stay consistent. The most important thing is to choose a routine that you can comfortably maintain.
        </p>

        <h3>Tips to Make Indoor Walking More Effective</h3>
        <p>
          To make your home walking sessions more effective, maintain a steady pace and avoid unnecessary interruptions. Set a manageable step target and increase it gradually as your endurance improves. Listening to music or using a fitness tracker can make your sessions more enjoyable and help monitor your progress. Keep your walking area free of furniture and other obstacles to reduce the risk of tripping. Most importantly, stay consistent and make indoor walking a regular part of your daily routine.
        </p>
      </article>

      <HomeWalkTracker />

      <section className="my-12 scroll-mt-24" aria-labelledby="how-to-use-heading">
        <h2 id="how-to-use-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">How to Use the Home Walking Tracker</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-6 text-slate-600 dark:text-slate-300">
          <li>Open the tracker on your mobile browser.</li>
          <li>Enter your body weight and height; add a custom stride if you know it.</li>
          <li>Place your phone consistently where it can sense your walking movement.</li>
          <li>Press <strong>Start Walking</strong>, then grant motion permission if the browser asks.</li>
          <li>Walk indoors at a comfortable pace and watch estimated steps and duration update.</li>
          <li>Press <strong>Pause</strong> for a break, then <strong>Resume</strong> to continue the same session.</li>
          <li>Press <strong>Stop</strong> when finished and review the session summary.</li>
        </ol>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          If live motion tracking is unavailable or denied, choose <strong>Manual Calculator</strong>. Enter your duration and either steps or walking speed. The tracker estimates the missing pace or step count from the values you provide.
        </p>
      </section>

      <section className="my-12 rounded-3xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30 sm:p-7" aria-labelledby="accuracy-heading">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
          <div>
            <h2 id="accuracy-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white">How Accurate Is a Home Walking Tracker?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li>Mobile step detection depends on the device sensors, browser support, permissions, and how the phone is held. Some steps may be missed or counted incorrectly.</li>
              <li>Distance is estimated from steps and stride length rather than indoor GPS. Walking in place may not correspond to forward distance.</li>
              <li>Calories are estimates based on entered weight, duration, and estimated walking intensity. They are not exact measurements.</li>
              <li>Different mobile devices and browsers can return different motion readings. Background browser restrictions may interrupt tracking, so keep this page open and the screen active.</li>
              <li>Arm movement and phone position can affect results. The live count is a general estimate, not a medical-grade or pedometer-grade reading.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">If the page is hidden, the live session pauses instead of claiming that steps continue to be tracked in the background.</p>
          </div>
        </div>
      </section>

      <article className="prose prose-slate my-12 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-brand-700 dark:prose-a:text-brand-300">
        <h2>Home Walking vs. Outdoor Walking</h2>
        <p>
          Indoor walking is convenient when weather, time, or access to a safe route makes going outside difficult. At home, you can choose short sessions and control your space, but room size may limit continuous forward walking. Outdoor routes offer more room and changing terrain, while weather, traffic, and surface conditions can affect the experience. Either option can fit a walking routine; choose the setting that helps you move safely and consistently.
        </p>

        <h2>Can You Lose Weight by Walking at Home?</h2>
        <p>
          Regular walking can contribute to daily energy expenditure and may support weight management as part of an overall routine. Results vary with total activity, food intake, sleep, health, and other individual factors. Walking at home does not guarantee a particular amount of weight change, but a routine you can maintain may help you stay active.
        </p>

        <h2>Is Walking in Place as Effective as Regular Walking?</h2>
        <p>
          Walking in place can raise activity and add movement to your day. Its intensity depends on pace, duration, arm movement, and how much effort you use. It differs from continuous outdoor walking because you do not travel forward, and a step-based distance estimate may not describe the distance you covered. Choose the movement that fits your space and comfort.
        </p>

        <h2>How Many Steps Should You Aim for at Home?</h2>
        <p>
          There is no single daily step target that fits everyone. Start from a level that feels manageable, observe your usual daily steps, and build gradually if it remains comfortable. Short indoor walks can be split across the day. For a step-distance reference, see the <Link href="/how-many-miles-is-10000-steps">10,000 Steps Guide</Link> or use the <Link href="/steps-to-miles-calculator">Steps to Miles Calculator</Link>.
        </p>
        <p>
          If you want to compare walking speed and pace, use the <Link href="/walking-pace-calculator">Walking Pace Calculator</Link>. HomeWalk estimates should be treated as a practical guide; your phone and personal stride can change the result.
        </p>
      </article>

      <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            HomeWalk uses the same gross-calorie walking methodology as this site's main calculator. Its distance and pace use your estimated stride and step count; neither live sensor mode nor manual mode measures indoor distance with GPS.
          </p>
        </div>
      </div>

      <FAQSection faqs={faqs} description="Answers about indoor walking, phone step detection, distance estimates, and using the HomeWalk tracker." />
      <RelatedTools currentPath="/homewalk" limit={4} />
    </main>
  );
}
