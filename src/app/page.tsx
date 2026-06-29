import type { CSSProperties } from "react";

// A small 4-point sparkle. Decorative only.
function Star({
  className,
  style,
  size = 28,
  color = "var(--color-sun)",
}: {
  className?: string;
  style?: CSSProperties;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0Z"
        fill={color}
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      {/* Soft glow behind the name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,123,160,0.18), transparent)",
        }}
      />

      {/* Floating stars */}
      <Star
        className="star"
        style={{ top: "16%", left: "14%", animationDelay: "0s" }}
        size={34}
        color="var(--color-sun)"
      />
      <Star
        className="star"
        style={{ top: "24%", right: "16%", animationDelay: "1.2s" }}
        size={22}
        color="var(--color-teal)"
      />
      <Star
        className="star"
        style={{ bottom: "20%", left: "22%", animationDelay: "0.6s" }}
        size={18}
        color="var(--color-pink)"
      />
      <Star
        className="star"
        style={{ bottom: "26%", right: "20%", animationDelay: "1.8s" }}
        size={28}
        color="var(--color-sun)"
      />

      {/* Hero */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <p
          className="reveal text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-teal)]"
          style={{ animationDelay: "0s" }}
        >
          Coming soon
        </p>

        <h1
          className="reveal mt-4 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(4rem, 18vw, 9rem)",
            color: "var(--color-ink)",
            animationDelay: "0.1s",
          }}
        >
          Amelia
        </h1>

        {/* Hand-drawn wavy underline */}
        <svg
          className="reveal mt-1 w-[min(80vw,22rem)]"
          style={{ animationDelay: "0.25s" }}
          viewBox="0 0 320 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 14C44 4 84 4 124 12s80 14 120 6 60-12 72-8"
            stroke="var(--color-pink)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        <p
          className="reveal mt-8 text-lg text-[var(--color-ink-muted)] sm:text-xl"
          style={{ animationDelay: "0.4s" }}
        >
          A playful little website is on its way — birthday adventures, wish
          lists, and more.
        </p>

        <span
          className="reveal mt-10 rounded-full bg-[var(--color-bg-soft)] px-4 py-2 text-sm font-bold text-[var(--color-ink)]"
          style={{ animationDelay: "0.55s" }}
        >
          amelialass.com
        </span>
      </div>
    </main>
  );
}
