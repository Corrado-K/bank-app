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
        // Light mode (default)
        background: "#ffffff",
        surface: { DEFAULT: "#f5f5f5", light: "#ebebeb" },
        foreground: { DEFAULT: "#111111", secondary: "#6b7280", muted: "#9ca3af" },
        border: { DEFAULT: "#e5e7eb", light: "#f0f0f0" },
        subtle: "#f3f4f6",
        // Dark mode (used with dark: prefix)
        "d-bg": "#141414",
        "d-surface": { DEFAULT: "#1d1d1d", light: "#202020" },
        "d-fg": { DEFAULT: "#ffffff", secondary: "#9ca3af", muted: "#6b7280" },
        "d-border": { DEFAULT: "#2a2a2a", light: "#222222" },
        "d-subtle": "#262626",
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
