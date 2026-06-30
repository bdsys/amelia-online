import HomeButton from "./HomeButton";

type Accessory = {
  k: string;
  e: string;
  top: string;
  left: string;
  size: number;
};

type DressUpProps = {
  wearing: Record<string, boolean>;
  stageBg: string;
  accessories: Accessory[];
  stages: string[];
  onHome: () => void;
  onToggle: (k: string) => void;
  onStage: (bg: string) => void;
  onReset: () => void;
};

export default function DressUp({
  wearing,
  stageBg,
  accessories,
  stages,
  onHome,
  onToggle,
  onStage,
  onReset,
}: DressUpProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Stage */}
      <div
        style={{
          flex: 1,
          background: stageBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: 0,
          transition: "background 0.3s",
        }}
      >
        {/* Puppy/unicorn character */}
        <div
          style={{
            position: "relative",
            width: 200,
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 160,
            animation: "pg-bob 3s ease-in-out infinite",
            userSelect: "none",
          }}
        >
          🐶
          {/* Accessories overlaid */}
          {accessories.map((acc) =>
            wearing[acc.k] ? (
              <span
                key={acc.k}
                style={{
                  position: "absolute",
                  top: acc.top,
                  left: acc.left,
                  transform: "translateX(-50%)",
                  fontSize: acc.size,
                  lineHeight: 1,
                  animation: "pg-pop-in 0.3s ease-out both",
                }}
              >
                {acc.e}
              </span>
            ) : null
          )}
        </div>
      </div>

      {/* Accessory buttons */}
      <div
        style={{
          background: "rgba(255,255,255,0.20)",
          backdropFilter: "blur(8px)",
          padding: "10px 16px 6px",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {accessories.map((acc) => (
          <button
            key={acc.k}
            onClick={() => onToggle(acc.k)}
            style={{
              background: wearing[acc.k]
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.30)",
              border: wearing[acc.k] ? "3px solid #fff" : "3px solid transparent",
              borderRadius: 14,
              padding: "6px 10px",
              fontSize: 34,
              cursor: "pointer",
              lineHeight: 1,
              transition: "background 0.15s, border 0.15s",
            }}
          >
            {acc.e}
          </button>
        ))}
      </div>

      {/* Stage backgrounds + reset */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "8px 16px 12px",
          display: "flex",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {stages.map((bg) => (
          <button
            key={bg}
            onClick={() => onStage(bg)}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: bg,
              border: stageBg === bg ? "4px solid #fff" : "4px solid transparent",
              cursor: "pointer",
              boxShadow: stageBg === bg ? "0 0 0 2px #555" : undefined,
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
            padding: "6px 14px",
            fontSize: 14,
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
