import HomeButton from "./HomeButton";

type Region = {
  id: string;
  el: string;
  a: Record<string, number | string | undefined>;
};

type ColoringPage = {
  name: string;
  viewBox: string;
  regions: Region[];
};

type ColoringProps = {
  pages: ColoringPage[];
  page: number;
  fills: Record<string, string>;
  brush: string;
  colors: string[];
  onHome: () => void;
  onPageChange: (i: number) => void;
  onTap: (regionId: string) => void;
  onBrush: (c: string) => void;
  onReset: () => void;
};

function SvgShape({ region, fill, onTap }: { region: Region; fill: string; onTap: () => void }) {
  const { el, a } = region;
  const style = {
    fill,
    stroke: "#2c2620",
    strokeWidth: 3.5,
    cursor: "pointer",
  };

  if (el === "rect") {
    return (
      <rect
        x={a.x as number}
        y={a.y as number}
        width={a.width as number}
        height={a.height as number}
        rx={a.rx as number}
        style={style}
        onClick={onTap}
      />
    );
  }
  if (el === "ellipse") {
    return (
      <ellipse
        cx={a.cx as number}
        cy={a.cy as number}
        rx={a.rx as number}
        ry={a.ry as number}
        style={style}
        onClick={onTap}
      />
    );
  }
  if (el === "circle") {
    return (
      <circle
        cx={a.cx as number}
        cy={a.cy as number}
        r={a.r as number}
        style={style}
        onClick={onTap}
      />
    );
  }
  if (el === "polygon") {
    return (
      <polygon
        points={a.points as string}
        style={style}
        onClick={onTap}
      />
    );
  }
  return null;
}

export default function Coloring({
  pages,
  page,
  fills,
  brush,
  colors,
  onHome,
  onPageChange,
  onTap,
  onBrush,
  onReset,
}: ColoringProps) {
  const currentPage = pages[page];

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Page tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          padding: "56px 16px 8px",
        }}
      >
        {pages.map((p, i) => (
          <button
            key={p.name}
            onClick={() => onPageChange(i)}
            style={{
              background: page === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
              border: "none",
              borderRadius: 999,
              padding: "6px 18px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 16,
              color: "#3b352e",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* SVG canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 16px",
        }}
      >
        <svg
          viewBox={currentPage.viewBox}
          style={{
            width: "min(360px, 90vw)",
            height: "auto",
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          {currentPage.regions.map((region) => {
            const key = `pg${page}-${region.id}`;
            return (
              <SvgShape
                key={region.id}
                region={region}
                fill={fills[key] ?? "#ffffff"}
                onTap={() => onTap(region.id)}
              />
            );
          })}
        </svg>
      </div>

      {/* Color palette + reset */}
      <div
        style={{
          background: "rgba(255,255,255,0.20)",
          backdropFilter: "blur(8px)",
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onBrush(c)}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: c,
              border: brush === c ? "4px solid #fff" : "4px solid transparent",
              cursor: "pointer",
              boxShadow: brush === c ? "0 0 0 2px #444" : undefined,
              transition: "border 0.15s",
            }}
          />
        ))}
        <button
          onClick={onReset}
          style={{
            background: "rgba(255,255,255,0.35)",
            border: "none",
            borderRadius: 14,
            padding: "8px 14px",
            fontSize: 16,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "#3b352e",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
