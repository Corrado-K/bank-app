import { Pressable, Text, View } from "react-native"

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

/** Row with an uppercase-ish section title and an optional trailing action. */
export function SectionHeader({ title, actionLabel, onAction, className }: SectionHeaderProps) {
  return (
    <View className={`flex-row items-center justify-between ${className ?? ""}`}>
      <Text className="text-base font-semibold text-foreground dark:text-d-fg">{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8} className="active:opacity-60">
          <Text className="text-sm font-semibold text-primary">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}
