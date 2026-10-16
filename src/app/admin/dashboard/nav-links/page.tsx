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
import { Loader2, Plus, Edit, Trash2, Link2, ExternalLink, Menu, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function NavLinksPage() {
  const [links, setLinks] = useState<NavLink[]>([]);
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
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/nav-links");
        if (res.ok) {
          const data = await res.json();
          setLinks(data);
        }
      } catch (error) {
        console.error("Error fetching nav links:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((s) => s.id === active.id);
      const newIndex = links.findIndex((s) => s.id === over.id);

      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);

      const orderedIds = newLinks.map((s) => s.id);

      try {
        await fetch("/api/nav-links/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds }),
        });
      } catch (error) {
        console.error("Error reordering:", error);
        setLinks(links);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const res = await fetch(`/api/nav-links/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting nav link:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Menu className="w-8 h-8 text-primary" />
            Nav Links
          </h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-text-muted mt-4">Loading nav links...</p>
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
        items={links.map((s) => s.id)}
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
                <Menu className="w-8 h-8 text-primary" />
                Nav Links
              </h1>
              <p className="text-text-muted mt-1">Drag to reorder — links appear in the navbar in this order</p>
            </div>
            <Link href="/admin/dashboard/nav-links/new" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Link
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {links.length === 0 ? (
              <div className="p-8 text-center">
                <Menu className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">No nav links yet</p>
                <p className="text-sm text-text-muted mt-1">Create your first navbar link</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-border text-left text-sm font-medium text-text-muted">
                      <th className="p-4 w-12" />
                      <th className="p-4">Label</th>
                      <th className="p-4">Href</th>
                      <th className="p-4 w-20 text-center">Order</th>
                      <th className="p-4 w-20 text-center">Type</th>
                      <th className="p-4 w-16 text-center">Active</th>
                      <th className="p-4 w-24 text-right" />
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link, index) => (
                      <SortableNavLinkRow
                        key={link.id}
                        link={link}
                        index={index}
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

function SortableNavLinkRow({
  link,
  index,
  onDelete,
}: {
  link: NavLink;
  index: number;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

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
          <ArrowUpDown className="w-5 h-5" />
        </button>
      </td>
      <td className="p-4">
        <p className="font-medium text-text">{link.label}</p>
      </td>
      <td className="p-4">
        <p className="text-sm text-text-muted truncate max-w-xs flex items-center gap-1">
          {link.isExternal && <ExternalLink className="w-3 h-3" />}
          {link.href}
        </p>
      </td>
      <td className="p-4 text-center text-text-muted font-mono text-sm">
        {index + 1}
      </td>
      <td className="p-4 text-center">
        <span className={cn(
          "px-2.5 py-1 rounded text-xs font-medium uppercase tracking-wider",
          link.isExternal ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
        )}>
          {link.isExternal ? "External" : "Internal"}
        </span>
      </td>
      <td className="p-4 text-center">
        <span className={cn("px-2 py-0.5 rounded text-xs", link.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
          {link.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/dashboard/nav-links/${link.id}/edit`}
            className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-card-hover transition-colors"
            aria-label="Edit link"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}