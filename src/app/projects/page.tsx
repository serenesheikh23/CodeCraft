import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/Projects";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work — Code Craft",
  description: "Selected projects built by Code Craft: websites, apps, and full systems.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-14">
        <ProjectsSection
          projects={projects as never}
          title="All work."
          subtitle="Every build, live in production."
        />
      </main>
      <Footer />
    </>
  );
}
