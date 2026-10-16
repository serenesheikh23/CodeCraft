"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface FormData {
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  imageUrl: string;
  liveUrl: string;
  featured: boolean;
  order: string;
  isActive: boolean;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    description: "",
    problem: "",
    solution: "",
    outcome: "",
    imageUrl: "",
    liveUrl: "",
    featured: false,
    order: "0",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {

      const data = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        problem: formData.problem,
        solution: formData.solution,
        outcome: formData.outcome,
        imageUrl: formData.imageUrl,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard/projects");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create project");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/dashboard/projects"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="section-label text-lime mb-4">PROJECTS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <FolderKanban className="w-8 h-8 text-primary" />
            Add Project
          </h1>
          <p className="text-text-muted mt-1">Create a new portfolio project</p>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
        >
          {error}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Project Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., SaaS Analytics Dashboard"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Slug *
            </label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., saas-analytics-dashboard"
            />
            <p className="text-sm text-text-muted mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Short Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="Brief overview of the project..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="problem" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Problem Statement *
            </label>
            <textarea
              id="problem"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
              placeholder="What challenge did the client face?"
            />
          </div>

          <div>
            <label htmlFor="solution" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Solution *
            </label>
            <textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
              placeholder="How did you solve it?"
            />
          </div>
        </div>

        <div>
          <label htmlFor="outcome" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Outcome / Results *
          </label>
          <textarea
            id="outcome"
            value={formData.outcome}
            onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="What were the measurable results?"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              label="Hero Image"
              aspectRatio="video"
            />
          </div>

          <div>
            <label htmlFor="liveUrl" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Live Demo URL
            </label>
            <input
              id="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="https://demo.example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div>
            <label htmlFor="order" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Display Order
            </label>
            <input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              min="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
          </div>
        </div>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50"
            />
            <label htmlFor="featured" className="text-text">
              Featured (show on homepage)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50"
            />
            <label htmlFor="isActive" className="text-text">
              Active (visible on website)
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="btn-primary flex-1 sm:flex-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Project"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/projects"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}