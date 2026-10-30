import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.legalPage.findUnique({ where: { slug } });
  return {
    title: page ? `${page.title} — Code Craft` : "Legal — Code Craft",
    description: page ? page.content.slice(0, 160) : "Legal information.",
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.legalPage.findUnique({ where: { slug } });
  if (!page) notFound();

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
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-semibold">
              Legal
            </div>
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-text">
              {page.title}
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-text-muted">
              Last updated {page.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </header>

          <div className="space-y-6 text-lg leading-[1.75] text-text-muted">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap">{p}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
