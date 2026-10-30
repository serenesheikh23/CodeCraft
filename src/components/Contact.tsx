"use client";

import { useState } from "react";
import Link from "next/link";
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
        const text = await res.text();
        setStatus("error");
        setErrorMsg(text || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  // Rate limit check - look for rate limit in error message
  if (errorMsg && errorMsg.includes("rate limit")) {
    return (
      <section id="contact" className="relative py-12 md:py-16 lg:py-20 bg-background text-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 text-center">
            <p className="text-accent text-lg font-medium">
              Rate limit exceeded. You've submitted 3 times in the last 10 minutes.
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-12 md:py-16 lg:py-20 bg-background text-text">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left — contact info */}
          <div className="lg:col-span-5">
            <div className="section-label text-xs uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
              GET IN TOUCH
            </div>

            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text mb-6">
              Tell us what
              <br />
              you're building.
            </h2>

            <p className="text-lg text-text-muted leading-relaxed mb-8">
              We reply within 24 hours — usually faster.
            </p>

            {/* Email card */}
            <div className="border border-border rounded-lg p-5 mb-6 hover:border-accent transition-colors">
              <Mail className="w-5 h-5 text-accent flex-shrink-0 mb-3" />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Email</div>
                <a
                  href="mailto:serenesheikh23@gmail.com"
                  className="text-text hover:text-accent transition-colors"
                >
                  serenesheikh23@gmail.com
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="border border-border rounded-lg p-5 mb-10 hover:border-accent transition-colors">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mb-3" />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Location</div>
                <div className="text-text">Remote Worldwide</div>
              </div>
            </div>

            {/* Call us directly + WhatsApp */}
            <div className="border-t border-border pt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6">
                Call us directly
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <a
                  href="tel:+963933135837"
                  className="text-text hover:text-accent transition-colors text-lg font-display whitespace-nowrap"
                >
                  +963 933 135 837
                </a>

                <a
                  href="https://wa.me/963933135837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border text-text-muted hover:bg-accent hover:text-background hover:border-accent transition-colors px-5 py-3 rounded-md font-medium uppercase tracking-wider text-xs w-full sm:w-auto"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="border border-rounded-lg p-8 lg:p-10">
              <div className="space-y-5">
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
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors"
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
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors"
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
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-text transition-colors resize-none"
                  />
                </div>
              </div>

              {status === "success" && (
                <div className="mt-6 rounded-lg bg-accent/10 p-4 text-accent text-sm">
                  Message sent successfully. We'll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="mt-6 rounded-lg bg-accent/5 p-4 text-accent text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent text-background py-4 rounded-md font-semibold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <p className="mt-5 text-xs text-text-muted">
                By submitting this form, you agree to our privacy policy. We never share your data.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}