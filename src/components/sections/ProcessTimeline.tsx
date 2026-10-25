"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "We learn how you work, what your users need, and what success looks like." },
  { num: "02", title: "Design", desc: "Wireframes, then high-fidelity mockups. No surprise redesigns mid-build." },
  { num: "03", title: "Build", desc: "Clean code, weekly demos, real progress you can see and click." },
  { num: "04", title: "Ship", desc: "Deployed, monitored, and supported after launch. Not handed off and forgotten." },
];

const LIGHT_BLUE = "#60A5FA";
const LIGHT_BLUE_GLOW = "0 0 12px rgba(96, 165, 250, 0.6)";

export default function ProcessTimeline() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-card border-y border-border overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="section-label text-lime mb-4">HOW WE WORK</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-6xl leading-[0.95] tracking-tight text-text">
            From idea
            <br />
            to production.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical connecting line with gradient */}
          <div
            className="absolute left-4 lg:left-8 top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(180deg, ${LIGHT_BLUE} 0%, rgba(96, 165, 250, 0.2) 100%)`,
            }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 lg:pl-24"
              >
                {/* Circle marker */}
                <div
                  className="absolute left-0 lg:left-4 top-1 w-8 h-8 rounded-full bg-background flex items-center justify-center -translate-x-[15px]"
                  style={{
                    border: `2px solid ${LIGHT_BLUE}`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: LIGHT_BLUE,
                    }}
                  />
                </div>

                {/* Step number */}
                <div
                  className="text-xs uppercase tracking-[0.2em] font-mono mb-3 font-semibold"
                  style={{
                    color: LIGHT_BLUE,
                    textShadow: `0 0 12px rgba(96, 165, 250, 0.5)`,
                  }}
                >
                  {step.num}
                </div>

                <h3 className="font-display text-3xl lg:text-4xl text-text mb-4">
                  {step.title}
                </h3>
                <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
