import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AlertTriangle, ShieldAlert, HeartPulse, Stethoscope } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Medical & Health Disclaimer | WalkingCalorieCalc",
  description:
    "Important medical and health disclaimer regarding the use of our walking calorie calculators, metabolic estimates, and exercise advice.",
  canonicalPath: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  const lastUpdated = "November 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Medical Disclaimer" }]} />

      <div className="my-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Health &amp; Safety Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Medical &amp; Health Disclaimer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last Updated: <strong>{lastUpdated}</strong>
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 my-8 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>General Informational &amp; Educational Purpose Only</span>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          The information, calculators, calorie estimations, step conversions, and fitness guides presented on {siteConfig.SITE_NAME} are intended solely for general informational and educational purposes. They do not constitute professional medical advice, clinical diagnosis, or prescribed physical therapy.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none my-8 space-y-6">
        <h2>1. Always Consult a Licensed Healthcare Professional</h2>
        <p>
          You should never rely on the information on this website as an alternative to medical advice from your physician, cardiologist, physical therapist, or other licensed healthcare provider. If you have specific medical conditions, cardiovascular disease, hypertension, joint replacements, respiratory ailments, or are pregnant, always seek the advice of your doctor before initiating any new physical training program or altering your daily caloric balance.
        </p>

        <h2>2. Inherent Variability in Caloric Calculations</h2>
        <p>
          All calorie burn values provided on {siteConfig.SITE_NAME} are mathematical models based on the <em>2011 Compendium of Physical Activities</em> and metabolic formulas established by the American College of Sports Medicine (ACSM). These figures represent population-level averages derived from laboratory indirect calorimetry studies.
        </p>
        <p>
          Actual individual caloric expenditure will vary considerably based on biological variables that no software calculator can measure directly, including:
        </p>
        <ul>
          <li><strong>Body Composition:</strong> Ratio of skeletal muscle mass to adipose tissue.</li>
          <li><strong>Mitochondrial &amp; Movement Efficiency:</strong> Gait mechanics, foot strike kinematics, and biomechanical economy.</li>
          <li><strong>Hormonal &amp; Metabolic Rate:</strong> Thyroid function, sympathetic nervous system activation, and past caloric restriction history.</li>
          <li><strong>Environmental Influences:</strong> Ambient air temperature, humidity, headwind resistance, and altitude.</li>
        </ul>

        <h2>3. Emergency Medical Situations</h2>
        <p>
          If you experience chest pressure, acute dizziness, shortness of breath, heart palpitations, or severe joint pain during or after walking or exercise, stop immediately and call emergency services (such as 911 in the United States) or seek immediate medical attention.
        </p>

        <h2>4. No Doctor-Patient Relationship</h2>
        <p>
          Using {siteConfig.SITE_NAME}, submitting questions through our contact form, or utilizing our interactive calculators does not establish a doctor-patient, therapist-patient, or confidential professional healthcare relationship.
        </p>

        <p>
          Review our{" "}
          <Link href="/editorial-policy-and-methodology" className="text-brand-600 underline font-medium">
            Editorial Policy &amp; Methodology
          </Link>{" "}
          to review the scientific research and equations that power our tools.
        </p>
      </div>
    </div>
  );
}
