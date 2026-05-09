import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "归档" };

export default function ArchivePage() {
  const posts = getAllPosts();
  const groups = new Map<number, typeof posts>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }

  return (
    <div className="container py-12 md:py-20">
      <h1 className="mb-10 text-3xl font-bold tracking-tight">归档</h1>
      <p className="mb-10 text-muted">共 {posts.length} 篇文章。</p>
      <div className="space-y-12">
        {[...groups.entries()].map(([year, list]) => (
          <section key={year}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-muted">
              {year}
            </h2>
            <ul className="space-y-2">
              {list.map((post) => (
                <li key={post.slug} className="flex items-baseline gap-4">
                  <time className="w-20 shrink-0 text-sm text-muted">
                    {formatDate(post.date)}
                  </time>
                  <Link
                    href={post.url as `/posts/${string}`}
                    className="text-fg/90 hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
