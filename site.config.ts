/**
 * Site Configuration & Global Constants
 * Edit values here or override via environment variables.
 * Never invent fake medical credentials or artificial testimonials.
 */

export const siteConfig = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "WalkingCalorieCalc.com",
  SITE_TAGLINE: "Accurate, Science-Backed Calories Burned Walking Calculator",
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "walkingcaloriecalc.com",
  CANONICAL_URL: process.env.NEXT_PUBLIC_CANONICAL_URL || "https://walkingcaloriecalc.com",
  CONTACT_EMAIL: "zainndevv@gmail.com",
  
  // Author & Editorial Transparency (placeholders for the publisher to fill in their real name & bio)
  AUTHOR_NAME: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Editorial Fitness Team",
  AUTHOR_TITLE: "Fitness & Nutrition Researchers",
  AUTHOR_BIO: process.env.NEXT_PUBLIC_AUTHOR_BIO || "Our team synthesizes peer-reviewed exercise science, clinical walking guidelines, and physical activity compendiums to make fitness metrics accessible, transparent, and accurate.",
  AUTHOR_IMAGE: "/images/author.jpg",

  // Analytics & Monetisation (AdSense starts disabled until client ID is provided)
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID || "",
  ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "", // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
  ADSENSE_TEST_MODE: process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ADS_TEST_MODE === "true",

  // Primary Navigation
  navLinks: [
    { label: "Calculator", href: "/" },
    { label: "Steps to Miles", href: "/steps-to-miles-calculator" },
    { label: "10,000 Steps Guide", href: "/how-many-miles-is-10000-steps" },
    { label: "Pace Calculator", href: "/walking-pace-calculator" },
    { label: "Calorie Chart", href: "/walking-calories-burned-chart" },
    { label: "Blog & Guides", href: "/blog" },
  ],

  // Secondary Tools
  allTools: [
    {
      title: "Walking Calorie Calculator",
      description: "Flagship live calculator by weight, speed, incline, terrain and steps.",
      href: "/",
      badge: "Main Tool",
    },
    {
      title: "Steps to Miles Calculator",
      description: "Convert any step count to miles and kilometers with personalized stride lengths.",
      href: "/steps-to-miles-calculator",
    },
    {
      title: "How Many Miles is 10,000 Steps?",
      description: "Comprehensive step-distance breakdown for 1k to 30k steps by height.",
      href: "/how-many-miles-is-10000-steps",
    },
    {
      title: "Steps to Calories Calculator",
      description: "Calculate exact calories burned purely from pedometer or smartwatch steps.",
      href: "/steps-to-calories-calculator",
      badge: "Popular",
    },
    {
      title: "Walking Pace Calculator",
      description: "Compute speed, distance, time, and splits in min/mile and min/km.",
      href: "/walking-pace-calculator",
      badge: "Speed & Time",
    },
    {
      title: "How Long Does It Take to Walk a Mile?",
      description: "Real-world duration benchmarks across stroll, moderate, brisk, and power paces.",
      href: "/how-long-to-walk-a-mile",
      badge: "Guide & Tables",
    },
    {
      title: "Walking Calories Burned Chart",
      description: "High-density printable reference matrix by body weight and walking speeds.",
      href: "/walking-calories-burned-chart",
      badge: "Printable Matrix",
    },
    {
      title: "Recommended Steps Per Day: How Many Steps Should You Walk?",
      description: "Scientific evidence on mortality, heart health, and weight maintenance.",
      href: "/how-many-steps-a-day",
      badge: "Health Guide",
    },
    {
      title: "Walking for Weight Loss Guide",
      description: "Sustainable caloric deficit planning, weekly pace routines, and fat-loss projections.",
      href: "/walking-for-weight-loss",
      badge: "Weight Loss",
    },
    {
      title: "Calories vs. kcal: What's the Difference?",
      description: "Demystifying small calories, dietary kilocalories, and energy conversion math.",
      href: "/calories-vs-kcal",
      badge: "Nutrition Explainer",
    },
    {
      title: "Maintenance Calories & TDEE Calculator",
      description: "Calculate your Basal Metabolic Rate, daily maintenance calories, and target macro splits.",
      href: "/maintenance-calorie-calculator",
      badge: "Metabolism & Macros",
    },
    {
      title: "Treadmill Incline Calculator & Pace Chart",
      description: "Metabolic incline calorie burn, speed to pace conversions, and 12-3-30 workout analysis.",
      href: "/treadmill-incline-calculator",
      badge: "Incline & Treadmill",
    },
    {
      title: "Calories Burned Calculator (Multi-Sport)",
      description: "Compare calorie expenditure across cycling, swimming, jumping rope, hiking, and strength.",
      href: "/calories-burned-calculator",
      badge: "All Exercises",
    },
    {
      title: "BMI & FFMI Calculator",
      description: "Adult and pediatric BMI charts, healthy weight boundaries, and Fat-Free Mass Index.",
      href: "/bmi-calculator",
      badge: "Body Composition",
    },
    {
      title: "Marathon & Race Pace Chart",
      description: "Complete pace splits for 5K, 10K, half marathon, and sub-3/4 hour full marathon finishes.",
      href: "/marathon-pace-chart",
      badge: "Race Splits",
    },
    {
      title: "Weight Converter (lbs to kg & kg to lbs)",
      description: "Fast two-way weight converter with exact scientific conversion reference table.",
      href: "/weight-converter",
      badge: "Unit Converter",
    },
    {
      title: "Fitness Apps & Trackers Review",
      description: "Independent comparison of WalkFit, Apple Watch calorie accuracy, and non-watch pedometers.",
      href: "/fitness-apps-and-trackers",
      badge: "Reviews & Tech",
    },
  ],

  // Trust & Compliance Pages
  trustLinks: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "Editorial & Methodology", href: "/editorial-policy-and-methodology" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export type SiteConfig = typeof siteConfig;
