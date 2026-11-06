import { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.CANONICAL_URL;
  const now = new Date();

  // Core static pages
  const staticRoutes = [
    "",
    "/steps-to-miles-calculator",
    "/how-many-miles-is-10000-steps",
    "/steps-to-calories-calculator",
    "/walking-pace-calculator",
    "/how-long-to-walk-a-mile",
    "/walking-calories-burned-chart",
    "/how-many-steps-a-day",
    "/walking-for-weight-loss",
    "/calories-vs-kcal",
    "/maintenance-calorie-calculator",
    "/treadmill-incline-calculator",
    "/calories-burned-calculator",
    "/bmi-calculator",
    "/marathon-pace-chart",
    "/weight-converter",
    "/fitness-apps-and-trackers",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/medical-disclaimer",
    "/editorial-policy-and-methodology",
    "/cookie-policy",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/blog") ? 0.8 : 0.9,
  }));

  // Dynamic blog post routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

