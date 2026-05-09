import { siteConfig } from "@/lib/site";

export const metadata = { title: "关于" };

export default function AboutPage() {
  return (
    <div className="container max-w-2xl py-12 md:py-20">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">关于</h1>
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>
          你好，欢迎来到 <strong>{siteConfig.name}</strong>。
        </p>
        <p>{siteConfig.description}</p>
        <p>
          这里会记录我在写代码、做产品、看世界过程中的一些笔记和思考。
          页面还在持续完善中。
        </p>
      </div>
    </div>
  );
}
