import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectSlideshow from "@/components/ProjectSlideshow";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project || !project.isActive) notFound();

  let images: string[] = [];
  try { images = JSON.parse((project as { images?: string }).images || "[]"); } catch { images = []; }
  if (images.length === 0 && project.imageUrl) images = [project.imageUrl];

  let techStack: string[] = [];
  try { techStack = JSON.parse((project as { techStack?: string }).techStack || "[]"); } catch { techStack = []; }

  return (
    <>
      <Navbar />
      <main className="relative bg-background overflow-hidden">
        <article className="relative max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm mb-12 lg:mb-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to work
          </Link>

          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-semibold">Case study</div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-text mb-6">
            {project.title}
          </h1>

          <p className="text-lg lg:text-xl text-text-muted leading-relaxed max-w-3xl mb-10">
            {project.description}
          </p>

          {techStack.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-12" aria-label="Tech stack">
              {techStack.map((tech) => (
                <li key={tech} className="text-xs font-mono uppercase tracking-[0.1em] text-text-muted border border-border px-2.5 py-1">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {images.length > 0 && (
            <div className="mb-16 lg:mb-20 overflow-hidden border border-border bg-card">
              <ProjectSlideshow images={images} title={project.title} />
            </div>
          )}

          <div className="space-y-12 lg:space-y-16">
            {project.problem && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">The problem</h2>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">{project.problem}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">The solution</h2>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">{project.solution}</p>
              </section>
            )}
            {project.outcome && (
              <section className="pb-12 lg:pb-16 border-b border-border">
                <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">The outcome</h2>
                <p className="text-base lg:text-lg text-text leading-relaxed max-w-3xl whitespace-pre-wrap">{project.outcome}</p>
              </section>
            )}
          </div>

          {project.liveUrl && (
            <div className="mt-12 mb-20">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-accent hover:underline underline-offset-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
                View live site
              </a>
            </div>
          )}

          <section id="contact" className="border border-border p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-semibold">Have a project like this?</div>
                <h2 className="font-display text-3xl lg:text-4xl leading-tight text-text">
                  Let&apos;s build<br />yours next.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-xs hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Get a quote
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
