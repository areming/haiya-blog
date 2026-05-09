import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/posts",
    "/tags",
    "/archive",
    "/about",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${base}${post.url}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tags = getAllTags().map(({ tag }) => ({
    url: `${base}/tags/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticUrls, ...posts, ...tags];
}
