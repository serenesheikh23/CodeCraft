import Link from "next/link";
interface CtaContent {
  headline?: string;
  subheadline?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CtaSection({
  content,
}: {
  content: CtaContent;
}) {
  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-4">
            {content.headline || "Have a project in mind?"}
          </h2>

          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed mb-8">
            {content.subheadline || "Let's talk about what you're building."}
          </p>

          <div className="mt-8">
            <Link
              href={content.buttonHref || "/#contact"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-none font-medium uppercase tracking-wider text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {content.buttonLabel || "Start a project"}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}