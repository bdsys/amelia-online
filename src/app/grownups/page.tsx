import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Grown-ups · Amelia",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { href: "/grownups/christmas", icon: "🎄", label: "Christmas List", accent: "var(--gu-xmas)" },
  { href: "/grownups/birthday", icon: "🎂", label: "Birthday List", accent: "var(--gu-bday)" },
  { href: "/grownups/party", icon: "🎉", label: "Party Invite", accent: "var(--gu-accent)" },
];

export default function GrownupsMenu() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gu-paper)",
        padding: "24px 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ width: "min(440px, 100%)", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: "var(--gu-ink)",
            }}
          >
            Amelia&apos;s Grown-ups Corner
          </h1>
          <p style={{ margin: "6px 0 0", color: "var(--gu-muted)", fontSize: 15 }}>
            Wishlists, party info, and more.
          </p>
        </div>

        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 24px",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              textDecoration: "none",
              color: "var(--gu-ink)",
            }}
          >
            <span
              style={{
                fontSize: 36,
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>{s.label}</span>
            <span style={{ marginLeft: "auto", color: "var(--gu-muted)", fontSize: 20 }}>›</span>
          </Link>
        ))}

        <Link
          href="/"
          style={{
            textAlign: "center",
            color: "var(--gu-muted)",
            fontSize: 13,
            textDecoration: "none",
            marginTop: 4,
          }}
        >
          ← Back to playground
        </Link>
      </div>
    </main>
  );
}
