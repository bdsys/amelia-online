import type { PartyData } from "@/lib/grownups";
import Link from "next/link";

interface Props {
  party: PartyData;
  showBackLink?: boolean;
}

export default function PartyInvite({ party, showBackLink = true }: Props) {
  const mailto = `mailto:${party.rsvpEmail}?subject=${encodeURIComponent(`RSVP for ${party.who}'s ${party.age}th Birthday Party`)}&body=${encodeURIComponent(`Hi! We'd love to come to ${party.who}'s party on ${party.date}.`)}`;

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
      <div
        style={{
          width: "min(480px, 100%)",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Header band */}
        <div
          style={{
            background: "var(--gu-accent)",
            padding: "28px 32px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            You&apos;re invited!
          </h1>
          <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
            {party.who}&apos;s {party.age}th Birthday Party
          </p>
        </div>

        {/* Details */}
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Detail icon="📅" label="When" value={`${party.date} · ${party.time}`} />
          <Detail icon="📍" label="Where" value={`${party.place} — ${party.address}`} />
          <Detail icon="💌" label="Note" value={party.note} />

          <a
            href={mailto}
            style={{
              display: "block",
              marginTop: 8,
              padding: "14px",
              background: "var(--gu-accent)",
              color: "#fff",
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            RSVP to {party.rsvpEmail}
          </a>

          {showBackLink && (
            <Link
              href="/grownups"
              style={{
                textAlign: "center",
                color: "var(--gu-muted)",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              ← Back
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gu-muted)", marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ color: "var(--gu-ink)", fontSize: 15, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}
