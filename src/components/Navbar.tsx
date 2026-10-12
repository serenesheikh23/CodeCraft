"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-text font-bold text-xl"
              aria-label="Code Craft Home"
            >
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center"
              >
                <Code2 className="w-5 h-5 text-white" />
              </motion.div>
              <span className="hidden sm:block">Code Craft</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group text-text-muted hover:text-text transition-colors text-sm font-medium relative py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link href="#contact" className="btn-primary text-sm px-6 py-2.5">
                Swipe for prices {'>'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center block mt-2"
              >
                Swipe for prices {'>'}
              </Link>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}