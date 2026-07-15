import Ionicons from "@expo/vector-icons/Ionicons"
import { Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"

interface EmptyStateProps {
  icon: React.ComponentProps<typeof Ionicons>["name"]
  title: string
  message?: string
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  const colors = useThemeColors()
  return (
    <View className="items-center justify-center px-8 py-16">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface dark:bg-d-surface">
        <Ionicons name={icon} size={28} color={colors.foregroundMuted} />
      </View>
      <Text className="text-base font-semibold text-foreground dark:text-d-fg">{title}</Text>
      {message ? (
        <Text className="mt-1 text-center text-sm text-foreground-secondary dark:text-d-fg-secondary">
          {message}
        </Text>
      ) : null}
    </View>
  )
}
