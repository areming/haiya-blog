import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

type TocItem = { level: number; text: string; slug: string };

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date", required: false },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    cover: { type: "string", required: false },
    draft: { type: "boolean", default: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    headings: {
      type: "json",
      resolve: (doc) => {
        const slugger = new GithubSlugger();
        const regex = /^(#{2,3})\s+(.+)$/gm;
        const items: TocItem[] = [];
        for (const match of doc.body.raw.matchAll(regex)) {
          const level = match[1].length;
          const text = match[2].trim().replace(/`/g, "");
          items.push({ level, text, slug: slugger.slug(text) });
        }
        return items;
      },
    },
  },
}));

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaLabel: "锚点" },
        },
      ],
    ],
  },
});
