import { BankCard } from "@/components/BankCard"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SCREEN_WIDTH } from "@/lib/utils"
import { useBankStore } from "@/store/useBankStore"
import { useRouter } from "expo-router"
import { Pressable, ScrollView, View } from "react-native"

const CARD_GAP = 14

export default function CardCarousel() {
  const router = useRouter()
  const cards = useBankStore((s) => s.cards)
  const cardWidth = SCREEN_WIDTH - 40

  return (
    <View className="gap-3">
      <SectionHeader
        title="Your cards"
        actionLabel="Manage"
        onAction={() => router.push("/cards")}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + CARD_GAP}
        contentContainerStyle={{ gap: CARD_GAP }}
      >
        {cards.map((card) => (
          <Pressable
            key={card.id}
            onPress={() => router.push(`/card/${card.id}` as never)}
            className="active:opacity-90"
          >
            <BankCard card={card} width={cardWidth} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
