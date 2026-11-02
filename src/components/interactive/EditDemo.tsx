'use client';
import { useState, useEffect } from 'react';

export default function EditDemo({ initialHeadline }: { initialHeadline: string }) {
  const [text, setText] = useState(initialHeadline);

  useEffect(() => {
    const h1 = document.getElementById('hero-headline');
    if (h1) {
      const words = text.trim().split(" ");
      const last = words.pop();
      h1.innerHTML = words.join(" ") + ` <span class="text-primary">${last}</span>`;
    }
  }, [text]);

  const handleReset = () => setText(initialHeadline);

  return (
    <div className="bg-surface border border-border p-6 rounded-lg shadow-sm">
      <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider" htmlFor="headline-input">
        EDIT IT YOURSELF. TRY IT.
      </label>
      <input
        id="headline-input"
        type="text"
        maxLength={70}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-background border border-border-strong rounded px-3 py-2 text-text mb-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-muted">Type here and the headline on the left changes. <br> That's what the admin panel feels like. </br> </span>
        <button onClick={handleReset} className="text-xs text-primary hover:underline font-medium">
          Reset
        </button>
      </div>
    </div>
  );
}
