import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default async function CustomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await prisma.customPage.findUnique({
    where: { slug },
  });

  if (!page || !page.isActive) {
    notFound();
  }

  const sections = await prisma.pageSection.findMany({
    where: { pageId: page.id },
    orderBy: { order: "asc" },
  });

  // If the page has sections, render them using the same section system as the homepage
  if (sections.length > 0) {
    return (
      <>
        <Navbar />
        <main id="main-content">
          {sections.map((section: any) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </main>
        <Footer />
      </>
    );
  }

  // Fallback: editorial text layout for pages without sections
  const paragraphs = page.content.split("\n\n");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-text-muted">Page</span>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl text-text leading-tight mb-8">
            {page.title}
          </h1>

          <div className="h-px bg-border mb-12" />

          <article className="space-y-6">
            {paragraphs.map((para: string, i: number) => (
              <p key={i} className="text-lg text-text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-text-muted text-sm mb-4">Want to work together?</p>
            <Link href="/#contact" className="btn-primary inline-flex items-center gap-2">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}