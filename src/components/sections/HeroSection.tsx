import Link from "next/link";
import { EditDemo } from "../interactive/EditDemoWrapper";

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
  const headline = content.headline || "Websites for small businesses that need customers.";
  const subheadline =
    content.subheadline ||
    "We build fast websites you can edit yourself, and we'll tell you honestly what you do and don't need.";
  
  const words = headline.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <section className="relative bg-background text-text border-b border-border overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start">
            {content.badge && (
              <span className="inline-block py-1 px-3 bg-primary-tint text-primary text-xs font-medium uppercase tracking-[0.1em] rounded-full mb-6">
                {content.badge}
              </span>
            )}
            <h1 id="hero-headline" className="font-display font-extrabold tracking-[-0.04em] text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] text-text mb-6">
              {firstPart} <span className="text-primary">{lastWord}</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted leading-[1.6] max-w-[60ch] mb-8">
              {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href={content.cta1Href || "/#contact"}
                className="inline-flex items-center justify-center min-h-[48px] px-6 bg-primary text-primary-foreground text-[15px] font-medium rounded hover:bg-primary-hover active:bg-primary-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {content.cta1Label || "Book a free 20-minute call"}
              </Link>
              <Link
                href={content.cta2Href || "/#projects"}
                className="inline-flex items-center justify-center min-h-[48px] px-6 border border-border-strong text-text text-[15px] font-medium rounded hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {content.cta2Label || "See the work"}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <EditDemo initialHeadline={headline} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
