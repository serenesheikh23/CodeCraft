"use client";

import { motion } from "framer-motion";

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

  return (
    <section
      id="testimonials"
      className="relative py-32 lg:py-48 overflow-hidden bg-card border-y border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
            CLIENT WORDS
          </div>
          <h2 id="testimonials-heading" className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text">
            People we've shipped with.
          </h2>
          <p className="mt-6 text-lg text-text-muted max-w-2xl leading-relaxed">
            Honest feedback from teams we've worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16" role="list" aria-label="Testimonials">
          {activeTestimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="py-8 lg:py-12 border-t border-border first:border-0 lg:border-t-0 lg:border-l"
              role="listitem"
            >
              <blockquote className="font-serif text-2xl lg:text-3xl leading-[1.1] tracking-tight text-text mb-8">
                {testimonial.content}
              </blockquote>

              <div className="pt-6 border-t border-border">
                <p className="font-semibold text-text">{testimonial.clientName}</p>
                <p className="text-text-muted text-sm">{testimonial.clientRole} at {testimonial.clientCompany}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}