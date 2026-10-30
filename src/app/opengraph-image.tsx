import { ImageResponse } from "next/og";

export const alt = "Code Craft — Ideas in. Products out.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "#0B0F14",
          color: "#F0F4F8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 18, letterSpacing: 2, textTransform: "uppercase", color: "#A3E635" }}>
          <span>Code Craft</span>
          <span>Digital studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 0.95, letterSpacing: -4 }}>
            Ideas in.
          </div>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 0.95, letterSpacing: -4, color: "#A3E635" }}>
            Products out.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid #1E242F", fontFamily: "monospace", fontSize: 18, color: "#5A6266" }}>
          <span>Websites · Apps · Systems</span>
          <span>codecraft</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
