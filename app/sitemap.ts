import type { MetadataRoute } from "next";
import { SEO_SLUGS, SEO_PAGES } from "@/src/lib/seoPages";

const baseUrl = "https://balogrenci.org";
const siteUpdated = new Date("2026-07-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/asistan`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/asistan/hakkinda`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/duyurular`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bagis`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...SEO_SLUGS.map((slug) => ({
      url: `${baseUrl}/asistan/bilgi/${slug}`,
      lastModified: new Date(SEO_PAGES[slug].updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
