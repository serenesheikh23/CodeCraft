"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Loader2, Plus, Edit, Trash2, Layers3, Eye, EyeOff, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomepageSection {
  id: string;
  type: string;
  name: string;
  title: string;
  subtitle: string;
  content: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

const typeLabels: Record<string, string> = {
  hero: "Hero",
  features: "Features",
  pricing: "Pricing",
  faq: "FAQ",
  cta: "CTA",
  gallery: "Gallery",
  stats: "Stats",
  logos: "Logos",
  "custom-text": "Text",
  services: "Services",
  projects: "Projects",
  testimonials: "Testimonials",
  contact: "Contact",
};

function SortableSectionRow({
  section,
  index,
  onToggleVisibility,
  onDelete,
}: {
  section: HomepageSection;
  index: number;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.tr
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("hover:bg-card-hover transition-colors border-b border-border last:border-b-0")}
    >
      <td className="p-4 w-12">
        <button
          {...attributes}
          {...listeners}
          className="p-2 text-text-muted hover:text-text transition-colors cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="p-4">
        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border border-coral/30 text-coral">
          {typeLabels[section.type] || section.type}
        </span>
      </td>
      <td className="p-4">
        <p className="text-text">{section.name || "—"}</p>
        <p className="text-xs text-text-muted mt-0.5">{section.title || "No title"}</p>
      </td>
      <td className="p-4 text-center text-text-muted font-mono text-sm">{index + 1}</td>
      <td className="p-4 text-center">
        <button
          onClick={() => onToggleVisibility(section.id)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            section.isVisible
              ? "text-coral hover:bg-coral/10"
              : "text-text-muted hover:bg-card-hover"
          )}
          aria-label={section.isVisible ? "Hide section" : "Show section"}
        >
          {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/dashboard/sections/${section.id}/edit`}
            className="p-2 rounded-lg text-coral hover:bg-coral/10 transition-colors"
            aria-label="Edit section"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(section.id)}
            className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default function SectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch("/api/sections");
        if (res.ok) {
          const data = await res.json();
          setSections(data);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      setSections(newSections);
      const orderedIds = newSections.map((s) => s.id);
      try {
        await fetch("/api/sections/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds }),
        });
      } catch (error) {
        console.error("Error reordering:", error);
        setSections(sections);
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return;
    const updatedSection = { ...section, isVisible: !section.isVisible };
    setSections(sections.map((s) => (s.id === id ? updatedSection : s)));
    try {
      await fetch(`/api/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSection),
      });
    } catch (error) {
      console.error("Error toggling visibility:", error);
      setSections(sections);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    try {
      const res = await fetch(`/api/sections/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSections(sections.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="section-label text-lime mb-4">HOMEPAGE SECTIONS</div>
          <h1 className="font-serif text-3xl lg:text-4xl text-text">Sections</h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto" />
          <p className="text-text-muted mt-4 text-sm">Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="section-label text-lime mb-4">HOMEPAGE SECTIONS</div>
              <h1 className="font-serif text-3xl lg:text-4xl text-text">Sections</h1>
              <p className="text-text-muted mt-3 text-sm">
                Drag to reorder — they appear on the homepage in this order
              </p>
            </div>
            <Link
              href="/admin/dashboard/sections/new"
              className="btn-primary flex items-center gap-2 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </Link>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {sections.length === 0 ? (
              <div className="p-12 text-center">
                <Layers3 className="w-10 h-10 text-text-muted mx-auto mb-4" />
                <p className="text-text">No sections yet</p>
                <p className="text-text-muted text-sm mt-1">
                  Create your first homepage section to get started
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="p-4 w-12" />
                      <th className="p-4 text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
                        Type
                      </th>
                      <th className="p-4 text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
                        Name
                      </th>
                      <th className="p-4 text-xs uppercase tracking-[0.2em] text-text-muted font-semibold w-20 text-center">
                        Order
                      </th>
                      <th className="p-4 text-xs uppercase tracking-[0.2em] text-text-muted font-semibold w-16 text-center">
                        Visible
                      </th>
                      <th className="p-4 w-24" />
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section, index) => (
                      <SortableSectionRow
                        key={section.id}
                        section={section}
                        index={index}
                        onToggleVisibility={handleToggleVisibility}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
