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
      className="relative py-32 lg:py-48 overflow-hidden bg-card border-y border-border"
      aria-labelledby="stats-heading"
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
                id="stats-heading"
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" role="list" aria-label="Statistics">
          {items.map((item, index) => (
            <motion.div
              key={item.label + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
              role="listitem"
            >
              <div className="font-serif text-6xl lg:text-7xl font-bold text-text mb-3 group-hover:text-lime transition-colors">
                {item.value}
              </div>
              <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}