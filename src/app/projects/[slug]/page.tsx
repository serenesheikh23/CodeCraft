import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ExternalLink, Github, ArrowLeft, Code2, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    select: { title: true, description: true, imageUrl: true },
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Code Craft`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  const techStack = JSON.parse(project.techStack || "[]") as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.description,
            image: project.imageUrl,
            url: project.liveUrl || `https://codecraft.dev/projects/${project.slug}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Code2 className="w-4 h-4" />
                Case Study
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Problem Section */}
              <section className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text">The Challenge</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-muted leading-relaxed text-lg">{project.problem}</p>
                </div>
              </section>

              {/* Solution Section */}
              <section className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text">Our Solution</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-muted leading-relaxed text-lg">{project.solution}</p>
                </div>

                {/* Tech Stack Details */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-text mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-medium text-text bg-card border border-border rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Outcome Section */}
              <section className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text">Results & Impact</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-muted leading-relaxed text-lg">{project.outcome}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h4 className="font-semibold text-text">Measurable Outcomes</h4>
                    </div>
                    <p className="text-text-muted">Quantifiable improvements in key metrics</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h4 className="font-semibold text-text">Client Satisfaction</h4>
                    </div>
                    <p className="text-text-muted">Positive feedback and ongoing partnership</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Links */}
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 space-y-4">
                <h3 className="text-lg font-semibold text-text">Project Links</h3>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View Source Code
                  </a>
                )}

                {!project.liveUrl && !project.githubUrl && (
                  <p className="text-text-muted text-center py-4">No external links available</p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-text">Project Info</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Status</dt>
                    <dd className="font-medium text-text">
                      {project.isActive ? "Active" : "Archived"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Featured</dt>
                    <dd className="font-medium text-text">
                      {project.featured ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Technologies</dt>
                    <dd className="font-medium text-text">{techStack.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Ready to build your project?
            </h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with the same dedication and expertise.
            </p>
            <Link href="#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
              Get a Quote
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}