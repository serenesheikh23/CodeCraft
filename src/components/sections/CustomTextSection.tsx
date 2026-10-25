"use client";

import { motion } from "framer-motion";

interface CustomTextSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function CustomTextSection({ title, subtitle, content }: CustomTextSectionProps) {
  const body = (content.body as string) || "";

  if (!body) return null;

  return (
    <section
      id="custom-text"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="custom-text-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24"
          >
            {subtitle && (
              <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="custom-text-heading"
                className="font-display text-5xl sm:text-6xl lg:text-6xl leading-[0.95] tracking-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto whitespace-pre-wrap text-text-muted leading-relaxed text-base lg:text-lg">
          {body}
        </div>
      </div>
    </section>
  );
}