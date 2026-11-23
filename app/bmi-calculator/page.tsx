
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BMICalculatorTool } from "@/components/calculator/BMICalculatorTool";
import { FAQSection } from "@/components/content/FAQSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/site.config";
import { constructSocialMetadata } from "@/lib/seo";
import { ArrowRight, Calculator } from "lucide-react";

const pageTitle = "BMI Calculator – Body Mass Index & FFMI";
const pageDescription =
  "Calculate adult BMI, find your healthy weight range, understand BMI categories, and estimate normalized FFMI using body-fat percentage.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteConfig.CANONICAL_URL}/bmi-calculator`,
  },
  ...constructSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.CANONICAL_URL}/bmi-calculator`,
  }),
};

const bmiCategories = [
  {
    range: "Below 18.5",
    category: "Underweight",
    interpretation:
      "Below the standard adult reference range. BMI alone cannot explain the cause or assess overall health.",
  },
  {
    range: "18.5 to 24.9",
    category: "Normal weight",
    interpretation:
      "Within the standard adult reference range. This does not guarantee overall health.",
  },
  {
    range: "25.0 to 29.9",
    category: "Overweight",
    interpretation:
      "Above the standard adult reference range. Consider the result alongside other health information.",
  },
  {
    range: "30.0 or higher",
    category: "Obesity",
    interpretation:
      "At or above the standard adult BMI screening threshold. It is not a diagnosis by itself.",
  },
];

const relatedCalculators = [
  {
    title: "Weight Converter",
    description:
      "Convert body weight between pounds and kilograms with a quick two-way converter.",
    href: "/weight-converter",
    badge: "Unit Converter",
  },
  {
    title: "Maintenance Calorie & TDEE Calculator",
    description:
      "Estimate daily maintenance calories and explore your total daily energy needs.",
    href: "/maintenance-calorie-calculator",
    badge: "Metabolism",
  },
  {
    title: "Walking Calorie Calculator",
    description:
      "Estimate calories burned from your walking time, pace, weight, and terrain.",
    href: "/",
    badge: "Walking",
  },
  {
    title: "Calories Burned Calculator",
    description:
      "Compare estimated calorie burn across walking, cycling, swimming, and other activities.",
    href: "/calories-burned-calculator",
    badge: "Activity",
  },
];

const faqs = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "Body mass index (BMI) is a calculation that relates weight to height. For metric units, divide weight in kilograms by height in metres squared. For pounds and inches, divide weight by height in inches squared and multiply by 703. BMI is a screening measure, not a direct measurement of body fat.",
  },
  {
    question: "What is a healthy BMI for adults?",
    answer:
      "The standard adult BMI reference range is 18.5 to less than 25.0. It is a screening range, not an individual diagnosis or a complete measure of health.",
  },
  {
    question: "What is a healthy weight for my height?",
    answer:
      "The calculator shows the weight range corresponding to a BMI of 18.5 to 24.9 at your entered height. Treat it as a general reference rather than a required or ideal weight. Body composition and health history also matter.",
  },
  {
    question: "What is FFMI and how is it calculated?",
    answer:
      "Fat-Free Mass Index (FFMI) relates estimated fat-free mass to height. Fat-free mass is estimated by subtracting estimated fat mass from total body weight. FFMI is calculated by dividing fat-free mass in kilograms by height in metres squared. A normalized FFMI adjusts the index for height; it is an estimate, not a diagnosis.",
  },
  {
    question: "Is BMI accurate for muscular people?",
    answer:
      "BMI can classify a muscular person as overweight because it does not distinguish muscle from fat. Consider BMI alongside body composition and other health information rather than interpreting the number alone.",
  },
  {
    question: "How is BMI calculated for children?",
    answer:
      "For children and teenagers, BMI is interpreted using age- and sex-specific BMI-for-age percentiles rather than adult cutoffs. This calculator does not calculate pediatric percentiles. Use an appropriate child and teen BMI assessment tool or consult a pediatric health professional.",
  },
  {
    question: "How do Asian BMI cutoffs differ?",
    answer:
      "The WHO expert consultation identified lower BMI values, including 23.0 and 27.5, as public-health action points for Asian populations. These points highlight potential health risks at lower BMI values in some populations. They are not interchangeable with the standard international adult BMI categories.",
  },
  {
    question: "What are the limitations of BMI?",
    answer:
      "BMI does not distinguish fat from muscle or show where body fat is distributed. It may be less informative for people with higher muscle mass and needs different interpretation during pregnancy and in some older adults. Children and teenagers require age- and sex-specific percentiles. BMI is a screening tool, not a medical diagnosis.",
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
          Estimate adult BMI, find the corresponding standard healthy-weight
          range, and optionally explore FFMI using body-fat percentage. BMI is
          a screening measure, not a diagnosis.
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
            Choose <strong>WHO Standard</strong> to use the standard adult BMI
            categories. The Asian BMI option displays separate lower
            public-health action points explained below.
          </li>
          <li>
            Select Imperial or Metric units, depending on how you want to
            enter your height and weight.
          </li>
          <li>
            Enter your height and current body weight. If you need to convert
            between pounds and kilograms first, use our{" "}
            <Link href="/weight-converter">weight converter</Link>.
          </li>
          <li>
            Enter body-fat percentage if you want to estimate FFMI. This field
            is optional and is not needed for BMI.
          </li>
          <li>
            Results update automatically as you change the inputs. Review
            your BMI, the standard healthy-weight range for your height, and
            the optional normalized FFMI estimate.
          </li>
        </ol>

        <h2>Understanding Your BMI Results</h2>
        <p>
          Adult BMI categories group a height-adjusted weight calculation
          into screening ranges. They do not diagnose a condition or describe
          a person&apos;s overall health. The healthy-weight range shown by
          this calculator represents the weights corresponding to a BMI from
          18.5 through 24.9 at your entered height.
        </p>
        <p>
          This range is a general reference, not a prescribed, ideal, or
          suitable weight for everyone. Body composition, medical history,
          and other health information can affect how a BMI result should be
          interpreted.
        </p>
        <p>
          BMI also does not calculate how many calories your body needs each
          day. For a separate estimate of daily energy requirements, use the{" "}
          <Link href="/maintenance-calorie-calculator">
            Maintenance Calorie &amp; TDEE Calculator
          </Link>.
        </p>

        <h2>BMI Formula and Calculation Example</h2>
        <p>
          The calculator uses the standard adult BMI formulas:
        </p>

        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p>Metric: BMI = Weight (kg) ÷ Height (m)²</p>
          <p className="mt-2">
            Imperial: BMI = [Weight (lbs) ÷ Height (inches)²] × 703
          </p>
        </div>

        <p>
          For example, at 70 kg and 1.75 m:
          BMI = 70 ÷ (1.75 × 1.75) = 22.86. Height is squared first, and
          weight is then divided by that value.
        </p>

        <h2>BMI Chart and Adult Categories</h2>
        <p>
          These standard international BMI categories are commonly used for
          adults aged 20 and older. The interpretations below are general
          screening descriptions, not individual medical assessments.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-[36rem] divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <caption className="sr-only">
              Standard adult BMI ranges and general interpretations
            </caption>
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  BMI range
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  Weight category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300"
                >
                  General interpretation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {bmiCategories.map((item) => (
                <tr key={item.category} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {item.range}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {item.interpretation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm">
          On smaller screens, scroll the table horizontally to read each
          column.
        </p>

        <h2>BMI for Men and Women</h2>
        <p>
          Standard adult BMI formulas and category thresholds are generally
          the same for men and women. BMI does not directly measure body-fat
          percentage or distinguish muscle from fat. The sex field in this
          calculator does not change the adult BMI result.
        </p>

        <h2>What Is FFMI?</h2>
        <p>
          Fat-Free Mass Index (FFMI) relates estimated fat-free mass to height.
          Unlike BMI, which uses total body weight, FFMI uses an estimate of
          body weight excluding fat mass. Body-fat percentage is needed to
          estimate fat-free mass from total body weight.
        </p>

        <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p>
            Fat-free mass (kg) = Weight (kg) × [1 − Body-fat percentage ÷ 100]
          </p>
          <p className="mt-2">
            FFMI = Fat-free mass (kg) ÷ Height (m)²
          </p>
        </div>

        <p>
          This calculator also reports a height-normalized FFMI estimate.
          Normalization adjusts the index for height, but it does not create
          a universal health or muscularity classification. The result
          depends on the accuracy of the body-fat percentage entered, and
          body-fat measurement methods can produce different estimates.
        </p>

        <h2>BMI Limitations and Accuracy</h2>
        <p>
          BMI is useful as a broad screening measure, but it cannot describe
          every aspect of body composition or health. Keep these limitations
          in mind when interpreting your result:
        </p>
        <ul>
          <li>
            BMI does not distinguish muscle, fat, and bone mass.
          </li>
          <li>
            People with higher muscle mass, including some athletes, may have
            a higher BMI without the result accurately describing their body
            composition.
          </li>
          <li>
            BMI does not show where body fat is distributed.
          </li>
          <li>
            Pregnancy requires different interpretation; this calculator is
            not designed to assess pregnancy-related weight.
          </li>
          <li>
            BMI should be interpreted carefully in older adults and alongside
            other health information.
          </li>
          <li>
            Children and teenagers need age- and sex-specific percentiles
            rather than adult BMI categories.
          </li>
        </ul>
        <p>
          BMI is a screening tool, not a medical diagnosis. Discuss questions
          about your results with a qualified health professional.
        </p>

        <h2>Asian BMI Cutoffs and Public-Health Action Points</h2>
        <p>
          The WHO expert consultation identified BMI values of 23.0, 27.5,
          32.5, and 37.5 as public-health action points for Asian populations.
          These values reflect evidence that some populations may experience
          increased metabolic risk at lower BMI levels. They are additional
          action points, not replacements for the standard international
          adult BMI categories.
        </p>
        <p>
          Asian populations are diverse, and health risks vary between
          individuals and groups. The Asian option in this calculator applies
          lower thresholds to its displayed screening categories. It does not
          assess personal health risk or provide a diagnosis.
        </p>

        <h2>Adult BMI vs. Children&apos;s BMI</h2>
        <p>
          Adult BMI thresholds should not be applied directly to children
          and teenagers. For ages 2 through 19, BMI is interpreted using
          age- and sex-specific percentiles on a growth reference. This
          calculator does not calculate BMI-for-age percentiles, so it is
          not a pediatric BMI calculator. Use an appropriate child and teen
          BMI assessment tool or consult a pediatric health professional.
        </p>
      </section>

      <div className="my-8">
        <AdSlot slotId="bmi-middle" format="rectangle" />
      </div>

      <div className="mt-12">
        <FAQSection faqs={faqs} />
      </div>

      <section
        className="not-prose my-12"
        aria-labelledby="related-calculators"
      >
        <div className="mb-6">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            Connected Fitness Suite
          </span>
          <h2
            id="related-calculators"
            className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
          >
            Explore More Free Walking &amp; Health Calculators
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Explore related tools for weight conversion, daily energy needs,
            and activity calorie estimates.
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
                  <span className="rounded-xl bg-brand-50 p-2 text-brand-700 transition-transform group-hover:scale-105 dark:bg-brand-950/60 dark:text-brand-400">
                    <Calculator className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {calculator.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                  {calculator.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {calculator.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-700 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
                <span>Open Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="scientific-references" className="mt-12">
        <h2
          id="scientific-references"
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          Scientific References
        </h2>

        <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <a
              className="text-emerald-700 underline dark:text-emerald-400"
              href="https://www.cdc.gov/bmi/about/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Centers for Disease Control and Prevention (CDC): About Body
              Mass Index
            </a>{" "}
            — BMI as a screening measure and its limitations.
          </li>

          <li>
            <a
              className="text-emerald-700 underline dark:text-emerald-400"
              href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CDC: Adult BMI Categories
            </a>{" "}
            — Standard adult category ranges.
          </li>

          <li>
            <a
              className="text-emerald-700 underline dark:text-emerald-400"
              href="https://www.cdc.gov/bmi/child-teen-calculator/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CDC: Child and Teen BMI Calculator
            </a>{" "}
            — BMI-for-age assessment for ages 2 through 19.
          </li>

          <li>
            <a
              className="text-emerald-700 underline dark:text-emerald-400"
              href="https://doi.org/10.1016/S0140-6736(03)15268-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              WHO Expert Consultation: Appropriate body-mass index for Asian
              populations
            </a>{" "}
            — Rationale for Asian-population public-health action points.
          </li>

          <li>
            <a
              className="text-emerald-700 underline dark:text-emerald-400"
              href="https://doi.org/10.1097/00042752-199510000-00003"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kouri et al.: Fat-Free Mass Index in Users and Nonusers of
              Anabolic-Androgenic Steroids
            </a>{" "}
            — Research describing FFMI and a height-normalization method.
          </li>
        </ul>
      </section>
    </div>
  );
}
