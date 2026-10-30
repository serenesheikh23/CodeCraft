"use client";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  content: string;
  rating: number;
  avatarUrl: string;
  projectId: string | null;
  order: number;
  isActive: boolean;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const activeTestimonials = testimonials.filter(t => t.isActive);

  if (activeTestimonials.length === 0) return null;

  const [swipeIndex, setSwipeIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevTestimonial = () => {
    setSwipeIndex((idx) => idx === 0 ? activeTestimonials.length - 1 : idx - 1);
  };

  const nextTestimonial = () => {
    setSwipeIndex((idx) => idx === activeTestimonials.length - 1 ? 0 : idx + 1);
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouch?.x || e.clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouch?.x || e.clientX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          nextTestimonial();
        } else {
          prevTestimonial();
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeTestimonials.length]);

  return (
    <section
      id="testimonials"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
          CLIENT WORDS
        </div>

        <h2
          id="testimonials-heading"
          className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
        >
          People we've shipped with.
        </h2>

        <p className="text-lg text-text-muted max-w-2xl">
          Honest feedback from teams we've worked with.
        </p>

        {/* Navigation controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="prev-next"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6l6-6" />
            </svg>
          </button>

          <span className="text-text-muted text-sm">
            {swipeIndex + 1} of {activeTestimonials.length}
          </span>

          <button
            onClick={nextTestimonial}
            className="prev-next"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Scroll-snap strip */}
        <div
          className="overflow-x-auto scroll-snap-container pb-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="inline-block scroll-snap-align start w-full p-0">
            {activeTestimonials.map((testimonial, index) => {
              const isActive = index === swipeIndex;
              const rotate = isActive ? "rotate(0deg)" : "rotate(180deg)";

              return (
                <div
                  key={testimonial.id}
                  className={cn(
                    "scroll-snap-start min-w-0 pr-8",
                    "bg-card border border-border rounded-lg p-8 transition-all duration-300",
                    isActive ? "border-accent bg-accent/5" : "",
                    "group"
                  )}
                  style={{ transform: `scale(${isActive ? 1 : 0.9})`, transformOrigin: "0 0" }}
                >
                  <blockquote
                    className="font-outfit text-2xl lg:text-3xl leading-[1.1] tracking-tight text-text mb-8"
                  >
                    {testimonial.content}
                  </blockquote>

                  <div className="pt-6 border-t border-border">
                    <p className="font-semibold text-text">{testimonial.clientName}</p>
                    <p className="text-text-muted text-sm">{testimonial.clientRole} at {testimonial.clientCompany}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}