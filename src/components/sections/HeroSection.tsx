"use client";

import Image from "next/image";

interface HeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  cta1Label?: string;
  cta1Href?: string;
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
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-6">
            <p className="section-label text-lime mb-8">
              {content.badge || "Available for work · 2026"}
            </p>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-text whitespace-pre-line">
              {headline}
            </h1>

            <p className="mt-8 text-lg text-text-muted max-w-xl leading-relaxed">
              {subheadline}
            </p>
          </div>

          {/* Right Column: Real Work Screenshot (Replaces Fake Terminal) */}
          <div className="lg:col-span-6 mt-8 lg:mt-0">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-card">
              {/* This uses one of your real project images */}
              <Image
                src="/uploads/3e4263b3-513a-4d09-a7db-09949480ed05.png"
                alt="Light Agency - Recent project by Code Craft"
                fill
                className="object-cover object-top"
                priority // Tells the browser to load this immediately
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}