import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  Code2,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Linkedin,
} from "lucide-react";

export default async function Footer() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  const links = await prisma.footerLink.findMany({
    where: { isActive: true },
    orderBy: [{ section: "asc" }, { order: "asc" }],
  });

  const grouped: Record<string, typeof links> = {};
  for (const link of links) {
    if (!grouped[link.section]) grouped[link.section] = [];
    grouped[link.section].push(link);
  }

  const HIDDEN_SECTIONS = ["Services", "Contact"];

  const year = new Date().getFullYear();

  const contactLinks: { href: string; label: string; icon: React.ReactNode; external?: boolean }[] = [];

  if (settings?.email) {
    contactLinks.push({
      href: `mailto:${settings.email}`,
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
    });
  }
  if (settings?.phone1) {
    contactLinks.push({
      href: `tel:${settings.phone1.replace(/\s/g, "")}`,
      label: "Phone 1",
      icon: <Phone className="w-4 h-4" />,
    });
  }
  if (settings?.phone2) {
    contactLinks.push({
      href: `tel:${settings.phone2.replace(/\s/g, "")}`,
      label: "Phone 2",
      icon: <Phone className="w-4 h-4" />,
    });
  }
  if (settings?.whatsapp1) {
    contactLinks.push({
      href: `https://wa.me/${settings.whatsapp1.replace(/[^0-9]/g, "")}`,
      label: "WhatsApp 1",
      icon: <MessageCircle className="w-4 h-4" />,
      external: true,
    });
  }
  if (settings?.whatsapp2) {
    contactLinks.push({
      href: `https://wa.me/${settings.whatsapp2.replace(/[^0-9]/g, "")}`,
      label: "WhatsApp 2",
      icon: <MessageCircle className="w-4 h-4" />,
      external: true,
    });
  }
  if (settings?.instagramUrl) {
    contactLinks.push({
      href: settings.instagramUrl,
      label: "Instagram",
      icon: <Instagram className="w-4 h-4" />,
      external: true,
    });
  }
  if (settings?.linkedin1Url) {
    contactLinks.push({
      href: settings.linkedin1Url,
      label: "LinkedIn 1",
      icon: <Linkedin className="w-4 h-4" />,
      external: true,
    });
  }
  if (settings?.linkedin2Url) {
    contactLinks.push({
      href: settings.linkedin2Url,
      label: "LinkedIn 2",
      icon: <Linkedin className="w-4 h-4" />,
      external: true,
    });
  }

  // Also filter out "Contact" label from any visible section
  const visibleSections = Object.entries(grouped)
    .filter(([section]) => !HIDDEN_SECTIONS.includes(section))
    .map(([section, sectionLinks]) => [
      section,
      sectionLinks.filter((link) => link.label !== "Contact"),
    ] as [string, typeof sectionLinks])
    .filter(([, sectionLinks]) => sectionLinks.length > 0);

  return (
    <footer className="relative bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Brand + contact icons */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-text font-bold text-xl mb-6 group">
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
                />
              </div>
              Code Craft
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-8">
              Building ideas into digital products.
              <br />
              Websites, apps and full systems.
            </p>

            {contactLinks.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {contactLinks.map((link, i) => {
                  const className = "btn-icon";
                  if (link.external) {
                    return (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className={className}
                      >
                        {link.icon}
                      </a>
                    );
                  }
                  return (
                    <a key={i} href={link.href} aria-label={link.label} title={link.label} className={className}>
                      {link.icon}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            {visibleSections.map(([section, sectionLinks]) => (
              <div key={section}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6 font-medium">
                  {section}
                </h3>
                <ul className="space-y-3">
                  {sectionLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-sm text-text hover:text-lime transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 lg:mt-28 pt-10 border-t border-border">
          <p className="text-xs text-text-muted text-center md:text-left">
            © {year} Code Craft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
