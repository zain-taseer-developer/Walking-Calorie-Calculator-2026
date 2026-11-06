import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorBio?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  faq?: Array<{ question: string; answer: string }>;
  draft?: boolean;
  relatedPosts?: string[]; // array of slugs
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTimeMinutes: number;
  wordCount: number;
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export function calculateReadingTime(text: string): { minutes: number; words: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220)); // ~220 wpm reading speed
  return { minutes, words };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_CONTENT_DIR);
  const now = new Date();

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") && !fileName.startsWith("_"))
    .map((fileName) => {
      const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const { minutes, words } = calculateReadingTime(content);

      const frontmatter: BlogPostFrontmatter = {
        title: data.title || "Untitled Post",
        slug: data.slug || fileName.replace(/\.mdx$/, ""),
        description: data.description || "",
        category: data.category || "Walking Basics",
        tags: Array.isArray(data.tags) ? data.tags : [],
        publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
        updatedAt: data.updatedAt,
        author: data.author || "Editorial Fitness Team",
        authorBio: data.authorBio,
        featuredImage: data.featuredImage,
        featuredImageAlt: data.featuredImageAlt,
        faq: Array.isArray(data.faq) ? data.faq : undefined,
        draft: Boolean(data.draft),
        relatedPosts: Array.isArray(data.relatedPosts) ? data.relatedPosts : [],
      };

      return {
        frontmatter,
        content,
        readingTimeMinutes: minutes,
        wordCount: words,
      };
    })
    // Filter out drafts and posts scheduled for future dates
    .filter((post) => {
      if (post.frontmatter.draft) return false;
      const pubDate = new Date(post.frontmatter.publishedAt);
      return pubDate <= now;
    })
    // Sort latest first
    .sort((a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug) || null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  const normalizedCategory = category.toLowerCase().replace(/-/g, " ");
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase().replace(/-/g, " ") === normalizedCategory
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  const normalizedTag = tag.toLowerCase().replace(/-/g, " ");
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase().replace(/-/g, " ") === normalizedTag)
  );
}

export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  posts.forEach((post) => {
    const cat = post.frontmatter.category;
    map.set(cat, (map.get(cat) || 0) + 1);
  });

  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));
}

export function getAllTags(): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1);
    });
  });

  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));
}

