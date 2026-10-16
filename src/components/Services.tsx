"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Layout, Building, Code, ShoppingCart, Smartphone, Layers, GitBranch, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ServicesTerminal from "@/components/sections/ServicesTerminal";

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

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
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

const BRAND_BLUE = "#3B82F6";
const BRAND_BLUE_DARK = "#2563EB";
const BRAND_BLUE_GLOW = "0 0 12px rgba(59, 130, 246, 0.5)";

export default function ServicesSection({ services }: { services: Service[] }) {
  const activeServices = services.filter(s => s.isActive);

  if (activeServices.length === 0) return null;

  const row1 = activeServices.slice(0, 2);
  const row2 = activeServices.slice(2, 5);
  const row3 = activeServices.slice(5);

  return (
    <section
      id="services"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-blue opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] glow-cyan opacity-30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="section-label text-lime mb-4">WHAT WE DO</div>
          <h2 id="services-heading" className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            We build things
            <br />
            that actually ship.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            From landing pages to full-stack applications — production-ready code, delivered on time.
          </p>
        </motion.div>

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
            {row1.map((service) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-8 lg:p-10 transition-colors duration-300 hover:border-coral/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <Icon
                      className="w-9 h-9 flex-shrink-0 mt-1"
                      style={{ color: BRAND_BLUE, filter: `drop-shadow(${BRAND_BLUE_GLOW})` }}
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-6 leading-relaxed text-base lg:text-lg">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-serif text-3xl lg:text-4xl font-bold" style={{ color: BRAND_BLUE }}>
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text text-sm">USD</span>
                  </div>

                  <ul className="space-y-3 mb-8" role="list">
                    {features.slice(0, 6).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-3 text-text-muted">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ backgroundColor: "#F8FAFC" }}
                        />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                    {features.length > 6 && (
                      <li className="flex items-center gap-2 text-sm font-medium" style={{ color: BRAND_BLUE }}>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        <span>+{features.length - 6} more features</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                    style={{
                      backgroundColor: BRAND_BLUE,
                      color: "#F8FAFC",
                      border: `1px solid ${BRAND_BLUE}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
                      e.currentTarget.style.borderColor = BRAND_BLUE_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE;
                      e.currentTarget.style.borderColor = BRAND_BLUE;
                    }}
                  >
                    Discuss a project
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

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
            {row2.map((service) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-6 transition-colors duration-300 hover:border-coral/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon
                      className="w-7 h-7 flex-shrink-0 mt-1"
                      style={{ color: BRAND_BLUE, filter: `drop-shadow(${BRAND_BLUE_GLOW})` }}
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-4 leading-relaxed text-sm">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-bold" style={{ color: BRAND_BLUE }}>
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text text-xs">USD</span>
                  </div>

                  <ul className="space-y-2 mb-6" role="list">
                    {features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-2 text-sm text-text-muted">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: "#F8FAFC" }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="flex items-center gap-2 text-xs font-medium" style={{ color: BRAND_BLUE }}>
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span>+{features.length - 4} more</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                    style={{
                      backgroundColor: BRAND_BLUE,
                      color: "#F8FAFC",
                      border: `1px solid ${BRAND_BLUE}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
                      e.currentTarget.style.borderColor = BRAND_BLUE_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE;
                      e.currentTarget.style.borderColor = BRAND_BLUE;
                    }}
                  >
                    Discuss a project
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

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
            {row3.map((service) => {
              const Icon = iconMap[service.icon] || Layout;
              const features = JSON.parse(service.features || "[]") as string[];

              return (
                <article
                  key={service.id}
                  className="group relative border border-border p-6 transition-colors duration-300 hover:border-coral/40"
                  role="listitem"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon
                      className="w-7 h-7 flex-shrink-0 mt-1"
                      style={{ color: BRAND_BLUE, filter: `drop-shadow(${BRAND_BLUE_GLOW})` }}
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-xl font-bold text-text leading-snug">{service.name}</h3>
                  </div>

                  <p className="text-text-muted mb-4 leading-relaxed text-sm">{service.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-2xl font-bold" style={{ color: BRAND_BLUE }}>
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <span className="text-text text-xs">USD</span>
                  </div>

                  <ul className="space-y-2 mb-6" role="list">
                    {features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={feature + featureIndex} className="flex items-start gap-2 text-sm text-text-muted">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: "#F8FAFC" }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="flex items-center gap-2 text-xs font-medium" style={{ color: BRAND_BLUE }}>
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span>+{features.length - 4} more</span>
                      </li>
                    )}
                  </ul>

                  <Link
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                    style={{
                      backgroundColor: BRAND_BLUE,
                      color: "#F8FAFC",
                      border: `1px solid ${BRAND_BLUE}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
                      e.currentTarget.style.borderColor = BRAND_BLUE_DARK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BRAND_BLUE;
                      e.currentTarget.style.borderColor = BRAND_BLUE;
                    }}
                  >
                    Discuss a project
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </article>
              );
            })}
          </motion.div>
        )}

        <ServicesTerminal />
      </div>
    </section>
  );
}
