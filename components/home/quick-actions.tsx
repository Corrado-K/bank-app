import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import React from "react"
import { Pressable, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

const OPTIONS: { icon: IoniconName; label: string; route: string; color: string }[] = [
  { icon: "swap-horizontal", label: "Transfer", route: "/transfer", color: "#6366f1" },
  { icon: "paper-plane", label: "Send", route: "/send", color: "#ff7c28" },
  { icon: "receipt", label: "Pay Bills", route: "/pay-bills", color: "#f59e0b" },
  { icon: "add-circle", label: "Add", route: "/deposit", color: "#16a34a" },
]

export default function QuickActions() {
  const router = useRouter()

  return (
    <View className="flex-row justify-between">
      {OPTIONS.map((option) => (
        <Pressable
          key={option.label}
          className="items-center gap-2 active:opacity-60"
          style={{ width: "23%" }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            router.push(option.route as never)
          }}
        >
          <View
            className="h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: option.color + "1f" }}
          >
            <Ionicons name={option.icon} size={24} color={option.color} />
          </View>
          <Text className="text-xs font-medium text-foreground dark:text-d-fg">{option.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}
