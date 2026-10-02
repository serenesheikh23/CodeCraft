"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const icons = [
  "credit-card",
  "layout-dashboard",
  "zap",
  "globe",
  "sun-moon",
  "server",
  "bell",
  "search",
  "wrench",
  "bug",
  "shield",
  "rocket",
  "layers",
  "database",
  "cloud",
  "key",
];

interface FormData {
  name: string;
  description: string;
  price: number;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function AddOnFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEditing = id !== "new";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    icon: "credit-card",
    order: 0,
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddOn = async () => {
    if (!isEditing) return;
    try {
      const res = await fetch(`/api/addons/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching add-on:", error);
    }
  };

  if (typeof window !== "undefined" && isEditing) {
    fetchAddOn();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        order: Number(formData.order),
      };

      const url = isEditing ? `/api/addons/${id}` : "/api/addons";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard/addons");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to save add-on");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/dashboard/addons"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Package className="w-8 h-8 text-accent" />
            {isEditing ? "Edit Add-on" : "Add Add-on"}
          </h1>
          <p className="text-text-muted mt-1">
            {isEditing ? "Update add-on details" : "Create a new add-on feature"}
          </p>
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

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
              Add-on Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., Payment Gateway Integration"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-text-muted mb-2">
              Icon
            </label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            >
              {icons.map((icon) => (
                <option key={icon} value={icon}>
                  {icon.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-muted mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="Describe what this add-on includes..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-text-muted mb-2">
              Price ($) *
            </label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              min="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
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
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
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

        {/* Actions */}
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
                Saving...
              </span>
            ) : (
              isEditing ? "Update Add-on" : "Create Add-on"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/addons"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}