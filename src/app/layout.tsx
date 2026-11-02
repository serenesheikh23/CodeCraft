import { Archivo } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["system-ui", "sans-serif"],
});

const canonicalUrl = "https://codecraftdigitalstudio.vercel.app";

export const metadata: Metadata = {
  icons: { icon: "/logo-mark.svg" },
  metadataBase: new URL(canonicalUrl),
  title: { default: "Code Craft | Websites for small businesses", template: "%s | Code Craft" },
  description:
    "Fast, secure websites for small businesses, with an admin you can edit yourself. Book a free 20-minute call.",
  applicationName: "Code Craft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Code Craft",
    title: "Code Craft | Websites for small businesses",
    description:
      "Fast, secure websites for small businesses, with an admin you can edit yourself. Book a free 20-minute call.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Craft | Websites for small businesses",
    description:
      "Fast, secure websites for small businesses, with an admin you can edit yourself. Book a free 20-minute call.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#EEF0F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} scroll-smooth`}>
      <body className="bg-background text-text antialiased font-body">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.15em]">
          Skip to content
        </a>
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}