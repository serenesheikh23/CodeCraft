"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toWebp } from "@/lib/imageUrl";

interface GallerySectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface GalleryImage {
  url: string;
  caption?: string;
}

export default function GallerySection({ title, subtitle, content }: GallerySectionProps) {
  const images = (content.images as GalleryImage[]) || [];

  if (images.length === 0) return null;

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-[30%,70%] gap-8 items-start mb-16 lg:mb-20"
          >
            {subtitle && (
              <div className="text-text-muted text-sm uppercase tracking-[0.2em] font-medium pt-2">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="gallery-heading"
                className="font-display text-3xl sm:text-5xl leading-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Gallery">
          {images.map((image, index) => (
            <figure
              key={image.url + index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-card-hover"
              role="listitem"
            >
              <Image
                src={toWebp(image.url)}
                alt={image.caption || `Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {image.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-sm text-text-muted">{image.caption}</p>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
