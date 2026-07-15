import { Avatar } from "@/components/ui/Avatar"
import { AppHeader } from "@/components/ui/AppHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { Screen } from "@/components/ui/Screen"
import { categoryMeta } from "@/constants/categories"
import { formatCurrency, formatDateTime } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import { useLocalSearchParams } from "expo-router"
import { ScrollView, Text, View } from "react-native"

function DetailRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3.5 ${last ? "" : "border-b border-border-light dark:border-d-border-light"}`}
    >
      <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">{label}</Text>
      <Text className="ml-4 flex-1 text-right text-sm font-semibold text-foreground dark:text-d-fg">
        {value}
      </Text>
    </View>
  )
}

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const transaction = useBankStore((s) => s.transactions.find((t) => t.id === id))
  const account = useBankStore((s) => s.accounts.find((a) => a.id === transaction?.accountId))

  if (!transaction) {
    return (
      <Screen edges={["top"]}>
        <AppHeader title="Transaction" showBack />
        <EmptyState icon="alert-circle-outline" title="Transaction not found" />
      </Screen>
    )
  }

  const meta = categoryMeta(transaction.category)
  const isCredit = transaction.amount > 0

  return (
    <Screen edges={["top"]}>
      <AppHeader title="Transaction" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10">
        <View className="items-center py-6">
          <Avatar icon={meta.icon} color={meta.color} size={64} />
          <Text className="mt-4 text-lg font-semibold text-foreground dark:text-d-fg">
            {transaction.title}
          </Text>
          <Text
            className={`mt-1 text-4xl font-extrabold ${isCredit ? "text-success-light" : "text-foreground dark:text-d-fg"}`}
          >
            {formatCurrency(transaction.amount, { showSign: true })}
          </Text>
          <View
            className={`mt-3 flex-row items-center gap-1.5 rounded-full px-3 py-1 ${transaction.status === "pending" ? "bg-amber-500/15" : "bg-success/15"}`}
          >
            <View
              className={`h-1.5 w-1.5 rounded-full ${transaction.status === "pending" ? "bg-amber-500" : "bg-success"}`}
            />
            <Text
              className={`text-xs font-medium capitalize ${transaction.status === "pending" ? "text-amber-600" : "text-success"}`}
            >
              {transaction.status}
            </Text>
          </View>
        </View>

        <View className="overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
          <DetailRow label="Category" value={meta.label} />
          <DetailRow label="Date" value={formatDateTime(transaction.date)} />
          {account ? (
            <DetailRow label="Account" value={`${account.name} •••• ${account.last4}`} />
          ) : null}
          {transaction.note ? <DetailRow label="Note" value={transaction.note} /> : null}
          <DetailRow label="Reference" value={transaction.id.slice(-10).toUpperCase()} last />
        </View>
      </ScrollView>
    </Screen>
  )
}
