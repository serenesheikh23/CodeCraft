"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  isActive: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  isActive: boolean;
}

interface BaseType {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  matchNames: string[];
}

const BaseIcon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> = () => null;

const BASE_TYPES: BaseType[] = [
  {
    id: "web",
    label: "Website",
    description: "A web app, landing page, or full website",
    icon: BaseIcon,
    matchNames: ["landing page", "business website", "custom web app", "e-commerce platform"],
  },
  {
    id: "app",
    label: "Mobile App",
    description: "iOS, Android, or cross-platform app",
    icon: BaseIcon,
    matchNames: ["starter app", "full app"],
  },
  {
    id: "both",
    label: "Both",
    description: "Web + mobile app + shared backend",
    icon: BaseIcon,
    matchNames: ["app + backend combo", "full solution bundle"],
  },
];

export default function QuoteEstimator({
  services,
  addons,
}: {
  services: Service[];
  addons: AddOn[];
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const activeServices = services.filter((s) => s.isActive);
  const activeAddons = addons.filter((a) => a.isActive);

  const baseService = (baseId: string) => {
    const base = BASE_TYPES.find((b) => b.id === baseId);
    if (!base) return null;
    return activeServices.find((s) =>
      base.matchNames.some((n) => s.name.toLowerCase().includes(n))
    ) || null;
  };

  const basePrice = (() => {
    if (!selectedBase) return { min: 0, max: 0 };
    if (selectedBase === "both") {
      const web = activeServices.find((s) =>
        ["landing page", "business website", "custom web app"].some((n) =>
          s.name.toLowerCase().includes(n)
        )
      );
      const app = activeServices.find((s) =>
        ["starter app", "full app"].some((n) => s.name.toLowerCase().includes(n))
      );
      return {
        min: (web?.minPrice || 0) + (app?.minPrice || 0),
        max: (web?.maxPrice || 0) + (app?.maxPrice || 0),
      };
    }
    const s = baseService(selectedBase);
    return { min: s?.minPrice || 0, max: s?.maxPrice || 0 };
  })();

  const addonsTotal = activeAddons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const minTotal = basePrice.min + addonsTotal;
  const maxTotal = basePrice.max + addonsTotal;

  const selectedAddonsList = activeAddons.filter((a) => selectedAddons.includes(a.id));
  const base = selectedBase ? BASE_TYPES.find((b) => b.id === selectedBase) : null;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setStep(1);
    setSelectedBase(null);
    setSelectedAddons([]);
  };


  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-background text-text">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
            style={{ color: step === 1 ? "var(--accent)" : "#64748B" }}
            onClick={() => setStep(1)}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{
                backgroundColor: step === 1 ? "var(--accent)" : "transparent",
                border: `1px solid ${step === 1 ? "var(--accent)" : "#1a2332"}`,
                color: step === 1 ? "#0B0F14" : "#64748B",
              }}
            >
              1
            </span>
            Base
          </div>
          <div className="w-8 h-px bg-border" />
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: step === 2 ? "var(--accent)" : "#64748B" }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{
                backgroundColor: step === 2 ? "var(--accent)" : "transparent",
                border: `1px solid ${step === 2 ? "var(--accent)" : "#1a2332"}`,
                color: step === 2 ? "#0B0F14" : "#64748B",
              }}
            >
              2
            </span>
            Add-ons
          </div>
        </div>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left — picker */}
          <div className="lg:col-span-7">

            {/* Step 1: Base service picker */}
            {step === 1 && (
              <div className="space-y-4">
                {BASE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedBase === type.id;
                  const base = baseService(type.id);
                  const priceLabel =
                    type.id === "both"
                      ? (() => {
                          const web = activeServices.find((s) =>
                            ["landing page", "business website", "custom web app"].some((n) =>
                              s.name.toLowerCase().includes(n)
                            )
                          );
                          const app = activeServices.find((s) =>
                            ["starter app", "full app"].some((n) => s.name.toLowerCase().includes(n))
                          );
                          const min = (web?.minPrice || 0) + (app?.minPrice || 0);
                          return `$${min.toLocaleString()}+`;
                        })()
                      : base
                      ? `$${base.minPrice.toLocaleString()}+`
                      : "—";

                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedBase(type.id)}
                      className="w-full border border-border rounded-xl p-8 flex items-center justify-between gap-6 transition-all duration-200"
                      style={{
                        borderColor: isSelected ? "var(--accent)" : "var(--border)",
                        backgroundColor: isSelected ? "rgba(163, 230, 53, 0.05)" : "transparent",
                      }}
                    >
                      <div className="flex items-start gap-5 flex-1 min-w-0">
                        <Icon
                          className="w-6 h-6 flex-shrink-0 mt-0"
                          style={{ color: isSelected ? "var(--accent)" : "#64748B" }}
                        />
                        <div className="min-w-0">
                          <div className="font-outfit text-2xl text-text mb-1">
                            {type.label}
                          </div>
                          <p className="text-sm text-text-muted leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 flex items-center gap-4">
                        <span className="font-outfit text-lg" style={{ color: "var(--accent)" }}>
                          {priceLabel}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                          style={{
                            backgroundColor: isSelected ? "var(--accent)" : "transparent",
                            borderColor: isSelected ? "var(--accent)" : "#1a2332",
                          }}
                        >
                          {isSelected && <Check className="w-2 h-2 text-background" />}
                        </div>
                      </div>
                    </button>
                  );
                })}

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                    disabled={!selectedBase}
                  >
                    Continue to add-ons
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add-on selector */}
            {step === 2 && (
              <div className="space-y-3">
                {activeAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className="w-full border border-border rounded-md p-4 flex items-center justify-between gap-4 transition-all duration-200"
                      style={{
                        borderColor: isSelected ? "var(--accent)" : "var(--border)",
                        backgroundColor: isSelected ? "rgba(163, 230, 53, 0.05)" : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span
                          className="w-4 h-4 rounded-md border flex items-center justify-center transition-all flex-shrink-0"
                          style={{
                            backgroundColor: isSelected ? "var(--accent)" : "transparent",
                            borderColor: isSelected ? "var(--accent)" : "#1a2332",
                          }}
                        >
                          {isSelected && <Check className="w-2 h-2 text-background" />}
                        </span>
                        <div className="min-w-0">
                          <div className="text-base text-text truncate">{addon.name}</div>
                          <p className="text-xs text-text-muted line-clamp-1">{addon.description}</p>
                        </div>
                      </div>
                      <span className="font-outfit text-base" style={{ color: "var(--accent)" }}>
                        ${addon.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}

                <div className="pt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold uppercase tracking-[0.2em] text-border text-border hover:text-text hover:border-accent transition-all"
                  >
                    Back
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "#0B0F14",
                      border: "1px solid var(--accent)",
                    }}
                  >
                    Get a personalized quote
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right — summary */}
          <div className="lg:col-span-5 sticky lg:top-32 border border-border rounded-lg p-8 bg-background">

            <div className="section-label text-xs uppercase tracking-[0.2em] text-text-muted mb-6">YOUR ESTIMATE</div>

            {!selectedBase ? (
              <p className="text-text-muted text-sm leading-relaxed mb-8 min-h-[200px]">
                Pick a starting point to see a live estimate. No email required.
              </p>
            ) : (
              <div className="mb-8 min-h-[200px]">
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm gap-4">
                    <span className="text-text">
                      {selectedBase === "both" ? "Web + App" : base?.label}
                    </span>
                    <span className="text-text flex-shrink-0">
                      ${basePrice.min.toLocaleString()}+
                    </span>
                  </div>

                  {selectedAddonsList.length > 0 && (
                    <>
                      <div className="text-xs uppercase tracking-[0.2em] text-text-muted pt-2">Add-ons</div>
                      {selectedAddonsList.map((a) => (
                        <div
                          key={a.id}
                          className="flex justify-between text-sm gap-3 pl-3 border-l border-border"
                        >
                          <span className="text-text-muted truncate">{a.name}</span>
                          <span className="text-text flex-shrink-0">${a.price}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                      Estimated range
                    </div>
                    <div className="font-outfit text-3xl lg:text-4xl" style={{ color: "var(--accent)" }}>
                      ${minTotal.toLocaleString()}
                      <span className="text-text-muted text-2xl mx-2">—</span>
                      ${maxTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedBase && (
              <div className="space-y-3">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#0B0F14",
                    border: "1px solid var(--accent)",
                  }}
                >
                  Get a personalized quote
                  <ArrowRight className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full text-center text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text transition-colors"
                >
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}