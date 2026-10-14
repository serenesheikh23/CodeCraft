"use client";

import { motion } from "framer-motion";

interface StatsSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface StatItem {
  value: string;
  label: string;
}

export default function StatsSection({ title, subtitle, content }: StatsSectionProps) {
  const items = (content.items as StatItem[]) || [];

  if (items.length === 0) return null;

  return (
    <section
      id="stats"
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="stats-heading"
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
                id="stats-heading"
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
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center"
          role="list"
          aria-label="Statistics"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
              role="listitem"
            >
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                {item.value}
              </div>
              <div className="text-text-muted text-sm uppercase tracking-wider font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}