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
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Featured Projects
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4"
          >
            Our Work
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              in action
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Real projects, real results. Explore how we&apos;ve helped businesses transform their
            digital presence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {projects.map((project) => {
            let techStack: string[] = [];
            try {
              techStack = JSON.parse(project.techStack || "[]");
            } catch (e) {
              techStack = [];
            }

            return (
              <motion.article
                key={project.id}
                variants={itemVariants}
                className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-glow hover:-translate-y-1"
                role="listitem"
              >
                {/* Image container with Link */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative aspect-video overflow-hidden bg-card-hover"
                >
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      No image
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent/90 text-background text-xs font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6">
                  {/* Title with Link */}
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors flex items-start justify-between gap-2">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                  </Link>

                  <p className="text-text-muted text-sm mb-4 line-clamp-3">{project.description}</p>

                  {/* Tech stack */}
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
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

                  {/* External links (Live/GitHub) - separate from the card Link */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-accent transition-colors"
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
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-accent transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3"
          >
            Start your project
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}