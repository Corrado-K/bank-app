import { useAppStore } from "@/store/useAppStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"
import { Pressable, Text, View } from "react-native"

const THEMES = [
  { value: "light" as const, label: "Light", icon: "sunny-outline" as const },
  { value: "dark" as const, label: "Dark", icon: "moon-outline" as const },
  { value: "system" as const, label: "System", icon: "phone-portrait-outline" as const },
]

export default function SettingsScreen() {
  const { theme, setTheme } = useAppStore()

  return (
    <View className="bg-background dark:bg-d-bg flex-1 px-6 pt-4">
      <Text className="text-foreground-secondary dark:text-d-fg-secondary mb-3 text-xs font-medium uppercase">
        Appearance
      </Text>
      <View className="border-border dark:border-d-border bg-surface dark:bg-d-surface overflow-hidden rounded-2xl border">
        {THEMES.map((item, index) => (
          <Pressable
            key={item.value}
            className={`flex flex-row items-center gap-3 px-4 py-3.5 ${index < THEMES.length - 1 ? "border-border-light dark:border-d-border-light border-b" : ""}`}
            onPress={() => setTheme(item.value)}
          >
            <View className="bg-subtle dark:bg-d-subtle h-9 w-9 items-center justify-center rounded-full">
              <Ionicons name={item.icon} size={18} color="#ff7c28" />
            </View>
            <Text className="text-foreground dark:text-d-fg flex-1 text-sm font-medium">
              {item.label}
            </Text>
            {theme === item.value && <Ionicons name="checkmark-circle" size={20} color="#ff7c28" />}
          </Pressable>
        ))}
      </View>
    </View>
  )
}
