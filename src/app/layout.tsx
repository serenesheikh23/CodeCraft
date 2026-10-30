import { Geist, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-outfit",
  fallback: ["system-ui", "sans-serif"],
});

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
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
  description: "Building ideas into digital products. Websites, apps and full systems.",
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistSans.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="bg-background text-text antialiased font-body">
        <ScrollToTop />        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
