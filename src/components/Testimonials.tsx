"use client";

import { useRef, useState, useEffect } from "react";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  content: string;
  rating: number;
  order: number;
  isActive: boolean;
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.filter((t) => t.isActive);
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const w = rail.scrollWidth / items.length;
      setIndex(Math.max(0, Math.min(items.length - 1, Math.round(rail.scrollLeft / w))));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [items.length]);

  if (items.length === 0) return null;

  const go = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: (rail.scrollWidth / items.length) * i, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(Math.min(items.length - 1, index + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(Math.max(0, index - 1)); }
  };

  return (
    <section id="testimonials" className="relative py-12 md:py-16 lg:py-20 bg-background text-text" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">Client words</div>
        <h2 id="testimonials-heading" className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-8">
          People we&apos;ve shipped with.
        </h2>

        <div
          ref={railRef}
          onKeyDown={onKey}
          tabIndex={0}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{ scrollbarWidth: "none" }}
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {items.map((t, i) => (
            <figure key={t.id} className="flex-shrink-0 w-full sm:w-[85%] snap-start pr-4" aria-hidden={i !== index}>
              <blockquote className="border border-border bg-card p-8 lg:p-10">
                <p className="font-outfit text-2xl lg:text-3xl leading-tight tracking-tight text-text mb-8">
                  &ldquo;{t.content}&rdquo;
                </p>
                <figcaption className="pt-6 border-t border-border">
                  <p className="font-semibold text-text">{t.clientName}</p>
                  <p className="text-text-muted text-sm">{t.clientRole} at {t.clientCompany}</p>
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>

        {items.length > 1 && (
          <div className="flex items-center justify-between gap-4 mt-6">
            <span className="text-xs uppercase tracking-[0.2em] text-text-muted">{index + 1} / {items.length}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous testimonial" className="w-11 h-11 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">←</button>
              <button type="button" onClick={() => go(Math.min(items.length - 1, index + 1))} disabled={index === items.length - 1} aria-label="Next testimonial" className="w-11 h-11 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">→</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
