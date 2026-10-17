import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";
import MarqueeBand from "@/components/sections/MarqueeBand";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import StackDiagram from "@/components/sections/StackDiagram";
import QuoteEstimator from "@/components/sections/QuoteEstimator";
import { prisma } from "@/lib/prisma";

// This tells Next.js not to pre-render this page at build time
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Code Craft | Ideas in. Products out.",
  description: "Building ideas into digital products. Websites, apps and full systems.",
};

async function getHomepageSections() {
  return prisma.homepageSection.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
}

async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

async function getAddons() {
  return prisma.addOn.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export default async function HomePage() {
  const [sections, services, addons] = await Promise.all([
    getHomepageSections(),
    getServices(),
    getAddons(),
  ]);

  const contactIndex = sections.findIndex((s: any) => s.type === "contact");
  const beforeContact = contactIndex >= 0 ? sections.slice(0, contactIndex) : sections;
  const contactAndAfter = contactIndex >= 0 ? sections.slice(contactIndex) : [];

  return (
    <>
      <Navbar />
      <main id="main-content">
        {beforeContact.map((section: any, i: number) => (
          <div key={section.id}>
            <SectionRenderer section={section} />
            {i === 0 && <MarqueeBand />}
            {section.type === "services" && <ProcessTimeline />}
            {section.type === "projects" && <StackDiagram />}
          </div>
        ))}

        <QuoteEstimator services={services} addons={addons} />

        {contactAndAfter.map((section: any) => (
          <div key={section.id}>
            <SectionRenderer section={section} />
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}