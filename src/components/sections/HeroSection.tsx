"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  cta1Label?: string;
  cta1Href?: string;
  cta2Label?: string;
  cta2Href?: string;
}

const terminalLines = [
  "$ npx create-code-craft-app",
  "✓ Scaffolding project",
  "✓ Installing dependencies",
  "✓ Configuring database",
  "✓ Building pages",
  "✓ Deploying to production",
  "✓ Ready on https://yourproject.dev",
];

function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) {
      if (currentLineIndex === terminalLines.length - 1) {
        intervalRef.current = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
          setIsTyping(true);
        }, 4000);
      } else {
        intervalRef.current = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 400);
      }
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    if (currentCharIndex < currentLine.length) {
      intervalRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
    } else {
      setIsTyping(false);
    }
  }, [currentCharIndex, currentLineIndex, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="hidden lg:block lg:col-span-4"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 bg-background border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed text-text min-h-[320px]">
          {displayedLines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              {line.startsWith("✓") && (
                <span className="text-lime flex-shrink-0">✓</span>
              )}
              {!line.startsWith("✓") && !line.startsWith("$") && (
                <span className="w-5 flex-shrink-0" />
              )}
              <span
                className={
                  line.startsWith("$")
                    ? "text-text-muted"
                    : line.startsWith("✓")
                    ? "text-text"
                    : "text-text"
                }
              >
                {line.startsWith("$") ? line : line.replace("✓ ", "")}
              </span>
            </div>
          ))}
          {isTyping && currentLineIndex < terminalLines.length && (
            <div className="flex items-start gap-2">
              {terminalLines[currentLineIndex].startsWith("✓") && (
                <span className="text-lime flex-shrink-0">✓</span>
              )}
              {!terminalLines[currentLineIndex].startsWith("✓") &&
                !terminalLines[currentLineIndex].startsWith("$") && (
                  <span className="w-5 flex-shrink-0" />
                )}
              <span
                className={
                  terminalLines[currentLineIndex].startsWith("$")
                    ? "text-text-muted"
                    : "text-text"
                }
              >
                {terminalLines[currentLineIndex].startsWith("$")
                  ? terminalLines[currentLineIndex].slice(0, currentCharIndex)
                  : terminalLines[currentLineIndex].replace("✓ ", "").slice(0, currentCharIndex)}
              </span>
              {showCursor && (
                <span className="w-2 h-4 bg-lime animate-pulse ml-1 inline-block" />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
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
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.25em] text-xs text-text-muted mb-8 inline-flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              {content.badge || "Available for work · 2026"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-7xl lg:text-8xl leading-[0.9] tracking-tight text-text whitespace-pre-line"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-lg text-text-muted max-w-lg leading-relaxed"
            >
              {subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {content.cta1Label && content.cta1Href && (
                <Link
                  href={content.cta1Href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-text text-background rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-lime hover:text-background transition-colors"
                >
                  {content.cta1Label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right column: animated terminal */}
          <Terminal />
        </div>
      </div>
    </section>
  );
}