interface StatsSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface StatItem {
  value: string;
  label: string;
}

export default function StatsSection({ title, subtitle, content }: StatsSectionProps) {
  const items = (content.items as StatItem[]) || [];

  if (items.length === 0) return null;

  return (
    <section
      id="stats"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
<>
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="stats-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
          >
            {title}
          </h2>
</>
)}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12" role="list" aria-label="Statistics">
          {items.map((item, index) => (
            <div
              key={item.label + index}
              className="text-center rounded-lg p-6 border border-border hover:border-accent transition-all duration-200"
            >
              <div className="font-outfit text-6xl lg:text-7xl font-bold text-text mb-3">{item.value}</div>
              <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}