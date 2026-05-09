import { allPosts, type Post } from "contentlayer/generated";

export type { Post };
export type TocItem = { level: number; text: string; slug: string };

export function getAllPosts(): Post[] {
  return allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug && !p.draft);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAdjacentPosts(slug: string): {
  prev?: Post;
  next?: Post;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: posts[i + 1],
    next: posts[i - 1],
  };
}
