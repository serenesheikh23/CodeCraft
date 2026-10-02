"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight, Layout, Building, Code, ShoppingCart, Smartphone, Layers, GitBranch, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Notice: features is now a string because SQLite stores it as JSON text
interface Service {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  features: string; 
  icon: string;
  order: number;
  isActive: boolean;
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
  server: Code,
  database: Layout,
  cloud: Building,
  globe: Code,
  zap: Layers,
  shield: GitBranch,
  heart: Smartphone,
  star: Package,
};

export default function ServicesSection({ services }: { services: Service[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-5" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, transparent 70%)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Services
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            Digital solutions
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              tailored for you
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            From simple landing pages to complex full-stack applications, we build digital products that scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Services"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Layout;

            return (
              <motion.article
                key={service.id}
                variants={itemVariants}
                className="group relative"
                role="listitem"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-glow hover:-translate-y-1">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-shadow"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-text mb-2">{service.name}</h3>
                  <p className="text-text-muted mb-5 line-clamp-2">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-2xl font-bold text-text">
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text-muted">USD</span>
                  </div>

                  <ul className="space-y-2 mb-6" role="list">
                    {(JSON.parse(service.features || "[]") as string[]).slice(0, 4).map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + featureIndex * 0.05 }}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                    {(JSON.parse(service.features || "[]") as string[]).length > 4 && (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + 4 * 0.05 }}
                        className="flex items-center gap-2 text-sm text-primary font-medium"
                      >
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        <span>+{(JSON.parse(service.features || "[]") as string[]).length - 4} more features</span>
                      </motion.li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full btn-secondary text-center group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get a quote
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3"
          >
            View all services
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}