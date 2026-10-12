import Link from "next/link";
import { Box, Package, TrendingUp, Users, ArrowUpRight, Plus, Clock, Package as PackageIcon, FolderKanban, MessageSquare, Link2, FileText, ScrollText } from "lucide-react";
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
    ...recentItems[0].map((item) => ({ ...item, type: "service", icon: Box, color: "text-primary", bg: "bg-primary/10", href: `/admin/dashboard/services/${item.id}/edit` })),
    ...recentItems[1].map((item) => ({ ...item, type: "addon", icon: Package, color: "text-accent", bg: "bg-accent/10", href: `/admin/dashboard/addons/${item.id}/edit` })),
    ...recentItems[2].map((item) => ({ ...item, type: "project", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-500/10", href: `/admin/dashboard/projects/${item.id}/edit` })),
    ...recentItems[3].map((item) => ({ ...item, type: "testimonial", icon: MessageSquare, color: "text-yellow-400", bg: "bg-yellow-500/10", href: `/admin/dashboard/testimonials/${item.id}/edit` })),
    ...recentItems[4].map((item) => ({ ...item, type: "footer-link", icon: Link2, color: "text-purple-400", bg: "bg-purple-500/10", href: `/admin/dashboard/footer-links/${item.id}/edit` })),
    ...recentItems[5].map((item) => ({ ...item, type: "legal-page", icon: ScrollText, color: "text-orange-400", bg: "bg-orange-500/10", href: `/admin/dashboard/legal-pages/${item.id}/edit` })),
    ...recentItems[6].map((item) => ({ ...item, type: "custom-page", icon: FileText, color: "text-green-400", bg: "bg-green-500/10", href: `/admin/dashboard/pages/${item.id}/edit` })),
  ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
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
  const { servicesCount, addonsCount, projectsCount, testimonialsCount, recentActivity } = await getDashboardData();

  const stats = [
    {
      name: "Total Services",
      value: servicesCount,
      icon: Box,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      name: "Total Add-ons",
      value: addonsCount,
      icon: Package,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      name: "Total Projects",
      value: projectsCount,
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "Total Testimonials",
      value: testimonialsCount,
      icon: MessageSquare,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-text-muted mt-1">Manage your content and settings</p>
        </div>
        <div className="flex gap-3">
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
        {stats.map((stat, index) => (
          <Link
            key={stat.name}
            href={stat.name.includes("Service") ? "/admin/dashboard/services" : stat.name.includes("Add-on") ? "/admin/dashboard/addons" : stat.name.includes("Project") ? "/admin/dashboard/projects" : "/admin/dashboard/testimonials"}
            className={cn(
              "bg-card border border-border rounded-xl p-6 transition-all",
              "hover:border-primary/50 hover:shadow-glow"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">{stat.name}</p>
                <p className="text-3xl font-bold text-text mt-1">{stat.value}</p>
              </div>
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          href="/admin/dashboard/projects"
          className={cn(
            "bg-card border border-border rounded-xl p-6 transition-all",
            "hover:border-primary/50 hover:shadow-glow"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <FolderKanban className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-text">Manage Projects</h3>
              <p className="text-text-muted mt-1">Portfolio projects and case studies</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-text-muted" />
          </div>
        </Link>

        <Link
          href="/admin/dashboard/testimonials"
          className={cn(
            "bg-card border border-border rounded-xl p-6 transition-all",
            "hover:border-primary/50 hover:shadow-glow"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-text">Manage Testimonials</h3>
              <p className="text-text-muted mt-1">Client feedback and reviews</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-text-muted" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <p>No recent activity</p>
            <p className="text-sm mt-1">Start by adding services, projects, or other content</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              const displayName = "name" in item ? item.name : "title" in item ? item.title : "clientName" in item ? item.clientName : item.label;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-4 p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                    <Icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text truncate">{displayName}</p>
                    <p className="text-sm text-text-muted capitalize">{item.type.replace("-", " ")}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Clock className="w-4 h-4" />
                    <span>{formatRelativeTime(item.updatedAt)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}