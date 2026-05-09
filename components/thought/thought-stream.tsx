import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { Thought } from "@/lib/thoughts";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/components/post/mdx-content";

export function ThoughtStream({ thoughts }: { thoughts: Thought[] }) {
  return (
    <section aria-label="开场" className="relative">
      {/* 第 1 屏：Hero */}
      <article className="thought-screen relative flex min-h-[100svh] flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="hero-eyebrow justify-center">
            {siteConfig.name} · 个人博客
          </p>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl text-balance">
            慢慢写，
            <br />
            <span className="italic text-accent">认真</span>地写。
          </h1>
          <p className="mt-7 text-[15px] leading-relaxed text-muted text-pretty md:text-base">
            {siteConfig.description}
          </p>
        </div>
        <ScrollHint />
      </article>

      {/* 后续每屏一句 thought */}
      {thoughts.map((t, i) => (
        <article
          key={t.slug}
          className="thought-screen relative flex min-h-[100svh] flex-col items-center justify-center px-6"
        >
          <div className="max-w-2xl text-center">
            <div className="thought-body font-display text-3xl font-medium leading-[1.35] tracking-tight text-balance text-fg/95 md:text-[2.5rem]">
              <MDXContent code={t.body.code} />
            </div>
            <time
              dateTime={t.date}
              className="mt-12 inline-block text-[11px] uppercase tracking-[0.28em] text-muted"
            >
              {formatDate(t.date)}
            </time>
          </div>
          {i < thoughts.length - 1 && <ScrollHint />}
        </article>
      ))}
    </section>
  );
}

function ScrollHint() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/50"
    >
      <ChevronDown className="h-5 w-5 animate-[bounce_2.2s_infinite]" />
    </span>
  );
}
