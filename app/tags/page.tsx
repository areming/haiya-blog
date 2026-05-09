import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata = { title: "标签" };

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="container py-12 md:py-20">
      <h1 className="mb-10 text-3xl font-bold tracking-tight">标签</h1>
      {tags.length === 0 ? (
        <p className="text-muted">还没有标签。</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${tag}` as `/tags/${string}`}
                className="rounded-md border border-border/60 px-3 py-1.5 text-sm text-fg/80 transition hover:border-accent hover:text-accent"
              >
                #{tag}
                <span className="ml-1.5 text-xs text-muted">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
