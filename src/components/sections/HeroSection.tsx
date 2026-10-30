import Link from "next/link";

interface HeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  cta1Label?: string;
  cta1Href?: string;
  cta2Label?: string;
  cta2Href?: string;
}

export default function HeroSection({
  title,
  subtitle,
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

  const primaryLabel = content.cta1Label?.trim();
  const secondaryLabel = content.cta2Label?.trim();
  const hasPrimary = Boolean(primaryLabel);
  const hasSecondary = Boolean(secondaryLabel);

  return (
    <section
      className="relative min-h-[85vh] md:min-h-[60vh] flex flex-col items-center justify-center py-12 md:py-20 lg:py-28 bg-background text-text"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] whitespace-pre-line text-text mb-6">
          {headline}
        </h1>

        <p className="font-body text-base sm:text-lg lg:text-xl md:text-xl max-w-2xl leading-relaxed text-text-muted mb-8">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md mx-auto">
          {primaryLabel ? (
            <Link
              href={content.cta1Href || "/#contact"}
              className="flex-1 rounded-token-md bg-accent px-6 py-3 text-sm font-medium text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent/90"
              aria-label={primaryLabel}
            >
              {primaryLabel}
            </Link>
          ) : null}

          {secondaryLabel ? (
            <Link
              href={content.cta2Href || "/#services"}
              className="flex-1 rounded-token-md border border-accent text-accent-foreground text-sm font-medium text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent/90"
              aria-label={secondaryLabel}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}