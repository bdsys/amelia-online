import type { MetadataRoute } from "next";

const BASE = "https://amelialass.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
