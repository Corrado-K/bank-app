import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useRef, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

const CARDS = [
  {
    id: "1",
    name: "Kebede Fola",
    number: "4532",
    expiry: "09/28",
    bank: "Fidelity Bank",
    type: "Visa",
  },
  {
    id: "2",
    name: "Kebede Fola",
    number: "8291",
    expiry: "03/27",
    bank: "Fidelity Bank",
    type: "Mastercard",
  },
  {
    id: "3",
    name: "Kebede Fola",
    number: "6104",
    expiry: "12/26",
    bank: "Fidelity Bank",
    type: "Visa",
  },
]

const CARD_WIDTH = 260
const CARD_GAP = 12

export default function CardCarousel() {
  const [cardIndex, setCardIndex] = useState(0)
  const scrollRef = useRef<ScrollView>(null)
  const colors = useThemeColors()

  const scrollToCard = (index: number) => {
    const clamped = Math.max(0, Math.min(index, CARDS.length - 1))
    setCardIndex(clamped)
    scrollRef.current?.scrollTo({
      x: clamped * (CARD_WIDTH + CARD_GAP),
      animated: true,
    })
  }

  return (
    <View className="py-6">
      <View className="flex flex-row items-center">
        <Pressable
          className="items-center justify-center pl-2 pr-1"
          onPress={() => scrollToCard(cardIndex - 1)}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={cardIndex > 0 ? colors.chevronActive : colors.chevronInactive}
          />
        </Pressable>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ gap: CARD_GAP }}
        >
          {CARDS.map((card) => (
            <View
              key={card.id}
              className="bg-subtle dark:bg-d-subtle rounded-xl p-5"
              style={{ width: CARD_WIDTH }}
            >
              <Text className="text-foreground-muted dark:text-d-fg-muted text-[10px]">
                {card.bank}
              </Text>
              <Text className="text-foreground dark:text-d-fg mt-4 text-base tracking-widest">
                **** **** **** {card.number}
              </Text>
              <View className="mt-5 flex flex-row items-end justify-between">
                <View>
                  <Text className="text-foreground-muted dark:text-d-fg-muted text-[9px]">
                    CARD HOLDER
                  </Text>
                  <Text className="text-foreground dark:text-d-fg text-xs font-medium">
                    {card.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-foreground-muted dark:text-d-fg-muted text-[9px]">
                    EXPIRES
                  </Text>
                  <Text className="text-foreground dark:text-d-fg text-xs font-medium">
                    {card.expiry}
                  </Text>
                </View>
              </View>
              <Text className="text-foreground-muted dark:text-d-fg-muted mt-3 self-end text-[10px]">
                {card.type}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Pressable
          className="items-center justify-center pl-1 pr-2"
          onPress={() => scrollToCard(cardIndex + 1)}
        >
          <Ionicons
            name="chevron-forward"
            size={18}
            color={cardIndex < CARDS.length - 1 ? colors.chevronActive : colors.chevronInactive}
          />
        </Pressable>
      </View>
    </View>
  )
}
