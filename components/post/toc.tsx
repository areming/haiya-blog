"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/posts";

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | undefined>();

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0% 0% -70% 0%", threshold: [0, 1] }
    );
    items.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="文章目录" className="space-y-2 text-sm">
      <p className="font-medium text-fg">目录</p>
      <ul className="space-y-1.5 border-l border-border/60">
        {items.map((item) => (
          <li
            key={item.slug}
            style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
          >
            <a
              href={`#${item.slug}`}
              className={cn(
                "block truncate text-muted transition hover:text-fg",
                activeId === item.slug && "text-accent"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
