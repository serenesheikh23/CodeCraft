import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  techStack: string | null;
  liveUrl: string;
  featured: boolean;
}

export default function ProjectsSection({
  projects,
  title,
  subtitle,
}: {
  projects: Project[];
  title?: string;
  subtitle?: string;
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <div className="text-accent text-xs uppercase tracking-[0.2em] font-medium mb-4">
              {subtitle || "Selected work"}
            </div>
            <h2
              id="projects-heading"
              className="font-outfit text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-text"
            >
              {title || "Recent builds. Live in production."}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-lg text-text-muted leading-relaxed">
              Real projects, real users, real results.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {projects.map((project, i) => {
            const number = String(i + 1).padStart(2, "0");
            const hasImage = Boolean(project.imageUrl && project.imageUrl.trim());
            const isExternal = hasImage && project.imageUrl.startsWith("http");

            return (
              <article
                key={project.id}
                className="border-b border-border py-12 lg:py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="lg:col-span-7 block relative aspect-[16/10] overflow-hidden bg-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`${project.title} — case study`}
                  >
                    {hasImage ? (
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        unoptimized={isExternal}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
                          {number} / {project.title}
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="lg:col-span-5">
                    <div className="font-mono text-xs text-text-muted mb-3">
                      {number}
                    </div>
                    <h3 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-text mb-4">
                      {project.title}
                    </h3>
                    <p className="text-base text-text-muted leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 min-h-[44px] text-sm text-text hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          View live
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 min-h-[44px] text-sm text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Read case study
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
