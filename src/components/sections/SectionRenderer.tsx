import { prisma } from "@/lib/prisma";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import StatsSection from "./StatsSection";
import LogosSection from "./LogosSection";
import CustomTextSection from "./CustomTextSection";
import ServicesList from "@/components/Services";
import ProjectsList from "@/components/Projects";
import TestimonialsList from "@/components/Testimonials";
import ContactSection from "@/components/Contact";

interface Section {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  content: string;
  order: number;
  name?: string;
  isVisible?: boolean;
}

export default async function SectionRenderer({ section }: { section: Section }) {
  let content: Record<string, unknown> = {};
  try {
    content = JSON.parse(section.content || "{}");
  } catch {
    content = {};
  }

  const sharedProps = {
    title: section.title,
    subtitle: section.subtitle,
    content,
  };

  switch (section.type) {
    case "hero":
      return <HeroSection {...sharedProps} />;
    case "features":
      return <FeaturesSection {...sharedProps} />;
    case "pricing":
      return <PricingSection {...sharedProps} />;
    case "faq":
      return <FaqSection {...sharedProps} />;
    case "gallery":
      return <GallerySection {...sharedProps} />;
    case "stats":
      return <StatsSection {...sharedProps} />;
    case "logos":
      return <LogosSection {...sharedProps} />;
    case "custom-text":
      return <CustomTextSection {...sharedProps} />;
    case "services": {
      const services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
      return <ServicesList services={services} />;
    }
    case "projects": {
      const projects = await prisma.project.findMany({
        where: { isActive: true, featured: true },
        orderBy: { order: "asc" },
      });
      return <ProjectsList projects={projects as any} title={section.title} subtitle={section.subtitle} />;
    }
    case "testimonials": {
      const testimonials = await prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
      return <TestimonialsList testimonials={testimonials} />;
    }
    case "contact":
      return <ContactSection />;
    default:
      return null;
  }
}