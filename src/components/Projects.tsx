"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { toWebp } from "@/lib/imageUrl";

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

const BRAND_BLUE = "#3B82F6";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="relative py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="section-label text-lime mb-4">SELECTED WORK</div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text mb-6">
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
            style={{ backgroundColor: BRAND_BLUE, color: "#F8FAFC" }}
          >
            Add first project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] glow-cyan opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] glow-blue opacity-30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="section-label text-lime mb-4">SELECTED WORK</div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            Recent builds.
            <br />
            Live in production.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            Real projects, real users, real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border border-border overflow-hidden transition-colors duration-300 hover:border-coral/40"
            >
              <Link href={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden bg-card">
                {project.imageUrl ? (
                  <Image
                    src={toWebp(project.imageUrl)}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-text group-hover:text-coral transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </Link>
                  <Link href={`/projects/${project.slug}`} className="flex-shrink-0 mt-2">
                    <ArrowUpRight className="w-6 h-6 text-text-muted group-hover:text-coral transition-colors" />
                  </Link>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-5 pt-4 border-t border-border">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-coral transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View live
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-coral transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Read case study
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
