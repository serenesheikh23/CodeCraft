"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const featuredProject = sortedProjects.find(p => p.featured);
  const otherProjects = sortedProjects.filter(p => !p.featured);

  if (sortedProjects.length === 0) return null;

  return (
    <section
      id="projects"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
            SELECTED WORK
          </div>
          <h2 id="projects-heading" className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            Recent builds.
            <br />
            Live in production.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            Real projects, real users, real results.
          </p>
        </motion.div>

        {/* Featured project - full width */}
        {featuredProject && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
            role="listitem"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 lg:gap-12 items-start">
              <div className="relative aspect-video overflow-hidden">
                {featuredProject.imageUrl ? (
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted bg-card-hover">
                    No image
                  </div>
                )}
              </div>

              <div className="p-8 lg:p-12 bg-card border border-border lg:border-l-0">
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-text mb-4">
                  <Link href={`/projects/${featuredProject.slug}`} className="flex items-start justify-between gap-2">
                    <span>{featuredProject.title}</span>
                    <ArrowUpRight className="w-6 h-6 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </h3>

                <p className="text-text-muted text-base lg:text-lg mb-8 leading-relaxed max-w-xl">{featuredProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {(() => {
                    let techStack: string[] = [];
                    try {
                      techStack = JSON.parse(featuredProject.techStack || "[]");
                    } catch (e) {
                      techStack = [];
                    }
                    return techStack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-background border border-border text-text-muted text-xs font-medium hover:border-lime/50 hover:text-text transition-colors"
                      >
                        {tech}
                      </span>
                    ));
                  })()}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-lime transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-lime transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Other projects - 2 column grid */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            role="list"
          >
            {otherProjects.map((project) => {
              let techStack: string[] = [];
              try {
                techStack = JSON.parse(project.techStack || "[]");
              } catch (e) {
                techStack = [];
              }

              return (
                <article
                  key={project.id}
                  className="group bg-card border border-border transition-colors duration-300 hover:border-lime/40"
                  role="listitem"
                >
                  <Link href={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted bg-card-hover">
                        No image
                      </div>
                    )}
                  </Link>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-text mb-3">
                      <Link href={`/projects/${project.slug}`} className="flex items-start justify-between gap-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-5 h-5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </h3>

                    <p className="text-text-muted text-sm mb-4 line-clamp-3">{project.description}</p>

                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-background border border-border text-text-muted text-xs font-medium hover:border-lime/50 hover:text-text transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {techStack.length > 3 && (
                          <span className="px-2.5 py-1 rounded-md bg-card-hover text-text-muted text-xs font-medium">
                            +{techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-lime transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-lime transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className="bg-transparent border border-border text-text inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wider text-xs hover:bg-lime hover:text-background hover:border-lime transition-colors"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}