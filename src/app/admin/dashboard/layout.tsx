"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Layers3,
  Menu,
  Package,
  PlusCircle,
  FolderKanban,
  Quote,
  FileText,
  Link2,
  ScrollText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/sections", label: "Sections", icon: Layers3 },
  { href: "/admin/dashboard/nav-links", label: "Nav Links", icon: Menu },
  { href: "/admin/dashboard/services", label: "Services", icon: Package },
  { href: "/admin/dashboard/addons", label: "Add-ons", icon: PlusCircle },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/dashboard/pages", label: "Custom Pages", icon: FileText },
  { href: "/admin/dashboard/footer-links", label: "Footer Links", icon: Link2 },
  { href: "/admin/dashboard/legal-pages", label: "Legal Pages", icon: ScrollText },
  { href: "/admin/dashboard/settings", label: "Site Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105"
              style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))" }}
            >
              <Image
                src="/logo.svg"
                alt="Code Craft"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-serif text-xl text-text">Code Craft</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-text-muted hover:text-text transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-coral/10 text-coral font-medium"
                    : "text-text-muted hover:bg-card-hover hover:text-text"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-text-muted hover:text-text transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-lime font-semibold">
                <span className="w-6 h-px bg-lime" />
                Admin
              </span>
              <h1 className="font-serif text-xl text-text">Dashboard</h1>
            </div>
            <div className="w-8" />
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
