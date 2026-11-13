import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BMICalculatorTool } from "@/components/calculator/BMICalculatorTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";
import { ArrowRight, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "BMI Calculator: Body Mass Index, Healthy Weight & FFMI",
  description:
    "Calculate your BMI and healthy weight range with our free BMI calculator. Check BMI categories, understand FFMI, and explore results for adults and children.",
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/bmi-calculator`,
  },
  openGraph: {
    url: `${siteConfig.CANONICAL_URL}/bmi-calculator`,
  },
};

const bmiCategories = [
  {
    range: "Below 18.5",
    category: "Underweight",
    interpretation: "Below the adult reference range; BMI alone cannot explain the cause or assess health.",
  },
  {
    range: "18.5 to 24.9",
    category: "Normal weight",
    interpretation: "Within the standard adult reference range; this does not guarantee overall health.",
  },
  {
    range: "25.0 to 29.9",
    category: "Overweight",
    interpretation: "Above the standard adult reference range; consider it alongside other health information.",
  },
  {
    range: "30.0 or higher",
    category: "Obesity",
    interpretation: "At or above the standard adult BMI screening threshold; it is not a diagnosis by itself.",
  },
];

const relatedCalculators = [
  {
    title: "Weight Converter",
    description: "Convert body weight between pounds and kilograms with a quick two-way converter.",
    href: "/weight-converter",
    badge: "Unit Converter",
  },
  {
    title: "Maintenance Calorie & TDEE Calculator",
    description: "Estimate daily maintenance calories and explore your total daily energy needs.",
    href: "/maintenance-calorie-calculator",
    badge: "Metabolism",
  },
  {
    title: "Walking Calorie Calculator",
    description: "Estimate calories burned from your walking time, pace, weight, and terrain.",
    href: "/",
    badge: "Walking",
  },
  {
    title: "Calories Burned Calculator",
    description: "Compare estimated calorie burn across walking, cycling, swimming, and more.",
    href: "/calories-burned-calculator",
    badge: "Activity",
  },
  {
    title: "Steps to Calories Calculator",
    description: "Estimate calories from your step count, body weight, and walking profile.",
    href: "/steps-to-calories-calculator",
    badge: "Steps",
  },
];

const faqs = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "Body mass index (BMI) is weight relative to height. For metric units, divide weight in kilograms by height in metres squared. For pounds and inches, divide weight by height in inches squared and multiply by 703. BMI is a screening measure, not a direct measurement of body fat.",
  },
  {
    question: "What is a healthy BMI for adults?",
    answer:
      "The standard adult reference range is 18.5 to less than 25.0. It is a screening range, not an individual diagnosis or a complete measure of health.",
  },
  {
    question: "What is a healthy weight for my height?",
    answer:
      "This calculator shows the weight range corresponding to a BMI of 18.5 to 24.9 at your entered height. Treat it as a reference range rather than a required or ideal weight; body composition and health history also matter.",
  },
  {
    question: "Is BMI different for men and women?",
    answer:
      "Standard adult BMI formulas and category thresholds are generally the same for men and women. BMI does not directly measure body-fat percentage or account for individual differences in muscle mass and body composition.",
  },
  {
    question: "What is the correct weight for a 5'7\" woman?",
    answer:
      "There is no single correct weight. At 5'7\" (about 1.70 m), the standard adult BMI reference range corresponds roughly to 118–159 lb (about 54–72 kg). This is only a screening reference and does not account for body composition or personal health factors.",
  },
  {
    question: "What is the average weight for a 5'10\" man?",
    answer:
      "An average depends on the population, location, and survey being discussed, so BMI cannot determine it. At 5'10\" (about 1.78 m), the standard adult BMI reference range corresponds roughly to 130–174 lb (about 59–79 kg); that range is not a population average or a personal target.",
  },
  {
    question: "What is FFMI and how is it calculated?",
    answer:
      "Fat-Free Mass Index (FFMI) relates estimated fat-free mass to height: FFMI = fat-free mass in kilograms ÷ height in metres squared. Fat-free mass is estimated from body weight and body-fat percentage. This calculator also displays a height-normalized FFMI estimate; neither value is a diagnosis or universal health classification.",
  },
  {
    question: "Is BMI accurate for muscular people?",
    answer:
      "BMI can classify a muscular person as overweight because it does not distinguish muscle from fat. Consider it alongside other measures and a qualified health professional’s assessment rather than interpreting the number alone.",
  },
  {
    question: "Is 200 pounds overweight?",
    answer:
      "It depends on height and other factors. For example, 200 lb at 5'7\" gives a BMI of about 31.3, while 200 lb at 6'4\" gives a BMI of about 24.3. BMI is a screening result, not a diagnosis.",
  },
  {
    question: "How is BMI calculated for children?",
    answer:
      "For children and teens, BMI is interpreted using age- and sex-specific BMI-for-age percentiles, not adult cutoffs. This calculator does not calculate pediatric percentiles; use an appropriate child and teen BMI assessment tool or consult a pediatric health professional.",
  },
  {
    question: "How do Asian BMI categories differ?",
    answer:
      "WHO consultation identified lower BMI action points (including 23 and 27.5) for assessing potential public-health risk in Asian populations, because risk may occur at lower BMI in some groups. These are action points, not interchangeable universal category definitions; populations vary. The calculator’s Asian option applies its displayed thresholds as a reference.",
  },
  {
    question: "What are the limitations of BMI?",
    answer:
      "BMI does not distinguish fat from muscle or show where fat is distributed. It can be less informative for people with higher muscle mass, and it needs different interpretation during pregnancy and in older adults. For children and teens, adult categories do not apply. BMI is a screening tool, not a medical diagnosis.",
  },
];

export default function BMICalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "BMI Calculator", href: "/bmi-calculator" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          BMI Calculator: Body Mass Index &amp; FFMI Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Estimate adult BMI, see the corresponding standard healthy-weight range, and optionally explore FFMI using body-fat percentage. BMI is a screening measure, not a diagnosis.
        </p>
      </header>

      <div className="mb-8">
        <BMICalculatorTool />
      </div>

      <AdSlot slotId="bmi-top" format="horizontal" />

      <section className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>How to Use the BMI Calculator</h2>
        <ol>
          <li>
            Choose <strong>WHO Standard</strong> for standard adult BMI categories. The Asian BMI option uses separate lower public-health action points; see the explanation below.
          </li>
          <li>Select Imperial or Metric units.</li>
          <li>
            The calculator has sex and age fields, but these do not change its BMI result or calculate pediatric percentiles.
          </li>
          <li>Enter your height and weight.</li>
          <li>
            Enter body-fat percentage if you want the calculator to estimate FFMI. This field is optional.
          </li>
          <li>
            Results update as you change the inputs; there is no separate Calculate button. Review BMI, the standard healthy-weight range for your height, and the optional normalized FFMI estimate.
          </li>
        </ol>

        <h2>Understanding Your BMI Results</h2>
        <p>
          Adult BMI categories group a height-adjusted weight calculation into screening ranges. They do not diagnose a condition or describe a person’s overall health. The calculator’s healthy-weight range shows the weights that correspond to a BMI from 18.5 through 24.9 at the entered height.
        </p>
        <p>
          That range is a reference—not a prescribed, ideal, or suitable weight for everyone. BMI should be considered with other information, such as body composition, medical history, and clinical assessment.
        </p>

        <h2>BMI Formula and Calculation Example</h2>
        <p>The calculator uses the standard formulas:</p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Metric: BMI = Weight (kg) ÷ Height (m)²
          <br />
          Imperial: BMI = [Weight (lbs) ÷ Height (inches)²] × 703
        </div>
        <p>
          For example, at 70 kg and 1.75 m: BMI = 70 ÷ (1.75 × 1.75) = 22.86. The calculation squares the height first, then divides the weight by that value.
        </p>

        <h2>BMI Chart and Categories</h2>
        <p>
          These standard adult categories are commonly used for adults aged 20 and older. They are screening ranges, and the interpretation column is general rather than diagnostic.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[36rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">Standard adult BMI ranges and general interpretations</caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">BMI range</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Weight category</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">General interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {bmiCategories.map((item) => (
                <tr key={item.category} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{item.range}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{item.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          On smaller screens, scroll the table horizontally to read each column.
        </p>

        <h2>BMI for Men vs. Women</h2>
        <p>
          Standard adult BMI formulas and category thresholds are generally the same for men and women. BMI does not directly measure body-fat percentage, distinguish muscle from fat, or account for individual differences in body composition. The sex field in this calculator does not change the result.
        </p>

        <h2>What Is FFMI?</h2>
        <p>
          Fat-Free Mass Index relates estimated fat-free mass to height. Unlike BMI, which uses total body weight, FFMI uses an estimate of weight excluding fat mass. Body-fat percentage is needed to estimate fat-free mass from body weight.
        </p>
        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Fat-free mass (kg) = Weight (kg) × [1 − Body-fat percentage ÷ 100]
          <br />
          FFMI = Fat-free mass (kg) ÷ Height (m)²
        </div>
        <p>
          This calculator reports a height-normalized FFMI estimate. Normalization adjusts the index for height; it does not establish a universal health or muscularity category. Body-fat estimates also vary by measurement method, so FFMI should be treated as an estimate.
        </p>

        <h2>BMI Limitations and Accuracy</h2>
        <ul>
          <li>BMI does not distinguish muscle, fat, and bone mass.</li>
          <li>People with higher muscle mass, including some athletes, may have a higher BMI without the result describing their body composition.</li>
          <li>BMI does not show where body fat is distributed.</li>
          <li>Pregnancy requires different interpretation; this calculator is not designed to assess pregnancy-related weight.</li>
          <li>BMI should be interpreted carefully in older adults and alongside other health information.</li>
          <li>Children and teens need age- and sex-specific percentiles rather than adult BMI categories.</li>
        </ul>
        <p>
          BMI is a screening tool, not a medical diagnosis. Discuss questions about your results with a qualified health professional.
        </p>

        <h2>Asian BMI Categories and Public-Health Action Points</h2>
        <p>
          The WHO expert consultation identified BMI values of 23.0, 27.5, 32.5, and 37.5 as public-health action points for Asian populations. These points reflect evidence that some populations may experience metabolic risk at lower BMI values. They are not a replacement for, or an interchangeable version of, the standard international adult categories.
        </p>
        <p>
          Asian populations are diverse, and risk varies between individuals and groups. The calculator’s Asian option applies the lower 23.0 and 27.5 thresholds to its displayed categories as a screening reference; it does not assess personal health risk or provide a diagnosis.
        </p>

        <h2>Adult BMI vs. Children’s BMI</h2>
        <p>
          Adult BMI thresholds should not be applied directly to children and teenagers. For ages 2 through 19, BMI is interpreted using age- and sex-specific percentiles on a growth reference. This calculator does not calculate BMI percentiles, so it is not a pediatric BMI calculator. Use an appropriate child and teen BMI assessment tool or consult a pediatric health professional.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="bmi-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      <section className="not-prose my-12" aria-labelledby="related-calculators">
        <div className="mb-6">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Connected Fitness Suite
          </span>
          <h2 id="related-calculators" className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            Explore More Free Walking &amp; Health Calculators
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Continue exploring useful tools for weight, daily energy needs, walking, and activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCalculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-500/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/60"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-xl bg-brand-50 p-2 text-brand-600 transition-transform group-hover:scale-105 dark:bg-brand-950/60 dark:text-brand-400">
                    <Calculator className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {calculator.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {calculator.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {calculator.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
                <span>Open Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="scientific-references" className="mt-12">
        <h2 id="scientific-references" className="text-2xl font-bold text-slate-900 dark:text-white">
          Scientific References
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-400" href="https://www.cdc.gov/bmi/about/index.html" target="_blank" rel="noopener noreferrer">
              Centers for Disease Control and Prevention (CDC): About Body Mass Index
            </a>{" "}
            — BMI as a screening measure and its limitations.
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-400" href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noopener noreferrer">
              CDC: Adult BMI Categories
            </a>{" "}
            — Standard adult category ranges.
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-400" href="https://www.cdc.gov/bmi/child-teen-calculator/index.html" target="_blank" rel="noopener noreferrer">
              CDC: Child and Teen BMI Calculator
            </a>{" "}
            — BMI-for-age assessment for ages 2 through 19.
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-400" href="https://doi.org/10.1016/S0140-6736(03)15268-3" target="_blank" rel="noopener noreferrer">
              WHO Expert Consultation: Appropriate body-mass index for Asian populations
            </a>{" "}
            — Rationale for Asian-population public-health action points.
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-400" href="https://doi.org/10.1097/00042752-199510000-00003" target="_blank" rel="noopener noreferrer">
              Kouri et al.: Fat-Free Mass Index in Users and Nonusers of Anabolic-Androgenic Steroids
            </a>{" "}
            — Research describing FFMI and a height-normalization method.
          </li>
        </ul>
      </section>
    </div>
  );
}
