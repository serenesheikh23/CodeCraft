"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  cta1Label?: string;
  cta1Href?: string;
}

const terminalLines: Array<{ text: string; delay: number; type: "command" | "info" | "success" | "final" }> = [
  { text: '$ npx codecraft create "your-next-big-thing"', delay: 40, type: "command" },
  { text: "✓ Initializing Code Craft workspace", delay: 18, type: "success" },
  { text: "✓ Scaffolding project structure", delay: 15, type: "success" },
  { text: "✓ Installing 312 dependencies", delay: 15, type: "success" },
  { text: "→ Configuring database & auth", delay: 20, type: "info" },
  { text: "✓ Schema migrated", delay: 15, type: "success" },
  { text: "→ Building optimized bundle", delay: 20, type: "info" },
  { text: "✓ Bundle ready (89.2 KB gzipped)", delay: 15, type: "success" },
  { text: "→ Deploying to edge network", delay: 20, type: "info" },
  { text: "✓ Live at https://your-next-big-thing.dev", delay: 15, type: "success" },
  { text: "  Shipped in 3.4s — welcome to production.", delay: 25, type: "final" },
];

function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => {
        setVisibleLines([]);
        setCurrentChar(0);
        setCurrentLine(0);
        setIsDone(false);
      }, 5000);
      return () => clearTimeout(t);
    }
    if (currentLine >= terminalLines.length) {
      setIsDone(true);
      return;
    }
    const line = terminalLines[currentLine];
    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), line.delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, currentLine]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentChar, currentLine, isDone]);

  const colorFor = (type: string) =>
    type === "command"
      ? "text-text"
      : type === "success"
      ? "text-lime"
      : type === "final"
      ? "text-coral font-semibold"
      : "text-text-muted";

  const renderLine = (idx: number) => {
    const line = terminalLines[idx];
    const isCurrent = idx === currentLine && !isDone;
    const text = isCurrent ? line.text.slice(0, currentChar) : line.text;
    return (
      <div key={idx} className={`${colorFor(line.type)} whitespace-pre-wrap break-all`}>
        {text}
        {isCurrent && (
          <span className="inline-block w-2 h-4 bg-lime ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="absolute -inset-8 glow-cyan opacity-60 blur-2xl pointer-events-none" />
      <div className="relative border border-border bg-card rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-xs text-text-muted font-mono">codecraft — zsh</span>
        </div>
        <div className="p-5 font-mono text-xs lg:text-sm leading-relaxed space-y-1 min-h-[260px]">
          {visibleLines.map((idx) => renderLine(idx))}
          {!isDone && currentLine < terminalLines.length && renderLine(currentLine)}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({
  content,
}: {
  title: string;
  subtitle: string;
  content: HeroContent;
}) {
  const headline = content.headline || "Ideas in.\nProducts out.";
  const subheadline =
    content.subheadline ||
    "Building ideas into digital products. Websites, apps and full systems.";

  return (
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden py-16 md:py-24 lg:py-32">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] glow-cyan opacity-70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] glow-blue opacity-60 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label text-lime mb-8"
            >
              {content.badge || "Available for work · 2026"}
            </motion.p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-6xl leading-[0.95] tracking-tight text-text whitespace-pre-line">
              {headline}
            </h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-lg text-text-muted max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 mt-8 lg:mt-0"
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
