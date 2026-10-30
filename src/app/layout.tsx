import { Geist, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({ subsets: ["latin"], weight: "variable", display: "swap", variable: "--font-outfit", fallback: ["system-ui", "sans-serif"] });
const geistSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist-sans", fallback: ["system-ui", "sans-serif"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-serif", fallback: ["Georgia", "Times New Roman", "serif"] });

const baseUrl = process.env.NEXTAUTH_URL ?? "https://codecraft.pxxlspace.cv";

export const metadata: Metadata = {
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
    <html lang="en" className={`${outfit.variable} ${geistSans.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="bg-background text-text antialiased font-body">
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
