"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function FaqSection({ title, subtitle, content }: FaqSectionProps) {
  const items = (content.items as FaqItem[]) || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 lg:py-36 bg-background text-text"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
<>
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="faq-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
          >
            {title}
          </h2>
</>
)}

        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <div
              key={item.question + index}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-8 flex items-center justify-between gap-4 text-left focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={openIndex === index ? `faq-answer-${index}` : `faq-answer-${openIndex}`}
                role="button"
              >
                <span className="text-lg font-medium text-text pr-10">{item.question}</span>

                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  data-state={openIndex === index ? "open" : "closed"}
                >
                  <path d="M6 9l6 6l6-6" />
                </svg>
              </button>

              <div
                id={openIndex === index ? `faq-answer-${index}` : `faq-answer-${openIndex}`}
                className="pt-6 border-t border-border transition-slide-down duration-300"
                style={{ maxHeight: openIndex === index ? "none" : 0, transition: "max-height 0.4s ease-out" }}
              >
                <div className="px-6 pb-8 pt-2">
                  <p className="text-text-muted leading-relaxed text-base">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}