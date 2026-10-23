import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXTAUTH_URL ?? "https://codecraft.pxxlspace.cv";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
