"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, MessageCircle } from "lucide-react";

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
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] glow-blue opacity-50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="section-label text-lime mb-4">GET IN TOUCH</div>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-text mb-6">
              Tell us what
              <br />
              you&apos;re building.
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-12">
              We reply within 24 hours — usually faster.
            </p>

            {/* Email card */}
            <div className="border border-border p-6 mb-6 flex items-start gap-4 hover:border-coral/40 transition-colors">
              <Mail className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Email</div>
                <a
                  href="mailto:serenesheikh23@gmail.com"
                  className="text-text hover:text-coral transition-colors"
                >
                  serenesheikh23@gmail.com
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="border border-border p-6 mb-16 flex items-start gap-4 hover:border-coral/40 transition-colors">
              <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Location</div>
                <div className="text-text">Remote Worldwide</div>
              </div>
            </div>

            {/* Call us directly + WhatsApp */}
            <div className="border-t border-border pt-10">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6">
                Call us directly
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <a
                  href="tel:+963933135837"
                  className="text-text hover:text-coral transition-colors text-lg font-serif whitespace-nowrap"
                >
                  +963 933 135 837
                </a>

                <a
                  href="https://wa.me/963933135837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border text-text-muted hover:bg-coral hover:text-background hover:border-coral transition-colors px-5 py-3 rounded-md font-medium uppercase tracking-wider text-xs w-full sm:w-auto"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="border border-border p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border focus:border-coral outline-none py-3 text-text transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border focus:border-coral outline-none py-3 text-text transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-3 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border focus:border-coral outline-none py-3 text-text transition-colors resize-none"
                  />
                </div>
              </div>

              {status === "success" && (
                <div className="mt-6 border border-lime/40 bg-lime/5 p-4 text-lime text-sm">
                  Message sent successfully. We&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="mt-6 border border-coral/40 bg-coral/5 p-4 text-coral text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-8 w-full bg-text text-background hover:bg-coral hover:text-background transition-colors py-4 rounded-md font-semibold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="mt-6 text-xs text-text-muted">
                By submitting this form, you agree to our privacy policy. We never share your data.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
