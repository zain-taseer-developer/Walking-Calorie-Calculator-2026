# Walking Calorie Calculator (SEO & AdSense Production Website)

> **A high-performance, mobile-first, and science-backed fitness calculator website whose homepage IS the calculator.** Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, static site generation (SSG), and Decap CMS.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.17.0+ or v20+ (tested on Node.js v24)
- **Package Manager**: npm, yarn, or pnpm

### 2. Local Development
```bash
# Clone or navigate into the project directory
cd "walking calorie calculator"

# Install dependencies
npm install

# Run Vitest unit tests (verifies 2011 Compendium MET & ACSM formulas)
npm run test

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the live calculator.

### 3. Production Build
```bash
# Build static pages and verify type safety
npm run build

# Preview the production build locally
npm run start
```

---

## 📋 Checklist: What You Must Fill In Before Launch

Open `site.config.ts` or set the following environment variables in `.env.local` or in your hosting dashboard (Vercel / Cloudflare Pages):

| Config Key / Env Variable | Default / Placeholder | What You Must Fill In |
|---|---|---|
| `SITE_NAME` / `NEXT_PUBLIC_SITE_NAME` | `WalkingCalorieCalculator.net` | Your preferred website name |
| `DOMAIN` / `NEXT_PUBLIC_DOMAIN` | `walkingcaloriecalculator.net` | Your live apex domain name |
| `CANONICAL_URL` / `NEXT_PUBLIC_CANONICAL_URL` | `https://walkingcaloriecalculator.net` | Your full canonical URL with HTTPS |
| `CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_EMAIL` | `contact@walkingcaloriecalculator.net` | Your real support email address |
| `AUTHOR_NAME` / `NEXT_PUBLIC_AUTHOR_NAME` | `Editorial Fitness Team` | Your real name or editorial group name *(Never invent a fake doctor)* |
| `AUTHOR_BIO` / `NEXT_PUBLIC_AUTHOR_BIO` | (Educational bio) | Your background, fitness credentials, or research mission |
| `GA4_ID` / `NEXT_PUBLIC_GA4_ID` | `""` (Empty string) | Your Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `ADSENSE_CLIENT_ID` / `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `""` (Empty string) | Your Google AdSense Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) |
| `public/ads.txt` | `pub-0000000000000000` | Replace with your exact AdSense Publisher ID |

> ⚠️ **Important AdSense Note:** Ad slots are safely reserved with fixed min-heights (zero layout shift) and remain in placeholder state until `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is provided. Once your AdSense account is approved, add the client ID to enable live ads instantly.

---

## 🌐 Deploying to Vercel or Cloudflare Pages

### Option A: Deploy on Vercel (Recommended, 1-Click)
1. Push your project repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect **Next.js**.
4. In the **Environment Variables** tab, paste the variables from `.env.example`.
5. Click **"Deploy"**. Your site will be statically generated across global edge nodes in under 2 minutes.

### Option B: Deploy on Cloudflare Pages
1. Push your repository to GitHub.
2. In Cloudflare Dashboard, navigate to **Compute (Workers) > Pages > Connect to Git**.
3. Select your repository.
4. Set **Build command**: `npm run build`
5. Set **Build output directory**: `.next` (or use `@cloudflare/next-on-pages` adapter if using Cloudflare Edge runtime).

---

## ✍️ How to Publish a New Blog Post (Non-Developer Guide)

You do **not** need to touch any code or understand Next.js to write and publish new articles!

### Method 1: In the Browser via Decap CMS (`/admin`)
1. Once deployed, open `https://yourdomain.com/admin` in your web browser.
2. Sign in with your GitHub account (configured via Netlify Identity or GitHub OAuth).
3. Click **"New Articles & Guides"**.
4. Fill in:
   - **Title**: Your article headline
   - **Slug**: URL-friendly slug (e.g. `benefits-of-walking-after-meals`)
   - **Description**: Compelling 150-character SEO meta description
   - **Category**: Select from Walking Basics, Steps & Distance, Weight Loss, Treadmill, Calories & Nutrition
   - **Publish Date**: Today's date (or future date to schedule)
   - **Body**: Write your article in rich text or markdown.
5. Click **"Publish"**. Decap CMS commits the file to your repository, triggering an automatic rebuild!

### Method 2: Duplicate the Template File
1. In the project folder, open `content/blog/_template.mdx`.
2. Save a copy with a new name, for example: `content/blog/my-new-post.mdx`.
3. Update the frontmatter fields (title, slug, description, date).
4. Write your post below the `---` separator.
5. You can freely drop in any of these custom interactive widgets anywhere in your text:
   - `<MiniCalculator />`: Compact live calculator where readers can calculate their burn immediately.
   - `<Callout type="tip|warning|info" title="...">Your message</Callout>`: Beautiful highlighted notice.
   - `<KeyTakeaways points={["Point 1", "Point 2"]} />`: Summary takeaways box.
   - `<AdSlot format="in-article" />`: Reserved in-article ad slot.
   - `<RelatedTools />`: Card grid linking other calculators.

---

## 🧮 Mathematical Formulas & Citations

- **Walking MET Formula**: `kcal = MET × Weight (kg) × Duration (hours)`
  - Reference: Ainsworth BE, et al. *2011 Compendium of Physical Activities*. Medicine & Science in Sports & Exercise.
  - Implements piecewise linear interpolation across speeds (2.0 to 5.0 mph).
- **Net Exercise Calories**: `kcal_net = (MET − 1.0) × Weight (kg) × Duration (hours)`
  - Isolates pure active movement by subtracting baseline resting metabolic rate.
- **ACSM Treadmill Incline Formula**:
  - `VO2 (ml/kg/min) = (0.1 × S) + (1.8 × S × G) + 3.5`
  - `kcal/min = (VO2 × Weight_kg ÷ 1000) × 5`
- **Anthropometric Stride Model**: `Stride (meters) = Height (cm) × 0.414 ÷ 100`.

---

## 🧪 Testing & Verification

Run the test suite at any time:
```bash
npx vitest run
```
The automated test suite verifies:
- Sanity benchmark: 70 kg, 3.5 mph, 1 hour = exactly 301.0 kcal.
- Linear interpolation between speed points.
- Net vs. Gross calculation parity.
- ACSM treadmill equation accuracy.
- Edge case handling (zero duration, extreme values, unit roundtrips).

