import { Pressable, Text, View } from "react-native"

import { Avatar } from "@/components/ui/Avatar"
import { categoryMeta } from "@/constants/categories"
import { formatCurrency, formatTime } from "@/lib/format"
import type { Transaction } from "@/types"

interface TransactionRowProps {
  transaction: Transaction
  onPress?: () => void
  /** Show the time on the right beneath the amount. */
  showTime?: boolean
}

export function TransactionRow({ transaction, onPress, showTime = true }: TransactionRowProps) {
  const meta = categoryMeta(transaction.category)
  const isCredit = transaction.amount > 0

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-4 py-3 ${onPress ? "active:opacity-60" : ""}`}
    >
      <Avatar icon={meta.icon} color={meta.color} size={40} />
      <View className="flex-1">
        <Text className="text-sm font-medium text-foreground dark:text-d-fg" numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text
          className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary"
          numberOfLines={1}
        >
          {transaction.status === "pending" ? "Pending • " : ""}
          {transaction.note ?? meta.label}
        </Text>
      </View>
      <View className="items-end">
        <Text
          className={`text-sm font-semibold ${isCredit ? "text-success-light" : "text-foreground dark:text-d-fg"}`}
        >
          {formatCurrency(transaction.amount, { showSign: true })}
        </Text>
        {showTime ? (
          <Text className="mt-0.5 text-[11px] text-foreground-muted dark:text-d-fg-muted">
            {formatTime(transaction.date)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  )
}
