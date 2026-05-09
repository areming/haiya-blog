import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "880px",
        xl: "880px",
        "2xl": "880px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        "bg-elevated": "hsl(var(--bg-elevated) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-bg": "hsl(var(--muted-bg) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--fg))",
            "--tw-prose-headings": "hsl(var(--fg))",
            "--tw-prose-links": "hsl(var(--accent))",
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
