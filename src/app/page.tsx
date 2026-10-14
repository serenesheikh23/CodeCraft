import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";
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
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
}