"use client";

import Image from "next/image";

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
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-6">
            {subtitle && (
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-medium">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="gallery-heading"
                className="font-outfit text-3xl sm:text-4xl leading-tight text-text"
              >
                {title}
              </h2>
            )}
          </div>
        )}

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Gallery"
        >
          {images.map((image, index) => (
            <figure
              key={image.url + index}
              className="relative rounded-lg overflow-hidden bg-card"
              role="listitem"
            >
              <Image
                src={image.url}
                alt={image.caption || `Gallery image ${index + 1}`}
                width={800}
                height={600}
                className="object-cover w-full h-64 sm:h-80 lg:h-96"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {image.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-background/90">
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
