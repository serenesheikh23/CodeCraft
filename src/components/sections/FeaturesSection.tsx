import { cn } from "@/lib/utils";
interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export default function FeaturesSection({ title, subtitle, content }: FeaturesSectionProps) {
  const items = (content.items as FeatureItem[]) || [];

  if (items.length === 0) return null;

  return (
    <section
      id="features"
      className="relative py-20 md:py-28 lg:py-36 text-text text-background"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
<>
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="features-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
          >
            {title}
          </h2>
</>
)}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Features">
          {items.map((item, index) => {
            const iconMap: Record<string, string> = {
              layout: "M6 2L3 6v14l6-5zm5.5 3c-.28 0-.53.11-.71.33L12 15l2.17-3.76c-.18-.36-.04-.71.33-.71.33 0 .63.14.7.33l2.12 3.65c.09.4.32.62.67.62.31 0 .53-.13.66-.33l1.13-2.08c.13-.45.04-.74-.26-.94a5.95 5.95 0 0 0-2.21-.65l-1.82-1.23c-.44-.3-.83-.45-1.17-.45-.31 0-.58.11-.78.32l-1.82 1.23a4.96 4.96 0 0 0-2.21.65c-.13.2-.24.44-.26.94l1.13 2.08c.13.45.33.69.66.33l2.12-3.65c.09-.4.33-.62.67-.62.36 0 .69.26.71.33l-2.17 3.76c-.18.36-.43.33-.71.33H11.5zM12 3a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V4a1 1 0 0 1 2zm0 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
            };

            const svgIcon = iconMap[item.icon];

            return (
              <article
                key={item.title + index}
                className="border border-border p-5 rounded-none transition-all duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-background hover:bg-accent/5"
                role="listitem"
              >
                {svgIcon ? (
                  <svg
                    className="w-6 h-6 text-accent mb-4"
                    viewBox={iconMap[item.icon]?.includes("M") ? "0 0 32 32" : ""}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={iconMap[item.icon] || ""} />
                  </svg>
                ) : (
                  <div className="w-6 h-6 rounded-none bg-accent/10 flex items-center justify-center mb-4">
                    <svg className="w-3 h-3 text-accent" aria-hidden="true" />
                  </div>
                )}

                <h3 className="font-outfit text-base font-semibold text-text leading-snug">{item.title}</h3>

                <p className="text-text-muted text-sm leading-relaxed mt-2">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}