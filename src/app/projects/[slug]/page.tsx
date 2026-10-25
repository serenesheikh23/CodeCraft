import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectSlideshow from "@/components/ProjectSlideshow";

const BRAND_BLUE = "#3B82F6";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || !project.isActive) {
    notFound();
  }

  // Parse images array
  let images: string[] = [];
  try {
    images = JSON.parse((project as { images?: string }).images || "[]");
  } catch {
    images = [];
  }

  // Fallback: use single imageUrl if images array is empty
  if (images.length === 0 && project.imageUrl) {
    images = [project.imageUrl];
  }

  return (
    <>
      <Navbar />

      {/* ADDED overflow-hidden HERE to fix the horizontal scrolling issue */}
      <main className="relative bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] glow-cyan opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] glow-blue opacity-30 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          {/* Back link — larger bottom margin */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-coral transition-colors text-sm mb-12 lg:mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>

          {/* Category label */}
          <div className="text-xs uppercase tracking-[0.2em] text-lime mb-4 font-semibold">
            CASE STUDY
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-text mb-6">
            {project.title}
          </h1>

          <p className="text-lg lg:text-xl text-text-muted leading-relaxed max-w-3xl mb-12">
            {project.description}
          </p>

          {/* Slideshow */}
          {images.length > 0 && (
            <div className="mb-16 lg:mb-20 rounded-xl overflow-hidden border border-border bg-card">
              <ProjectSlideshow images={images} title={project.title} />
            </div>
          )}

          <div className="space-y-12 lg:space-y-16">
            {project.problem && (
              <section>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">
                  The problem
                </div>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {project.problem}
                </p>
              </section>
            )}

            {project.solution && (
              <section>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">
                  The solution
                </div>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {project.solution}
                </p>
              </section>
            )}

            {project.outcome && (
              <section className="pb-12 lg:pb-16 border-b border-border">
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">
                  The outcome
                </div>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {project.outcome}
                </p>
              </section>
            )}
          </div>

          {project.liveUrl && (
            <div className="mt-12 mb-20">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-coral hover:text-lime transition-colors font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                View live site
              </a>
            </div>
          )}

          <section
            id="contact"
            className="relative border border-border rounded-xl p-8 lg:p-12 overflow-hidden"
          >
            <div
              className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs uppercase tracking-[0.2em] text-lime mb-3 font-semibold">HAVE A PROJECT LIKE THIS?</div>
                <h2 className="font-display text-3xl lg:text-4xl leading-tight text-text">
                  Let&apos;s build
                  <br />
                  yours next.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                  style={{
                    backgroundColor: BRAND_BLUE,
                    color: "#F8FAFC",
                    border: `1px solid ${BRAND_BLUE}`,
                  }}
                >
                  Get a quote
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}