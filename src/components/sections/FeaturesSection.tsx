"use client";

import { motion } from "framer-motion";
import { Layout, Building, Code, ShoppingCart, Smartphone, Layers, GitBranch, Package, Server, Database, Globe, Zap, Shield, Heart, Star } from "lucide-react";

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  building: Building,
  code: Code,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  layers: Layers,
  "git-branch": GitBranch,
  package: Package,
  server: Server,
  database: Database,
  globe: Globe,
  zap: Zap,
  shield: Shield,
  heart: Heart,
  star: Star,
};

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export default function FeaturesSection({ title, subtitle, content }: FeaturesSectionProps) {
  const items = (content.items as FeatureItem[]) || [];

  if (items.length === 0) return null;

  return (
    <section
      id="features"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-labelledby="features-heading"
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
                id="features-heading"
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Features">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Layout;

            return (
              <article
                key={item.title + index}
                className="group border border-border p-6 transition-colors duration-300 hover:border-lime/40"
                role="listitem"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Icon className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-text leading-snug">{item.title}</h3>
                </div>
                <p className="text-text-muted leading-relaxed text-base">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}