import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-serif",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: "Code Craft | Ideas in. Products out.",
  description: "Building ideas into digital products. Websites, apps and full systems. Custom web development, mobile apps, and full-stack solutions.",
  keywords: ["web development", "mobile apps", "custom software", "e-commerce", "full-stack development", "digital agency"],
  authors: [{ name: "Code Craft" }],
  creator: "Code Craft",
  publisher: "Code Craft",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codecraft.dev",
    title: "Code Craft | Ideas in. Products out.",
    description: "Building ideas into digital products. Websites, apps and full systems.",
    siteName: "Code Craft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Craft | Ideas in. Products out.",
    description: "Building ideas into digital products. Websites, apps and full systems.",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="bg-background text-text antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}