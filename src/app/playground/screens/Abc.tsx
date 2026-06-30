import type { Particle } from "../Playground";
import HomeButton from "./HomeButton";
import { CARD_BG, CARD_SHADOW } from "../Playground";

type AbcEntry = { l: string; w: string; e: string };

type AbcProps = {
  particles: Particle[];
  data: AbcEntry[];
  active: number | null;
  onHome: () => void;
  onTap: (i: number) => void;
};

export default function Abc({ data, active, onHome, onTap }: AbcProps) {
  const activeEntry = active !== null ? data[active] : null;

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: "60px 12px 20px",
        gap: 16,
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Active word display */}
      <div
        style={{
          minHeight: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {activeEntry ? (
          <>
            <span
              style={{
                fontSize: 64,
                animation: "pg-pop-in 0.3s ease-out both",
              }}
            >
              {activeEntry.e}
            </span>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 42,
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  lineHeight: 1,
                  animation: "pg-pop-in 0.3s ease-out both",
                }}
              >
                {activeEntry.l} — {activeEntry.w}
              </div>
            </div>
          </>
        ) : (
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              margin: 0,
            }}
          >
            Tap a letter!
          </p>
        )}
      </div>

      {/* Letter grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
          gap: 8,
          flex: 1,
        }}
      >
        {data.map((entry, i) => {
          const colorIdx = i % 4;
          const isActive = active === i;
          return (
            <button
              key={entry.l}
              onClick={() => onTap(i)}
              style={{
                background: isActive ? CARD_BG[colorIdx] : "rgba(255,255,255,0.28)",
                boxShadow: isActive
                  ? `0 4px 0 ${CARD_SHADOW[colorIdx]}`
                  : "0 4px 0 rgba(0,0,0,0.12)",
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 26,
                color: isActive ? "#fff" : "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 4px",
                transition: "background 0.15s, box-shadow 0.15s",
                animation: isActive ? "pg-pop-in 0.2s ease-out both" : undefined,
              }}
            >
              {entry.l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
