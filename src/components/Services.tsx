"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Server, Code, Building, ShoppingCart, Smartphone, Layers, GitBranch, Package } from "lucide-react";

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
  layout: Code,
  building: Building,
  code: Code,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  layers: Layers,
  "git-branch": GitBranch,
  package: Package,
  server: Code,
};

const SERVICES: Service[] = [
  { id: "1", name: "Landing Page", description: "High-converting single page websites with modern design and smooth animations", minPrice: 150, maxPrice: 400, features: ["Responsive design","SEO optimized","Contact form integration","Analytics setup","Fast loading","Modern animations"], icon: "layout" },
  { id: "2", name: "Business Website", description: "Professional multi-page websites for businesses with CMS and custom features", minPrice: 400, maxPrice: 900, features: ["Multi-page structure","Content management system","Blog integration","Team/Careers pages","Service catalog","Google Maps integration"], icon: "building" },
  { id: "3", name: "Custom Web App", description: "Tailored web applications with complex logic, user dashboards, and real-time features", minPrice: 800, maxPrice: 2500, features: ["User authentication","Dashboard & analytics","Real-time updates","Role-based access","API integrations","Database design"], icon: "code" },
  { id: "4", name: "E-commerce Platform", description: "Full-featured online stores with payment processing, inventory management, and analytics", minPrice: 1000, maxPrice: 3000, features: ["Product catalog","Shopping cart & checkout","Payment gateway integration","Inventory management","Order tracking","Customer accounts"], icon: "shopping-cart" },
  { id: "5", name: "Starter App", description: "Mobile app MVP with core features for iOS and Android using React Native", minPrice: 600, maxPrice: 1500, features: ["Cross-platform (iOS/Android)","Core features only","Basic UI/UX","API integration","App store deployment","Push notifications"], icon: "smartphone" },
  { id: "6", name: "Full App", description: "Complete mobile application with advanced features, backend, and admin panel", minPrice: 1500, maxPrice: 4000, features: ["Advanced features","Custom backend API","Admin dashboard","Real-time chat","Offline support","Analytics & crash reporting"], icon: "layers" },
  { id: "7", name: "App + Backend Combo", description: "Complete solution with mobile app, web admin panel, and scalable backend infrastructure", minPrice: 2000, maxPrice: 5000, features: ["Mobile app (iOS/Android)","Web admin panel","Scalable backend","Database design","CI/CD pipeline","Monitoring & logs"], icon: "git-branch" },
];

export default function ServicesSection({ services }: { services: Service[] }) {
  const activeServices = services.filter(s => s.isActive);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (activeServices.length === 0) return null;

  const row1 = activeServices.slice(0, 2);
  const row2 = activeServices.slice(2, 5);
  const row3 = activeServices.slice(5);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isExpanded = (id: string) => expandedIds.has(id);

  const renderService = (service: Service) => {
    const features = JSON.parse(service.features || "[]") as string[];
    const Icon = iconMap[service.icon] || Code;

    return (
      <div
        key={service.id}
        className="border border-border rounded-lg p-6 transition-all duration-200"
        style={{
          borderColor: isExpanded(service.id) ? "var(--accent)" : "var(--border)",
        }}
      >
        <div className="flex items-start gap-4 mb-6">
          <Icon
            className="w-6 h-6 flex-shrink-0 mt-1"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <h3 className="font-outfit text-xl font-bold text-text leading-snug">{service.name}</h3>
        </div>

        {isExpanded(service.id) ? (
          <div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">{service.description}</p>

            <details
              className="mt-4"
              open={false}
              style={{ border: "none", padding: 0, margin: 0 }}
            >
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span>Features:</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-text-muted">
                {features.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: "var(--accent)" }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </details>

            <div className="mt-4">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-outfit text-lg font-bold" style={{ color: "var(--accent)" }}>
                  {service.minPrice !== service.maxPrice ? `${formatPrice(service.minPrice, service.maxPrice)}` : `$${service.minPrice}`}
                </span>
                <span className="text-text text-sm">USD</span>
              </div>
              <Link
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold uppercase tracking-wider text-xs transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#0B0F14",
                  border: "1px solid var(--accent)",
                }}
              >
                Discuss a project
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-text-muted text-sm leading-relaxed">
            <p>{service.description}</p>
            <details
              onClick={() => toggleExpand(service.id)}
              onKeyDown={(e) => e.key === "Enter" && toggleExpand(service.id)}
              onKeyUp={(e) => e.key === " " && toggleExpand(service.id)}
              className="cursor-pointer"
            >
              <summary className="font-medium underline-offset-4 hover-underline text-accent">
                View features & pricing
              </summary>
            </details>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="services"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="services-heading"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
          WHAT WE DO
        </div>

        <h2
          id="services-heading"
          className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-8"
        >
          We build things
          <br />
          that actually ship.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {row1.map((service) => renderService(service))}
          {row2.map((service) => renderService(service))}
          {row3.map((service) => renderService(service))}

        </div>
      </div>
    </section>
  );
}