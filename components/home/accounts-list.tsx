import { Avatar } from "@/components/ui/Avatar"
import { Card } from "@/components/ui/Card"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { useAppStore } from "@/store/useAppStore"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import { Pressable, Text, View } from "react-native"

import { useThemeColors } from "@/hooks/useThemeColors"
import type { Account } from "@/types"

const ACCOUNT_ICON: Record<Account["type"], React.ComponentProps<typeof Ionicons>["name"]> = {
  checking: "wallet",
  savings: "trending-up",
  business: "briefcase",
  credit: "card",
}

export default function AccountsList() {
  const router = useRouter()
  const colors = useThemeColors()
  const accounts = useBankStore((s) => s.accounts)
  const hideBalances = useAppStore((s) => s.hideBalances)

  return (
    <View className="gap-3">
      <SectionHeader title="Accounts" />
      <Card flush>
        {accounts.map((a, i) => {
          const isCredit = a.type === "credit"
          return (
            <Pressable
              key={a.id}
              onPress={() => router.push(`/account/${a.id}` as never)}
              className={`flex-row items-center gap-3 px-4 py-3.5 active:opacity-60 ${i < accounts.length - 1 ? "border-b border-border-light dark:border-d-border-light" : ""}`}
            >
              <Avatar icon={ACCOUNT_ICON[a.type]} color={a.color} size={42} />
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground dark:text-d-fg">
                  {a.name}
                </Text>
                <Text className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary">
                  {isCredit ? "Credit card" : "Account"} {formatAccountNumber(a.last4)}
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className={`text-sm font-bold ${isCredit && a.balance < 0 ? "text-foreground dark:text-d-fg" : "text-foreground dark:text-d-fg"}`}
                >
                  {hideBalances ? "••••" : formatCurrency(a.balance)}
                </Text>
                {isCredit && a.creditLimit ? (
                  <Text className="mt-0.5 text-[11px] text-foreground-muted dark:text-d-fg-muted">
                    {formatCurrency(a.creditLimit + a.balance)} available
                  </Text>
                ) : null}
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.chevronInactive} />
            </Pressable>
          )
        })}
      </Card>
    </View>
  )
}
