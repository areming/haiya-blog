# Haiya Blog

> 慢慢写，认真地写。

一个基于 **Next.js 15 + MDX + Contentlayer2** 的个人博客。强调长期主义、设计感、零运维成本。

## 技术栈

| 维度 | 选型 |
|---|---|
| 框架 | Next.js 15（App Router）+ React 19 + TypeScript |
| 内容 | MDX 文件 + Contentlayer2（构建期生成强类型数据） |
| 样式 | Tailwind CSS + `@tailwindcss/typography`，Inter + Fraunces 双字体 |
| 代码高亮 | Shiki（双主题，CSS 变量切换，零运行时 JS） |
| 搜索 | Pagefind（构建期生成索引，`Ctrl/Cmd+K` 唤出） |
| 评论 | Giscus（基于 GitHub Discussions） |
| 主题切换 | next-themes（跟随系统） |
| RSS / Sitemap / Robots | Next.js Route Handlers + `feed` |
| 动态 OG 图 | `next/og`（Edge Runtime） |
| 部署 | Vercel |

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 生产构建 + Pagefind 索引
pnpm typecheck
```

## 写一篇文章

在 `content/posts/` 新建 `.mdx` 文件：

```mdx
---
title: 文章标题
date: 2026-05-09
summary: 一句话摘要
tags: [标签 A, 标签 B]
draft: false
---

正文内容…
```

字段约束（`contentlayer.config.ts`）：

- `title`、`date`、`summary` 必填
- `tags` 数组，可选
- `draft: true` 不会发布到列表 / RSS / Sitemap

## 项目结构

```
app/                  路由（首页 / 列表 / 详情 / 标签 / 归档 / About / API）
├ api/og/             动态 OG 图
├ posts/[slug]/       文章详情（含 TOC、上下篇）
├ tags/, archive/     标签聚合 + 时间归档
├ rss.xml/, sitemap.ts, robots.ts
├ icon.svg, apple-icon.tsx
components/
├ layout/             Header / Footer / ThemeToggle
├ post/               PostCard / MDXContent / TOC / Comments
├ search/             SearchTrigger + SearchDialog（Pagefind）
content/posts/        文章 .mdx 源
contentlayer.config.ts  文档 schema + rehype/remark 插件
lib/site.ts           站点配置（名称、URL、giscus、导航）
scripts/build-search-index.mjs  从 contentlayer 数据生成 Pagefind 索引源
```

## 上线前的几个配置

打开 `lib/site.ts` 修改：

- `url`：你的正式域名
- `author`：名字 / 邮箱 / GitHub
- `giscus`：去 [giscus.app](https://giscus.app) 拿 `repoId` 和 `categoryId` 后填入

## 部署到 Vercel

1. 推到 GitHub
2. 在 [vercel.com](https://vercel.com) 选 "New Project" → import 这个 repo
3. 框架选 Next.js（自动识别），构建命令 `pnpm build`，无需额外环境变量
4. 部署后会得到 `*.vercel.app` 域名，可在 Settings 绑定自定义域名

## License

MIT
