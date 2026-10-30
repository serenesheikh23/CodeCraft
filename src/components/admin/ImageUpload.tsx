"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspect = ASPECT[aspectRatio] ?? ASPECT.video;
  const inputId = `upload-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) onChange(data.url);
      else alert(data.error || "Upload failed");
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

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
        {label}
        <span className="ml-2 normal-case tracking-normal font-normal text-text-muted/70">
          · {aspect.name} · {aspect.rec} recommended
        </span>
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 transition-all",
          "bg-card hover:border-accent/50",
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

        {value ? (
          <div className="relative">
            <div className={cn("relative overflow-hidden rounded-lg border border-border bg-background", aspect.class)}>
              <img
                src={value}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="mt-2 text-xs text-text-muted">
              This is exactly how it appears on the site. Upload {aspect.rec} for zero cropping.
            </p>
          </div>
        ) : (
          <div className={cn("relative text-center", aspect.class)}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-border rounded-lg bg-card-hover">
              <Upload className="w-8 h-8 text-text-muted" />
              <p className="text-sm text-text-muted">Drag &amp; drop or click to upload</p>
              <p className="text-xs text-text-muted/70">{aspect.name} · {aspect.rec} · JPEG, PNG, WebP, GIF · Max 5MB</p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}
      </div>

      {value && (
        <p className="text-xs text-text-muted truncate" title={value}>
          {value.startsWith("http") ? value : `/${value.replace(/^\/+/, "")}`}
        </p>
      )}
    </div>
  );
}
