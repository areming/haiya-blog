import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getAdjacentPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/components/post/mdx-content";
import { Toc } from "@/components/post/toc";
import { Comments } from "@/components/post/comments";
import { ReadingProgress } from "@/components/post/reading-progress";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.summary)}&tags=${encodeURIComponent(post.tags.join(","))}`;
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const readingMinutes = Math.max(
    1,
    Math.round((post.readingTime as { minutes: number }).minutes),
  );

  return (
    <div className="container py-16 md:py-24">
      <ReadingProgress />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_200px]">
        <article className="min-w-0">
          <header className="mb-12">
            <p className="hero-eyebrow">
              {formatDate(post.date)} · {readingMinutes} 分钟
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.15] tracking-tight md:text-[2.75rem] text-balance">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-5 text-[17px] leading-relaxed text-muted text-pretty">
                {post.summary}
              </p>
            )}
            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3 text-[13px]">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}` as `/tags/${string}`}
                    className="text-muted transition hover:text-accent"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <MDXContent code={post.body.code} />
          </div>

          <nav className="mt-20 grid grid-cols-1 gap-3 border-t border-border/60 pt-8 text-sm md:grid-cols-2">
            {prev ? (
              <Link
                href={prev.url as `/posts/${string}`}
                className="group rounded-lg border border-border/60 p-4 transition hover:border-accent/60 hover:bg-bg-elevated"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  ← 上一篇
                </span>
                <p className="mt-2 font-display font-medium leading-snug group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                href={next.url as `/posts/${string}`}
                className="group rounded-lg border border-border/60 p-4 text-right transition hover:border-accent/60 hover:bg-bg-elevated"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  下一篇 →
                </span>
                <p className="mt-2 font-display font-medium leading-snug group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            ) : <span />}
          </nav>

          <section className="mt-16 border-t border-border/60 pt-10">
            <h2 className="mb-6 font-display text-lg font-semibold tracking-tight">
              评论
            </h2>
            <Comments />
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc items={post.headings as { level: number; text: string; slug: string }[]} />
          </div>
        </aside>
      </div>
    </div>
  );
}
