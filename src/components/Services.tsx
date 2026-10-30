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

const HOME_LIMIT = 3;

function parseFeatures(raw: string | string[]): string[] {
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ServicesSection({
  services,
  showAll = false,
}: {
  services: Service[];
  showAll?: boolean;
}) {
  const active = services.filter((s) => s.isActive);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  if (active.length === 0) return null;

  const visible = showAll ? active : active.slice(0, HOME_LIMIT);
  const hasMore = !showAll && active.length > HOME_LIMIT;

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
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text border-t border-border"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <div className="text-accent text-xs uppercase tracking-[0.2em] font-medium mb-4">
              What we do
            </div>
            <h2
              id="services-heading"
              className="font-outfit text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-text"
            >
              We build things
              <br />
              that actually ship.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <p className="text-lg text-text-muted leading-relaxed">
              From landing pages to full-stack applications — production-ready code, delivered on time.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {visible.map((service, i) => {
            const isOpen = expanded.has(service.id);
            const features = parseFeatures(service.features);
            const number = String(i + 1).padStart(2, "0");

            return (
              <article key={service.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  aria-expanded={isOpen}
                  aria-controls={`service-${service.id}`}
                  className="group w-full text-left min-h-[44px] py-8 lg:py-10 grid grid-cols-[auto_1fr_auto] gap-4 lg:gap-8 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-mono text-xs text-text-muted pt-2 lg:pt-3">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-text leading-tight group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-text-muted text-base leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-outfit text-3xl text-text-muted pt-1 group-hover:text-accent transition-colors"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`service-${service.id}`}
                  hidden={!isOpen}
                  className="pb-8 lg:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
                >
                  <div className="lg:col-span-4 lg:col-start-2">
                    {features.length > 0 && (
                      <ul className="space-y-2 text-sm text-text-muted">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-2" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-outfit text-2xl text-accent">
                        ${service.minPrice.toLocaleString()}–${service.maxPrice.toLocaleString()}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-text-muted">USD</span>
                    </div>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 text-sm text-text hover:text-accent transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Discuss a project →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-start">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 min-h-[48px] px-6 border border-border text-text text-xs font-semibold uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              See all {active.length} services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
