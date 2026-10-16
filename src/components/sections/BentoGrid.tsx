"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Code, Shield } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-coral text-xs uppercase tracking-[0.2em] font-medium mb-4">
            WHY CODE CRAFT
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            Built different.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 lg:row-span-2 border border-border p-10 flex flex-col justify-between hover:border-lime/40 transition-colors"
          >
            <Code className="w-8 h-8 text-lime" />
            <div>
              <div className="font-serif text-4xl lg:text-5xl text-text leading-tight mb-4">
                Full-stack<br />capability.
              </div>
              <p className="text-text-muted text-lg max-w-md leading-relaxed">
                Frontend, backend, mobile, infrastructure. One team, one codebase, no handoffs between agencies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-border p-8 flex flex-col justify-between hover:border-lime/40 transition-colors"
          >
            <Clock className="w-6 h-6 text-coral" />
            <div>
              <div className="font-serif text-4xl text-text">24h</div>
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mt-2">Response time</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border p-8 flex flex-col justify-between hover:border-lime/40 transition-colors"
          >
            <Shield className="w-6 h-6 text-lime" />
            <div>
              <div className="font-serif text-3xl text-text leading-tight">100%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mt-2">Code ownership</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 border border-border p-8 flex items-center justify-between gap-8 hover:border-lime/40 transition-colors"
          >
            <div className="flex items-center gap-6">
              <Zap className="w-6 h-6 text-lime flex-shrink-0" />
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-text">Weekly demos. No surprises.</div>
                <div className="text-sm text-text-muted mt-1">You see progress every week — nothing to catch you off guard at launch.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
