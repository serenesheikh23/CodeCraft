"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    setMounted(true);
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

  const renderLink = (link: NavLink, onClick?: () => void) => {
    const isExternal = link.isExternal || link.href.startsWith("http");
    const href = link.href.startsWith("#") ? `/${link.href}` : link.href;

    if (isExternal) {
      return (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="text-text-muted hover:text-text transition-colors text-sm font-medium"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.id}
        href={href}
        onClick={onClick}
        className="group text-text-muted hover:text-text transition-colors text-sm font-medium relative py-2"
      >
        {link.label}
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          mounted ? "opacity-100" : "opacity-0",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 text-text font-bold text-xl" aria-label="Code Craft Home">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-xl bg-text flex items-center justify-center"
              >
                <Code2 className="w-5 h-5 text-background" />
              </motion.div>
              <span className="hidden sm:block">Code Craft</span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-8 flex-1 lg:flex-1 justify-center">
              {navLinks.map((link) => renderLink(link))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-4" />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              height: isMobileMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => renderLink(link, () => setIsMobileMenuOpen(false)))}
            </div>
          </motion.div>
        </nav>
      </header>
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}