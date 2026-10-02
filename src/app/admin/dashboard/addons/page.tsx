"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Loader2, Package } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function AddOnsPage() {
  const [addons, setAddons] = useState<AddOn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAddons = async () => {
    try {
      const res = await fetch("/api/addons");
      if (res.ok) {
        const data = await res.json();
        setAddons(data);
      }
    } catch (error) {
      console.error("Error fetching addons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this addon?")) return;

    setIsDeleting(true);
    setDeleteId(id);
    try {
      const res = await fetch(`/api/addons/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddons(addons.filter((a) => a.id !== id));
      } else {
        alert("Failed to delete addon");
      }
    } catch (error) {
      console.error("Error deleting addon:", error);
      alert("An error occurred");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const filteredAddons = addons.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Package className="w-8 h-8 text-accent" />
            Add-ons
          </h1>
          <p className="text-text-muted mt-1">Manage additional features and pricing</p>
        </div>
        <Link href="/admin/dashboard/addons/new" className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Add-on
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
        <input
          type="text"
          placeholder="Search addons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
            <p className="text-text-muted mt-4">Loading addons...</p>
          </div>
        ) : filteredAddons.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-text">No addons found</h3>
            <p className="text-text-muted mt-1">
              {searchQuery ? "Try adjusting your search" : "Get started by adding your first addon"}
            </p>
            {!searchQuery && (
              <Link href="/admin/dashboard/addons/new" className="btn-primary inline-flex mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Add-on
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card-hover">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted">Addon</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted">Order</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAddons.map((addon, index) => (
                  <motion.tr
                    key={addon.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-card-hover transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Package className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-text">{addon.name}</p>
                          <p className="text-sm text-text-muted truncate max-w-xs">{addon.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-text">${addon.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          addon.isActive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {addon.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{addon.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/addons/${addon.id}/edit`}
                          className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(addon.id)}
                          disabled={isDeleting}
                          className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          {deleteId === addon.id && isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}