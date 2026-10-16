"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import SectionContentEditor from "@/components/admin/SectionContentEditor";

type SectionType = "hero" | "features" | "pricing" | "faq" | "cta" | "gallery" | "stats" | "logos" | "custom-text" | "services" | "projects" | "testimonials" | "contact";

const TYPE_OPTIONS: { value: SectionType; label: string; group: string }[] = [
  { value: "hero", label: "Hero", group: "Layout" },
  { value: "cta", label: "CTA Banner", group: "Layout" },
  { value: "custom-text", label: "Custom Text", group: "Layout" },
  { value: "features", label: "Features Grid", group: "Layout" },
  { value: "pricing", label: "Pricing Table", group: "Layout" },
  { value: "faq", label: "FAQ", group: "Layout" },
  { value: "gallery", label: "Gallery", group: "Layout" },
  { value: "stats", label: "Stats", group: "Layout" },
  { value: "logos", label: "Logos", group: "Layout" },
  { value: "services", label: "Services List (from database)", group: "Data-driven" },
  { value: "projects", label: "Featured Projects (from database)", group: "Data-driven" },
  { value: "testimonials", label: "Testimonials (from database)", group: "Data-driven" },
  { value: "contact", label: "Contact Form", group: "Data-driven" },
];

const DB_BACKED: SectionType[] = ["services", "projects", "testimonials", "contact"];

export default function NewSectionPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [type, setType] = useState<SectionType>("hero");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [order, setOrder] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState<Record<string, unknown>>({});

  const updateContent = (patch: Record<string, unknown>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, name, title, subtitle,
          content: JSON.stringify(content),
          order: Number(order),
          isVisible,
        }),
      });
      if (res.ok) {
        router.push("/admin/dashboard/sections");
        router.refresh();
      } else {
        alert("Failed to create section");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const isDbBacked = DB_BACKED.includes(type);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div>
        <h1 className="text-3xl font-bold text-text">Add Section</h1>
        <p className="text-text-muted mt-1">Create a new section</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Section Type</label>
          <select value={type} onChange={(e) => { setType(e.target.value as SectionType); setContent({}); }} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary">
            <optgroup label="Layout Sections">
              {TYPE_OPTIONS.filter(o => o.group === "Layout").map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
            <optgroup label="Data-driven Sections">
              {TYPE_OPTIONS.filter(o => o.group === "Data-driven").map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Name (admin label)</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary" />
        </div>

        {!isDbBacked && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Subtitle</label>
              <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Order</label>
            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary" />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <input type="checkbox" id="isVisible" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
            <label htmlFor="isVisible" className="text-sm font-medium text-text">Visible</label>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <p className="text-sm font-medium text-text mb-4">Content</p>
          <SectionContentEditor type={type} content={content} updateContent={updateContent} />
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={isSaving} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 disabled:opacity-50">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Section"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 py-3">Cancel</button>
        </div>
      </form>
    </div>
  );
}
