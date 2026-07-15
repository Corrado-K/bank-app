import { TransactionList } from "@/components/TransactionList"
import { AppHeader } from "@/components/ui/AppHeader"
import { Screen } from "@/components/ui/Screen"
import { EmptyState } from "@/components/ui/EmptyState"
import { useThemeColors } from "@/hooks/useThemeColors"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { useAppStore } from "@/store/useAppStore"
import { accountAvailable, useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useMemo } from "react"
import { Pressable, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: IoniconName
  label: string
  onPress: () => void
}) {
  const colors = useThemeColors()
  return (
    <Pressable onPress={onPress} className="flex-1 items-center gap-1.5 active:opacity-60">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <Text className="text-xs font-medium text-foreground dark:text-d-fg">{label}</Text>
    </Pressable>
  )
}

export default function AccountDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const account = useBankStore((s) => s.accounts.find((a) => a.id === id))
  const allTx = useBankStore((s) => s.transactions)
  const hideBalances = useAppStore((s) => s.hideBalances)

  const transactions = useMemo(() => allTx.filter((t) => t.accountId === id), [allTx, id])

  if (!account) {
    return (
      <Screen edges={["top"]}>
        <AppHeader title="Account" showBack />
        <EmptyState icon="alert-circle-outline" title="Account not found" />
      </Screen>
    )
  }

  const isCredit = account.type === "credit"
  const available = accountAvailable(account)

  const header = (
    <View className="px-5 pb-2 pt-2">
      <View className="items-center rounded-3xl border border-border bg-surface p-6 dark:border-d-border dark:bg-d-surface">
        <View
          className="mb-3 h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: account.color + "22" }}
        >
          <Ionicons
            name={isCredit ? "card" : "wallet"}
            size={24}
            color={account.color === "#0f1115" ? "#ff7c28" : account.color}
          />
        </View>
        <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
          {account.name} {formatAccountNumber(account.last4)}
        </Text>
        <Text className="mt-1 text-3xl font-extrabold text-foreground dark:text-d-fg">
          {hideBalances ? "••••••" : formatCurrency(account.balance)}
        </Text>
        <Text className="mt-1 text-xs text-foreground-muted dark:text-d-fg-muted">
          {hideBalances
            ? isCredit
              ? "•••• available credit"
              : "•••• available"
            : isCredit
              ? `${formatCurrency(available)} available credit`
              : `${formatCurrency(available)} available`}
        </Text>
      </View>

      <View className="mt-5 flex-row">
        {isCredit ? (
          <>
            <ActionButton
              icon="arrow-up-circle"
              label="Pay card"
              onPress={() => router.push("/transfer" as never)}
            />
            <ActionButton
              icon="stats-chart"
              label="Details"
              onPress={() => Haptics.selectionAsync()}
            />
            <ActionButton
              icon="document-text"
              label="Statement"
              onPress={() => Haptics.selectionAsync()}
            />
          </>
        ) : (
          <>
            <ActionButton
              icon="add-circle"
              label="Add"
              onPress={() => router.push(`/deposit?account=${account.id}` as never)}
            />
            <ActionButton
              icon="swap-horizontal"
              label="Transfer"
              onPress={() => router.push(`/transfer?from=${account.id}` as never)}
            />
            <ActionButton
              icon="cash"
              label="Withdraw"
              onPress={() => router.push(`/withdraw?account=${account.id}` as never)}
            />
          </>
        )}
      </View>

      <Text className="mt-6 text-base font-semibold text-foreground dark:text-d-fg">Activity</Text>
    </View>
  )

  return (
    <Screen edges={["top"]}>
      <AppHeader title={account.name} showBack />
      <TransactionList transactions={transactions} ListHeaderComponent={header} />
    </Screen>
  )
}
