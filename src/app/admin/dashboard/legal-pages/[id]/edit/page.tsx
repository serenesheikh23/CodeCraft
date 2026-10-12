"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ScrollText } from "lucide-react";
import Link from "next/link";

interface LegalPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

interface FormData {
  slug: string;
  title: string;
  content: string;
}

export default function EditLegalPagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    slug: "",
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/legal-pages/${id}`);
        if (res.ok) {
          const data: LegalPage = await res.json();
          setFormData({
            slug: data.slug,
            title: data.title,
            content: data.content,
          });
        }
      } catch (error) {
        console.error("Error fetching legal page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/legal-pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/dashboard/legal-pages");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update legal page");
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
            href="/admin/dashboard/legal-pages"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-text flex items-center gap-3">
              <ScrollText className="w-8 h-8 text-primary" />
              Edit Legal Page
            </h1>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-text-muted mt-4">Loading legal page...</p>
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
          href="/admin/dashboard/legal-pages"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <ScrollText className="w-8 h-8 text-primary" />
            Edit Legal Page
          </h1>
          <p className="text-text-muted mt-1">Update legal page details</p>
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
            placeholder="e.g., privacy, terms, cookies"
          />
          <p className="text-sm text-text-muted mt-1">URL-friendly identifier (lowercase, hyphens only). This will be accessible at /legal/[slug]</p>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="e.g., Privacy Policy"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-text-muted mb-2">
            Content *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={15}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none font-mono text-sm"
            placeholder="Enter the full legal page content..."
          />
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
              "Update Legal Page"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/legal-pages"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}