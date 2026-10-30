import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/Services";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services — Code Craft",
  description: "Websites, apps, and full systems. See what Code Craft builds and what it costs.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-14">
        <ServicesSection services={services} showAll />
      </main>
      <Footer />
    </>
  );
}
