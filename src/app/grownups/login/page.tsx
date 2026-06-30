import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createSessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const ENC = new TextEncoder();

function timingSafeEqual(a: string, b: string): boolean {
  const ab = ENC.encode(a);
  const bb = ENC.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

async function loginAction(formData: FormData) {
  "use server";
  const password = (formData.get("password") as string) ?? "";
  const ctx = await getCloudflareContext({ async: true });
  const env = ctx.env as Record<string, string | undefined>;
  const correctPassword = env.GROWNUPS_PASSWORD ?? "";
  const secret = env.SESSION_SECRET ?? "";

  if (!timingSafeEqual(password, correctPassword)) {
    redirect("/grownups/login?error=1");
  }

  const token = await createSessionToken(secret, 60 * 60 * 24 * 30); // 30 days
  (await cookies()).set("GROWNUPS", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  redirect("/grownups");
}

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gu-paper)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "min(400px, 90vw)",
          padding: "40px 36px",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40 }}>🔒</div>
          <h1
            style={{
              margin: "8px 0 4px",
              fontSize: 24,
              fontWeight: 700,
              color: "var(--gu-ink)",
            }}
          >
            Grown-ups only
          </h1>
          <p style={{ margin: 0, color: "var(--gu-muted)", fontSize: 14 }}>
            Enter the password to see wishlists and party details.
          </p>
        </div>

        {error && (
          <p
            style={{
              margin: 0,
              padding: "10px 14px",
              background: "#fff0ee",
              border: "1px solid #f4c0b5",
              borderRadius: 8,
              color: "var(--gu-accent)",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Wrong password — try again.
          </p>
        )}

        <form action={loginAction} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            style={{
              padding: "12px 14px",
              border: "1.5px solid #d8d0c6",
              borderRadius: 8,
              fontSize: 16,
              color: "var(--gu-ink)",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "13px",
              background: "var(--gu-accent)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>

        <Link
          href="/"
          style={{
            textAlign: "center",
            color: "var(--gu-muted)",
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Back to playground
        </Link>
      </div>
    </main>
  );
}
