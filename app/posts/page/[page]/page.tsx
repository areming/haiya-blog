import { notFound } from "next/navigation";
import { getAllPosts, getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";
import { Pagination } from "@/components/post/pagination";

export function generateStaticParams() {
  const total = Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
  // 第 1 页走 /posts，这里只生成第 2 页起
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: `文章 · 第 ${page} 页` };
}

export default async function PostsByPagePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: raw } = await params;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 2) notFound();

  const { items, totalPages, page } = getPaginatedPosts(n);
  if (page !== n) notFound();

  return (
    <div className="container py-16 md:py-24">
      <header className="mb-16">
        <p className="hero-eyebrow">Posts · 第 {page} 页</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          全部文章
        </h1>
      </header>
      <ul className="divide-y divide-border/60">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
