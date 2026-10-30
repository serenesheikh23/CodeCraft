import { cn } from "@/lib/utils";
const steps = [
  { num: "01", title: "Discovery", desc: "We learn how you work, what your users need, and what success looks like." },
  { num: "02", title: "Design", desc: "Wireframes, then high-fidelity mockups. No surprise redesigns mid-build." },
  { num: "03", title: "Build", desc: "Clean code, weekly demos, real progress you can see and click." },
  { num: "04", title: "Ship", desc: "Deployed, monitored, and supported after launch. Not handed off and forgotten." },
];

export default function ProcessTimeline() {
  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
          HOW WE WORK
        </div>

        <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6">
          From idea
          <br />
          to production.
        </h2>

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-border"
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={cn(
                  "relative pl-8 lg:pl-24",
                  i % 2 === 0 ? "pr-8 lg:pr-24" : "pl-8 lg:pl-24"
                )}
              >
                {/* Circle marker */}
                <div
                  className="absolute left-0 lg:left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    border: "2px solid var(--accent)",
                    background: "var(--background)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                    }}
                  />
                </div>

                {/* Step number */}
                <div
                  className="text-xs uppercase tracking-[0.2em] font-mono mb-3 font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {step.num}
                </div>

                <h3 className="font-outfit text-2xl lg:text-3xl text-text mb-4">
                  {step.title}
                </h3>
                <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}