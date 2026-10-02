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