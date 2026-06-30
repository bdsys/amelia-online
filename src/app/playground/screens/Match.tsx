import type { MemCard } from "../Playground";
import HomeButton from "./HomeButton";
import { CARD_BG, CARD_SHADOW } from "../Playground";

type MatchProps = {
  cards: MemCard[];
  onHome: () => void;
  onFlip: (i: number) => void;
  onReset: () => void;
};

export default function Match({ cards, onHome, onFlip, onReset }: MatchProps) {
  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 16px 24px",
        gap: 20,
      }}
    >
      <HomeButton onHome={onHome} />

      <h2
        style={{
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 30,
          margin: 0,
          textShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {allMatched ? "🎉 You matched them all!" : "🃏 Find the matches!"}
      </h2>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          width: "min(400px, 90vw)",
        }}
      >
        {cards.map((card, i) => {
          const colorIdx = i % 4;
          const show = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => onFlip(i)}
              disabled={card.matched}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: 18,
                border: "none",
                cursor: card.matched ? "default" : "pointer",
                fontSize: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: show ? CARD_BG[colorIdx] : "rgba(255,255,255,0.25)",
                boxShadow: show
                  ? `0 4px 0 ${CARD_SHADOW[colorIdx]}`
                  : "0 4px 0 rgba(0,0,0,0.15)",
                transition: "background 0.2s, box-shadow 0.2s",
                opacity: card.matched ? 0.65 : 1,
                animation: card.matched ? "pg-pop-in 0.3s ease-out both" : undefined,
              }}
            >
              {show ? card.e : "❓"}
            </button>
          );
        })}
      </div>

      <button
        onClick={onReset}
        style={{
          background: "rgba(255,255,255,0.30)",
          border: "none",
          borderRadius: 999,
          padding: "10px 28px",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 18,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        New Game
      </button>
    </div>
  );
}
