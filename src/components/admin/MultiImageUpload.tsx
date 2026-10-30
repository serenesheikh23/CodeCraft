"use client";

import { useState, useRef, PointerEvent as ReactPointerEvent } from "react";
import { Upload, X, Loader2, Plus, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseCrop, serializeCrop, type Crop } from "@/lib/crop";

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

  const updateAt = (i: number, patch: Partial<Crop>) => {
    const current = parseCrop(value[i]);
    const next = value.slice();
    next[i] = serializeCrop({ ...current, ...patch });
    onChange(next);
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((raw, i) => (
            <SlideEditor
              key={i}
              raw={raw}
              index={i}
              onUpdate={(patch) => updateAt(i, patch)}
              onRemove={() => removeAt(i)}
            />
          ))}
        </div>
      )}

      <label
        className={cn(
          "flex items-center justify-center gap-2 w-full py-6 border border-dashed border-border rounded-lg text-text-muted hover:text-text hover:border-accent transition-colors cursor-pointer text-sm",
          uploading && "opacity-60 pointer-events-none"
        )}
      >
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
        Upload multiple images. They display as a slideshow on the case study page. The first image is shown on the homepage card.
      </p>
    </div>
  );
}

function SlideEditor({
  raw,
  index,
  onUpdate,
  onRemove,
}: {
  raw: string;
  index: number;
  onUpdate: (patch: Partial<Crop>) => void;
  onRemove: () => void;
}) {
  const crop = parseCrop(raw);
  const containerRef = useRef<HTMLDivElement>(null);
  const panStart = useRef<{ px: number; py: number; cx: number; cy: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!crop.url) return;
    e.preventDefault();
    setIsPanning(true);
    panStart.current = { px: e.clientX, py: e.clientY, cx: crop.x, cy: crop.y };
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!panStart.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - panStart.current.px) / rect.width) * 100;
    const dy = ((e.clientY - panStart.current.py) / rect.height) * 100;
    onUpdate({
      x: Math.max(0, Math.min(100, panStart.current.cx - dx)),
      y: Math.max(0, Math.min(100, panStart.current.cy - dy)),
    });
  };

  const onPointerUp = () => {
    setIsPanning(false);
    panStart.current = null;
  };

  return (
    <div className="border border-border rounded-lg p-3 bg-card">
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          ref={containerRef}
          className={cn(
            "relative w-full sm:w-64 aspect-[16/10] overflow-hidden rounded border border-border bg-background select-none touch-none flex-shrink-0",
            isPanning ? "cursor-grabbing" : "cursor-grab"
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={crop.url}
            alt={`Slide ${index + 1}`}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              objectPosition: `${crop.x}% ${crop.y}%`,
              transform: crop.zoom !== 1 ? `scale(${crop.zoom})` : undefined,
              transformOrigin: `${crop.x}% ${crop.y}%`,
            }}
          />
          <div className="absolute top-1.5 left-1.5 bg-background/85 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.15em] text-text-muted font-semibold pointer-events-none">
            {index + 1}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-text-muted flex-shrink-0" aria-hidden="true" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={crop.zoom}
              onChange={(e) => onUpdate({ zoom: Number(e.target.value) })}
              className="flex-1 accent-accent h-2"
              aria-label={`Slide ${index + 1} zoom`}
            />
            <span className="text-xs text-text-muted w-12 text-right tabular-nums">
              {crop.zoom.toFixed(2)}×
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdate({ zoom: 1, x: 50, y: 50 })}
              className="text-xs text-text-muted hover:text-accent px-2 py-1 border border-border rounded"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-border rounded ml-auto"
              aria-label={`Remove slide ${index + 1}`}
            >
              Remove
            </button>
          </div>

          <p className="text-[11px] text-text-muted/70">
            Drag the image to reposition. Zoom above 1× crops tighter.
          </p>
        </div>
      </div>
    </div>
  );
}
