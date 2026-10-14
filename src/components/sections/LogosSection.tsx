"use client";

import { motion } from "framer-motion";

interface LogosSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface LogoItem {
  url: string;
  alt: string;
}

export default function LogosSection({ title, subtitle, content }: LogosSectionProps) {
  const logos = (content.logos as LogoItem[]) || [];

  if (logos.length === 0) return null;

  return (
    <section
      id="logos"
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="logos-heading"
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
                id="logos-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
          role="list"
          aria-label="Client logos"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.alt + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              role="listitem"
            >
              <img
                src={logo.url}
                alt={logo.alt}
                className="mx-auto max-h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}