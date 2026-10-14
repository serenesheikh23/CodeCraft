"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function HeroSection({ title, subtitle, content }: HeroSectionProps) {
  const badge = (content.badge as string) || "";
  const headline = (content.headline as string) || "Ideas in.\nProducts out.";
  const subheadline = (content.subheadline as string) || "Building ideas into digital products. Websites, apps and full systems.";
  const cta1Label = (content.cta1Label as string) || "Start a project";
  const cta1Href = (content.cta1Href as string) || "/#contact";
  const cta2Label = (content.cta2Label as string) || "View services";
  const cta2Href = (content.cta2Href as string) || "/#services";

  if (!headline && !subheadline) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 text-left">
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block text-sm font-medium text-primary/80 uppercase tracking-widest mb-6"
              >
                {badge}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight text-text mb-8 whitespace-pre-wrap"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-2xl mb-10 leading-relaxed"
            >
              {subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href={cta1Href}
                className={cn(
                  "btn-primary px-8 py-4 text-lg font-medium uppercase tracking-wide rounded-md",
                  "group relative overflow-hidden"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cta1Label}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href={cta2Href}
                className={cn(
                  "btn-secondary px-8 py-4 text-lg font-medium uppercase tracking-wide rounded-md",
                  "group relative overflow-hidden"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cta2Label}
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <div className="relative h-[500px] max-w-md mx-auto lg:mx-0" style={{
              backgroundImage: `
                linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-center text-text-muted">
                <div className="text-sm uppercase tracking-widest font-medium">Code Craft</div>
                <div className="text-sm uppercase tracking-widest font-medium">Independent Studio</div>
                <div className="flex gap-12 pt-8">
                  <div>
                    <div className="font-serif text-3xl font-bold text-text">12+</div>
                    <div className="text-xs uppercase tracking-wider">Projects</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-text">8</div>
                    <div className="text-xs uppercase tracking-wider">Team</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl font-bold text-text">4</div>
                    <div className="text-xs uppercase tracking-wider">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}