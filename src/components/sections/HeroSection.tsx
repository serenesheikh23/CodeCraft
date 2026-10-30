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
  const lines = headline.split("\n");

  return (
    <section className="relative bg-background text-text border-b border-border overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 pt-20 md:pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="flex items-center gap-3 mb-12 lg:mb-16">
          <span aria-hidden="true" className="w-2 h-2 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
            Digital studio
          </span>
        </div>

        <h1 className="font-outfit font-medium leading-[0.85] tracking-[-0.045em] text-[clamp(3rem,14vw,11rem)]">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {i === lines.length - 1 ? (
                <span className="text-accent">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <p className="lg:col-span-5 text-lg lg:text-xl text-text-muted leading-relaxed max-w-[42ch]">
            {subheadline}
          </p>

          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
            <Link
              href={content.cta1Href || "/#contact"}
              className="inline-flex items-center justify-between gap-6 min-h-[56px] px-6 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.15em] hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {content.cta1Label || "Start a project"}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={content.cta2Href || "/#services"}
              className="inline-flex items-center justify-between gap-6 min-h-[56px] px-6 border border-border text-text text-sm font-semibold uppercase tracking-[0.15em] hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {content.cta2Label || "View services"}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
