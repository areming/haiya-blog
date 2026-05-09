"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Pagefind = {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        url: string;
        meta: { title?: string };
        excerpt: string;
      }>;
    }>;
  }>;
};

type Result = {
  id: string;
  url: string;
  title: string;
  excerpt: string;
};

declare global {
  interface Window {
    pagefind?: Pagefind;
  }
}

// 用 Function 构造器绕开 webpack 静态分析，让浏览器原生 import() 处理 URL。
const importPagefind = new Function(
  "return import('/pagefind/pagefind.js')",
) as () => Promise<Pagefind>;

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [status, setStatus] = useState<
    "loading" | "ready" | "missing" | "error"
  >("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
    let cancelled = false;
    (async () => {
      if (window.pagefind) {
        setStatus("ready");
        return;
      }
      try {
        const head = await fetch("/pagefind/pagefind-entry.json", {
          method: "HEAD",
        });
        if (!head.ok) {
          setStatus("missing");
          return;
        }
        const mod = await importPagefind();
        if (cancelled) return;
        window.pagefind = mod;
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const r = await window.pagefind!.search(query);
        const top = await Promise.all(
          r.results.slice(0, 8).map(async (item) => {
            const data = await item.data();
            return {
              id: item.id,
              url: data.url,
              title: data.meta.title ?? data.url,
              excerpt: data.excerpt,
            };
          }),
        );
        if (!cancelled) setResults(top);
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(e instanceof Error ? e.message : String(e));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query, status]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-fg/30 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg shadow-2xl shadow-fg/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              status === "loading"
                ? "正在加载索引…"
                : status === "missing"
                  ? "索引未生成"
                  : "搜索文章…"
            }
            disabled={status === "loading" || status === "missing"}
            className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted disabled:cursor-not-allowed"
          />
          <kbd className="hidden h-6 items-center rounded border border-border bg-bg-elevated px-1.5 text-[11px] text-muted sm:inline-flex">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {status === "missing" && (
            <div className="px-4 py-8 text-center text-sm text-muted">
              <p>搜索索引尚未生成。</p>
              <p className="mt-2">
                运行{" "}
                <code className="mx-1 rounded bg-muted-bg px-1.5 py-0.5 text-xs">
                  pnpm build
                </code>{" "}
                或{" "}
                <code className="mx-1 rounded bg-muted-bg px-1.5 py-0.5 text-xs">
                  pnpm build:search
                </code>{" "}
                生成索引。
              </p>
            </div>
          )}
          {status === "error" && (
            <p className="px-4 py-8 text-center text-sm text-muted">
              加载索引失败：{errorMsg}
            </p>
          )}
          {status === "ready" && query && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted">
              没有找到 “{query}” 的相关结果
            </p>
          )}
          {results.map((r) => (
            <a
              key={r.id}
              href={r.url}
              className="block border-b border-border/60 px-4 py-3 transition last:border-0 hover:bg-bg-elevated"
              onClick={onClose}
            >
              <p className="font-display font-medium">{r.title}</p>
              <p
                className="mt-1 line-clamp-2 text-sm text-muted [&_mark]:bg-accent/20 [&_mark]:text-fg"
                dangerouslySetInnerHTML={{ __html: r.excerpt }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
