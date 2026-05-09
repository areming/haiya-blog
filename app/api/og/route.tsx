import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

type Palette = {
  bg: string;
  dot: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
};

const palettes: Record<string, Palette> = {
  default: {
    bg: "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 60%, #fcd9b6 120%)",
    dot: "#b45309",
    eyebrow: "#78716c",
    title: "#1c1917",
    subtitle: "#57534e",
    footer: "#a8a29e",
  },
  reading: {
    bg: "linear-gradient(135deg, #fbf7ef 0%, #f3e9d2 60%, #d6b07a 130%)",
    dot: "#92400e",
    eyebrow: "#7c5e2e",
    title: "#1f1408",
    subtitle: "#5a4324",
    footer: "#a18860",
  },
  thinking: {
    bg: "linear-gradient(135deg, #f4f3ff 0%, #ddd6fe 60%, #a78bfa 130%)",
    dot: "#5b21b6",
    eyebrow: "#6d28d9",
    title: "#1e1b4b",
    subtitle: "#4c1d95",
    footer: "#8b80b6",
  },
  code: {
    bg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 60%, #5eead4 130%)",
    dot: "#0f766e",
    eyebrow: "#0d9488",
    title: "#042f2e",
    subtitle: "#115e59",
    footer: "#5eaaa0",
  },
};

const tagToPalette: Record<string, keyof typeof palettes> = {
  读书: "reading",
  历史: "reading",
  思考: "thinking",
  随笔: "thinking",
  元话题: "thinking",
  "Next.js": "code",
  笔记: "code",
  代码: "code",
};

function pickPalette(rawTags: string | null): Palette {
  if (!rawTags) return palettes.default;
  const tags = rawTags.split(",").map((t) => t.trim()).filter(Boolean);
  for (const tag of tags) {
    const key = tagToPalette[tag];
    if (key) return palettes[key];
  }
  return palettes.default;
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? siteConfig.title;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.description;
  const tagsParam = searchParams.get("tags");
  const palette = pickPalette(tagsParam);
  const tags = (tagsParam ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: palette.bg,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: palette.dot,
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: palette.eyebrow,
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 1000,
          }}
        >
          <h1
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: palette.title,
              margin: 0,
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.5,
              color: palette.subtitle,
              margin: 0,
              maxWidth: 880,
            }}
          >
            {subtitle}
          </p>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 22,
                    color: palette.subtitle,
                    padding: "6px 16px",
                    borderRadius: 999,
                    border: `1.5px solid ${palette.dot}40`,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: palette.footer,
            fontSize: 20,
          }}
        >
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          <span>慢慢写，认真地写。</span>
        </div>
      </div>
    ),
    size,
  );
}
