"use client";

import Link from "next/link";
interface CustomTextSectionProps {
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
}

export default function CustomTextSection({ title, subtitle, content }: CustomTextSectionProps) {
  const body = (content.body as string) || "";

  if (!body) return null;

  return (
    <section
      id="custom-text"
      className="relative py-12 md:py-16 lg:py-20 bg-background text-text"
      aria-labelledby="custom-text-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {(title || subtitle) && (
<>
          <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
            {subtitle}
          </div>
          <h2
            id="custom-text-heading"
            className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6"
          >
            {title}
          </h2>
</>
)}

        <div className="prose prose-in text-text leading-relaxed text-lg lg:text-lg">
          {body}
        </div>
      </div>
    </section>
  );
}