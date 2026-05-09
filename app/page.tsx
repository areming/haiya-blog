import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAllThoughts } from "@/lib/thoughts";
import { PostCard } from "@/components/post/post-card";
import { ThoughtStream } from "@/components/thought/thought-stream";
import { SnapScrollEnabler } from "@/components/thought/snap-scroll-enabler";

export default function HomePage() {
  const thoughts = getAllThoughts();
  const posts = getAllPosts().slice(0, 5);
  const tags = getAllTags().slice(0, 8);

  return (
    <>
      <SnapScrollEnabler />
      <ThoughtStream thoughts={thoughts} />

      <section className="container py-24 md:py-32">
        <div className="mb-2 flex items-end justify-between border-b border-border/60 pb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            最近写的
          </h2>
          <Link
            href="/posts"
            className="group inline-flex items-center gap-1 text-[13px] text-muted transition hover:text-accent"
          >
            全部文章
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <ul className="divide-y divide-border/60">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>

        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${tag}` as `/tags/${string}`}
                className="transition hover:text-accent"
              >
                #{tag}
                <span className="ml-0.5 text-[11px] text-muted/70">{count}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center gap-4 text-[13px] text-muted">
          <a
            href="/rss.xml"
            className="group inline-flex items-center gap-1.5 transition hover:text-accent"
          >
            <Rss className="h-3.5 w-3.5" />
            RSS 订阅
          </a>
          <span className="h-3 w-px bg-border/80" aria-hidden />
          <span>不打扰，更新时主动推送到你的阅读器</span>
        </div>
      </section>
    </>
  );
}
