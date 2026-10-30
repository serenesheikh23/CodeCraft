"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured: boolean;
}

interface PricingSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function PricingSection({ title, subtitle, content }: PricingSectionProps) {
  const plans = (content.plans as PricingPlan[]) || [];

  if (plans.length === 0) return null;

  return (
    <section
      id="pricing"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
<>
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="pricing-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
          >
            {title}
          </h2>
</>
)}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const isFeatured = plan.featured;

            return (
              <article
                key={plan.name}
                className={cn(
                  "border border-border rounded-lg p-6 transition-all duration-200",
                  isFeatured
                    ? "border-accent bg-accent/5"
                    : "hover:border-accent hover:bg-accent/5"
                )}
                role="listitem"
              >
                <h3 className="font-outfit text-base font-semibold text-text mb-4">{plan.name}</h3>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-outfit text-4xl sm:text-5xl font-bold text-text">
                    ${plan.price}
                  </span>
                  <span className="text-text-muted">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-6" role="list">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature + featureIndex}
                      className="flex items-start gap-3 text-text-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-1" />
                      <span className="text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium uppercase tracking-wider text-xs transition-colors"
                  style={{
                    backgroundColor: isFeatured ? "transparent" : "var(--accent)",
                    color: isFeatured ? "var(--text)" : "var(--accent-foreground)",
                    borderColor: isFeatured ? "var(--accent)" : "var(--accent)",
                  }}
                >
                  {plan.ctaLabel}
                  <svg
                    className="w-4 h-4"
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}