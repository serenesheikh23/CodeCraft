"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured: boolean;
}

export default function PricingSection({ title, subtitle, content }: PricingSectionProps) {
  const plans = (content.plans as PricingPlan[]) || [];

  if (plans.length === 0) return null;

  return (
    <section
      id="pricing"
      className="relative py-32 lg:py-48 overflow-hidden bg-card border-y border-border"
      aria-labelledby="pricing-heading"
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
                id="pricing-heading"
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list" aria-label="Pricing plans">
          {plans.map((plan, index) => (
            <article
              key={plan.name + index}
              className={cn(
                "relative bg-background border p-8 transition-colors duration-300",
                plan.featured
                  ? "border-lime/40"
                  : "border-border hover:border-lime/40"
              )}
              role="listitem"
            >
              <h3 className="text-base font-semibold text-text mb-2">{plan.name}</h3>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-text">
                  ${plan.price}
                </span>
                <span className="text-text-muted">/{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10" role="list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={feature + featureIndex} className="flex items-start gap-3 text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-lime flex-shrink-0 mt-2" />
                    <span className="text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wider transition-all text-xs",
                  plan.featured
                    ? "bg-text text-background hover:bg-lime hover:text-background hover:scale-[1.02] transition-all duration-200 ease-out"
                    : "bg-transparent border border-border text-text-muted hover:border-lime/50 hover:text-text hover:bg-card-hover hover:border-coral hover:text-coral transition-all duration-200 ease-out"
                )}
              >
                {plan.ctaLabel}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}