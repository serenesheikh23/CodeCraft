'use client';
import { useState } from 'react';
import Link from 'next/link';

const OPTIONS = [
  { id: '1', label: 'People should find us online', answer: "A simple 5 to 6 page site with a contact form and a Google listing, checked for speed. You don't need a blog, a shop or an app yet." },
  { id: '2', label: 'I want to sell products', answer: "An online store with secure checkout. We'll pick the payment options your customers actually use and set them up so a repeated payment message can't charge anyone twice." },
  { id: '3', label: 'A custom tool or app', answer: "Start with the one job it must do well. We scope that first, build it, and only add more once people are using it." },
];

export default function NeedsPicker() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-surface border-b border-border py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-text mb-8">
          What do you need?
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              aria-pressed={selected === opt.id}
              onClick={() => setSelected(opt.id)}
              className={`px-6 py-3 rounded border text-sm font-medium transition-colors ${
                selected === opt.id
                  ? 'bg-primary-tint border-primary text-primary'
                  : 'bg-surface border-border-strong text-text hover:border-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div aria-live="polite" className="min-h-[100px] flex items-center justify-center p-6 bg-background rounded border border-border text-lg text-text mb-6">
            {selected ? OPTIONS.find(o => o.id === selected)?.answer : "Pick one and we'll tell you what we'd honestly recommend."}
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 bg-primary text-primary-foreground text-[15px] font-medium rounded hover:bg-primary-hover active:bg-primary-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Book a free 20-minute call
          </Link>
        </div>
      </div>
    </section>
  );
}
