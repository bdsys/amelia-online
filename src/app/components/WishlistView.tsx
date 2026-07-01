import Link from "next/link";
import { type Wishlist, hostname } from "@/lib/grownups";

interface Props {
  list: Wishlist;
  accentColor: string;
  showBackLink?: boolean;
}

export default function WishlistView({ list, accentColor, showBackLink = true }: Props) {
  return (
    <main style={{ minHeight: "100dvh", background: "var(--gu-paper)", padding: "40px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ fontSize: 40 }}>{list.emoji}</div>
          <h1 style={{ margin: "8px 0 4px", fontSize: 28, fontWeight: 700, color: accentColor }}>
            {list.title}
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.lists.length === 0 ? (
            <div style={{ border: "2px dashed var(--gu-muted)", borderRadius: 12, padding: "24px 20px", color: "var(--gu-muted)", textAlign: "center", fontSize: 15 }}>
              No list added yet — check back soon!
            </div>
          ) : (
            list.lists.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "#fff", borderRadius: 18, border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 2px 8px rgba(0,0,0,.04)", padding: "16px 20px", textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 20, fontFamily: "var(--font-display)", color: "var(--gu-ink)" }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--gu-muted)", marginTop: 2 }}>
                    {hostname(link.url)}
                  </div>
                </div>
                <span style={{ flexShrink: 0, padding: "6px 16px", background: accentColor, color: "#fff", borderRadius: 999, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>
                  Open ›
                </span>
              </a>
            ))
          )}
        </div>

        {showBackLink && (
          <Link href="/grownups" style={{ color: "var(--gu-muted)", fontSize: 13, textDecoration: "none" }}>
            ← Back
          </Link>
        )}
      </div>
    </main>
  );
}
