"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

interface FormData {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  content: string;
  rating: string;
  avatarUrl: string;
  order: string;
  isActive: boolean;
}

export default function NewTestimonialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    content: "",
    rating: "5",
    avatarUrl: "",
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
        clientName: formData.clientName,
        clientRole: formData.clientRole,
        clientCompany: formData.clientCompany,
        content: formData.content,
        rating: Number(formData.rating),
        avatarUrl: formData.avatarUrl,
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard/testimonials");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create testimonial");
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
          href="/admin/dashboard/testimonials"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="section-label text-lime mb-4">TESTIMONIALS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <MessageSquare className="w-8 h-8 text-accent" />
            Add Testimonial
          </h1>
          <p className="text-text-muted mt-1">Create a new client testimonial</p>
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
            <label htmlFor="clientName" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Client Name *
            </label>
            <input
              id="clientName"
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., Sarah Chen"
            />
          </div>

          <div>
            <label htmlFor="clientRole" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Client Role *
            </label>
            <input
              id="clientRole"
              type="text"
              value={formData.clientRole}
              onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., CTO"
            />
          </div>
        </div>

        <div>
          <label htmlFor="clientCompany" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Client Company *
          </label>
          <input
            id="clientCompany"
            type="text"
            value={formData.clientCompany}
            onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="e.g., TechFlow Inc."
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Testimonial Content *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="What did the client say about your work?"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="rating" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Rating (1-5) *
            </label>
            <select
              id="rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={String(star)}>
                  {star} Stars {Array.from({ length: star }, () => "★").join("")}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <ImageUpload
              value={formData.avatarUrl}
              onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
              label="Avatar Image"
              aspectRatio="square"
            />
          </div>

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
            className="w-5 h-5 rounded border-border text-accent focus:ring-accent/50"
          />
          <label htmlFor="isActive" className="text-text">
            Active (visible on website)
          </label>
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
              "Create Testimonial"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/testimonials"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}