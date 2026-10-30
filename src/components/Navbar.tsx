"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface NavLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
}

const FALLBACK: NavLink[] = [
  { id: "1", label: "Work", href: "/#projects", order: 1, isActive: true, isExternal: false },
  { id: "2", label: "Services", href: "/#services", order: 2, isActive: true, isExternal: false },
  { id: "3", label: "About", href: "/p/about", order: 3, isActive: true, isExternal: false },
  { id: "4", label: "Contact", href: "/#contact", order: 4, isActive: true, isExternal: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const lastY = useRef(0);
  const [links, setLinks] = useState<NavLink[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/nav-links")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setLinks(
          data
            .filter((l: { isActive?: boolean }) => l.isActive !== false)
            .map((l: { id: string; label: string; href: string; order?: number; isExternal?: boolean }) => ({
              id: l.id,
              label: l.label,
              href: l.href,
              order: l.order ?? 0,
              isActive: true,
              isExternal: Boolean(l.isExternal || l.href?.startsWith("http")),
            }))
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 6) return;
      setScrollDir(y > lastY.current ? "down" : "up");
      setScrolled(y > 120);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const showBar = scrolled && scrollDir === "up" && !open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
          scrolled ? "bg-card border-border" : "bg-background border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 min-h-[44px]" onClick={close}>
              <Image src="/logo-mark.svg" alt="" width={32} height={32} className="w-7 h-7 object-contain" />
              <span className="font-outfit text-base font-semibold tracking-tight text-text">Code Craft</span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {links.map((l) =>
                l.isExternal ? (
                  <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-sm text-text-muted hover:text-text transition-colors">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.id} href={l.href} className="inline-flex items-center min-h-[44px] text-sm text-text-muted hover:text-text transition-colors">
                    {l.label}
                  </Link>
                )
              )}
              <Link href="/#contact" className="inline-flex items-center justify-center min-h-[44px] px-4 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors">
                Start a project
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-text"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden fixed inset-0 z-[60] bg-background overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 border-b border-border">
            <Link href="/" className="flex items-center gap-2 min-h-[44px]" onClick={close}>
              <Image src="/logo-mark.svg" alt="" width={32} height={32} className="w-7 h-7 object-contain" />
              <span className="font-outfit text-base font-semibold tracking-tight text-text">Code Craft</span>
            </Link>
            <button type="button" onClick={close} aria-label="Close menu" className="inline-flex items-center justify-center w-11 h-11 text-text">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav className="px-4 py-6" aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.id}>
                  {l.isExternal ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={close} className="flex items-center min-h-[52px] px-2 text-base text-text border-b border-border">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} onClick={close} className="flex items-center min-h-[52px] px-2 text-base text-text border-b border-border">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/#contact" onClick={close} className="mt-6 flex items-center justify-center min-h-[48px] px-4 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
              Start a project
            </Link>
          </nav>
        </div>
      )}

      <div
        aria-hidden={!showBar}
        className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-card border-t border-border px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] transition-transform duration-200 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link href="/#contact" className="flex-1 inline-flex items-center justify-center min-h-[44px] bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
            Start a project
          </Link>
          <a href="mailto:serenesheikh23@gmail.com" className="inline-flex items-center justify-center min-h-[44px] px-4 border border-border text-text-muted text-xs font-medium">
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
