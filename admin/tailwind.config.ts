import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Engine-room dark theme, shared with the public site.
        ink: "#f7f9fc", // page background
        panel: "#ffffff", // card background
        panel2: "#f1f5f9", // raised card background
        line: "#e2e8f0", // hairline borders
        acid: "#2563eb", // primary accent — electric lime
        aciddim: "#1d4ed8",
        iris: "#3b82f6", // secondary accent — violet
        ember: "#ef4444", // warm accent / errors
        cyanx: "#60a5fa", // tertiary accent
        mist: "#64748b", // muted text
        paper: "#0f172a", // primary text
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        deck: "0 24px 80px -24px rgb(15 23 42 / 0.15)",
        glow: "0 0 0 1px rgb(37 99 235 / 0.25), 0 8px 40px -8px rgb(37 99 235 / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
