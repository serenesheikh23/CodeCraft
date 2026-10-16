"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaContent {
  headline?: string;
  subheadline?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CtaSection({
  content,
}: {
  title: string;
  subtitle: string;
  content: CtaContent;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-background overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-6xl lg:text-7xl leading-[0.9] tracking-tight text-text"
          >
            {content.headline || "Have a project in mind?"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed"
          >
            {content.subheadline || "Let's talk about what you're building."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href={content.buttonHref || "/#contact"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-text text-background rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-lime hover:text-background transition-colors"
            >
              {content.buttonLabel || "Start a project"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}