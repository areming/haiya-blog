"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cfg = siteConfig.giscus;
  if (cfg.repoId.startsWith("PLACEHOLDER")) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-bg-elevated px-4 py-6 text-sm text-muted">
        评论系统未配置。请在 GitHub 仓库开启 Discussions，到{" "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          giscus.app
        </a>{" "}
        生成参数后填入 <code className="font-mono text-xs">lib/site.ts</code> 中的{" "}
        <code className="font-mono text-xs">giscus</code> 字段。
      </p>
    );
  }

  if (!mounted) return null;

  return (
    <Giscus
      repo={cfg.repo as `${string}/${string}`}
      repoId={cfg.repoId}
      category={cfg.category}
      categoryId={cfg.categoryId}
      mapping={cfg.mapping as "pathname"}
      reactionsEnabled={cfg.reactionsEnabled as "0" | "1"}
      emitMetadata={cfg.emitMetadata as "0" | "1"}
      inputPosition={cfg.inputPosition as "top" | "bottom"}
      lang={cfg.lang}
      theme={resolvedTheme === "dark" ? "dark_dimmed" : "light"}
      loading="lazy"
    />
  );
}
