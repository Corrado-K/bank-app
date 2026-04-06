import { useColorScheme } from "nativewind"

const lightColors = {
  background: "#ffffff",
  surface: "#f5f5f5",
  foreground: "#111111",
  foregroundSecondary: "#6b7280",
  foregroundMuted: "#9ca3af",
  border: "#e5e7eb",
  subtle: "#f3f4f6",
  tabBar: "#ffffff",
  doughnutTrack: "#e5e7eb",
  chevronActive: "#6b7280",
  chevronInactive: "#d1d5db",
}

const darkColors = {
  background: "#141414",
  surface: "#1d1d1d",
  foreground: "#ffffff",
  foregroundSecondary: "#9ca3af",
  foregroundMuted: "#6b7280",
  border: "#2a2a2a",
  subtle: "#262626",
  tabBar: "#141414",
  doughnutTrack: "#333333",
  chevronActive: "#9ca3af",
  chevronInactive: "#333333",
}

export function useThemeColors() {
  const { colorScheme } = useColorScheme()
  return colorScheme === "dark" ? darkColors : lightColors
}
