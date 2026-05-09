import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";

export const metadata = {
  title: "文章",
};

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <div className="container py-16 md:py-24">
      <header className="mb-16">
        <p className="hero-eyebrow">Posts · {posts.length}</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          全部文章
        </h1>
      </header>
      <ul className="divide-y divide-border/60">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
