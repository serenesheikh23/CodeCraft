"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Layout, Building, Code, ShoppingCart, Smartphone, Layers, GitBranch, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

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
  const activeServices = services.filter(s => s.isActive);

  if (activeServices.length === 0) return null;

  // Split into rows: first 2, next 3, then remaining
  const row1 = activeServices.slice(0, 2);
  const row2 = activeServices.slice(2, 5);
  const row3 = activeServices.slice(5);

  return (
    <section
      id="services"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
            WHAT WE DO
          </div>
          <h2 id="services-heading" className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            We build things
            <br />
            that actually ship.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            From landing pages to full-stack applications — production-ready code, delivered on time.
          </p>
        </motion.div>

        {/* Row 1: 2 services - larger cards */}
        {row1.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            role="list"
            aria-label="Services"
          >
            {row1.map((service, index) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-8 lg:p-10 transition-colors duration-300 hover:border-lime/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-3 mb-6">
                    <Icon className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-6 leading-relaxed text-base lg:text-lg">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-serif text-3xl lg:text-4xl font-bold text-text">
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text-muted">USD</span>
                  </div>

                  <ul className="space-y-3 mb-8" role="list">
                    {features.slice(0, 6).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-3 text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0 mt-2" />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                    {features.length > 6 && (
                      <li className="flex items-center gap-2 text-sm text-lime font-medium">
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        <span>+{features.length - 6} more features</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full border border-border text-text-muted hover:border-lime/50 hover:text-text hover:bg-card-hover transition-all inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wider text-xs"
                  >
                    Discuss a project
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

        {/* Row 2: 3 services */}
        {row2.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            role="list"
            aria-label="Services"
          >
            {row2.map((service, index) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-6 transition-colors duration-300 hover:border-lime/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-4 leading-relaxed text-sm">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-bold text-text">
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text-muted">USD</span>
                  </div>

                  <ul className="space-y-2 mb-6" role="list">
                    {features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0 mt-1.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="flex items-center gap-2 text-xs text-lime font-medium">
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span>+{features.length - 4} more</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full border border-border text-text-muted hover:border-lime/50 hover:text-text hover:bg-card-hover transition-all inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium uppercase tracking-wider text-xs"
                  >
                    Discuss a project
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

        {/* Row 3: remaining services */}
        {row3.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            role="list"
            aria-label="Services"
          >
            {row3.map((service, index) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-6 transition-colors duration-300 hover:border-lime/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-4 leading-relaxed text-sm">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-bold text-text">
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text-muted">USD</span>
                  </div>

                  <ul className="space-y-2 mb-6" role="list">
                    {features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0 mt-1.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="flex items-center gap-2 text-xs text-lime font-medium">
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span>+{features.length - 4} more</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full border border-border text-text-muted hover:border-lime/50 hover:text-text hover:bg-card-hover transition-all inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium uppercase tracking-wider text-xs"
                  >
                    Discuss a project
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className="bg-transparent border border-border text-text inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wider text-xs hover:bg-lime hover:text-background hover:border-lime transition-colors"
          >
            All services
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}