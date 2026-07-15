import { TransactionList } from "@/components/TransactionList"
import { AppHeader } from "@/components/ui/AppHeader"
import { Screen } from "@/components/ui/Screen"
import { useBankStore } from "@/store/useBankStore"
import * as Haptics from "expo-haptics"
import { useMemo, useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"

type Filter = "all" | "income" | "spending"

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "income", label: "Income" },
  { key: "spending", label: "Spending" },
]

export default function TransactionsScreen() {
  const transactions = useBankStore((s) => s.transactions)
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = useMemo(() => {
    if (filter === "income") return transactions.filter((t) => t.amount > 0)
    if (filter === "spending") return transactions.filter((t) => t.amount < 0)
    return transactions
  }, [transactions, filter])

  return (
    <Screen edges={["top"]}>
      <AppHeader title="Transactions" showBack />
      <View className="pb-1">
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          renderItem={({ item }) => {
            const active = filter === item.key
            return (
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync()
                  setFilter(item.key)
                }}
                className={`rounded-full px-4 py-2 ${
                  active
                    ? "bg-primary"
                    : "border border-border bg-surface dark:border-d-border dark:bg-d-surface"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${active ? "text-white" : "text-foreground-secondary dark:text-d-fg-secondary"}`}
                >
                  {item.label}
                </Text>
              </Pressable>
            )
          }}
        />
      </View>
      <TransactionList transactions={filtered} contentPaddingBottom={40} />
    </Screen>
  )
}
