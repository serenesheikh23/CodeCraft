"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Settings, Save, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteSettings {
  id: string;
  email: string;
  phone1: string;
  phone2: string;
  whatsapp1: string;
  whatsapp2: string;
  instagramUrl: string;
  linkedin1Url: string;
  linkedin2Url: string;
  location: string;
  tagline: string;
  updatedAt: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        setStatus("success");
      } else {
        const err = await res.json();
        setStatus("error");
        setErrorMessage(err.error || "Failed to save settings");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="section-label text-lime mb-4">SETTINGS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
          <Settings className="w-8 h-8 text-primary" />
          Site Settings
        </h1>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto" />
          <p className="text-text-muted mt-4">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
          <Settings className="w-8 h-8 text-primary" />
          Site Settings
        </h1>
        <p className="text-text-muted mt-1">Configure global site settings used across the website</p>
      </motion.div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400"
          role="alert"
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Settings saved successfully!</p>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to save settings</p>
            <p className="text-sm text-red-400/80">{errorMessage}</p>
          </div>
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
            <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={settings?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="serenesheikh23@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={settings?.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="Remote Worldwide"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone1" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Phone 1
            </label>
            <input
              id="phone1"
              type="tel"
              value={settings?.phone1 || ""}
              onChange={(e) => handleChange("phone1", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="+963 933 135 837"
            />
          </div>

          <div>
            <label htmlFor="phone2" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Phone 2
            </label>
            <input
              id="phone2"
              type="tel"
              value={settings?.phone2 || ""}
              onChange={(e) => handleChange("phone2", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="+963 997 112 295"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="whatsapp1" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              WhatsApp 1 (number only)
            </label>
            <input
              id="whatsapp1"
              type="text"
              value={settings?.whatsapp1 || ""}
              onChange={(e) => handleChange("whatsapp1", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="963933135837"
            />
            <p className="text-sm text-text-muted mt-1">Number without + for wa.me links</p>
          </div>

          <div>
            <label htmlFor="whatsapp2" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              WhatsApp 2 (number only)
            </label>
            <input
              id="whatsapp2"
              type="text"
              value={settings?.whatsapp2 || ""}
              onChange={(e) => handleChange("whatsapp2", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="963997112295"
            />
            <p className="text-sm text-text-muted mt-1">Number without + for wa.me links</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="instagramUrl" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              Instagram URL
            </label>
            <input
              id="instagramUrl"
              type="url"
              value={settings?.instagramUrl || ""}
              onChange={(e) => handleChange("instagramUrl", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>

          <div>
            <label htmlFor="linkedin1Url" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
              LinkedIn 1 URL
            </label>
            <input
              id="linkedin1Url"
              type="url"
              value={settings?.linkedin1Url || ""}
              onChange={(e) => handleChange("linkedin1Url", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              placeholder="https://linkedin.com/in/profile1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="linkedin2Url" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            LinkedIn 2 URL
          </label>
          <input
            id="linkedin2Url"
            type="url"
            value={settings?.linkedin2Url || ""}
            onChange={(e) => handleChange("linkedin2Url", e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="https://linkedin.com/in/profile2"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-semibold">
            Tagline
          </label>
          <textarea
            id="tagline"
            value={settings?.tagline || ""}
            onChange={(e) => handleChange("tagline", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="Building ideas into digital products. Websites, apps and full systems."
          />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSaving}
            className="btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}