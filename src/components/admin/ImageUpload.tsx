"use client";

import { useState, useRef, DragEvent, ChangeEvent, PointerEvent as ReactPointerEvent } from "react";
import { Loader2, Upload, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseCrop, serializeCrop, type Crop } from "@/lib/crop";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  aspectRatio: "square" | "video" | "photo";
}

const ASPECT = {
  square: { class: "aspect-square", name: "1:1", rec: "1200×1200" },
  video: { class: "aspect-video", name: "16:9", rec: "1600×900" },
  photo: { class: "aspect-[16/10]", name: "16:10", rec: "1600×1000" },
};

export default function ImageUpload({ value, onChange, label, aspectRatio }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panStart = useRef<{ px: number; py: number; cx: number; cy: number } | null>(null);

  const crop = parseCrop(value);
  const aspect = ASPECT[aspectRatio] ?? ASPECT.video;
  const inputId = `upload-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const update = (patch: Partial<Crop>) => {
    onChange(serializeCrop({ ...crop, ...patch }));
  };

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
    update({
      x: Math.max(0, Math.min(100, panStart.current.cx - dx)),
      y: Math.max(0, Math.min(100, panStart.current.cy - dy)),
    });
  };

  const onPointerUp = () => {
    setIsPanning(false);
    panStart.current = null;
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleUpload(file);
    event.target.value = "";
  };

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
        {label}
        <span className="ml-2 normal-case tracking-normal font-normal text-text-muted/70">
          · {aspect.name} · {aspect.rec} recommended
        </span>
      </label>

      {crop.url ? (
        <>
          <div
            ref={containerRef}
            className={cn(
              "relative overflow-hidden rounded-lg border border-border bg-background select-none touch-none",
              aspect.class,
              isPanning ? "cursor-grabbing" : "cursor-grab"
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={crop.url}
              alt={label}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                objectPosition: `${crop.x}% ${crop.y}%`,
                transform: crop.zoom !== 1 ? `scale(${crop.zoom})` : undefined,
                transformOrigin: `${crop.x}% ${crop.y}%`,
              }}
            />
            <div className="absolute top-2 left-2 bg-background/85 px-2 py-1 rounded text-[10px] uppercase tracking-[0.15em] text-text-muted font-semibold pointer-events-none">
              Drag to reposition
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 px-1">
            <ZoomIn className="w-4 h-4 text-text-muted flex-shrink-0" aria-hidden="true" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={crop.zoom}
              onChange={(e) => update({ zoom: Number(e.target.value) })}
              className="flex-1 accent-accent h-2"
              aria-label="Zoom"
            />
            <span className="text-xs text-text-muted w-12 text-right tabular-nums">
              {crop.zoom.toFixed(2)}×
            </span>
            <button
              type="button"
              onClick={() => update({ zoom: 1, x: 50, y: 50 })}
              className="text-xs text-text-muted hover:text-accent px-2 py-1 border border-border rounded"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-text-muted">
            This is exactly how it appears on the site. Upload {aspect.rec}, then drag and zoom.
          </p>
        </>
      ) : (
        <div
          onDragOver={(e: DragEvent) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e: DragEvent) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e: DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleUpload(file);
          }}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-6 transition-all bg-card hover:border-accent/50",
            isDragging && "border-accent bg-accent/5",
            isUploading && "opacity-50 pointer-events-none"
          )}
        >
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <div className={cn("relative text-center", aspect.class)}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-border rounded-lg bg-card-hover">
              <Upload className="w-8 h-8 text-text-muted" />
              <p className="text-sm text-text-muted">Drag &amp; drop or click to upload</p>
              <p className="text-xs text-text-muted/70">{aspect.name} · {aspect.rec} · JPEG, PNG, WebP, GIF · Max 5MB</p>
            </div>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
