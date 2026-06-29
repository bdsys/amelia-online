import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon — a white "A" on a bubblegum-pink rounded square.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#ff7ba0",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#fff8f2",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
