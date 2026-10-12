"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Plus, Edit, Trash2, FileText, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  isActive: boolean;
  updatedAt: string;
}

export default function CustomPagesPage() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch("/api/pages");
        if (res.ok) {
          const data = await res.json();
          setPages(data);
        }
      } catch (error) {
        console.error("Error fetching custom pages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPages(pages.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Custom Pages
          </h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-text-muted mt-4">Loading custom pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Custom Pages
          </h1>
          <p className="text-text-muted mt-1">Manage custom pages accessible at /p/[slug]</p>
        </div>
        <Link href="/admin/dashboard/pages/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Page
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {pages.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No custom pages yet</p>
            <p className="text-sm text-text-muted mt-1">Create your first custom page</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {pages.map((page) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 hover:bg-card-hover transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-text">{page.title}</p>
                    <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-mono">{page.slug}</span>
                    <span className={cn("px-2 py-1 rounded text-xs", page.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                      {page.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted truncate max-w-md">/p/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2 sm:ml-4">
                  <Link
                    href={`/p/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-card-hover transition-colors"
                    aria-label="View page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/dashboard/pages/${page.id}/edit`}
                    className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-card-hover transition-colors"
                    aria-label="Edit page"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}