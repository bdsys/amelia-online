import type { Bubble, Particle } from "../Playground";
import HomeButton from "./HomeButton";

type BubblesProps = {
  particles: Particle[];
  bubbles: Bubble[];
  onHome: () => void;
};

export default function Bubbles({ bubbles, onHome }: BubblesProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HomeButton onHome={onHome} />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 24,
            margin: 0,
            animation: "pg-float-hint 3s ease-in-out infinite",
          }}
        >
          🫧 Watch the bubbles rise!
        </p>
      </div>

      {bubbles.map((b) => {
        const faceSize = Math.round(b.size * 0.46);
        return (
          <div
            key={b.id}
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -b.size - 20,
              left: `${b.x}%`,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: b.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: faceSize,
              animation: `pg-rise ${b.dur} ease-in-out forwards`,
              ["--sway" as string]: `${b.sway}px`,
              opacity: 0.9,
              boxShadow: `inset -4px -6px 12px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.10)`,
            }}
          >
            {b.e}
          </div>
        );
      })}
    </div>
  );
}
