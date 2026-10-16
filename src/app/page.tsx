import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";
import MarqueeBand from "@/components/sections/MarqueeBand";
import { prisma } from "@/lib/prisma";

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

export default async function HomePage() {
  const sections = await getHomepageSections();

  return (
    <>
      <Navbar />
      <main id="main-content">
        {sections.map((section, i) => (
          <div key={section.id}>
            <SectionRenderer section={section} />
            {i === 0 && <MarqueeBand />}
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
