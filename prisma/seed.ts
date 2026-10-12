import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@codecraft.com" },
    update: {},
    create: {
      email: "admin@codecraft.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Services data from Code Craft PDF
  const services = [
    {
      name: "Landing Page",
      description: "High-converting single page websites with modern design and smooth animations",
      minPrice: 150,
      maxPrice: 400,
      features: JSON.stringify([
        "Responsive design",
        "SEO optimized",
        "Contact form integration",
        "Analytics setup",
        "Fast loading",
        "Modern animations"
      ]),
      icon: "layout",
      order: 1,
    },
    {
      name: "Business Website",
      description: "Professional multi-page websites for businesses with CMS and custom features",
      minPrice: 400,
      maxPrice: 900,
      features: JSON.stringify([
        "Multi-page structure",
        "Content management system",
        "Blog integration",
        "Team/Careers pages",
        "Service catalog",
        "Google Maps integration"
      ]),
      icon: "building",
      order: 2,
    },
    {
      name: "Custom Web App",
      description: "Tailored web applications with complex logic, user dashboards, and real-time features",
      minPrice: 800,
      maxPrice: 2500,
      features: JSON.stringify([
        "User authentication",
        "Dashboard & analytics",
        "Real-time updates",
        "Role-based access",
        "API integrations",
        "Database design"
      ]),
      icon: "code",
      order: 3,
    },
    {
      name: "E-commerce Platform",
      description: "Full-featured online stores with payment processing, inventory management, and analytics",
      minPrice: 1000,
      maxPrice: 3000,
      features: JSON.stringify([
        "Product catalog",
        "Shopping cart & checkout",
        "Payment gateway integration",
        "Inventory management",
        "Order tracking",
        "Customer accounts"
      ]),
      icon: "shopping-cart",
      order: 4,
    },
    {
      name: "Starter App",
      description: "Mobile app MVP with core features for iOS and Android using React Native",
      minPrice: 600,
      maxPrice: 1500,
      features: JSON.stringify([
        "Cross-platform (iOS/Android)",
        "Core features only",
        "Basic UI/UX",
        "API integration",
        "App store deployment",
        "Push notifications"
      ]),
      icon: "smartphone",
      order: 5,
    },
    {
      name: "Full App",
      description: "Complete mobile application with advanced features, backend, and admin panel",
      minPrice: 1500,
      maxPrice: 4000,
      features: JSON.stringify([
        "Advanced features",
        "Custom backend API",
        "Admin dashboard",
        "Real-time chat",
        "Offline support",
        "Analytics & crash reporting"
      ]),
      icon: "layers",
      order: 6,
    },
    {
      name: "App + Backend Combo",
      description: "Complete solution with mobile app, web admin panel, and scalable backend infrastructure",
      minPrice: 2000,
      maxPrice: 5000,
      features: JSON.stringify([
        "Mobile app (iOS/Android)",
        "Web admin panel",
        "Scalable backend",
        "Database design",
        "CI/CD pipeline",
        "Monitoring & logs"
      ]),
      icon: "git-branch",
      order: 7,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: `service-${service.order}` },
      update: service,
      create: {
        ...service,
        id: `service-${service.order}`,
      },
    });
  }
  console.log("✅ Services seeded:", services.length);

  // Add-ons data from Code Craft PDF
  const addOns = [
    {
      name: "Payment Gateway Integration",
      description: "Secure payment processing with Stripe, PayPal, or local providers",
      price: 200,
      icon: "credit-card",
      order: 1,
    },
    {
      name: "Admin Dashboard",
      description: "Custom admin panel for managing content, users, and analytics",
      price: 300,
      icon: "layout-dashboard",
      order: 2,
    },
    {
      name: "Real-time Features",
      description: "WebSocket integration for live updates, chat, and notifications",
      price: 250,
      icon: "zap",
      order: 3,
    },
    {
      name: "Multi-language Support",
      description: "Internationalization (i18n) with RTL support for global reach",
      price: 150,
      icon: "globe",
      order: 4,
    },
    {
      name: "Light/Dark Mode",
      description: "Beautiful theme switching with system preference detection",
      price: 100,
      icon: "sun-moon",
      order: 5,
    },
    {
      name: "API Development",
      description: "RESTful or GraphQL APIs with documentation and rate limiting",
      price: 400,
      icon: "server",
      order: 6,
    },
    {
      name: "Push Notifications",
      description: "Cross-platform push notifications with scheduling and segmentation",
      price: 150,
      icon: "bell",
      order: 7,
    },
    {
      name: "SEO Optimization",
      description: "Technical SEO, meta tags, sitemaps, and performance optimization",
      price: 200,
      icon: "search",
      order: 8,
    },
    {
      name: "Ongoing Maintenance",
      description: "Monthly updates, security patches, and performance monitoring",
      price: 100,
      icon: "wrench",
      order: 9,
    },
    {
      name: "Bug Fixing",
      description: "Dedicated bug fixing and technical support for existing projects",
      price: 150,
      icon: "bug",
      order: 10,
    },
  ];

  for (const addOn of addOns) {
    await prisma.addOn.upsert({
      where: { id: `addon-${addOn.order}` },
      update: addOn,
      create: {
        ...addOn,
        id: `addon-${addOn.order}`,
      },
    });
  }
  console.log("✅ Add-ons seeded:", addOns.length);

  // Bundled "Full Solution" package (as a special service)
  await prisma.service.upsert({
    where: { id: "service-bundle" },
    update: {},
    create: {
      id: "service-bundle",
      name: "Full Solution Bundle",
      description: "Complete package: Website + Mobile App + Backend + Admin Panel + All Add-ons",
      minPrice: 3500,
      maxPrice: 8000,
      features: JSON.stringify([
        "Business website included",
        "Mobile app (iOS & Android)",
        "Custom backend & API",
        "Admin dashboard",
        "Payment gateway",
        "Real-time features",
        "Multi-language support",
        "Light/Dark mode",
        "Push notifications",
        "SEO optimization",
        "1 year maintenance",
        "Priority support"
      ]),
      icon: "package",
      order: 8,
    },
  });
  console.log("✅ Bundle package created");

  // Projects seed data
  const projects = [
    {
      id: "project-1",
      title: "SaaS Analytics Dashboard",
      slug: "saas-analytics-dashboard",
      description: "A comprehensive analytics dashboard for SaaS businesses with real-time metrics, user behavior tracking, and automated reporting.",
      problem: "The client needed a centralized platform to monitor key SaaS metrics like MRR, churn rate, user engagement, and feature adoption across multiple products.",
      solution: "Built a full-stack Next.js application with real-time data visualization using WebSocket connections, custom charting components, and role-based access control for team collaboration.",
      outcome: "Reduced reporting time by 80%, improved team decision-making with real-time insights, and enabled the client to identify churn risks 2 weeks earlier.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      liveUrl: "https://demo-saas-dashboard.codecraft.dev",
      githubUrl: "https://github.com/codecraft/saas-dashboard",
      techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Chart.js", "Socket.io"]),
      featured: true,
      order: 1,
      isActive: true,
    },
    {
      id: "project-2",
      title: "E-commerce Fashion Store",
      slug: "ecommerce-fashion-store",
      description: "A modern, high-performance e-commerce platform for a fashion brand with advanced filtering, wishlist, and seamless checkout experience.",
      problem: "The fashion retailer's legacy platform suffered from slow load times, poor mobile experience, and limited customization for seasonal campaigns.",
      solution: "Developed a headless e-commerce solution with Next.js, integrated Stripe for payments, Algolia for search, and a custom CMS for content management. Implemented progressive web app features for offline browsing.",
      outcome: "Increased conversion rate by 45%, reduced page load time to under 1.5s, and achieved 99.9% uptime during Black Friday traffic spikes.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      liveUrl: "https://demo-fashion-store.codecraft.dev",
      githubUrl: "https://github.com/codecraft/fashion-store",
      techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Algolia", "Tailwind CSS", "Vercel"]),
      featured: true,
      order: 2,
      isActive: true,
    },
    {
      id: "project-3",
      title: "Mobile Task Management App",
      slug: "mobile-task-management-app",
      description: "A cross-platform mobile application for team task management with real-time collaboration, offline support, and push notifications.",
      problem: "Distributed teams struggled with existing tools that lacked offline capability, had poor mobile UX, and didn't support real-time updates reliably.",
      solution: "Built with React Native and Expo, featuring a custom sync engine for offline-first architecture, Firebase for real-time data, and native push notifications. Includes dark mode, biometric auth, and widget support.",
      outcome: "Achieved 4.8★ app store rating, 60% daily active user rate, and reduced task completion time by 35% for remote teams.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      liveUrl: "https://apps.apple.com/app/taskflow",
      githubUrl: "https://github.com/codecraft/taskflow-mobile",
      techStack: JSON.stringify(["React Native", "Expo", "TypeScript", "Firebase", "Redux Toolkit", "React Navigation", "AsyncStorage"]),
      featured: true,
      order: 3,
      isActive: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }
  console.log("✅ Projects seeded:", projects.length);

  // Testimonials seed data
  const testimonials = [
    {
      id: "testimonial-1",
      clientName: "Sarah Chen",
      clientRole: "CTO",
      clientCompany: "TechFlow Inc.",
      content: "Code Craft delivered our SaaS dashboard ahead of schedule and exceeded all requirements. Their technical expertise in real-time data visualization is exceptional. The team communicated clearly throughout and the code quality is production-ready from day one.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      projectId: "project-1",
      order: 1,
      isActive: true,
    },
    {
      id: "testimonial-2",
      clientName: "Marcus Johnson",
      clientRole: "Founder & CEO",
      clientCompany: "Urban Threads",
      content: "Our new e-commerce platform has transformed our business. The checkout flow is incredibly smooth, and the mobile experience is flawless. Code Craft understood our brand vision and translated it into a performant, beautiful store that converts.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      projectId: "project-2",
      order: 2,
      isActive: true,
    },
    {
      id: "testimonial-3",
      clientName: "Emily Rodriguez",
      clientRole: "Product Manager",
      clientCompany: "RemoteFirst Co.",
      content: "The mobile app Code Craft built for us has become essential to our daily workflow. The offline sync feature is a game-changer for our distributed team. Professional, responsive, and they truly care about the product's success.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      projectId: "project-3",
      order: 3,
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: testimonial,
      create: testimonial,
    });
  }
  console.log("✅ Testimonials seeded:", testimonials.length);

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });