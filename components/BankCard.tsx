import Ionicons from "@expo/vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient"
import { Text, View } from "react-native"

import { maskCardNumber } from "@/lib/format"
import type { Card } from "@/types"

interface BankCardProps {
  card: Card
  /** Fixed width; height derives from the standard card ratio. */
  width?: number
  /** Hide the middle digits (used on carousels/previews). */
  compact?: boolean
}

/** Realistic payment-card visual with a brand gradient. */
export function BankCard({ card, width = 300, compact = false }: BankCardProps) {
  const height = width * 0.6

  return (
    <LinearGradient
      colors={card.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width, height, borderRadius: 20, padding: 20, justifyContent: "space-between" }}
    >
      {card.frozen ? (
        <View
          className="absolute right-3 top-3 flex-row items-center gap-1 rounded-full bg-white/20 px-2 py-1"
          style={{ zIndex: 2 }}
        >
          <Ionicons name="snow" size={12} color="#ffffff" />
          <Text className="text-[10px] font-semibold text-white">Frozen</Text>
        </View>
      ) : null}

      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-white">Fidelity</Text>
        <View className="h-7 w-9 rounded-md bg-white/25" />
      </View>

      <Text className="text-lg tracking-[3px] text-white" style={{ opacity: 0.95 }}>
        {compact ? `•••• ${card.last4}` : maskCardNumber(card.last4)}
      </Text>

      <View className="flex-row items-end justify-between">
        <View>
          <Text className="text-[9px] uppercase tracking-wider text-white/60">Card Holder</Text>
          <Text className="text-xs font-medium text-white">{card.holder}</Text>
        </View>
        <View>
          <Text className="text-[9px] uppercase tracking-wider text-white/60">Expires</Text>
          <Text className="text-xs font-medium text-white">{card.expiry}</Text>
        </View>
        <Text className="text-sm font-bold italic text-white">{card.network}</Text>
      </View>
    </LinearGradient>
  )
}
