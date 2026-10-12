"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string;
  featured: boolean;
  order: string;
  isActive: boolean;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    description: "",
    problem: "",
    solution: "",
    outcome: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    techStack: "",
    featured: false,
    order: "0",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data: Project = await res.json();
          setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description,
            problem: data.problem,
            solution: data.solution,
            outcome: data.outcome,
            imageUrl: data.imageUrl,
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            techStack: (JSON.parse(data.techStack || "[]") as string[]).join(", "),
            featured: data.featured,
            order: String(data.order),
            isActive: data.isActive,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const techStackArray = formData.techStack.split(",").map((f) => f.trim()).filter(Boolean);

      const data = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        problem: formData.problem,
        solution: formData.solution,
        outcome: formData.outcome,
        imageUrl: formData.imageUrl,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        techStack: JSON.stringify(techStackArray),
        featured: formData.featured,
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard/projects");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update project");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/projects"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-text flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-primary" />
              Edit Project
            </h1>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-text-muted mt-4">Loading project...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-primary" />
            Edit Project
          </h1>
          <p className="text-text-muted mt-1">Update project details</p>
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
            <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">
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
            <label htmlFor="slug" className="block text-sm font-medium text-text-muted mb-2">
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
          <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-2">
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
            <label htmlFor="problem" className="block text-sm font-medium text-text-muted mb-2">
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
            <label htmlFor="solution" className="block text-sm font-medium text-text-muted mb-2">
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
          <label htmlFor="outcome" className="block text-sm font-medium text-text-muted mb-2">
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
            <label htmlFor="liveUrl" className="block text-sm font-medium text-text-muted mb-2">
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
            <label htmlFor="githubUrl" className="block text-sm font-medium text-text-muted mb-2">
              GitHub Repository URL
            </label>
            <input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-text-muted mb-2">
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

        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-text-muted mb-2">
            Tech Stack (comma separated) *
          </label>
          <textarea
            id="techStack"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            required
            rows={2}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="e.g., Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS"
          />
          <p className="text-sm text-text-muted mt-1">Separate technologies with commas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
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
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
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
            disabled={isSubmitting}
            className="btn-primary flex-1 sm:flex-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Update Project"
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