"use client";

import { useState } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function MultiImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    onChange([...value, ...newUrls]);
    setUploading(false);
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {value.map((url, i) => (
            <div key={i} className="relative aspect-video border border-border overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 text-xs text-background font-semibold bg-text/80 backdrop-blur-md px-2 py-0.5 rounded">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="flex items-center justify-center gap-2 w-full py-6 border border-dashed border-border rounded-lg text-text-muted hover:text-text hover:border-lime transition-colors cursor-pointer text-sm">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add slideshow images
          </>
        )}
      </label>

      <p className="text-xs text-text-muted">
        Upload multiple images. They&apos;ll display as a slideshow on the case study page. The first image is shown on the homepage card.
      </p>
    </div>
  );
}
