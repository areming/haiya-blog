import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

  return (
    <div className="container py-12 md:py-20">
      <p className="text-sm text-muted">标签</p>
      <h1 className="mb-10 mt-2 text-3xl font-bold tracking-tight">#{tag}</h1>
      <ul className="divide-y divide-border/60">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
