"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const res = await fetch("/api/nav-links");
        const data = await res.json();
        if (Array.isArray(data)) {
          setNavLinks(data.filter((l) => l.isActive).map((l) => ({
            id: l.id,
            label: l.label,
            href: l.href,
            order: l.order,
            isActive: l.isActive,
            isExternal: l.isExternal || l.href.startsWith("http"),
          })));
        }
      } catch (e) {
        // fallback nav links
        setNavLinks([
          { id: "1", label: "Work", href: "/#projects", order: 1, isActive: true, isExternal: false },
          { id: "2", label: "Services", href: "/#services", order: 2, isActive: true, isExternal: false },
          { id: "3", label: "About", href: "/p/about", order: 3, isActive: true, isExternal: false },
          { id: "4", label: "Contact", href: "/#contact", order: 4, isActive: true, isExternal: false },
        ]);
      }
    };

    fetchNavLinks();

    // Sticky bottom CTA logic
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const y = window.scrollY;
        setIsScrolled(y > 20);
      }, 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isExternal = (link) => link.isExternal || link.href.startsWith("http");

  const renderLink = (link) => {
    const href = link.href.startsWith("#") ? `/${link.href}` : link.href;

    if (isExternal(link)) {
      return (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors text-sm font-medium"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.id}
        href={href}
        className="group text-text-muted hover:text-text transition-colors text-sm font-medium"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {/* Compact fixed top bar — never blurs, no gradient */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/70 backdrop-none transition-none",
          isScrolled && "bg-card/80"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-14">

            {/* Logo — simple, no gradient, no animation */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="Code Craft"
                  className="object-contain w-full h-full"
                  sizes="32px"
                />
              </div>
              <span className="text-sm font-bold text-tracking-wider">Code Craft</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {navLinks.map((link) => renderLink(link))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text hover:text-text hover:bg-card-hover transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu sheet — slide in from right, no motion library }} */
      <div
        className={cn(
          "lg:hidden fixed right-0 top-0 bottom-0 z-40 overflow-y-auto padding-8 pt-16 transition-transform",
          isMobileMenuOpen ? "transform translateX(0)" : "transform translateX(100%)",
          "duration-300"
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between pb-8 border-b border-border mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="Code Craft"
                className="object-contain w-full h-full"
                sizes="32px"
              />
            </div>
            <span className="text-sm font-bold">Code Craft</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-card-hover transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {navLinks.map((link) => {
            const href = link.href.startsWith("#") ? `/${link.href}` : link.href;

            if (isExternal(link)) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3.5 text-text-muted hover:text-text hover:bg-card-border transition-colors text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.id}
                href={href}
                className="block w-full px-4 py-3.5 text-text-muted hover:text-text hover:bg-card-border transition-all text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA in mobile menu */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-3 sm:gap-6">
          <a
            href="/#contact"
            className="flex-1 bg-accent text-accent-foreground py-3 rounded-md font-medium uppercase tracking-wider text-xs text-center"
          >
            Start a project
          </a>
          <a
            href="mailto:serenesheikh23@gmail.com"
            className="flex-1 bg-background py-3 rounded-md font-medium uppercase tracking-wider text-xs text-center border border-border"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Sticky bottom CTA bar — desktop only, hides on scroll down }} */
      <div
        className={cn(
          "sticky bottom-0 left-0 right-0 z-40 py-3 px-4 sm:px-6 lg:hidden hidden bg-card border-t border-border transition-all duration-300",
          isScrolled ? "transform translateY(0) opacity-100" : "transform translateY(40px) opacity-0",
          isScrolled ? "" : "transition-height"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="/#contact"
            className="flex items-center gap-2 bg-accent text-accent-foreground py-2 px-4 rounded-md font-medium uppercase tracking-wider text-xs"
          >
            Start a project
          </a>
          <a
            href="mailto:serenesheikh23@gmail.com"
            className="text-text-muted hover:text-accent transition-colors text-sm font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}