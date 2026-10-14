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
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="custom-text-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-[30%,70%] gap-8 items-start mb-16 lg:mb-20"
          >
            {subtitle && (
              <div className="text-text-muted text-sm uppercase tracking-widest font-medium pt-2">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="custom-text-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto prose prose-invert whitespace-pre-wrap text-text-muted leading-relaxed"
        >
          {body}
        </motion.div>
      </div>
    </section>
  );
}