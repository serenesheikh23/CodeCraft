"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  aspectRatio: "square" | "video";
}

export default function ImageUpload({ value, onChange, label, aspectRatio }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClass = aspectRatio === "square" ? "aspect-square" : "aspect-video";

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

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

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <label htmlFor={`upload-${label.toLowerCase().replace(/\s+/g, "-")}`} className="block text-sm font-medium text-text-muted mb-2">
        {label}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 transition-all",
          "bg-card hover:border-primary/50",
          isDragging && "border-primary bg-primary/5",
          isUploading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          ref={fileInputRef}
          id={`upload-${label.toLowerCase().replace(/\s+/g, "-")}`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        {value ? (
          <div className="relative">
            <div className={cn("relative overflow-hidden rounded-lg border border-border", aspectRatioClass)}>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={cn("text-center", aspectRatioClass)}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 border border-border rounded-lg bg-card-hover">
              <Upload className="w-10 h-10 text-text-muted" />
              <p className="text-text-muted">Drag & drop or click to upload</p>
              <p className="text-xs text-text-muted">JPEG, PNG, WebP, GIF · Max 5MB</p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
      </div>

      {value && (
        <p className="text-xs text-text-muted flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          Current image: {value.split("/").pop()}
        </p>
      )}
    </div>
  );
}