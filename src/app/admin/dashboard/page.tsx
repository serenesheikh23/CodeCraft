"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Package, TrendingUp, Users, ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    name: "Total Services",
    value: "7",
    icon: Box,
    color: "text-primary",
    bg: "bg-primary/10",
    change: "+2 this month",
  },
  {
    name: "Total Add-ons",
    value: "10",
    icon: Package,
    color: "text-accent",
    bg: "bg-accent/10",
    change: "+3 this month",
  },
  {
    name: "Active Items",
    value: "17",
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-500/10",
    change: "All active",
  },
  {
    name: "Bundle Packages",
    value: "1",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    change: "Premium offering",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-text-muted mt-1">Manage your services and add-ons</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/dashboard/services/new" className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Link>
          <Link href="/admin/dashboard/addons/new" className="btn-secondary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Add-on
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={cn(
              "bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/50",
              "hover:shadow-glow"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">{stat.name}</p>
                <p className="text-3xl font-bold text-text mt-1">{stat.value}</p>
                <p className="text-sm text-text-muted mt-2">{stat.change}</p>
              </div>
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Link
          href="/admin/dashboard/services"
          className={cn(
            "bg-card border border-border rounded-xl p-6 transition-all",
            "hover:border-primary/50 hover:shadow-glow"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Box className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text">Manage Services</h3>
              <p className="text-text-muted mt-1">View, edit, and create service offerings</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-text-muted" />
          </div>
        </Link>

        <Link
          href="/admin/dashboard/addons"
          className={cn(
            "bg-card border border-border rounded-xl p-6 transition-all",
            "hover:border-primary/50 hover:shadow-glow"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text">Manage Add-ons</h3>
              <p className="text-text-muted mt-1">Configure additional features and pricing</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-text-muted" />
          </div>
        </Link>
      </motion.div>

      {/* Recent Activity Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-text mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-text-muted">
          <p>No recent activity</p>
          <p className="text-sm mt-1">Start by adding services or add-ons</p>
        </div>
      </motion.div>
    </div>
  );
}