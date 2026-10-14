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
import { Loader2, Plus, Edit, Trash2, Layers3, Eye, EyeOff, GripVertical, ArrowUpDown } from "lucide-react";
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
  features: "Features Grid",
  pricing: "Pricing Table",
  faq: "FAQ",
  cta: "CTA Banner",
  gallery: "Gallery",
  stats: "Stats",
  logos: "Logos",
  "custom-text": "Custom Text",
};

const typeColors: Record<string, string> = {
  hero: "bg-purple-500/10 text-purple-400",
  features: "bg-blue-500/10 text-blue-400",
  pricing: "bg-green-500/10 text-green-400",
  faq: "bg-orange-500/10 text-orange-400",
  cta: "bg-pink-500/10 text-pink-400",
  gallery: "bg-cyan-500/10 text-cyan-400",
  stats: "bg-indigo-500/10 text-indigo-400",
  logos: "bg-teal-500/10 text-teal-400",
  "custom-text": "bg-gray-500/10 text-gray-400",
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

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
      className={cn("hover:bg-card-hover transition-colors", isDragging && "shadow-lg")}
    >
      <td className="p-4">
        <button
          {...attributes}
          {...listeners}
          className="p-2 text-text-muted hover:text-text transition-colors cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </td>
      <td className="p-4">
        <span
          className={cn(
            "px-2.5 py-1 rounded text-xs font-medium uppercase tracking-wider",
            typeColors[section.type] || "bg-gray-500/10 text-gray-400"
          )}
        >
          {typeLabels[section.type] || section.type}
        </span>
      </td>
      <td className="p-4">
        <p className="font-medium text-text">{section.name || "—"}</p>
        <p className="text-sm text-text-muted">{section.title || "No title"}</p>
      </td>
      <td className="p-4 text-center text-text-muted font-mono text-sm">
        {index + 1}
      </td>
      <td className="p-4 text-center">
        <button
          onClick={() => onToggleVisibility(section.id)}
          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
          aria-label={section.isVisible ? "Hide section" : "Show section"}
        >
          {section.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/dashboard/sections/${section.id}/edit`}
            className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-card-hover transition-colors"
            aria-label="Edit section"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(section.id)}
            className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    if (!confirm("Are you sure you want to delete this section?")) return;

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Layers3 className="w-8 h-8 text-primary" />
            Homepage Sections
          </h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-text-muted mt-4">Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center gap-3">
                <Layers3 className="w-8 h-8 text-primary" />
                Homepage Sections
              </h1>
              <p className="text-text-muted mt-1">Drag to reorder — sections render on the homepage in this order</p>
            </div>
            <Link href="/admin/dashboard/sections/new" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Section
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {sections.length === 0 ? (
              <div className="p-8 text-center">
                <Layers3 className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">No sections yet</p>
                <p className="text-sm text-text-muted mt-1">Create your first homepage section</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-border text-left text-sm font-medium text-text-muted">
                      <th className="p-4 w-12" />
                      <th className="p-4">Type</th>
                      <th className="p-4">Name / Title</th>
                      <th className="p-4 w-20 text-center">Order</th>
                      <th className="p-4 w-16 text-center">Visible</th>
                      <th className="p-4 w-24 text-right" />
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
          </motion.div>
        </div>
      </SortableContext>
    </DndContext>
  );
}