type HomeButtonProps = {
  onHome: () => void;
};

export default function HomeButton({ onHome }: HomeButtonProps) {
  return (
    <button
      onClick={onHome}
      aria-label="Back to home"
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 100,
        background: "rgba(255,255,255,0.30)",
        border: "none",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 24,
        cursor: "pointer",
        animation: "pg-pulse 2s ease-in-out infinite",
        backdropFilter: "blur(4px)",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
      }}
    >
      🏠
    </button>
  );
}
