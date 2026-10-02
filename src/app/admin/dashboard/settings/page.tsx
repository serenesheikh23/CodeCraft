"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your account settings",
    icon: User,
    items: [
      { label: "Account Settings", href: "#", description: "Email, password, and security" },
      { label: "Notifications", href: "#", description: "Email and push preferences" },
      { label: "Appearance", href: "#", description: "Theme and display options" },
    ],
  },
  {
    title: "Security",
    description: "Keep your account secure",
    icon: Shield,
    items: [
      { label: "Two-Factor Authentication", href: "#", description: "Add an extra layer of security" },
      { label: "API Keys", href: "#", description: "Manage your API access tokens" },
      { label: "Session Management", href: "#", description: "View and revoke active sessions" },
    ],
  },
  {
    title: "Preferences",
    description: "Customize your experience",
    icon: Palette,
    items: [
      { label: "Dashboard Layout", href: "#", description: "Customize your dashboard view" },
      { label: "Language", href: "#", description: "Set your preferred language" },
      { label: "Timezone", href: "#", description: "Configure your local timezone" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-text-muted mt-1">Manage your account and preferences</p>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border bg-card-hover">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">{section.title}</h3>
                  <p className="text-sm text-text-muted">{section.description}</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + sectionIndex * 0.05 + itemIndex * 0.02 }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-card-hover transition-colors"
                >
                  <div>
                    <p className="font-medium text-text">{item.label}</p>
                    <p className="text-sm text-text-muted">{item.description}</p>
                  </div>
                  <span className="text-text-muted">Coming soon</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-text">Danger Zone</h3>
            <p className="text-sm text-text-muted">Irreversible actions</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 text-left bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
            <span className="font-medium">Delete Account</span>
            <p className="text-sm text-red-400/80 mt-1">Permanently delete your account and all data</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}