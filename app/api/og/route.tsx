import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? siteConfig.title;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.description;

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
          background:
            "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 60%, #fcd9b6 120%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#b45309",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#78716c",
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
              color: "#1c1917",
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
              color: "#57534e",
              margin: 0,
              maxWidth: 880,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a8a29e",
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
