"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle, MessageCircle, ExternalLink, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "serenesheikh23@gmail.com",
      href: "mailto:serenesheikh23@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+963 933 135 837",
      href: "tel:+963933135837",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+963 997 112 295",
      href: "tel:+963997112295",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Remote Worldwide",
      href: "#",
    },
  ];

  const whatsappLinks = [
    { number: "963933135837", label: "WhatsApp 1" },
    { number: "963997112295", label: "WhatsApp 2" },
  ];

  // Social placeholders for future use
  // const socialLinks = [
  //   { icon: Instagram, url: "https://instagram.com/yourhandle", label: "Instagram" },
  //   { icon: Linkedin, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  // ];

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5" style={{
          backgroundImage: `
            radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.2) 0%, transparent 70%)
          `
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Get in touch
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-6">
              Let&apos;s build
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                something great
              </span>
            </h2>
            <p className="text-lg text-text-muted mb-10 leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-muted">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-text hover:text-primary transition-colors mt-1 block"
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-border"
              >
                <p className="text-sm font-medium text-text-muted mb-4">Chat on WhatsApp</p>
                <div className="flex flex-wrap gap-3">
                  {whatsappLinks.map((wa) => (
                    <a
                      key={wa.number}
                      href={`https://wa.me/${wa.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 hover:border-green-500/30 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {wa.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Social placeholders for future use */}
              {/* 
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-4 border-t border-border"
              >
                <p className="text-sm font-medium text-text-muted mb-4">Follow us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-card-hover border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
              */}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-text mb-6">Send us a message</h3>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400"
                  role="alert"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm text-green-400/80">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Failed to send message</p>
                    <p className="text-sm text-red-400/80">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className={cn(
                      "w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    placeholder="John Doe"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className={cn(
                      "w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    placeholder="john@example.com"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    disabled={status === "loading"}
                    className={cn(
                      "w-full px-4 py-3 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    placeholder="Tell us about your project..."
                    aria-required="true"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full btn-primary py-4 text-lg font-medium",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send message
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </motion.button>

                <p className="text-xs text-text-muted text-center">
                  By submitting this form, you agree to our privacy policy. We never share your data.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}