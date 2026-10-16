"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  id: string;
  section: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

interface FormData {
  section: string;
  label: string;
  href: string;
  order: string;
  isActive: boolean;
}

const sections = ["Company", "Services", "Legal"];

export default function EditFooterLinkPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    section: "Company",
    label: "",
    href: "",
    order: "0",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await fetch(`/api/footer-links/${id}`);
        if (res.ok) {
          const data: FooterLink = await res.json();
          setFormData({
            section: data.section,
            label: data.label,
            href: data.href,
            order: String(data.order),
            isActive: data.isActive,
          });
        }
      } catch (error) {
        console.error("Error fetching footer link:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/footer-links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: formData.section,
          label: formData.label,
          href: formData.href,
          order: Number(formData.order),
          isActive: formData.isActive,
        }),
      });

      if (res.ok) {
        router.push("/admin/dashboard/footer-links");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update footer link");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/footer-links"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="section-label text-lime mb-4">FOOTER LINKS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
              <Link2 className="w-8 h-8 text-primary" />
              Edit Footer Link
            </h1>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto" />
          <p className="text-text-muted mt-4">Loading footer link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/dashboard/footer-links"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <Link2 className="w-8 h-8 text-primary" />
            Edit Footer Link
          </h1>
          <p className="text-text-muted mt-1">Update footer link details</p>
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
          <label htmlFor="section" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Section *
          </label>
          <select
            id="section"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          >
            {sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

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
            placeholder="e.g., About Us"
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
            placeholder="/about or https://example.com"
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

        <div className="flex items-center gap-3">
          <input
            id="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 rounded border-border text-coral focus:ring-coral/50"
          />
          <label htmlFor="isActive" className="text-text">
            Active (visible in footer)
          </label>
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
              "Update Footer Link"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/footer-links"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}