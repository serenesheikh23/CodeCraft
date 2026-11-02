import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        text: "rgb(var(--foreground) / <alpha-value>)",
        "text-muted": "rgb(var(--muted) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
        "primary-active": "rgb(var(--primary-active) / <alpha-value>)",
        "primary-tint": "rgb(var(--primary-tint) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        // legacy aliases mapped to the new palette (safety net for any missed class)
        card: "rgb(var(--surface) / <alpha-value>)",
        accent: "rgb(var(--primary) / <alpha-value>)",
        "accent-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        lime: "rgb(var(--primary) / <alpha-value>)",
        info: "rgb(var(--primary) / <alpha-value>)",
        subtle: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        outfit: ["var(--font-archivo)", "system-ui", "sans-serif"],
        archivo: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
        none: "0",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
