import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonicalize production on the apex: www.amelialass.com → amelialass.com (301).
//
// Exact host match (===) so ONLY the production www host is redirected. A regex
// / `has` host match is unanchored and would also catch the staging host
// (preview.www.amelialass.com), wrongly bouncing staging to production.
//
// Building the URL explicitly preserves path + query and avoids the catch-all
// `:path*` root quirk that left a literal ":path*" in the Location header.
export function middleware(request: NextRequest) {
  if (request.headers.get("host") === "www.amelialass.com") {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = "amelialass.com";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  // Run on every route except Next.js internals (_next/*).
  matcher: ["/((?!_next/).*)"],
};
