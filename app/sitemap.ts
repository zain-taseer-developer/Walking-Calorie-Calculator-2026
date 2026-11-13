import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllCategories, getAllPosts } from "@/lib/blog";

function getStaticPageRoutes(directory: string, routeSegments: string[] = []): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isFile() && /^page\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      return [`/${routeSegments.join("/")}`.replace(/\/$/, "") || "/"];
    }

    if (!entry.isDirectory() || entry.name === "api" || entry.name.startsWith("[")) {
      return [];
    }

    const isRouteGroup = entry.name.startsWith("(") && entry.name.endsWith(")");
    return getStaticPageRoutes(
      entryPath,
      isRouteGroup ? routeSegments : [...routeSegments, entry.name]
    );
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.CANONICAL_URL;
  const now = new Date();

  const staticRoutes = getStaticPageRoutes(path.join(process.cwd(), "app")).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
    priority: route === "/" ? 1.0 : route === "/blog" ? 0.8 : 0.9,
  }));

  // Dynamic blog post routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Category archives are indexable; tag archives are intentionally noindex.
  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const uniqueRoutes: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  for (const route of [...staticRoutes, ...categoryRoutes, ...blogRoutes]) {
    if (!seenUrls.has(route.url)) {
      seenUrls.add(route.url);
      uniqueRoutes.push(route);
    }
  }

  return uniqueRoutes;
}

