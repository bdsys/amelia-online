import type { Particle } from "../Playground";
import HomeButton from "./HomeButton";

type PopProps = {
  particles: Particle[];
  onHome: () => void;
  onTap: (e: React.PointerEvent<HTMLDivElement>) => void;
};

export default function Pop({ onHome, onTap }: PopProps) {
  return (
    <div
      onPointerDown={onTap}
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <HomeButton onHome={onHome} />
      <span style={{ fontSize: 90, animation: "pg-bob 2s ease-in-out infinite" }}>
        🎉
      </span>
      <p
        style={{
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 32,
          textShadow: "0 2px 8px rgba(0,0,0,0.18)",
          margin: 0,
        }}
      >
        Tap anywhere to Pop!
      </p>
    </div>
  );
}
