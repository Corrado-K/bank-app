import { TransactionRow } from "@/components/TransactionRow"
import { Card } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/EmptyState"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useBankStore } from "@/store/useBankStore"
import { useRouter } from "expo-router"
import { useMemo } from "react"
import { View } from "react-native"

export default function RecentTransactions() {
  const router = useRouter()
  const transactions = useBankStore((s) => s.transactions)

  const recent = useMemo(
    () => [...transactions].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5),
    [transactions],
  )

  return (
    <View className="gap-3">
      <SectionHeader
        title="Recent activity"
        actionLabel="See all"
        onAction={() => router.push("/transactions")}
      />
      <Card flush>
        {recent.length === 0 ? (
          <EmptyState icon="receipt-outline" title="No activity yet" />
        ) : (
          recent.map((t, i) => (
            <View
              key={t.id}
              className={
                i < recent.length - 1
                  ? "border-b border-border-light dark:border-d-border-light"
                  : ""
              }
            >
              <TransactionRow
                transaction={t}
                onPress={() => router.push(`/transaction/${t.id}` as never)}
              />
            </View>
          ))
        )}
      </Card>
    </View>
  )
}
