import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const baseUrl =
  process.env.NEXTAUTH_URL ?? "https://codecraft.pxxlspace.cv";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const [projects, legalPages, customPages] = await Promise.all([
      prisma.project.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.legalPage.findMany({
        select: { slug: true, updatedAt: true },
      }),
      prisma.customPage.findMany({
        where: { isActive: true, isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    for (const p of projects) {
      routes.push({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const p of legalPages) {
      routes.push({
        url: `${baseUrl}/legal/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
    for (const p of customPages) {
      routes.push({
        url: `${baseUrl}/p/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch (error) {
    console.error("sitemap: failed to fetch dynamic routes", error);
  }

  return routes;
}
