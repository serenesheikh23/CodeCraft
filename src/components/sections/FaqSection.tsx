"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ title, subtitle, content }: FaqSectionProps) {
  const items = (content.items as FaqItem[]) || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-40 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-[30%,70%] gap-8 items-start mb-16 lg:mb-20"
          >
            {subtitle && (
              <div className="text-text-muted text-sm uppercase tracking-widest font-medium pt-2">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="faq-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.question + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-text pr-10">{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-text-muted"
                >
                  {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 border-t border-border">
                  <p className="text-text-muted leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}