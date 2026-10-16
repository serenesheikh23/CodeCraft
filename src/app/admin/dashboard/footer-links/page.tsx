"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Plus, Edit, Trash2, Link2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  id: string;
  section: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const sections = ["Company", "Services", "Legal"];

export default function FooterLinksPage() {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Company: true,
    Services: true,
    Legal: true,
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/footer-links");
        if (res.ok) {
          const data = await res.json();
          setLinks(data);
        }
      } catch (error) {
        console.error("Error fetching footer links:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const res = await fetch(`/api/footer-links/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting footer link:", error);
    }
  };

  const groupedLinks = sections.reduce((acc, section) => {
    acc[section] = links.filter((l) => l.section === section).sort((a, b) => a.order - b.order);
    return acc;
  }, {} as Record<string, FooterLink[]>);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="section-label text-lime mb-4">FOOTER LINKS</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <Link2 className="w-8 h-8 text-primary" />
            Footer Links
          </h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto" />
          <p className="text-text-muted mt-4">Loading footer links...</p>
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
          <h1 className="font-serif text-3xl lg:text-4xl text-text">
            <Link2 className="w-8 h-8 text-primary" />
            Footer Links
          </h1>
          <p className="text-text-muted mt-1">Manage footer navigation links grouped by section</p>
        </div>
        <Link href="/admin/dashboard/footer-links/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Link>
      </motion.div>

      {sections.map((section) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-card-hover transition-colors"
          >
            <h3 className="text-lg font-semibold text-text flex items-center gap-3">
              <Link2 className="w-5 h-5 text-primary" />
              {section} ({groupedLinks[section]?.length || 0})
            </h3>
            {expandedSections[section] ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
          </button>

          <motion.div
            initial={false}
            animate={{ height: expandedSections[section] ? "auto" : 0, opacity: expandedSections[section] ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              {groupedLinks[section]?.length === 0 ? (
                <p className="text-text-muted text-center py-8">No links in this section</p>
              ) : (
                <div className="space-y-3">
                  {groupedLinks[section]?.map((link) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text truncate">{link.label}</p>
                        <p className="text-sm text-text-muted truncate">{link.href}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className={cn("px-2 py-0.5 rounded text-xs", link.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                          {link.isActive ? "Active" : "Inactive"}
                        </span>
                        <span>Order: {link.order}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/dashboard/footer-links/${link.id}/edit`}
                          className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-card-hover transition-colors"
                          aria-label="Edit link"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label="Delete link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}