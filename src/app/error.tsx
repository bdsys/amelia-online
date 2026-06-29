"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h1
        className="leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3rem, 12vw, 6rem)",
          color: "var(--color-ink)",
        }}
      >
        Uh oh!
      </h1>
      <p className="mt-6 text-lg text-[var(--color-ink-muted)]">
        Something went wrong. Let&apos;s try that again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-[var(--color-pink)] px-5 py-2.5 text-sm font-bold text-white"
      >
        Try again
      </button>
    </main>
  );
}
