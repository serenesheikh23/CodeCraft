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
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24"
          >
            {subtitle && (
              <div className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-4">
                {subtitle}
              </div>
            )}
            {title && (
              <h2
                id="faq-heading"
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text"
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto border-t border-border">
          {items.map((item, index) => (
            <div
              key={item.question + index}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-8 flex items-center justify-between gap-4 text-left focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-text pr-10">{item.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 text-text-muted"
                >
                  {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-8 pt-2">
                  <p className="text-text-muted leading-relaxed text-base">{item.answer}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}