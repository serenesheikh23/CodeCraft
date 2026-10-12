import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug, isActive: true } });
  return {
    title: page ? `${page.title} | Code Craft` : "Page | Code Craft",
    description: page ? page.content.slice(0, 160) : "Custom page",
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug, isActive: true } });

  if (!page) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <div className="py-20 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <article className="bg-card border border-border rounded-2xl p-8 lg:p-12">
              <header className="mb-8 pb-8 border-b border-border">
                <FileText className="w-10 h-10 text-primary mb-4" aria-hidden="true" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text">{page.title}</h1>
              </header>
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-text-muted leading-relaxed">
                {page.content}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}