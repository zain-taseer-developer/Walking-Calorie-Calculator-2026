import { siteConfig } from "@/site.config";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = siteConfig.CANONICAL_URL;

  const feedJson = {
    version: "https://jsonfeed.org/version/1.1",
    title: siteConfig.SITE_NAME,
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description: siteConfig.SITE_TAGLINE,
    items: posts.map((post) => ({
      id: `${baseUrl}/blog/${post.frontmatter.slug}`,
      url: `${baseUrl}/blog/${post.frontmatter.slug}`,
      title: post.frontmatter.title,
      summary: post.frontmatter.description,
      date_published: new Date(post.frontmatter.publishedAt).toISOString(),
      ...(post.frontmatter.updatedAt && {
        date_modified: new Date(post.frontmatter.updatedAt).toISOString(),
      }),
      authors: [{ name: post.frontmatter.author }],
      tags: post.frontmatter.tags,
    })),
  };

  return new Response(JSON.stringify(feedJson, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

