import type { MetadataRoute } from "next";

// Placeholder site — keep it out of search indexes until launch.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: "https://amelialass.com/sitemap.xml",
  };
}
