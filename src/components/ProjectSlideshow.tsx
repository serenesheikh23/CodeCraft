"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export default function ProjectSlideshow({ images, title }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const slideWidth = rail.scrollWidth / images.length;
      setIndex(Math.max(0, Math.min(images.length - 1, Math.round(rail.scrollLeft / slideWidth))));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const go = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: (rail.scrollWidth / images.length) * i, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(Math.min(images.length - 1, index + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(Math.max(0, index - 1)); }
  };

  return (
    <figure className="relative" aria-roledescription="carousel" aria-label={`${title} screenshots`}>
      <div
        ref={railRef}
        onKeyDown={onKey}
        tabIndex={0}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative flex-shrink-0 w-full snap-start aspect-[16/10] bg-card border border-border"
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt={`${title} — screenshot ${i + 1} of ${images.length}`}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button type="button" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">←</button>
          <button type="button" onClick={() => go(Math.min(images.length - 1, index + 1))} disabled={index === images.length - 1} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">→</button>
          <figcaption className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border bg-card text-xs uppercase tracking-[0.2em] text-text-muted">
            <span>{index + 1} / {images.length}</span>
            <span className="flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} type="button" onClick={() => go(i)} aria-label={`Go to image ${i + 1}`} aria-current={i === index} className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-border"}`} />
              ))}
            </span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
