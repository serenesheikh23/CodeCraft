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
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="features-heading"
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
                id="features-heading"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Features"
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Layout;

            return (
              <motion.article
                key={item.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:border-primary/50"
                role="listitem"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-text mb-3">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}