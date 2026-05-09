import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);
  const tags = getAllTags().slice(0, 8);

  return (
    <div className="container py-20 md:py-28">
      <section className="mb-24">
        <p className="hero-eyebrow">{siteConfig.name} · 个人博客</p>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          慢慢写，<br />
          <span className="italic text-accent">认真</span>地写。
        </h1>
        <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted text-pretty">
          {siteConfig.description}
          这里没有热点追逐，只有我自己在意的事——代码、产品、阅读，以及偶尔的胡思乱想。
        </p>
        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
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
      </section>

      <section>
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
      </section>
    </div>
  );
}
