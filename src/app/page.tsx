import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";
import SectionProgress from "@/components/SectionProgress";
import MarqueeBand from "@/components/sections/MarqueeBand";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import StackDiagram from "@/components/sections/StackDiagram";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const QuoteEstimator = nextDynamic(() => import("@/components/sections/QuoteEstimator"), {
  loading: () => <div className="py-20" aria-hidden="true" />,
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  const title = "Code Craft | Ideas in. Products out.";
  const description = settings?.tagline ?? "Building ideas into digital products. Websites, apps and full systems.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Code Craft" },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function getHomepageSections() {
  return prisma.homepageSection.findMany({ where: { isVisible: true }, orderBy: { order: "asc" } });
}

export default async function HomePage() {
  const [sections, services, addons, settings] = await Promise.all([
    getHomepageSections(),
    prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.addOn.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  const contactIndex = sections.findIndex((s) => s.type === "contact");
  const beforeContact = contactIndex >= 0 ? sections.slice(0, contactIndex) : sections;
  const contactAndAfter = contactIndex >= 0 ? sections.slice(contactIndex) : [];

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://codecraft.pxxlspace.cv";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Code Craft",
    url: baseUrl,
    description: settings?.tagline ?? undefined,
    email: settings?.email ?? undefined,
    sameAs: [settings?.instagramUrl, settings?.linkedin1Url, settings?.linkedin2Url].filter(Boolean),
  };

  return (
    <>
      <SectionProgress />
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {beforeContact.map((section, i) => (
          <div key={section.id}>
            <SectionRenderer section={section} />
            {i === 0 && <MarqueeBand />}
            {section.type === "services" && <ProcessTimeline />}
            {section.type === "projects" && <StackDiagram />}
          </div>
        ))}
        <QuoteEstimator services={services} addons={addons} />
        {contactAndAfter.map((section) => (
          <div key={section.id}>
            <SectionRenderer section={section} />
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
