import { TransactionRow } from "@/components/TransactionRow"
import { EmptyState } from "@/components/ui/EmptyState"
import { formatRelativeDate } from "@/lib/format"
import type { Transaction } from "@/types"
import { useRouter } from "expo-router"
import { ReactElement, useMemo } from "react"
import { SectionList, Text, View } from "react-native"

interface TransactionListProps {
  transactions: Transaction[]
  ListHeaderComponent?: ReactElement
  contentPaddingBottom?: number
}

function groupByDate(items: Transaction[]) {
  const sorted = [...items].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const map = new Map<string, Transaction[]>()
  for (const t of sorted) {
    const key = formatRelativeDate(t.date)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(t)
  }
  return [...map.entries()].map(([title, data]) => ({ title, data }))
}

export function TransactionList({
  transactions,
  ListHeaderComponent,
  contentPaddingBottom = 32,
}: TransactionListProps) {
  const router = useRouter()
  const sections = useMemo(() => groupByDate(transactions), [transactions])

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: contentPaddingBottom }}
      stickySectionHeadersEnabled={false}
      ListEmptyComponent={
        <EmptyState
          icon="receipt-outline"
          title="No transactions"
          message="Transactions will appear here once you start moving money."
        />
      }
      renderSectionHeader={({ section }) => (
        <View className="bg-background px-5 pb-1 pt-4 dark:bg-d-bg">
          <Text className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
            {section.title}
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View className="px-3">
          <TransactionRow
            transaction={item}
            onPress={() => router.push(`/transaction/${item.id}` as never)}
          />
        </View>
      )}
    />
  )
}
