import { Dimensions, Platform } from "react-native"

export const isIOS = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"
export const isWeb = Platform.OS === "web"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
