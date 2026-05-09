import { Feed } from "feed";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.locale,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author.name || siteConfig.name}`,
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
    },
    author: {
      name: siteConfig.author.name || siteConfig.name,
    },
  });

  for (const post of getAllPosts().slice(0, 20)) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}${post.url}`,
      link: `${siteConfig.url}${post.url}`,
      description: post.summary,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
