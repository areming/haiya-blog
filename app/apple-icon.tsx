import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff7ed",
          fontFamily: "Georgia, serif",
          fontSize: 110,
          fontWeight: 700,
          letterSpacing: -4,
          position: "relative",
        }}
      >
        H
        <span
          style={{
            position: "absolute",
            top: 38,
            right: 50,
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#fde68a",
          }}
        />
      </div>
    ),
    size,
  );
}
