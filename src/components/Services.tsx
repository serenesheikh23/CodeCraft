"use client";

import Link from "next/link";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  features: string | string[];
  icon: string;
  order: number;
  isActive: boolean;
}

const formatPrice = (min: number, max: number) =>
  min === max
    ? `$${min.toLocaleString()}`
    : `$${min.toLocaleString()}–$${max.toLocaleString()}`;

function parseFeatures(raw: string | string[]): string[] {
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ServicesSection({ services }: { services: Service[] }) {
  const active = services.filter((s) => s.isActive);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  if (active.length === 0) return null;

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id="services"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
          What we do
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
          {active.map((service) => {
            const isOpen = expanded.has(service.id);
            const features = parseFeatures(service.features);

            return (
              <article
                key={service.id}
                className="border border-border p-6 transition-colors"
                style={{ borderColor: isOpen ? "var(--accent)" : undefined }}
              >
                <h3 className="font-outfit text-xl font-semibold text-text leading-snug mb-3">
                  {service.name}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  className="inline-flex items-center gap-2 min-h-[44px] text-xs uppercase tracking-[0.15em] text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {isOpen ? "Hide details" : "View features & pricing"}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  id={`service-panel-${service.id}`}
                  hidden={!isOpen}
                  className="mt-4 pt-4 border-t border-border"
                >
                  {features.length > 0 && (
                    <ul className="space-y-2 mb-4 text-sm text-text-muted">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-2"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-outfit text-lg text-accent">
                      {formatPrice(service.minPrice, service.maxPrice)}
                    </span>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center min-h-[44px] px-4 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Discuss a project
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
