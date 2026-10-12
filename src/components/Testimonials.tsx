"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-5" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, transparent 70%)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Client Feedback
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            What our clients
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              say about us
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the teams we've helped build successful digital products.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-glow"
              role="listitem"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" aria-hidden="true" />
                <p className="text-text relative z-10 leading-relaxed">"{testimonial.content}"</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.clientName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-text truncate">{testimonial.clientName}</p>
                  <p className="text-sm text-text-muted truncate">{testimonial.clientRole} at {testimonial.clientCompany}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}