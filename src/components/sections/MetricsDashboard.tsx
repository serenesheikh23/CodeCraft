"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { label: "Performance", value: 98 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
];

function Circle({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime - delay;
      if (elapsed < 0) return requestAnimationFrame(tick);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, delay]);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32 lg:w-40 lg:h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-lime"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-4xl lg:text-5xl text-text">{count}</span>
        </div>
      </div>
      <div className="mt-4 text-xs uppercase tracking-[0.2em] text-text-muted">{label}</div>
    </div>
  );
}

export default function MetricsDashboard() {
  return (
    <section className="relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {metrics.map((m, i) => (
            <Circle key={m.label} value={m.value} label={m.label} delay={i * 150} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-text-muted max-w-xl mx-auto"
        >
          Audited with Google Lighthouse on every build. Not marketing claims — measured.
        </motion.p>
      </div>
    </section>
  );
}
