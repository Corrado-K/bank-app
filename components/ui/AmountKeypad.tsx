import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { Pressable, Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"

interface AmountKeypadProps {
  /** The raw string value, e.g. "1234.5". */
  value: string
  onChange: (next: string) => void
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"] as const

/**
 * Numeric keypad that edits a decimal-money string. Enforces a single decimal
 * point and a maximum of two fractional digits.
 */
export function AmountKeypad({ value, onChange }: AmountKeypadProps) {
  const colors = useThemeColors()

  function press(key: (typeof KEYS)[number]) {
    Haptics.selectionAsync()
    if (key === "del") {
      onChange(value.slice(0, -1))
      return
    }
    if (key === ".") {
      if (value.includes(".")) return
      onChange(value === "" ? "0." : value + ".")
      return
    }
    // digit
    if (value.includes(".")) {
      const [, decimals] = value.split(".")
      if (decimals.length >= 2) return
    }
    if (value === "0") {
      onChange(key)
      return
    }
    // guard against absurdly long inputs
    if (value.replace(".", "").length >= 9) return
    onChange(value + key)
  }

  return (
    <View className="flex-row flex-wrap">
      {KEYS.map((key) => (
        <Pressable
          key={key}
          onPress={() => press(key)}
          className="h-16 w-1/3 items-center justify-center active:opacity-50"
        >
          {key === "del" ? (
            <Ionicons name="backspace-outline" size={24} color={colors.foreground} />
          ) : (
            <Text className="text-2xl font-semibold text-foreground dark:text-d-fg">{key}</Text>
          )}
        </Pressable>
      ))}
    </View>
  )
}

/** Parses a keypad string into a number (0 for empty/partial). */
export function parseAmount(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
}
