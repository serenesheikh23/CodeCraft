"use client";

const items = [
  "FAST DELIVERY",
  "CLEAN CODE",
  "MODERN DESIGN",
  "SCALABLE BUILDS",
  "HONEST PRICING",
  "ON TIME",
  "REAL COMMUNICATION",
  "POST-LAUNCH SUPPORT",
];

export default function MarqueeBand() {
  return (
    <section className="relative py-8 border-y border-border overflow-hidden tint-blue">
      <div className="absolute top-0 left-0 right-0 h-px brand-gradient-bg opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-px brand-gradient-bg opacity-60" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-10 text-sm uppercase tracking-[0.3em] text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
