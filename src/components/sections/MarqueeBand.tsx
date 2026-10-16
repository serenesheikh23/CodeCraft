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
    <section className="relative py-6 border-y border-border overflow-hidden bg-background">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-xs uppercase tracking-[0.3em] text-text-muted flex items-center gap-8"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-lime" />
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