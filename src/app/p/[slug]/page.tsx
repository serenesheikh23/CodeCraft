import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/sections/SectionRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });
  return {
    title: page ? `${page.title} — Code Craft` : "Code Craft",
    description: page?.content?.slice(0, 160) ?? "Code Craft",
    alternates: { canonical: `/p/${slug}` },
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });
  if (!page || !page.isActive) notFound();

  const sections = await prisma.pageSection.findMany({
    where: { pageId: page.id },
    orderBy: { order: "asc" },
  });

  if (sections.length > 0) {
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

  const paragraphs = page.content.split(/\n{2,}/);

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background text-text">
        <article className="max-w-[68ch] mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-[44px] text-text-muted hover:text-accent transition-colors text-sm mb-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>

          <header className="mb-12 pb-8 border-b border-border">
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-text">
              {page.title}
            </h1>
          </header>

          <div className="space-y-6 text-lg leading-[1.75] text-text-muted">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap">{p}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-text-muted text-sm mb-4">Want to work together?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
