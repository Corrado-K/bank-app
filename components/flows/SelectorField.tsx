import Ionicons from "@expo/vector-icons/Ionicons"
import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"

interface SelectorFieldProps {
  label: string
  value: string
  caption?: string
  left?: ReactNode
  onPress?: () => void
}

/** A labelled, tappable field that opens a picker (From / To / Biller …). */
export function SelectorField({ label, value, caption, left, onPress }: SelectorFieldProps) {
  const colors = useThemeColors()
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 active:opacity-70 dark:border-d-border dark:bg-d-surface"
    >
      {left}
      <View className="flex-1">
        <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">{label}</Text>
        <Text
          className="mt-0.5 text-sm font-semibold text-foreground dark:text-d-fg"
          numberOfLines={1}
        >
          {value}
        </Text>
        {caption ? (
          <Text className="text-xs text-foreground-muted dark:text-d-fg-muted">{caption}</Text>
        ) : null}
      </View>
      {onPress ? (
        <Ionicons name="chevron-down" size={18} color={colors.foregroundSecondary} />
      ) : null}
    </Pressable>
  )
}
