import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#22D3EE",
        background: "#0B1220",
        primary: "#2563EB",
        accent: "#22D3EE",
        text: "#F8FAFC",
        "text-muted": "#94A3B8",
        card: "#111A2E",
        "card-hover": "#17223B",
        coral: "#3B82F6",
        border: "#1E2A44",
        "accent-300": "rgb(var(--color-accent-300) / <alpha-value>)",
        "accent-400": "rgb(var(--color-accent-400) / <alpha-value>)",
        "accent-500": "rgb(var(--color-accent-500) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        "4px": "var(--space-4)",
        "8px": "var(--space-8)",
        "12px": "var(--space-12)",
        "16px": "var(--space-16)",
        "24px": "var(--space-24)",
        "32px": "var(--space-32)",
        "48px": "var(--space-48)",
        "64px": "var(--space-64)",
        "96px": "var(--space-96)",
        "128px": "var(--space-128)",
      },
      borderRadius: {
        "token-sm": "var(--radius-sm)",
        "token-md": "var(--radius-md)",
        "token-lg": "var(--radius-lg)",
        "token-xl": "var(--radius-xl)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)",
        "gradient-text": "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
        "gradient-border": "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(37, 99, 235, 0.2)",
        "glow-accent": "0 0 30px rgba(34, 211, 238, 0.2)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;