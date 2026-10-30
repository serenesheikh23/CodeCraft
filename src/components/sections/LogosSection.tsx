import Image from "next/image";

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
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text"
      aria-labelledby="logos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
          <>
            {subtitle && (
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-medium">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="logos-heading"
                className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-tight text-text mb-6"
              >
                {title}
              </h2>
            )}
          </>
        )}

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-12 items-center"
          role="list"
          aria-label="Client logos"
        >
          {logos.map((logo, index) => (
            <div
              key={logo.alt + index}
              className="flex items-center justify-center h-14"
              role="listitem"
            >
              <Image
                src={logo.url}
                alt={logo.alt}
                width={160}
                height={48}
                className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
