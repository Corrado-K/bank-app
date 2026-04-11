import Dropdown from "@/components/ui/dropdown"
import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"

const ACCOUNTS = [
  { id: "1", label: "Main Account", balance: 24580.5 },
  { id: "2", label: "Savings Account", balance: 102340.0 },
  { id: "3", label: "Business Account", balance: 8720.75 },
]

export default function AccountInfo() {
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0])
  const [balanceVisible, setBalanceVisible] = useState(true)
  const colors = useThemeColors()

  const formattedBalance = balanceVisible
    ? `$${selectedAccount.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    : "****"

  return (
    <View className="flex flex-row items-center justify-between p-4">
      <View className="flex-1">
        <Dropdown
          items={ACCOUNTS}
          selected={selectedAccount}
          onSelect={(item) => {
            const account = ACCOUNTS.find((a) => a.id === item.id)
            if (account) setSelectedAccount(account)
          }}
        />

        <View className="mt-1 flex flex-row items-center gap-2">
          <Text className="text-2xl font-bold text-foreground dark:text-d-fg">
            {formattedBalance}
          </Text>
          <Pressable onPress={() => setBalanceVisible(!balanceVisible)}>
            <Ionicons
              name={balanceVisible ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.foregroundSecondary}
            />
          </Pressable>
        </View>

        <Text className="mt-0.5 text-xs text-foreground-muted dark:text-d-fg-muted">
          Wallet Balance
        </Text>
      </View>

      <View className="flex flex-row gap-2">
        <View className="flex flex-col items-center gap-2">
          <Pressable className="items-center justify-center rounded-full bg-primary px-2 py-2">
            <Ionicons name="wallet" size={18} color="#fff" />
          </Pressable>
          <Text className="text-xs font-semibold text-foreground dark:text-d-fg">Top Up</Text>
        </View>
        <View className="flex flex-col items-center gap-2">
          <Pressable className="items-center justify-center rounded-full bg-primary px-2 py-2">
            <Ionicons name="cash" size={18} color="#fff" />
          </Pressable>
          <Text className="text-xs font-semibold text-foreground dark:text-d-fg">Withdraw</Text>
        </View>
      </View>
    </View>
  )
}
