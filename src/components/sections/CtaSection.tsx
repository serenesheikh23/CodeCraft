"use client";
import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function CtaSection({ title, subtitle, content }: CtaSectionProps) {
  const headline = (content.headline as string) || "Have a project in mind?";
  const subheadline = (content.subheadline as string) || "Let's talk about what you're building.";
  const buttonLabel = (content.buttonLabel as string) || "Start a project";
  const buttonHref = (content.buttonHref as string) || "/#contact";

  if (!headline && !subheadline) return null;

  return (
    <section
      id="cta"
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {subtitle && (
            <span className="inline-block text-text-muted text-sm uppercase tracking-widest font-medium mb-4">
              {subtitle}
            </span>
          )}
          <h2
            id="cta-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6"
          >
            {headline}
          </h2>
          {subheadline && (
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              {subheadline}
            </p>
          )}
          <Link
            href={buttonHref}
            className={cn(
              "btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-medium uppercase tracking-wide rounded-md",
              "group relative overflow-hidden"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {buttonLabel}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}