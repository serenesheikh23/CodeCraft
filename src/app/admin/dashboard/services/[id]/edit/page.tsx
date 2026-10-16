"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Box } from "lucide-react";
import Link from "next/link";

const icons = [
  "layout",
  "building",
  "code",
  "shopping-cart",
  "smartphone",
  "layers",
  "git-branch",
  "package",
];

interface Service {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  features: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface FormData {
  name: string;
  description: string;
  minPrice: string;
  maxPrice: string;
  features: string;
  icon: string;
  order: string;
  isActive: boolean;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    minPrice: "",
    maxPrice: "",
    features: "",
    icon: "layout",
    order: "0",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (res.ok) {
          const data: Service = await res.json();
          setFormData({
            name: data.name,
            description: data.description,
            minPrice: String(data.minPrice),
            maxPrice: String(data.maxPrice),
            features: (JSON.parse(data.features || "[]") as string[]).join(", "),
            icon: data.icon,
            order: String(data.order),
            isActive: data.isActive,
          });
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const featuresArray = formData.features.split(",").map((f) => f.trim()).filter(Boolean);
      
      const data = {
        name: formData.name,
        description: formData.description,
        minPrice: Number(formData.minPrice),
        maxPrice: Number(formData.maxPrice),
        features: JSON.stringify(featuresArray),
        icon: formData.icon,
        order: Number(formData.order),
        isActive: formData.isActive,
      };

      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard/services");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update service");
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
            href="/admin/dashboard/services"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="section-label text-lime mb-4">SERVICES</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
              <Box className="w-8 h-8 text-primary" />
              Edit Service
            </h1>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto" />
          <p className="text-text-muted mt-4">Loading service...</p>
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
          href="/admin/dashboard/services"
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <Box className="w-8 h-8 text-primary" />
            Edit Service
          </h1>
          <p className="text-text-muted mt-1">Update service details</p>
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
            <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Service Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="e.g., Landing Page"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
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
                  {icon.charAt(0).toUpperCase() + icon.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="Describe what this service includes..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="minPrice" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Min Price ($) *
            </label>
            <input
              id="minPrice"
              type="number"
              value={formData.minPrice}
              onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
              required
              min="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Max Price ($) *
            </label>
            <input
              id="maxPrice"
              type="number"
              value={formData.maxPrice}
              onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
              required
              min="0"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
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

        <div>
          <label htmlFor="features" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Features (comma separated) *
          </label>
          <textarea
            id="features"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="e.g., Responsive design, SEO optimized, Contact form integration"
          />
          <p className="text-sm text-text-muted mt-1">Separate features with commas</p>
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
              "Update Service"
            )}
          </motion.button>
          <Link
            href="/admin/dashboard/services"
            className="btn-secondary flex-1 sm:flex-none text-center"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}