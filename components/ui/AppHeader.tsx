import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"

interface AppHeaderProps {
  title?: string
  subtitle?: string
  showBack?: boolean
  onBack?: () => void
  right?: ReactNode
  /** Large title style (used on top-level screens). */
  large?: boolean
}

/** In-screen header used for stack/detail screens with a consistent layout. */
export function AppHeader({ title, subtitle, showBack, onBack, right, large }: AppHeaderProps) {
  const router = useRouter()
  const colors = useThemeColors()

  const handleBack = () => {
    if (onBack) return onBack()
    if (router.canGoBack()) router.back()
  }

  return (
    <View className="flex-row items-center justify-between px-5 pb-3 pt-1">
      <View className="flex-1 flex-row items-center gap-3">
        {showBack && (
          <Pressable
            onPress={handleBack}
            hitSlop={12}
            className="h-9 w-9 items-center justify-center rounded-full bg-surface active:opacity-60 dark:bg-d-surface"
          >
            <Ionicons name="chevron-back" size={20} color={colors.foreground} />
          </Pressable>
        )}
        <View className="flex-1">
          {title ? (
            <Text
              className={`text-foreground dark:text-d-fg ${large ? "text-2xl font-bold" : "text-lg font-semibold"}`}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              className="text-xs text-foreground-secondary dark:text-d-fg-secondary"
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {right ? <View className="ml-2">{right}</View> : null}
    </View>
  )
}
