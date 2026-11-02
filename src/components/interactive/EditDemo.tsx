'use client';
import { useState, useEffect } from 'react';

export default function EditDemo({ initialHeadline }: { initialHeadline: string }) {
  const [text, setText] = useState(initialHeadline);

  useEffect(() => {
    const h1 = document.getElementById('hero-headline');
    if (h1 && h1.firstChild && h1.lastChild) {
      const words = text.trim().split(" ");
      const last = words.pop() || "";
      const firstPart = words.join(" ");
      
      if (h1.firstChild.nodeType === Node.TEXT_NODE) {
        h1.firstChild.textContent = firstPart + " ";
      }
      if (h1.lastChild.nodeType === Node.ELEMENT_NODE) {
        h1.lastChild.textContent = last;
      }
    }
  }, [text]);

  const handleReset = () => setText(initialHeadline);

  return (
    <div className="bg-surface border border-border p-6 rounded-lg shadow-sm">
      <div className="text-[12px] text-muted tracking-[0.04em] mb-3 uppercase font-medium">
        Edit it yourself. Try it.
      </div>
      <label className="block text-sm text-muted mb-2" htmlFor="headline-input">
        Homepage headline
      </label>
      <input
        id="headline-input"
        type="text"
        maxLength={70}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-background border border-border-strong rounded px-3 py-2 text-text mb-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <div className="flex justify-between items-start mt-3">
        <span className="text-xs text-muted leading-relaxed pr-4">
          Type here and the headline on the left changes. <br /> That's what the admin panel feels like.
        </span>
        <button onClick={handleReset} className="text-xs text-primary hover:underline font-medium whitespace-nowrap mt-0.5">
          Reset
        </button>
      </div>
    </div>
  );
}
