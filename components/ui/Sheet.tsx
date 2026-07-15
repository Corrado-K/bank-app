import Ionicons from "@expo/vector-icons/Ionicons"
import { ReactNode } from "react"
import { Modal, Pressable, ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColors } from "@/hooks/useThemeColors"

interface SheetProps {
  visible: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

/** Lightweight bottom sheet built on the RN Modal for pickers and options. */
export function Sheet({ visible, onClose, title, children }: SheetProps) {
  const insets = useSafeAreaInsets()
  const colors = useThemeColors()

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <Pressable
          className="rounded-t-3xl bg-background dark:bg-d-bg-elevated"
          onPress={(e) => e.stopPropagation()}
          style={{ paddingBottom: insets.bottom + 8, maxHeight: "80%" }}
        >
          <View className="items-center pt-3">
            <View className="h-1 w-10 rounded-full bg-border dark:bg-d-border" />
          </View>
          {title ? (
            <View className="flex-row items-center justify-between px-5 pb-2 pt-3">
              <Text className="text-lg font-semibold text-foreground dark:text-d-fg">{title}</Text>
              <Pressable onPress={onClose} hitSlop={10} className="active:opacity-60">
                <Ionicons name="close" size={22} color={colors.foregroundSecondary} />
              </Pressable>
            </View>
          ) : null}
          <ScrollView showsVerticalScrollIndicator={false} className="px-5">
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
