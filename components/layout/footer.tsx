import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-border/60 py-10 text-sm text-muted">
      <div className="container flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-display text-base text-fg">
            {siteConfig.name}<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs">
            © {year} · 持续在路上
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <a href="/rss.xml" className="hover:text-fg">RSS</a>
          <a href="/sitemap.xml" className="hover:text-fg">Sitemap</a>
          <Link href="/about" className="hover:text-fg">About</Link>
        </div>
      </div>
    </footer>
  );
}
