import { ReactNode } from "react"
import { View } from "react-native"
import { SafeAreaView, type Edge } from "react-native-safe-area-context"

interface ScreenProps {
  children: ReactNode
  /** Which safe-area edges to pad. Defaults to top + bottom. */
  edges?: Edge[]
  className?: string
}

/**
 * Consistent screen container: applies the app background in both themes and
 * respects the safe area. Use everywhere so backgrounds never mismatch.
 */
export function Screen({ children, edges = ["top", "bottom"], className }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-d-bg" edges={edges}>
      <View className={`flex-1 ${className ?? ""}`}>{children}</View>
    </SafeAreaView>
  )
}
