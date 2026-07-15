import { useColorScheme } from "nativewind"

const lightColors = {
  background: "#f4f5f7",
  backgroundElevated: "#ffffff",
  surface: "#ffffff",
  surfaceLight: "#f1f2f4",
  foreground: "#0f1115",
  foregroundSecondary: "#5b616e",
  foregroundMuted: "#9096a1",
  border: "#e6e8ec",
  borderLight: "#eef0f3",
  subtle: "#f1f2f4",
  tabBar: "#ffffff",
  doughnutTrack: "#eceef1",
  chevronActive: "#5b616e",
  chevronInactive: "#c7cbd1",
  primary: "#ff7c28",
  success: "#16a34a",
  danger: "#dc2626",
  info: "#2563eb",
}

const darkColors: typeof lightColors = {
  background: "#0d0e10",
  backgroundElevated: "#1a1b1e",
  surface: "#1a1b1e",
  surfaceLight: "#232529",
  foreground: "#f5f6f7",
  foregroundSecondary: "#9ca3af",
  foregroundMuted: "#6b7280",
  border: "#2a2c31",
  borderLight: "#232529",
  subtle: "#232529",
  tabBar: "#131417",
  doughnutTrack: "#2a2c31",
  chevronActive: "#9ca3af",
  chevronInactive: "#3a3d43",
  primary: "#ff7c28",
  success: "#22c55e",
  danger: "#ef4444",
  info: "#3b82f6",
}

export function useThemeColors() {
  const { colorScheme } = useColorScheme()
  return colorScheme === "dark" ? darkColors : lightColors
}

export type ThemeColors = typeof lightColors
