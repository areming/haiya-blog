import { getPaginatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";
import { Pagination } from "@/components/post/pagination";

export const metadata = {
  title: "文章",
};

export default function PostsPage() {
  const { items, totalPages, page } = getPaginatedPosts(1);
  const total = items.length + (totalPages - 1) * 10;

  return (
    <div className="container py-16 md:py-24">
      <header className="mb-16">
        <p className="hero-eyebrow">Posts · {total}</p>
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
