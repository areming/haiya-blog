import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <li className="post-card group py-7">
      <Link href={post.url as `/posts/${string}`} className="block">
        <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
          <time>{formatDate(post.date)}</time>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="normal-case tracking-normal">
                {post.tags.slice(0, 3).join("、")}
              </span>
            </>
          )}
        </div>
        <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent md:text-[1.65rem]">
          {post.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">
          {post.summary}
        </p>
      </Link>
    </li>
  );
}
