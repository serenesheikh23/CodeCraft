import Link from "next/link";
import {
  Box,
  Package,
  FolderKanban,
  MessageSquare,
  ArrowUpRight,
  Plus,
  Clock,
  Link2,
  FileText,
  ScrollText,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

async function getDashboardData() {
  const [servicesCount, addonsCount, projectsCount, testimonialsCount, recentItems] = await Promise.all([
    prisma.service.count(),
    prisma.addOn.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    Promise.all([
      prisma.service.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, name: true, updatedAt: true } }),
      prisma.addOn.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, name: true, updatedAt: true } }),
      prisma.project.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, updatedAt: true } }),
      prisma.testimonial.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, clientName: true, updatedAt: true } }),
      prisma.footerLink.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, label: true, updatedAt: true } }),
      prisma.legalPage.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, updatedAt: true } }),
      prisma.customPage.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, updatedAt: true } }),
    ]),
  ]);

  const allRecent = [
    ...recentItems[0].map((item) => ({ ...item, type: "service", icon: Box, href: `/admin/dashboard/services/${item.id}/edit` })),
    ...recentItems[1].map((item) => ({ ...item, type: "addon", icon: Package, href: `/admin/dashboard/addons/${item.id}/edit` })),
    ...recentItems[2].map((item) => ({ ...item, type: "project", icon: FolderKanban, href: `/admin/dashboard/projects/${item.id}/edit` })),
    ...recentItems[3].map((item) => ({ ...item, type: "testimonial", icon: MessageSquare, href: `/admin/dashboard/testimonials/${item.id}/edit` })),
    ...recentItems[4].map((item) => ({ ...item, type: "footer link", icon: Link2, href: `/admin/dashboard/footer-links/${item.id}/edit` })),
    ...recentItems[5].map((item) => ({ ...item, type: "legal page", icon: ScrollText, href: `/admin/dashboard/legal-pages/${item.id}/edit` })),
    ...recentItems[6].map((item) => ({ ...item, type: "custom page", icon: FileText, href: `/admin/dashboard/pages/${item.id}/edit` })),
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  return {
    servicesCount,
    addonsCount,
    projectsCount,
    testimonialsCount,
    recentActivity: allRecent,
  };
}

function formatRelativeTime(dateValue: string | Date) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default async function DashboardPage() {
  const { servicesCount, addonsCount, projectsCount, testimonialsCount, recentActivity } =
    await getDashboardData();

  const stats = [
    { name: "Services", value: servicesCount, icon: Box, href: "/admin/dashboard/services" },
    { name: "Add-ons", value: addonsCount, icon: Package, href: "/admin/dashboard/addons" },
    { name: "Projects", value: projectsCount, icon: FolderKanban, href: "/admin/dashboard/projects" },
    { name: "Testimonials", value: testimonialsCount, icon: MessageSquare, href: "/admin/dashboard/testimonials" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="section-label text-lime mb-4">OVERVIEW</div>
          <h1 className="font-serif text-3xl lg:text-4xl text-text">Dashboard</h1>
          <p className="text-text-muted mt-3">Manage your content and settings</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/dashboard/services/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Service
          </Link>
          <Link href="/admin/dashboard/projects/new" className="btn-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-card border border-border rounded-xl p-6 transition-colors hover:border-coral/40 group"
            >
              <div className="flex items-start justify-between mb-6">
                <Icon className="w-5 h-5 text-coral" />
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-coral transition-colors" />
              </div>
              <p className="font-serif text-4xl lg:text-5xl text-text mb-2">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
                {stat.name}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="section-label text-lime mb-6">QUICK ACTIONS</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard/services"
            className="bg-card border border-border rounded-xl p-6 transition-colors hover:border-coral/40 group"
          >
            <div className="flex items-start justify-between mb-8">
              <Box className="w-5 h-5 text-coral" />
              <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-coral transition-colors" />
            </div>
            <h3 className="font-serif text-xl text-text mb-2">Services</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              View, edit, and create service offerings
            </p>
          </Link>

          <Link
            href="/admin/dashboard/projects"
            className="bg-card border border-border rounded-xl p-6 transition-colors hover:border-coral/40 group"
          >
            <div className="flex items-start justify-between mb-8">
              <FolderKanban className="w-5 h-5 text-coral" />
              <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-coral transition-colors" />
            </div>
            <h3 className="font-serif text-xl text-text mb-2">Projects</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Portfolio projects and case studies
            </p>
          </Link>

          <Link
            href="/admin/dashboard/testimonials"
            className="bg-card border border-border rounded-xl p-6 transition-colors hover:border-coral/40 group"
          >
            <div className="flex items-start justify-between mb-8">
              <MessageSquare className="w-5 h-5 text-coral" />
              <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-coral transition-colors" />
            </div>
            <h3 className="font-serif text-xl text-text mb-2">Testimonials</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Client feedback and reviews
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="section-label text-lime mb-6">RECENT ACTIVITY</div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {recentActivity.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm">
              No recent activity yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentActivity.map((item) => {
                const Icon = item.icon;
                const displayName =
                  "name" in item
                    ? item.name
                    : "title" in item
                    ? item.title
                    : "clientName" in item
                    ? item.clientName
                    : item.label;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-card-hover transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-coral" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text truncate">{displayName}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted mt-1">
                        {item.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatRelativeTime(item.updatedAt)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
