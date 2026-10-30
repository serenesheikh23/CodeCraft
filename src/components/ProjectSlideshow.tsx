"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { parseCrop } from "@/lib/crop";

interface Props {
  images: string[];
  title: string;
}

export default function ProjectSlideshow({ images, title }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const crops = images.map(parseCrop);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const slideWidth = rail.scrollWidth / crops.length;
      setIndex(Math.max(0, Math.min(crops.length - 1, Math.round(rail.scrollLeft / slideWidth))));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [crops.length]);

  if (!crops.length) return null;

  const go = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: (rail.scrollWidth / crops.length) * i, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(Math.min(crops.length - 1, index + 1)); }
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
        {crops.map((crop, i) => (
          <div
            key={`${crop.url}-${i}`}
            className="relative flex-shrink-0 w-full snap-start aspect-[16/10] bg-card border border-border overflow-hidden"
            aria-hidden={i !== index}
          >
            <Image
              src={crop.url}
              alt={`${title} — screenshot ${i + 1} of ${crops.length}`}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              unoptimized={crop.url.startsWith("http")}
              className="object-cover"
              priority={i === 0}
              style={{
                objectPosition: `${crop.x}% ${crop.y}%`,
                transform: crop.zoom !== 1 ? `scale(${crop.zoom})` : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {crops.length > 1 && (
        <>
          <button type="button" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">←</button>
          <button type="button" onClick={() => go(Math.min(crops.length - 1, index + 1))} disabled={index === crops.length - 1} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 border border-border flex items-center justify-center text-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">→</button>
          <figcaption className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border bg-card text-xs uppercase tracking-[0.2em] text-text-muted">
            <span>{index + 1} / {crops.length}</span>
            <span className="flex gap-1.5">
              {crops.map((_, i) => (
                <button key={i} type="button" onClick={() => go(i)} aria-label={`Go to image ${i + 1}`} aria-current={i === index} className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-border"}`} />
              ))}
            </span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
