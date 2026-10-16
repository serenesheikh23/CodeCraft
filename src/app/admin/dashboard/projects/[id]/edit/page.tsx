"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [outcome, setOutcome] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("/api/projects/" + id);
        if (res.ok) {
          const p = await res.json();
          setTitle(p.title || "");
          setSlug(p.slug || "");
          setDescription(p.description || "");
          setProblem(p.problem || "");
          setSolution(p.solution || "");
          setOutcome(p.outcome || "");
          setImageUrl(p.imageUrl || "");
          setLiveUrl(p.liveUrl || "");
          setFeatured(p.featured === true);
          setOrder(p.order || 0);
          setIsActive(p.isActive !== false);

          let imgArr: string[] = [];
          try {
            const raw = p.images;
            if (Array.isArray(raw)) imgArr = raw;
            else if (typeof raw === "string" && raw.startsWith("[")) {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) imgArr = parsed;
            }
          } catch {
            imgArr = [];
          }
          setImages(imgArr);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title,
      slug,
      description,
      problem,
      solution,
      outcome,
      imageUrl,
      images: JSON.stringify(images),
      liveUrl,
      featured,
      order: Number(order),
      isActive,
    };

    try {
      const res = await fetch("/api/projects/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/dashboard/projects");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        alert("Failed: " + (err.detail || err.error || "Unknown error"));
      }
    } catch {
      alert("Network error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    );
  }

  const inputCls = "w-full bg-background border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-coral transition-colors";
  const labelCls = "block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div>
        <div className="section-label text-lime mb-4">PROJECTS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">Edit Project</h1>
        <p className="text-text-muted mt-3 text-sm">Update project details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 lg:p-8 space-y-5">
        <div>
          <label className={labelCls}>Title</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Slug</label>
          <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls + " resize-none"} />
        </div>

        <div>
          <label className={labelCls}>The Problem</label>
          <textarea rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} className={inputCls + " resize-none"} />
        </div>

        <div>
          <label className={labelCls}>The Solution</label>
          <textarea rows={3} value={solution} onChange={(e) => setSolution(e.target.value)} className={inputCls + " resize-none"} />
        </div>

        <div>
          <label className={labelCls}>The Outcome</label>
          <textarea rows={3} value={outcome} onChange={(e) => setOutcome(e.target.value)} className={inputCls + " resize-none"} />
        </div>

        <div>
          <label className={labelCls}>Hero Image (homepage card)</label>
          <ImageUpload value={imageUrl} onChange={setImageUrl} label="" aspectRatio="video" />
        </div>

        <div>
          <label className={labelCls}>Slideshow Images (case study page)</label>
          <MultiImageUpload value={images} onChange={setImages} />
        </div>

        <div>
          <label className={labelCls}>Live URL</label>
          <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Order</label>
            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className={inputCls} />
          </div>
          <div className="space-y-3 pt-8">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50" />
              <label htmlFor="featured" className="text-sm font-medium text-text">Featured</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50" />
              <label htmlFor="isActive" className="text-sm font-medium text-text">Active</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={isSaving} className="btn-primary flex-1 flex items-center justify-center py-3 disabled:opacity-50">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 py-3">Cancel</button>
        </div>
      </form>
    </div>
  );
}
