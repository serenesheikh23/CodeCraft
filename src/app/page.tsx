import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/Services";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Code Craft | Ideas in. Products out.",
  description: "Building ideas into digital products. Websites, apps and full systems.",
};

async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

function ServicesLoader() {
  return (
    <section id="services" className="py-20 lg:py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-pulse">
            Loading...
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 animate-pulse">
            <span className="w-64 h-8 bg-card-hover mx-auto rounded" />
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto animate-pulse">
            <span className="w-48 h-6 bg-card-hover mx-auto rounded" />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Services">
          {[...Array(6)].map((_, i) => (
            <article key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse" role="listitem">
              <div className="w-14 h-14 rounded-xl bg-card-hover mb-5" />
              <div className="h-6 w-3/4 bg-card-hover rounded mb-2" />
              <div className="h-4 w-full bg-card-hover rounded mb-5" />
              <div className="h-8 w-24 bg-card-hover rounded mb-5" />
              <div className="space-y-2 mb-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 w-full bg-card-hover rounded" />
                ))}
              </div>
              <div className="h-12 w-full bg-card-hover rounded" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<ServicesLoader />}>
          <ServicesSection services={services} />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}