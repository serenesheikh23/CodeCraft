"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
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
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="pricing-heading"
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
                id="pricing-heading"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          role="list"
          aria-label="Pricing plans"
        >
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "relative bg-card border rounded-lg p-8 transition-all duration-300",
                plan.featured
                  ? "border-primary/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                  : "border-border hover:border-primary/50"
              )}
              role="listitem"
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-text mb-2">{plan.name}</h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-text">
                  ${plan.price}
                </span>
                <span className="text-text-muted">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8" role="list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={feature + featureIndex} className="flex items-start gap-3 text-text-muted">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wide transition-all",
                  plan.featured
                    ? "bg-text text-background hover:bg-text/90"
                    : "bg-transparent border border-border text-text-muted hover:border-primary/50 hover:text-text"
                )}
              >
                {plan.ctaLabel}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}