import Link from "next/link";
import { getWishlist } from "@/lib/grownups";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Birthday List · Amelia",
  robots: { index: false, follow: false },
};

export default function BirthdayPage() {
  const list = getWishlist("birthday");

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "var(--gu-paper)",
        padding: "40px 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ fontSize: 40 }}>{list.emoji}</div>
          <h1
            style={{
              margin: "8px 0 4px",
              fontSize: 28,
              fontWeight: 700,
              color: "var(--gu-bday)",
            }}
          >
            {list.title}
          </h1>
          <p style={{ margin: 0, color: "var(--gu-muted)", fontSize: 14 }}>
            Here&apos;s what Amelia is hoping for her birthday.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "var(--gu-ink)", fontSize: 16 }}>{item.name}</div>
                {item.note && (
                  <div style={{ color: "var(--gu-muted)", fontSize: 13, marginTop: 2 }}>{item.note}</div>
                )}
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flexShrink: 0,
                    padding: "6px 14px",
                    background: "var(--gu-bday)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  View ›
                </a>
              )}
            </div>
          ))}
        </div>

        <Link href="/grownups" style={{ color: "var(--gu-muted)", fontSize: 13, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>
    </main>
  );
}
