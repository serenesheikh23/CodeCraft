"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    fetch("/api/nav-links")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNavLinks(data.filter((l: NavLink) => l.isActive));
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop link
  const renderDesktopLink = (link: NavLink) => {
    const isExternal = link.isExternal || link.href.startsWith("http");
    const href = link.href.startsWith("#") ? `/${link.href}` : link.href;

    if (isExternal) {
      return (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-lime transition-colors text-sm font-medium"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.id}
        href={href}
        className="group text-text-muted hover:text-text transition-colors text-sm font-medium relative py-2"
      >
        {link.label}
        <span className="absolute bottom-0 left-0 right-0 h-0.5 brand-gradient-bg origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Link>
    );
  };

  // Mobile link — full-width block with clear spacing
  const renderMobileLink = (link: NavLink) => {
    const isExternal = link.isExternal || link.href.startsWith("http");
    const href = link.href.startsWith("#") ? `/${link.href}` : link.href;

    if (isExternal) {
      return (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block w-full px-4 py-3.5 text-text-muted hover:text-text hover:bg-card-hover border-b border-border last:border-b-0 transition-colors text-base font-medium"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.id}
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className="block w-full px-4 py-3.5 text-text-muted hover:text-text hover:bg-card-hover hover:pl-6 border-b border-border last:border-b-0 transition-all text-base font-medium"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 text-text font-bold text-xl group">
              <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-105" style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))" }}>
                <Image
                  src="/logo.svg"
                  alt="Code Craft"
                  fill
                  sizes="36px"
                  className="object-contain"
                  priority
                />
              </div>
              {/* REMOVED hidden sm:block FROM THE LINE BELOW */}
              <span className="block text-lg sm:text-xl">Code Craft</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => renderDesktopLink(link))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          <motion.div
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              height: isMobileMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="py-2">
              {navLinks.map((link) => renderMobileLink(link))}
            </div>
          </motion.div>
        </nav>
      </header>
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}