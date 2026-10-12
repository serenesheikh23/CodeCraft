import Link from "next/link";
import { Code2, Mail, Phone, MessageCircle, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getFooterData() {
  const [settings, footerLinks] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.footerLink.findMany({
      where: { isActive: true },
      orderBy: [{ section: "asc" }, { order: "asc" }],
    }),
  ]);
  return { settings, footerLinks };
}

export default async function Footer() {
  const { settings, footerLinks } = await getFooterData();

  const groupedLinks = footerLinks.reduce((acc, link) => {
    if (!acc[link.section]) acc[link.section] = [];
    acc[link.section].push(link);
    return acc;
  }, {} as Record<string, typeof footerLinks>);

  const defaultSettings = {
    email: "serenesheikh23@gmail.com",
    phone1: "+963 933 135 837",
    phone2: "+963 997 112 295",
    whatsapp1: "+963933135837",
    whatsapp2: "+963997112295",
    instagramUrl: "",
    linkedin1Url: "",
    linkedin2Url: "",
    location: "Remote Worldwide",
    tagline: "Building ideas into digital products. Websites, apps and full systems.",
  };

  const s = settings || defaultSettings;

  return (
    <footer className="relative bg-card border-t border-border" role="contentinfo">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 0%, transparent 70%)`
      }} aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-text font-bold text-xl mb-4" aria-label="Code Craft Home">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span>Code Craft</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {s.tagline}
            </p>
            <div className="flex gap-4">
              {s.instagramUrl && (
                <a
                  href={s.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {s.linkedin1Url && (
                <a
                  href={s.linkedin1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {s.linkedin2Url && (
                <a
                  href={s.linkedin2Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn 2"
                  className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${s.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <nav aria-label="Company links">
            <h3 className="font-semibold text-text mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              {groupedLinks.Company?.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services links">
            <h3 className="font-semibold text-text mb-4">Services</h3>
            <ul className="space-y-3" role="list">
              {groupedLinks.Services?.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-text mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-text-muted" role="list">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${s.email}`} className="hover:text-primary transition-colors">{s.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${s.phone1.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone1}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${s.phone2.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone2}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-green-400" />
                <a href={`https://wa.me/${s.whatsapp1.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  WhatsApp 1
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-green-400" />
                <a href={`https://wa.me/${s.whatsapp2.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  WhatsApp 2
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Code Craft. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex gap-6" role="list">
              {groupedLinks.Legal?.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}