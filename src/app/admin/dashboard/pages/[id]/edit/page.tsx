"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ArrowLeft, Plus, Trash2, Edit, GripVertical } from "lucide-react";
import SectionContentEditor from "@/components/admin/SectionContentEditor";
import Link from "next/link";

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
  { value: "services", label: "Services List (from DB)", group: "Data-driven" },
  { value: "projects", label: "Featured Projects (from DB)", group: "Data-driven" },
  { value: "testimonials", label: "Testimonials (from DB)", group: "Data-driven" },
  { value: "contact", label: "Contact Form", group: "Data-driven" },
];

const DB_BACKED: SectionType[] = ["services", "projects", "testimonials", "contact"];

interface PageSection {
  id: string;
  pageId: string;
  type: string;
  title: string;
  subtitle: string;
  content: string;
  order: number;
}

export default function EditCustomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Page fields
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Sections
  const [sections, setSections] = useState<PageSection[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionType, setNewSectionType] = useState<SectionType>("hero");
  const [newSectionContent, setNewSectionContent] = useState<Record<string, unknown>>({});
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionSubtitle, setNewSectionSubtitle] = useState("");
  const [isSavingSection, setIsSavingSection] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const pageRes = await fetch(`/api/pages/${id}`);
        if (pageRes.ok) {
          const page = await pageRes.json();
          setSlug(page.slug || "");
          setTitle(page.title || "");
          setContent(page.content || "");
          setIsActive(page.isActive ?? true);
        }
        const secRes = await fetch(`/api/pages/${id}/sections`);
        if (secRes.ok) {
          const data = await secRes.json();
          setSections(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAll();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, content, isActive }),
      });
      if (res.ok) {
        router.push("/admin/dashboard/pages");
        router.refresh();
      } else {
        alert("Failed to update page");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = async () => {
    setIsSavingSection(true);
    try {
      const res = await fetch(`/api/pages/${id}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newSectionType,
          title: newSectionTitle,
          subtitle: newSectionSubtitle,
          content: JSON.stringify(newSectionContent),
          order: sections.length,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setSections([...sections, created]);
        setShowAddSection(false);
        setNewSectionType("hero");
        setNewSectionContent({});
        setNewSectionTitle("");
        setNewSectionSubtitle("");
      } else {
        alert("Failed to add section");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setIsSavingSection(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Delete this section?")) return;
    try {
      const res = await fetch(`/api/page-sections/${sectionId}`, { method: "DELETE" });
      if (res.ok) {
        setSections(sections.filter((s) => s.id !== sectionId));
      }
    } catch {
      alert("An error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div>
        <div className="section-label text-lime mb-4">CUSTOM PAGES</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">Edit Page</h1>
        <p className="text-text-muted mt-1">Update page content and add sections</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Slug</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Fallback Content (used if no sections are added)</label>
          <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral resize-none" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50" />
          <label htmlFor="isActive" className="text-sm font-medium text-text">Active (published)</label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={isSaving} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 disabled:opacity-50">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Page Settings"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 py-3">Cancel</button>
        </div>
      </form>

      {/* Page Sections Panel */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text">Page Sections</h2>
            <p className="text-text-muted text-sm mt-1">If you add sections, they replace the fallback content above</p>
          </div>
          <button type="button" onClick={() => setShowAddSection(!showAddSection)} className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            {showAddSection ? "Cancel" : "Add Section"}
          </button>
        </div>

        {showAddSection && (
          <div className="bg-background border border-border rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Type</label>
              <select value={newSectionType} onChange={(e) => { setNewSectionType(e.target.value as SectionType); setNewSectionContent({}); }} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral">
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

            {!DB_BACKED.includes(newSectionType) && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Title</label>
                  <input type="text" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">Subtitle</label>
                  <input type="text" value={newSectionSubtitle} onChange={(e) => setNewSectionSubtitle(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral" />
                </div>
              </div>
            )}

            <SectionContentEditor type={newSectionType} content={newSectionContent} updateContent={(patch) => setNewSectionContent((prev) => ({ ...prev, ...patch }))} />

            <button type="button" onClick={handleAddSection} disabled={isSavingSection} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50">
              {isSavingSection ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Section"}
            </button>
          </div>
        )}

        {sections.length === 0 && !showAddSection && (
          <div className="text-center py-8 text-text-muted text-sm">
            No sections yet. The fallback content above will be shown.
          </div>
        )}

        <div className="space-y-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center gap-3 bg-background border border-border rounded-lg p-4">
              <GripVertical className="w-4 h-4 text-text-muted flex-shrink-0" />
              <span className="text-xs uppercase tracking-wider text-text-muted px-2 py-1 bg-card rounded">{section.type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text truncate">{section.title || "(untitled)"}</p>
                <p className="text-xs text-text-muted">Order: {index + 1}</p>
              </div>
              <button type="button" onClick={() => handleDeleteSection(section.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
