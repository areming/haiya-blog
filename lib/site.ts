export const siteConfig = {
  name: "Haiya Blog",
  title: "Haiya Blog",
  description: "一个关于代码、思考与生活的个人博客。",
  url: "https://haiya-blog.example.com",
  locale: "zh-CN",
  author: {
    name: "Haiya",
    email: "",
    github: "",
  },
  nav: [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/tags", label: "标签" },
    { href: "/archive", label: "归档" },
    { href: "/about", label: "关于" },
  ],
  giscus: {
    repo: "your-name/your-repo",
    repoId: "PLACEHOLDER_REPO_ID",
    category: "Announcements",
    categoryId: "PLACEHOLDER_CATEGORY_ID",
    mapping: "pathname",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    lang: "zh-CN",
  },
} as const;

export type SiteConfig = typeof siteConfig;
