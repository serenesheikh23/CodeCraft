import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[70vh] flex items-center bg-background text-text">
        <div className="max-w-[90rem] w-full mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-6">
            404 — Not found
          </div>
          <h1 className="font-display text-[clamp(1.875rem,8vw,3rem)] leading-[1.0] tracking-[-0.03em] font-extrabold text-text">
            Page off
            <br />
            the grid.
          </h1>
          <p className="mt-8 max-w-[42ch] text-base leading-[1.6] text-text-muted">
            That page doesn&apos;t exist or has moved. Head back to the work.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary-hover focus-ring">
              Back to home
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center gap-3 min-h-[48px] px-6 border border-border-strong text-text text-sm font-medium tracking-wider hover:border-primary hover:text-primary focus-ring">
              See the work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
