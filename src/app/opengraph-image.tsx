import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Amelia — coming soon";

// Social share card. Uses Satori's built-in font (no external fetch).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff8f2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#57c4c0",
          }}
        >
          Coming soon
        </div>
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            color: "#3b2e3a",
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          Amelia
        </div>
        <div
          style={{
            width: 360,
            height: 14,
            background: "#ff7ba0",
            borderRadius: 999,
            marginTop: 24,
          }}
        />
        <div style={{ fontSize: 34, color: "#8b7b86", marginTop: 40 }}>
          amelialass.com
        </div>
      </div>
    ),
    { ...size }
  );
}
