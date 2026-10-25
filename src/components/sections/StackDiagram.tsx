"use client";

import { motion } from "framer-motion";

const layers = [
  { label: "Your Site", sub: "What visitors see", side: "left" },
  { label: "Fast Delivery", sub: "Served from a global network", side: "right" },
  { label: "The Brain", sub: "Logic, data, and updates", side: "left" },
  { label: "Secure Storage", sub: "Where everything is kept safe", side: "right" },
];

export default function StackDiagram() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-coral text-xs uppercase tracking-[0.2em] font-medium mb-4">
            HOW IT'S BUILT
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-6xl leading-[0.95] tracking-tight text-text">
            Built to last.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            Every project runs on the same modern, trusted tools — fast, secure, and easy to maintain for years.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto py-12">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-24 relative">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex items-center gap-8 ${layer.side === "left" ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${layer.side === "left" ? "text-right" : "text-left"}`}>
                  <div className="font-display text-3xl lg:text-4xl text-text">{layer.label}</div>
                  <div className="mt-2 text-sm text-text-muted">{layer.sub}</div>
                </div>
                <div className="relative w-4 h-4 flex-shrink-0 z-10">
                  <span className="absolute inset-0 rounded-full bg-lime" />
                  <span className="absolute inset-0 rounded-full bg-lime animate-ping opacity-50" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
