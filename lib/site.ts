export const siteConfig = {
  name: "Haiya Blog",
  title: "Haiya Blog",
  description: "一个关于代码、思考与生活的个人博客。",
  url: "https://haiya-blog.vercel.app",
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
    repo: "areming/haiya-blog",
    repoId: "R_kgDOSYeSOw",
    category: "Announcements",
    categoryId: "DIC_kwDOSYeSO84C8pEV",
    mapping: "pathname",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    lang: "zh-CN",
  },
} as const;

export type SiteConfig = typeof siteConfig;
