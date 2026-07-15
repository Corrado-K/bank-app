import { BankCard } from "@/components/BankCard"
import { AppHeader } from "@/components/ui/AppHeader"
import { Screen } from "@/components/ui/Screen"
import { useThemeColors } from "@/hooks/useThemeColors"
import { SCREEN_WIDTH } from "@/lib/utils"
import { formatCurrency } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"

export default function CardsScreen() {
  const router = useRouter()
  const colors = useThemeColors()
  const cards = useBankStore((s) => s.cards)
  const accounts = useBankStore((s) => s.accounts)

  return (
    <Screen edges={["top"]}>
      <AppHeader
        title="Cards"
        large
        right={
          <Pressable
            hitSlop={10}
            onPress={() =>
              Alert.alert("Add card", "Ordering new cards isn't available in this demo.")
            }
            className="h-9 w-9 items-center justify-center rounded-full bg-surface active:opacity-60 dark:bg-d-surface"
          >
            <Ionicons name="add" size={22} color={colors.foreground} />
          </Pressable>
        }
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card) => {
          const account = accounts.find((a) => a.id === card.accountId)
          return (
            <Pressable
              key={card.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                router.push(`/card/${card.id}` as never)
              }}
              className="gap-3 active:opacity-90"
            >
              <BankCard card={card} width={SCREEN_WIDTH - 40} />
              <View className="flex-row items-center justify-between px-1">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name={card.frozen ? "snow" : "checkmark-circle"}
                    size={16}
                    color={card.frozen ? colors.info : colors.success}
                  />
                  <Text className="text-sm font-medium text-foreground dark:text-d-fg">
                    {card.frozen ? "Frozen" : "Active"}
                  </Text>
                  <Text className="text-xs text-foreground-muted dark:text-d-fg-muted">
                    • {account?.name}
                  </Text>
                </View>
                <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
                  {formatCurrency(card.spendingLimit)} limit
                </Text>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </Screen>
  )
}
