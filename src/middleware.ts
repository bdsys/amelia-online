import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifySessionToken } from "@/lib/session";

// Canonicalize production on the apex: www.amelialass.com → amelialass.com (301).
//
// Exact host match (===) so ONLY the production www host is redirected. A regex
// / `has` host match is unanchored and would also catch the staging host
// (preview.www.amelialass.com), wrongly bouncing staging to production.
//
// Building the URL explicitly preserves path + query and avoids the catch-all
// `:path*` root quirk that left a literal ":path*" in the Location header.
export async function middleware(request: NextRequest) {
  if (request.headers.get("host") === "www.amelialass.com") {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = "amelialass.com";
    return NextResponse.redirect(url, 301);
  }

  // Gate all /grownups/* routes except the login page itself.
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/grownups") && !pathname.startsWith("/grownups/login")) {
    const cookie = request.cookies.get("GROWNUPS");
    const loginUrl = new URL("/grownups/login", request.url);

    if (!cookie?.value) {
      return NextResponse.redirect(loginUrl, 307);
    }

    try {
      const ctx = await getCloudflareContext({ async: true });
      const secret = (ctx.env as Record<string, string | undefined>).SESSION_SECRET ?? "";
      const valid = await verifySessionToken(cookie.value, secret);
      if (!valid) {
        return NextResponse.redirect(loginUrl, 307);
      }
    } catch {
      return NextResponse.redirect(loginUrl, 307);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except Next.js internals (_next/*).
  matcher: ["/((?!_next/).*)"],
};
