import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({ subsets: ["latin"], weight: "variable", display: "swap", variable: "--font-outfit", fallback: ["system-ui", "sans-serif"] });
const geistSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans", fallback: ["system-ui", "sans-serif"] });
const baseUrl = process.env.NEXTAUTH_URL ?? "https://codecraft.pxxlspace.cv";

export const metadata: Metadata = {
  icons: { icon: "/logo-mark.svg" },
  metadataBase: new URL(baseUrl),
  title: { default: "Code Craft | Ideas in. Products out.", template: "%s" },
  description: "Building ideas into digital products. Websites, apps and full systems.",
  applicationName: "Code Craft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Code Craft",
    title: "Code Craft | Ideas in. Products out.",
    description: "Building ideas into digital products. Websites, apps and full systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Craft | Ideas in. Products out.",
    description: "Building ideas into digital products. Websites, apps and full systems.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistSans.variable} scroll-smooth`}>
      <body className="bg-background text-text antialiased font-body">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.15em]">
          Skip to content
        </a>
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
