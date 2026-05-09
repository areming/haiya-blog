import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "@/components/search/search-trigger";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-[13.5px]">
          {siteConfig.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-fg/65 transition hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-1 flex items-center gap-1.5 border-l border-border/60 pl-2">
            <SearchTrigger />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
