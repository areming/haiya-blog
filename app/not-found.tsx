import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center py-32 text-center">
      <h1 className="text-7xl font-bold tracking-tight text-muted">404</h1>
      <p className="mt-4 text-fg/80">这里什么都没有。</p>
      <Link
        href="/"
        className="mt-8 text-sm text-accent hover:underline underline-offset-4"
      >
        ← 回到首页
      </Link>
    </div>
  );
}
