import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[70vh] flex items-center bg-background text-text">
        <div className="max-w-[90rem] w-full mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="text-accent text-xs uppercase tracking-[0.2em] font-medium mb-6">
            404 — Not found
          </div>
          <h1 className="font-outfit text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-text">
            Page off
            <br />
            the grid.
          </h1>
          <p className="mt-8 max-w-[42ch] text-lg text-text-muted leading-relaxed">
            That page doesn&apos;t exist or has moved. Head back to the work.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center justify-between gap-6 min-h-[56px] px-6 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.15em] hover:bg-accent/90 transition-colors">
              Back to home
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-between gap-6 min-h-[56px] px-6 border border-border text-text text-sm font-semibold uppercase tracking-[0.15em] hover:border-accent hover:text-accent transition-colors">
              See the work
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
