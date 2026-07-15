import Ionicons from "@expo/vector-icons/Ionicons"
import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"

interface ListRowProps {
  left?: ReactNode
  title: string
  subtitle?: string
  /** Right-aligned content (amount, value). Overrides chevron unless showChevron. */
  right?: ReactNode
  onPress?: () => void
  showChevron?: boolean
  /** Bottom hairline separator (for rows inside a flush Card). */
  divider?: boolean
  danger?: boolean
  disabled?: boolean
}

/** Generic tappable row used across lists, settings and menus. */
export function ListRow({
  left,
  title,
  subtitle,
  right,
  onPress,
  showChevron,
  divider,
  danger,
  disabled,
}: ListRowProps) {
  const colors = useThemeColors()
  const Container = onPress ? Pressable : View

  return (
    <Container
      onPress={disabled ? undefined : onPress}
      className={`flex-row items-center gap-3 px-4 py-3.5 ${onPress && !disabled ? "active:opacity-60" : ""} ${
        divider ? "border-b border-border-light dark:border-d-border-light" : ""
      } ${disabled ? "opacity-40" : ""}`}
    >
      {left}
      <View className="flex-1">
        <Text
          className={`text-sm font-medium ${danger ? "text-danger-light" : "text-foreground dark:text-d-fg"}`}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
      {showChevron && !right ? (
        <Ionicons name="chevron-forward" size={16} color={colors.chevronInactive} />
      ) : null}
    </Container>
  )
}
