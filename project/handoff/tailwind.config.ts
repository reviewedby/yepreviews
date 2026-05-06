// tailwind.config.ts — ported from hifi/hifi-tokens.jsx
// Drop into the Next.js project root.

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0e1220",
          80: "#2a2e3d",
          60: "#5b5f6e",
          40: "#9094a1",
          20: "#d5d7dd",
          10: "#e9eaee",
          "05": "#f4f5f7",
        },
        paper: {
          DEFAULT: "#ffffff",
          warm: "#fafafb",
        },
        accent: {
          DEFAULT: "#5a5af0",
          soft: "#eeeefe",
          dark: "#3e3ec8",
        },
        good:   { DEFAULT: "#12a66a", soft: "#e3f6ee" },
        warn:   "#e8a033",
        danger: "#e04e4e",
        gold:   "#f5b700",
      },
      fontFamily: {
        sans: ['"Inter"', "-apple-system", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card:  "0 1px 3px rgba(14,18,32,0.04)",
        float: "0 12px 40px rgba(14,18,32,0.12)",
        deep:  "0 40px 80px rgba(14,18,32,0.35)",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter:  "-0.035em",
        tight:    "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
