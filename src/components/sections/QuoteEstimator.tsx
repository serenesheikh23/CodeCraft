"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, ArrowRight, Globe, Smartphone, Layers } from "lucide-react";

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

const BRAND_BLUE = "#3B82F6";
const CYAN = "#22D3EE";

// Base types — pull from services by matching name
const BASE_TYPES = [
  {
    id: "web",
    label: "Website",
    description: "A web app, landing page, or full website",
    icon: Globe,
    matchNames: ["landing page", "business website", "custom web app", "e-commerce platform"],
  },
  {
    id: "app",
    label: "Mobile App",
    description: "iOS, Android, or cross-platform app",
    icon: Smartphone,
    matchNames: ["starter app", "full app"],
  },
  {
    id: "both",
    label: "Both",
    description: "Web + mobile app + shared backend",
    icon: Layers,
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
      // For "Both", combine cheapest web + cheapest app
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
    <section className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-blue opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] glow-cyan opacity-20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="section-label text-lime mb-4">BUILD YOUR ESTIMATE</div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            {step === 1 ? "What do you need?" : "Any add-ons?"}
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            {step === 1
              ? "Pick a starting point. You can add extras on the next step."
              : "Optional. Skip if you're not sure yet — we'll figure it out together."}
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
            style={{ color: step === 1 ? CYAN : "#64748B" }}
            onClick={() => setStep(1)}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
              style={{
                backgroundColor: step === 1 ? CYAN : "transparent",
                border: `1px solid ${step === 1 ? CYAN : "#1a2332"}`,
                color: step === 1 ? "#0B1220" : "#64748B",
              }}
            >
              1
            </span>
            Base
          </div>
          <div className="w-12 h-px bg-border" />
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: step === 2 ? CYAN : "#64748B" }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
              style={{
                backgroundColor: step === 2 ? CYAN : "transparent",
                border: `1px solid ${step === 2 ? CYAN : "#1a2332"}`,
                color: step === 2 ? "#0B1220" : "#64748B",
              }}
            >
              2
            </span>
            Add-ons
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — picker */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
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
                      <motion.button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedBase(type.id)}
                        whileTap={{ scale: 0.99 }}
                        className="w-full text-left p-8 border transition-all duration-200 flex items-center justify-between gap-6"
                        style={{
                          borderColor: isSelected ? BRAND_BLUE : undefined,
                          backgroundColor: isSelected ? "rgba(59, 130, 246, 0.05)" : undefined,
                        }}
                      >
                        <div className="flex items-start gap-5 flex-1 min-w-0">
                          <Icon
                            className="w-7 h-7 flex-shrink-0 mt-1"
                            style={{ color: isSelected ? BRAND_BLUE : "#94A3B8" }}
                          />
                          <div className="min-w-0">
                            <div className="font-serif text-2xl text-text mb-1">
                              {type.label}
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-center gap-4">
                          <span className="font-serif text-lg" style={{ color: BRAND_BLUE }}>
                            {priceLabel}
                          </span>
                          <div
                            className="w-5 h-5 rounded-full border flex items-center justify-center transition-all"
                            style={{
                              backgroundColor: isSelected ? BRAND_BLUE : "transparent",
                              borderColor: isSelected ? BRAND_BLUE : "#1a2332",
                            }}
                          >
                            {isSelected && <Check className="w-3 h-3 text-background" />}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  <div className="pt-4">
                    <button
                      type="button"
                      disabled={!selectedBase}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: BRAND_BLUE,
                        color: "#F8FAFC",
                        border: `1px solid ${BRAND_BLUE}`,
                      }}
                    >
                      Continue to add-ons
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {activeAddons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <motion.button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        whileTap={{ scale: 0.99 }}
                        className="w-full text-left p-5 border transition-all duration-200 flex items-center justify-between gap-4"
                        style={{
                          borderColor: isSelected ? BRAND_BLUE : undefined,
                          backgroundColor: isSelected ? "rgba(59, 130, 246, 0.05)" : undefined,
                        }}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div
                            className="w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0"
                            style={{
                              backgroundColor: isSelected ? BRAND_BLUE : "transparent",
                              borderColor: isSelected ? BRAND_BLUE : "#1a2332",
                            }}
                          >
                            {isSelected && <Check className="w-3 h-3 text-background" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-base text-text truncate">{addon.name}</div>
                            <p className="text-xs text-text-muted line-clamp-1">{addon.description}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-serif text-base" style={{ color: BRAND_BLUE }}>
                            ${addon.price.toLocaleString()}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}

                  <div className="pt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-xs border border-border text-text-muted hover:text-text hover:border-lime transition-all"
                    >
                      Back
                    </button>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold uppercase tracking-wider text-xs transition-all duration-200"
                      style={{
                        backgroundColor: BRAND_BLUE,
                        color: "#F8FAFC",
                        border: `1px solid ${BRAND_BLUE}`,
                      }}
                    >
                      Get a personalized quote
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 border border-border p-8 bg-card">
              <div className="section-label text-lime mb-6">YOUR ESTIMATE</div>

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
                        <div className="text-xs uppercase tracking-[0.2em] text-text-muted pt-2">
                          Add-ons
                        </div>
                        {selectedAddonsList.map((a) => (
                          <motion.div
                            key={a.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-between text-sm gap-4 pl-3 border-l border-border"
                          >
                            <span className="text-text-muted truncate">{a.name}</span>
                            <span className="text-text flex-shrink-0">${a.price}</span>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                        Estimated range
                      </div>
                      <div className="font-serif text-3xl lg:text-4xl" style={{ color: BRAND_BLUE }}>
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
                      backgroundColor: BRAND_BLUE,
                      color: "#F8FAFC",
                      border: `1px solid ${BRAND_BLUE}`,
                    }}
                  >
                    Get a personalized quote
                    <ArrowUpRight className="w-4 h-4" />
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
      </div>
    </section>
  );
}
