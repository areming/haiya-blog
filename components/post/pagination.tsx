import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Route } from "next";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prevHref =
    currentPage === 2
      ? ("/posts" as Route)
      : (`/posts/page/${currentPage - 1}` as Route);
  const nextHref = `/posts/page/${currentPage + 1}` as Route;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="分页"
      className="mt-16 flex items-center justify-between border-t border-border/60 pt-6 text-sm"
    >
      <div>
        {hasPrev ? (
          <Link
            href={prevHref}
            className="group inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            上一页
          </Link>
        ) : (
          <span />
        )}
      </div>

      <span className="text-xs text-muted">
        第 {currentPage} / {totalPages} 页
      </span>

      <div>
        {hasNext ? (
          <Link
            href={nextHref}
            className="group inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
          >
            下一页
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
