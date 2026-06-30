import Image from "next/image";
import Link from "next/link";
import type { Screen } from "../Playground";
import type { Greeting } from "@/lib/playground-date";

type CardDef = {
  id: string;
  icon: string;
  label: string;
  tilt: string;
  delay: string;
};

type HubProps = {
  greeting: Greeting;
  age: number;
  daysLeft: number;
  cards: readonly CardDef[];
  cardBg: string[];
  cardShadow: string[];
  onGoTo: (s: Screen) => void;
};

export default function Hub({
  greeting,
  age,
  daysLeft,
  cards,
  cardBg,
  cardShadow,
  onGoTo,
}: HubProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "30px 24px",
        boxSizing: "border-box",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 118,
          height: 118,
          borderRadius: "50%",
          background: "var(--pg-card1)",
          border: "6px solid #fff",
          overflow: "hidden",
          animation: "pg-bob 3s ease-in-out infinite",
          flexShrink: 0,
        }}
      >
        <Image
          src="/amelia.png"
          alt="Amelia"
          width={118}
          height={118}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Greeting */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 40 }}>{greeting.emoji}</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 38,
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.18)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {greeting.text}, Amelia!
        </h1>
      </div>

      {/* Info pills */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <span
          style={{
            background: "rgba(255,255,255,0.70)",
            color: "#3b352e",
            borderRadius: 999,
            padding: "6px 18px",
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          🎂 I am {age}!
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.70)",
            color: "#3b352e",
            borderRadius: 999,
            padding: "6px 18px",
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          🎈 {daysLeft} sleeps to go!
        </span>
      </div>

      {/* Activity grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          width: "min(560px, 92vw)",
          marginTop: 4,
        }}
      >
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => onGoTo(card.id as Screen)}
            style={{
              background: cardBg[i % 4],
              boxShadow: `0 6px 0 ${cardShadow[i % 4]}`,
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 8px 14px",
              gap: 6,
              animation: `pg-bob 3s ease-in-out infinite`,
              animationDelay: card.delay,
              ["--tilt" as string]: card.tilt,
              color: "#fff",
            }}
          >
            <span style={{ fontSize: 52, lineHeight: 1 }}>{card.icon}</span>
            <span
              style={{
                fontSize: 23,
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              {card.label}
            </span>
          </button>
        ))}
      </div>

      {/* Grown-ups pill */}
      <Link
        href="/grownups"
        style={{
          marginTop: 8,
          background: "rgba(255,255,255,0.25)",
          color: "#fff",
          borderRadius: 999,
          padding: "8px 22px",
          fontWeight: 600,
          fontSize: 15,
          textDecoration: "none",
          opacity: 0.8,
          letterSpacing: "0.01em",
        }}
      >
        🔒 Grown-ups
      </Link>
    </div>
  );
}
