import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"
import { Pressable, Text, View } from "react-native"

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"]

const OPTIONS: { icon: IoniconsName; label: string }[] = [
  { icon: "swap-horizontal-outline", label: "Transfer" },
  { icon: "card-outline", label: "Pay Bills" },
  { icon: "send-outline", label: "Send" },
  { icon: "qr-code-outline", label: "QR Pay" },
  { icon: "receipt-outline", label: "History" },
  { icon: "wallet-outline", label: "Savings" },
  { icon: "globe-outline", label: "Forex" },
  { icon: "ellipsis-horizontal", label: "More" },
]

export default function QuickActions() {
  return (
    <View className="gap-4 px-4 pb-4 pt-2">
      <View className="flex flex-row justify-between">
        {OPTIONS.slice(0, 4).map((option) => (
          <Pressable
            key={option.label}
            className="items-center gap-1.5"
            style={{ width: "22%" }}
          >
            <View className="bg-subtle dark:bg-d-subtle h-11 w-11 items-center justify-center rounded-full">
              <Ionicons name={option.icon} size={20} color="#ff7c28" />
            </View>
            <Text className="text-foreground-secondary dark:text-d-fg-secondary text-[10px]">{option.label}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-row justify-between">
        {OPTIONS.slice(4, 8).map((option) => (
          <Pressable
            key={option.label}
            className="items-center gap-1.5"
            style={{ width: "22%" }}
          >
            <View className="bg-subtle dark:bg-d-subtle h-11 w-11 items-center justify-center rounded-full">
              <Ionicons name={option.icon} size={20} color="#ff7c28" />
            </View>
            <Text className="text-foreground-secondary dark:text-d-fg-secondary text-[10px]">{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
