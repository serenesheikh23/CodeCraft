"use client";

import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveUrl: string;
  featured: boolean;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="relative py-12 md:py-16 lg:py-20 bg-background text-text">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            SELECTED WORK
          </div>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6">
            Recent builds.
            <br />
            Live in production.
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mb-12">
            No projects yet. Add one from the admin panel.
          </p>
          <Link
            href="/admin/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-xs"
          >
            Add first project
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-12 md:py-16 lg:py-20 bg-background text-text">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
          SELECTED WORK
        </div>

        <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6">
          Recent builds.
          <br />
          Live in production.
        </h2>

        <p className="text-lg text-text-muted max-w-2xl mb-8">
          Real projects, real users, real results.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-background"
              tabindex="0"
            >
              <Link href={`/projects/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-card">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl.replace(/\.(png|jpe?g)$/i, ".webp")}
                    alt={project.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover w-full h-48 sm:h-56 lg:h-64 transition-opacity duration-300 hover:opacity-90"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 lg:h-64 bg-card-flex items-center justify-center text-text-muted">
                    No image
                  </div>
                )}
              </Link>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <h3 className="font-outfit text-2xl lg:text-3xl font-bold text-text line-clamp-2">
                      {project.title}
                    </h3>
                  </Link>

                  <div className="text-right">
                    <span className="text-xs uppercase tracking-[0.1em] text-text-muted">
                      {project.feat ? "Featured" : ""}
                    </span>
                  </div>
                </div>

                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      View live
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    Read case study
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}