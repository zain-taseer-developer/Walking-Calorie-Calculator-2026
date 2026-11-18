# Walking Calorie Calculator

Production-ready walking calorie calculator website built with Next.js, TypeScript, and Tailwind CSS. SEO and AdSense ready.

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **MDX** for blog posts
- **Vitest** for unit testing
- Deployable on Vercel or Cloudflare Pages

## Project Structure

```
app/              # Next.js App Router pages and API routes
components/       # React components (calculator, content, layout)
content/          # MDX blog posts and content
data/             # Data files (keywords, audit reports)
lib/              # Utility libraries
public/           # Static assets
scripts/          # Keyword parsing and audit scripts
site.config.ts    # Site configuration and global constants
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in your values:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_NAME` | Your site name | Yes |
| `NEXT_PUBLIC_DOMAIN` | Your domain | Yes |
| `NEXT_PUBLIC_CANONICAL_URL` | Canonical URL | Yes |
| `NEXT_PUBLIC_AUTHOR_NAME` | Your real name | Yes |
| `NEXT_PUBLIC_AUTHOR_BIO` | Your real bio | Yes |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 ID | No |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense publisher ID | No |
| `SMTP_HOST` | SMTP host for contact form | No* |
| `SMTP_PORT` | SMTP port (587 or 465) | No* |
| `SMTP_USER` | SMTP username | No* |
| `SMTP_PASSWORD` | SMTP password | No* |
| `SMTP_FROM` | Sender email address | No* |
| `CONTACT_EMAIL` | Inbox receiving contact submissions | No* |

\* Contact form will return a 503 error if SMTP settings are not configured.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Other Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm run test` | Run Vitest unit tests |

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Add environment variables
4. Deploy

## Checklist Before Launch

- [ ] Create `.env.local` with real values
- [ ] Replace placeholder author name and bio in `site.config.ts` or `.env.local`
- [ ] Configure SMTP for contact form email delivery
- [ ] Add Google AdSense client ID (if monetising)
- [ ] Add Google Analytics 4 ID (if tracking)
- [ ] Commit all changes to git
- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` and fix warnings
- [ ] Run `npm run typecheck` and fix errors

## Publishing a New Blog Post

1. Create a new MDX file in `content/blog/`
2. Use this frontmatter structure:
   ```mdx
   ---
   title: "Your Post Title"
   slug: "your-post-slug"
   description: "Short description for SEO"
   category: "Category Name"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content (1,000+ words for guide pages)
4. Add the post to the blog listing page if needed
5. Build and deploy

## License

Private
