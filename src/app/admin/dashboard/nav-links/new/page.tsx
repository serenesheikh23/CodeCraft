"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Menu } from "lucide-react";
import Link from "next/link";

interface FormData {
  label: string;
  href: string;
  order: string;
  isActive: boolean;
  isExternal: boolean;
}

export default function NewNavLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    label: "",
    href: "",
    order: "0",
    isActive: true,
    isExternal: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/nav-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: formData.label,
          href: formData.href,
          order: Number(formData.order),
          isActive: formData.isActive,
          isExternal: formData.isExternal,
        }),
      });

      if (res.ok) {
        router.push("/admin/dashboard/nav-links");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create nav link");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/dashboard/nav-links"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="section-label text-lime mb-4">NAV LINKS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <Menu className="w-8 h-8 text-primary" />
            Add Nav Link
          </h1>
          <p className="text-text-muted mt-1">Create a new navbar link</p>
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
          <label htmlFor="label" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Label *
          </label>
          <input
            id="label"
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="e.g., Work, Services, About"
          />
        </div>

        <div>
          <label htmlFor="href" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            URL / Href *
          </label>
          <input
            id="href"
            type="text"
            value={formData.href}
            onChange={(e) => setFormData({ ...formData, href: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="/#services or /p/about or https://example.com"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50"
            />
            <label htmlFor="isActive" className="text-text">
              Active (visible in navbar)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isExternal"
              type="checkbox"
              checked={formData.isExternal}
              onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })}
              className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50"
            />
            <label htmlFor="isExternal" className="text-text">
              External link (opens in new tab)
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
              "Create Nav Link"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/nav-links"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}