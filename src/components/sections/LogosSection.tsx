"use client";

interface LogosSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface LogoItem {
  url: string;
  alt: string;
}

export default function LogosSection({ title, subtitle, content }: LogosSectionProps) {
  const logos = (content.logos as LogoItem[]) || [];

  if (logos.length === 0) return null;

  return (
    <section
      id="logos"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="logos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="logos-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-tight text-text mb-6"
          >
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-12 items-center" role="list" aria-label="Client logos">
          {logos.map((logo, index) => {
            const isSvg = /\.svg($|\?)/i.test(logo.url);

            return (
              <div
                key={logo.alt + index}
                className="transition-colors duration-200 hover:bg-accent/5"
                role="listitem"
              >
                {isSvg ? (
                  <svg
                    src={logo.url}
                    alt={logo.alt}
                    className="w-20 h-8 mx-auto max-h-12 w-auto object-contain"
                  />
                ) : (
                  <img
                    src={logo.url.replace(/\.(png|jpe?g)$/i, ".webp")}
                    alt={logo.alt}
                    width={200}
                    height={48}
                    className="mx-auto max-h-12 w-auto object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}