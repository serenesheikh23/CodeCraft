"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const text = await res.text();
        setStatus("error");
        setErrorMsg(text || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const rateLimited = status === "error" && /rate.?limit|too many/i.test(errorMsg);

  return (
    <section id="contact" className="relative py-12 md:py-16 lg:py-20 bg-background text-text" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">Get in touch</div>
            <h2 id="contact-heading" className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6">
              Tell us what<br />you&apos;re building.
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">We reply within 24 hours — usually faster.</p>

            <div className="border border-border p-5 mb-4">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Email</div>
              <a href="mailto:serenesheikh23@gmail.com" className="text-text hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">serenesheikh23@gmail.com</a>
            </div>

            <div className="border border-border p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Location</div>
              <div className="text-text">Remote worldwide</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="border border-border p-8 lg:p-10" noValidate>
              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">Full name</label>
                  <input id="contact-name" name="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">Email</label>
                  <input id="contact-email" name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">Message</label>
                  <textarea id="contact-message" name="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors resize-none" />
                </div>
              </div>

              <div aria-live="polite" aria-atomic="true">
                {status === "success" && <p className="mt-6 text-sm text-accent">Message sent. We&apos;ll reply within 24 hours.</p>}
                {status === "error" && !rateLimited && <p className="mt-6 text-sm text-accent">{errorMsg}</p>}
                {rateLimited && <p className="mt-6 text-sm text-accent">Too many submissions. Please wait 10 minutes and try again.</p>}
              </div>

              <button type="submit" disabled={status === "loading" || rateLimited} className="mt-8 w-full bg-accent text-accent-foreground py-4 font-semibold uppercase tracking-wider text-xs disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
