import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Lumo design tokens
        ink: {
          950: "#050507",
          900: "#0A0A0E",
          850: "#0F0F14",
          800: "#14141B",
          700: "#1C1C25",
          600: "#262630",
          500: "#3A3A47",
        },
        lumo: {
          pink: "#FF4488",
          magenta: "#D94DDB",
          violet: "#9A5CFF",
          blue: "#355DFF",
          cyan: "#35C3FF",
        },
        surface: {
          glass: "rgba(255,255,255,0.04)",
          glassHi: "rgba(255,255,255,0.08)",
          line: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "lumo-gradient":
          "linear-gradient(92deg,#FF4488 0%,#D94DDB 38%,#9A5CFF 64%,#35C3FF 100%)",
        "lumo-radial":
          "radial-gradient(1200px 600px at 0% 0%,rgba(255,68,136,0.18),transparent 50%),radial-gradient(1000px 500px at 100% 30%,rgba(53,195,255,0.16),transparent 55%),radial-gradient(800px 400px at 50% 100%,rgba(154,92,255,0.2),transparent 60%)",
        "glass":
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(217,77,219,0.35), 0 0 80px rgba(53,195,255,0.18)",
        glowPink: "0 0 40px rgba(255,68,136,0.45)",
        glowBlue: "0 0 40px rgba(53,195,255,0.45)",
        card: "0 10px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        pingSoft: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shine: "shine 4s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        pingSoft: "pingSoft 2s cubic-bezier(0,0,0.2,1) infinite",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
