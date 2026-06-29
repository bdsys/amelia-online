import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p
        className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--color-teal)]"
      >
        Page not found
      </p>
      <h1
        className="mt-4 leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3rem, 12vw, 6rem)",
          color: "var(--color-ink)",
        }}
      >
        Oops!
      </h1>
      <p className="mt-6 text-lg text-[var(--color-ink-muted)]">
        That page isn&apos;t here yet.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[var(--color-pink)] px-5 py-2.5 text-sm font-bold text-white"
      >
        Back home
      </Link>
    </main>
  );
}
