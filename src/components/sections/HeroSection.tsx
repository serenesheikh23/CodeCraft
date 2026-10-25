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
  const hasCtas = Boolean(primaryLabel || secondaryLabel);

  return (
    <section className="relative min-h-[85vh] flex items-center bg-background py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {content.badge ? (
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-accent-400 mb-4">
              {content.badge}
            </p>
          ) : null}

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] whitespace-pre-line text-text">
            {headline}
          </h1>

          <p className="font-body mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-text-muted max-w-2xl leading-relaxed">
            {subheadline}
          </p>

          {hasCtas ? (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primaryLabel ? (
                <Link
                  href={content.cta1Href || "/#contact"}
                  className="inline-flex h-12 items-center justify-center rounded-token-md bg-accent-500 px-6 text-sm font-medium text-background transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
                >
                  {primaryLabel}
                </Link>
              ) : null}

              {secondaryLabel ? (
                <Link
                  href={content.cta2Href || "/#services"}
                  className="inline-flex h-12 items-center justify-center rounded-token-md px-6 text-sm font-medium text-text transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="mt-8">
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center rounded-token-md bg-accent-500 px-6 text-sm font-medium text-background transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
              >
                Start a project
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}