/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["BricolageGrotesque_400Regular"],
      },
      colors: {
        primary: {
          DEFAULT: "#ff7c28",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff7c28",
          600: "#ea6c1a",
          700: "#c2570f",
          800: "#9a4510",
          900: "#7c3810",
        },
        secondary: {
          DEFAULT: "rgba(255, 124, 40, 0.5)",
        },
        // Semantic accents (shared across themes)
        success: { DEFAULT: "#16a34a", light: "#22c55e" },
        danger: { DEFAULT: "#dc2626", light: "#ef4444" },
        info: { DEFAULT: "#2563eb", light: "#3b82f6" },
        // Light mode (default) — app bg is a soft gray, cards are white so they lift
        background: { DEFAULT: "#f4f5f7", elevated: "#ffffff" },
        surface: { DEFAULT: "#ffffff", light: "#f1f2f4" },
        foreground: { DEFAULT: "#0f1115", secondary: "#5b616e", muted: "#9096a1" },
        border: { DEFAULT: "#e6e8ec", light: "#eef0f3" },
        subtle: "#f1f2f4",
        // Dark mode (used with dark: prefix)
        "d-bg": { DEFAULT: "#0d0e10", elevated: "#1a1b1e" },
        "d-surface": { DEFAULT: "#1a1b1e", light: "#232529" },
        "d-fg": { DEFAULT: "#f5f6f7", secondary: "#9ca3af", muted: "#6b7280" },
        "d-border": { DEFAULT: "#2a2c31", light: "#232529" },
        "d-subtle": "#232529",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".font-extralight": { fontFamily: "BricolageGrotesque_200ExtraLight" },
        ".font-light": { fontFamily: "BricolageGrotesque_300Light" },
        ".font-normal": { fontFamily: "BricolageGrotesque_400Regular" },
        ".font-medium": { fontFamily: "BricolageGrotesque_500Medium" },
        ".font-semibold": { fontFamily: "BricolageGrotesque_600SemiBold" },
        ".font-bold": { fontFamily: "BricolageGrotesque_700Bold" },
        ".font-extrabold": { fontFamily: "BricolageGrotesque_800ExtraBold" },
      })
    }),
  ],
}
