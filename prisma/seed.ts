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

  // Services
  const services = [
    { name: "Landing Page", description: "High-converting single page websites with modern design and smooth animations", minPrice: 150, maxPrice: 400, features: JSON.stringify(["Responsive design","SEO optimized","Contact form integration","Analytics setup","Fast loading","Modern animations"]), icon: "layout", order: 1 },
    { name: "Business Website", description: "Professional multi-page websites for businesses with CMS and custom features", minPrice: 400, maxPrice: 900, features: JSON.stringify(["Multi-page structure","Content management system","Blog integration","Team/Careers pages","Service catalog","Google Maps integration"]), icon: "building", order: 2 },
    { name: "Custom Web App", description: "Tailored web applications with complex logic, user dashboards, and real-time features", minPrice: 800, maxPrice: 2500, features: JSON.stringify(["User authentication","Dashboard & analytics","Real-time updates","Role-based access","API integrations","Database design"]), icon: "code", order: 3 },
    { name: "E-commerce Platform", description: "Full-featured online stores with payment processing, inventory management, and analytics", minPrice: 1000, maxPrice: 3000, features: JSON.stringify(["Product catalog","Shopping cart & checkout","Payment gateway integration","Inventory management","Order tracking","Customer accounts"]), icon: "shopping-cart", order: 4 },
    { name: "Starter App", description: "Mobile app MVP with core features for iOS and Android using React Native", minPrice: 600, maxPrice: 1500, features: JSON.stringify(["Cross-platform (iOS/Android)","Core features only","Basic UI/UX","API integration","App store deployment","Push notifications"]), icon: "smartphone", order: 5 },
    { name: "Full App", description: "Complete mobile application with advanced features, backend, and admin panel", minPrice: 1500, maxPrice: 4000, features: JSON.stringify(["Advanced features","Custom backend API","Admin dashboard","Real-time chat","Offline support","Analytics & crash reporting"]), icon: "layers", order: 6 },
    { name: "App + Backend Combo", description: "Complete solution with mobile app, web admin panel, and scalable backend infrastructure", minPrice: 2000, maxPrice: 5000, features: JSON.stringify(["Mobile app (iOS/Android)","Web admin panel","Scalable backend","Database design","CI/CD pipeline","Monitoring & logs"]), icon: "git-branch", order: 7 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: `service-${service.order}` },
      update: service,
      create: { ...service, id: `service-${service.order}` },
    });
  }
  console.log("✅ Services seeded:", services.length);

  // Add-ons
  const addOns = [
    { name: "Payment Gateway Integration", description: "Secure payment processing with Stripe, PayPal, or local providers", price: 200, icon: "credit-card", order: 1 },
    { name: "Admin Dashboard", description: "Custom admin panel for managing content, users, and analytics", price: 300, icon: "layout-dashboard", order: 2 },
    { name: "Real-time Features", description: "WebSocket integration for live updates, chat, and notifications", price: 250, icon: "zap", order: 3 },
    { name: "Multi-language Support", description: "Internationalization (i18n) with RTL support for global reach", price: 150, icon: "globe", order: 4 },
    { name: "Light/Dark Mode", description: "Beautiful theme switching with system preference detection", price: 100, icon: "sun-moon", order: 5 },
    { name: "API Development", description: "RESTful or GraphQL APIs with documentation and rate limiting", price: 400, icon: "server", order: 6 },
    { name: "Push Notifications", description: "Cross-platform push notifications with scheduling and segmentation", price: 150, icon: "bell", order: 7 },
    { name: "SEO Optimization", description: "Technical SEO, meta tags, sitemaps, and performance optimization", price: 200, icon: "search", order: 8 },
    { name: "Ongoing Maintenance", description: "Monthly updates, security patches, and performance monitoring", price: 100, icon: "wrench", order: 9 },
    { name: "Bug Fixing", description: "Dedicated bug fixing and technical support for existing projects", price: 150, icon: "bug", order: 10 },
  ];

  for (const addOn of addOns) {
    await prisma.addOn.upsert({
      where: { id: `addon-${addOn.order}` },
      update: addOn,
      create: { ...addOn, id: `addon-${addOn.order}` },
    });
  }
  console.log("✅ Add-ons seeded:", addOns.length);

  // Bundle
  await prisma.service.upsert({
    where: { id: "service-bundle" },
    update: {},
    create: {
      id: "service-bundle",
      name: "Full Solution Bundle",
      description: "Complete package: Website + Mobile App + Backend + Admin Panel + All Add-ons",
      minPrice: 3500,
      maxPrice: 8000,
      features: JSON.stringify(["Business website included","Mobile app (iOS & Android)","Custom backend & API","Admin dashboard","Payment gateway","Real-time features","Multi-language support","Light/Dark mode","Push notifications","SEO optimization","1 year maintenance","Priority support"]),
      icon: "package",
      order: 8,
    },
  });
  console.log("✅ Bundle package created");

  // Projects
  const projects = [
    {
      id: "project-1", title: "SaaS Analytics Dashboard", slug: "saas-analytics-dashboard",
      description: "A comprehensive analytics dashboard for SaaS businesses with real-time metrics, user behavior tracking, and automated reporting.",
      problem: "The client needed a centralized platform to monitor key SaaS metrics like MRR, churn rate, user engagement, and feature adoption across multiple products.",
      solution: "Built a full-stack Next.js application with real-time data visualization using WebSocket connections, custom charting components, and role-based access control for team collaboration.",
      outcome: "Reduced reporting time by 80%, improved team decision-making with real-time insights, and enabled the client to identify churn risks 2 weeks earlier.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      liveUrl: "https://demo-saas-dashboard.codecraft.dev", githubUrl: "https://github.com/codecraft/saas-dashboard",
      techStack: JSON.stringify(["Next.js","TypeScript","Prisma","PostgreSQL","Tailwind CSS","Chart.js","Socket.io"]),
      featured: true, order: 1, isActive: true,
    },
    {
      id: "project-2", title: "E-commerce Fashion Store", slug: "ecommerce-fashion-store",
      description: "A modern, high-performance e-commerce platform for a fashion brand with advanced filtering, wishlist, and seamless checkout experience.",
      problem: "The fashion retailer's legacy platform suffered from slow load times, poor mobile experience, and limited customization for seasonal campaigns.",
      solution: "Developed a headless e-commerce solution with Next.js, integrated Stripe for payments, Algolia for search, and a custom CMS for content management. Implemented progressive web app features for offline browsing.",
      outcome: "Increased conversion rate by 45%, reduced page load time to under 1.5s, and achieved 99.9% uptime during Black Friday traffic spikes.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      liveUrl: "https://demo-fashion-store.codecraft.dev", githubUrl: "https://github.com/codecraft/fashion-store",
      techStack: JSON.stringify(["Next.js","TypeScript","Prisma","PostgreSQL","Stripe","Algolia","Tailwind CSS","Vercel"]),
      featured: true, order: 2, isActive: true,
    },
    {
      id: "project-3", title: "Mobile Task Management App", slug: "mobile-task-management-app",
      description: "A cross-platform mobile application for team task management with real-time collaboration, offline support, and push notifications.",
      problem: "Distributed teams struggled with existing tools that lacked offline capability, had poor mobile UX, and didn't support real-time updates reliably.",
      solution: "Built with React Native and Expo, featuring a custom sync engine for offline-first architecture, Firebase for real-time data, and native push notifications. Includes dark mode, biometric auth, and widget support.",
      outcome: "Achieved 4.8★ app store rating, 60% daily active user rate, and reduced task completion time by 35% for remote teams.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      liveUrl: "https://apps.apple.com/app/taskflow", githubUrl: "https://github.com/codecraft/taskflow-mobile",
      techStack: JSON.stringify(["React Native","Expo","TypeScript","Firebase","Redux Toolkit","React Navigation","AsyncStorage"]),
      featured: true, order: 3, isActive: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({ where: { id: project.id }, update: project, create: project });
  }
  console.log("✅ Projects seeded:", projects.length);

  // Testimonials
  const testimonials = [
    {
      id: "testimonial-1", clientName: "Sarah Chen", clientRole: "CTO", clientCompany: "TechFlow Inc.",
      content: "Code Craft delivered our SaaS dashboard ahead of schedule and exceeded all requirements. Their technical expertise in real-time data visualization is exceptional. The team communicated clearly throughout and the code quality is production-ready from day one.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      projectId: "project-1", order: 1, isActive: true,
    },
    {
      id: "testimonial-2", clientName: "Marcus Johnson", clientRole: "Founder & CEO", clientCompany: "Urban Threads",
      content: "Our new e-commerce platform has transformed our business. The checkout flow is incredibly smooth, and the mobile experience is flawless. Code Craft understood our brand vision and translated it into a performant, beautiful store that converts.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      projectId: "project-2", order: 2, isActive: true,
    },
    {
      id: "testimonial-3", clientName: "Emily Rodriguez", clientRole: "Product Manager", clientCompany: "RemoteFirst Co.",
      content: "The mobile app Code Craft built for us has become essential to our daily workflow. The offline sync feature is a game-changer for our distributed team. Professional, responsive, and they truly care about the product's success.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      projectId: "project-3", order: 3, isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({ where: { id: testimonial.id }, update: testimonial, create: testimonial });
  }
  console.log("✅ Testimonials seeded:", testimonials.length);

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
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
    },
  });
  console.log("✅ Site Settings created");

  // Footer Links
  const footerLinks = [
    { section: "Company", label: "About Us", href: "/about", order: 1 },
    { section: "Company", label: "Services", href: "/#services", order: 2 },
    { section: "Company", label: "Pricing", href: "/#services", order: 3 },
    { section: "Company", label: "Contact", href: "/#contact", order: 4 },
    { section: "Services", label: "Web Development", href: "/#services", order: 1 },
    { section: "Services", label: "Mobile Apps", href: "/#services", order: 2 },
    { section: "Services", label: "E-commerce", href: "/#services", order: 3 },
    { section: "Services", label: "Custom Solutions", href: "/#services", order: 4 },
    { section: "Legal", label: "Privacy Policy", href: "/legal/privacy", order: 1 },
    { section: "Legal", label: "Terms of Service", href: "/legal/terms", order: 2 },
    { section: "Legal", label: "Cookie Policy", href: "/legal/cookies", order: 3 },
  ];

  for (const link of footerLinks) {
    const id = `footer-${link.section.toLowerCase()}-${link.order}`;
    await prisma.footerLink.upsert({
      where: { id },
      update: { ...link, isActive: true },
      create: { id, ...link, isActive: true },
    });
  }
  console.log("✅ Footer Links seeded:", footerLinks.length);

  // Legal Pages
  const legalPages = [
    { slug: "privacy", title: "Privacy Policy", content: "Last updated: " + new Date().toLocaleDateString() + "\n\nCode Craft is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.\n\n## Information We Collect\n\nWe may collect personal information (name, email, phone) when you submit a contact form, and technical information (IP, browser, pages visited) for analytics.\n\n## How We Use Your Information\n\nWe use your information to respond to inquiries, improve our services, and comply with legal obligations.\n\n## Data Sharing\n\nWe do not sell or rent your personal information. We may share data with service providers who assist us in operating our website.\n\n## Contact\n\nFor questions: serenesheikh23@gmail.com" },
    { slug: "terms", title: "Terms of Service", content: "Last updated: " + new Date().toLocaleDateString() + "\n\nBy using Code Craft's website and services, you agree to these Terms.\n\n## Services\n\nCode Craft provides web development, mobile app development, and custom software solutions.\n\n## Client Responsibilities\n\nClients agree to provide accurate requirements, respond timely, provide necessary access, and make payments according to schedule.\n\n## Intellectual Property\n\nUpon full payment, custom deliverables become the client's property.\n\n## Contact\n\nFor questions: serenesheikh23@gmail.com" },
    { slug: "cookies", title: "Cookie Policy", content: "Last updated: " + new Date().toLocaleDateString() + "\n\nThis Cookie Policy explains how Code Craft uses cookies.\n\n## What Are Cookies\n\nCookies are small text files stored on your device when you visit a website.\n\n## Types of Cookies We Use\n\nEssential cookies (required for the site to function), analytics cookies (help us understand usage), and preference cookies (remember your settings).\n\n## Managing Cookies\n\nYou can control cookies through your browser settings.\n\n## Contact\n\nFor questions: serenesheikh23@gmail.com" },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.upsert({ where: { slug: page.slug }, update: page, create: page });
  }
  console.log("✅ Legal Pages seeded:", legalPages.length);

  // Custom Pages
  const customPages = [
    {
      id: "page-about",
      slug: "about",
      title: "About Us",
      content: "Code Craft is an independent studio building digital products. We turn ideas into production-ready websites, apps, and full systems.\n\nOur approach is simple: listen carefully, think deeply, build well. No templates, no shortcuts—just solid engineering and thoughtful design.\n\nWe work with founders, product teams, and agencies who need reliable technical partners.",
      isActive: true,
    },
  ];

  for (const page of customPages) {
    await prisma.customPage.upsert({ where: { id: page.id }, update: page, create: page });
  }
  console.log("✅ Custom Pages seeded:", customPages.length);

  // Nav Links
  const navLinks = [
    { label: "Work", href: "/#projects", order: 1 },
    { label: "Services", href: "/#services", order: 2 },
    { label: "About", href: "/p/about", order: 3 },
    { label: "Contact", href: "/#contact", order: 4 },
  ];

  for (const link of navLinks) {
    const id = `navlink-${link.order}`;
    await prisma.navLink.upsert({
      where: { id },
      update: { ...link, isActive: true, isExternal: false },
      create: { id, ...link, isActive: true, isExternal: false },
    });
  }
  console.log("✅ Nav Links seeded:", navLinks.length);

  // Homepage Sections
  const homepageSections = [
    {
      id: "section-hero", type: "hero", name: "Hero", title: "", subtitle: "", order: 0, isVisible: true,
      content: JSON.stringify({
        badge: "",
        headline: "Ideas in.\nProducts out.",
        subheadline: "Building ideas into digital products. Websites, apps and full systems.",
        cta1Label: "Start a project",
        cta1Href: "/#contact",
        cta2Label: "View services",
        cta2Href: "/#services",
      }),
    },
    {
      id: "section-services", type: "features", name: "Services Overview", title: "Our Services", subtitle: "Digital solutions tailored for you", order: 1, isVisible: false,
      content: JSON.stringify({
        items: [
          { icon: "layout", title: "Web Development", description: "Modern, responsive websites built with Next.js and Tailwind CSS" },
          { icon: "smartphone", title: "Mobile Apps", description: "Cross-platform iOS and Android apps using React Native" },
          { icon: "server", title: "Custom Backend", description: "Scalable APIs and infrastructure with Node.js and PostgreSQL" },
        ],
      }),
    },
    {
      id: "section-pricing", type: "pricing", name: "Pricing Plans", title: "Pricing", subtitle: "Transparent pricing for every stage", order: 2, isVisible: false,
      content: JSON.stringify({
        plans: [
          { name: "Starter", price: 150, period: "project", features: ["Landing page","Responsive design","SEO basics","Contact form","Analytics setup"], ctaLabel: "Start a project", ctaHref: "/#contact", featured: false },
          { name: "Professional", price: 800, period: "project", features: ["Multi-page website","CMS included","Blog integration","Admin dashboard","SEO optimization","1 month support"], ctaLabel: "Start a project", ctaHref: "/#contact", featured: true },
          { name: "Enterprise", price: 2500, period: "project", features: ["Custom web app","User authentication","Real-time features","Role-based access","API integrations","3 months support"], ctaLabel: "Discuss a project", ctaHref: "/#contact", featured: false },
        ],
      }),
    },
    {
      id: "section-faq", type: "faq", name: "FAQ", title: "Frequently Asked Questions", subtitle: "Everything you need to know", order: 3, isVisible: false,
      content: JSON.stringify({
        items: [
          { question: "How long does a typical project take?", answer: "Timelines vary by scope. A landing page takes 1-2 weeks, a business website 3-6 weeks, and a custom web app 2-4 months." },
          { question: "Do you offer ongoing maintenance?", answer: "Yes. Monthly maintenance plans start at $100/month covering updates, security patches, and support." },
          { question: "What is your payment structure?", answer: "Typically 50% upfront, 50% on delivery. For larger projects, we split into milestones tied to deliverables." },
          { question: "Can you work with my existing team?", answer: "Absolutely. We integrate with your workflow—GitHub, Linear, Slack, Notion, Figma." },
        ],
      }),
    },
    {
      id: "section-cta", type: "cta", name: "CTA Banner", title: "", subtitle: "", order: 4, isVisible: true,
      content: JSON.stringify({
        headline: "Have a project in mind?",
        subheadline: "Let's talk about what you're building.",
        buttonLabel: "Start a project",
        buttonHref: "/#contact",
      }),
    },
  ];

  for (const section of homepageSections) {
    await prisma.homepageSection.upsert({ where: { id: section.id }, update: section, create: section });
  }
  console.log("✅ Homepage Sections seeded:", homepageSections.length);

  console.log("🎉 All seed data completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });