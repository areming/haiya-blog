// 把 contentlayer 生成的文章导出为简单 HTML，供 pagefind 索引。
// 在 `next build` 之后运行。
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ".pagefind-source");

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 极简 markdown → html：保留段落、标题、列表、代码（pagefind 只关心可见文字）
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inCode = false;
  let para = [];

  const flush = () => {
    if (para.length) {
      out.push(`<p>${escape(para.join(" "))}</p>`);
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw;
    if (line.startsWith("```")) {
      flush();
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      out.push(`<pre>${escape(line)}</pre>`);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flush();
      const lvl = h[1].length;
      out.push(`<h${lvl}>${escape(h[2])}</h${lvl}>`);
      continue;
    }
    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      flush();
      out.push(`<li>${escape(li[1])}</li>`);
      continue;
    }
    para.push(line);
  }
  flush();
  return out.join("\n");
}

async function main() {
  const generatedPath = path.join(ROOT, ".contentlayer", "generated", "index.mjs");
  try {
    await fs.access(generatedPath);
  } catch {
    console.error(
      "[search] .contentlayer/generated 不存在，先跑 `next build` 或 `next dev`。",
    );
    process.exit(1);
  }

  const { allPosts } = await import(`file://${generatedPath.replace(/\\/g, "/")}`);
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const post of allPosts) {
    if (post.draft) continue;
    const dir = path.join(OUT_DIR, "posts", post.slug);
    await fs.mkdir(dir, { recursive: true });
    const html = `<!doctype html>
<html lang="zh-CN" data-pagefind-url="${post.url}">
<head><meta charset="utf-8"><title>${escape(post.title)}</title></head>
<body>
<article>
<h1 data-pagefind-meta="title">${escape(post.title)}</h1>
<p data-pagefind-meta="summary">${escape(post.summary)}</p>
<div data-pagefind-meta="date">${post.date}</div>
<div data-pagefind-meta="tags">${post.tags.join(", ")}</div>
${mdToHtml(post.body.raw)}
</article>
</body>
</html>`;
    await fs.writeFile(path.join(dir, "index.html"), html, "utf8");
  }

  console.log(`[search] 已生成 ${allPosts.length} 篇索引源文件 → ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
