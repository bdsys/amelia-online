import type { NextConfig } from "next";

// React dev mode uses eval() for callstack reconstruction / source-map debugging.
// Production never does, so 'unsafe-eval' is dev-only — the deployed Worker keeps
// a strict script-src.
const isDev = process.env.NODE_ENV !== "production";

// ── Security headers ──────────────────────────────────────────────────────────
// Applied to every route. Fonts are self-hosted by next/font/google (served from
// /_next), so no external font/style origins are needed.
const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + inline (Next.js uses inline script for hydration).
      // 'unsafe-eval' added in dev only — React uses eval() for debugging features.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      // Styles: self + inline (Tailwind/Next injects inline styles)
      "style-src 'self' 'unsafe-inline'",
      // Fonts self-hosted by next/font
      "font-src 'self'",
      // Images: self + data URIs (inline SVG / OG image)
      "img-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },

};

// NOTE: the www → apex 301 lives in src/middleware.ts, not here. next.config's
// `has` host condition matches the host UNANCHORED, so "www.amelialass.com"
// also matches "preview.www.amelialass.com" and would redirect the staging
// domain to production. Middleware does an exact `===` host compare instead.

export default nextConfig;
