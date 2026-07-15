import { monthCashflow } from "@/lib/analytics"
import { formatCurrency } from "@/lib/format"
import { useAppStore } from "@/store/useAppStore"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"
import { Pressable, Text, View } from "react-native"

export default function BalanceHero() {
  const totalBalance = useBankStore((s) => s.totalBalance())
  const transactions = useBankStore((s) => s.transactions)
  const accountCount = useBankStore((s) => s.accounts.filter((a) => a.type !== "credit").length)
  const { hideBalances, setHideBalances } = useAppStore()

  const { income, spending } = monthCashflow(transactions)

  return (
    <LinearGradient
      colors={["#ff7c28", "#ea6c1a", "#c2570f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24, padding: 20 }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-medium text-white/80">Total balance</Text>
        <Pressable
          onPress={() => {
            Haptics.selectionAsync()
            setHideBalances(!hideBalances)
          }}
          hitSlop={10}
          className="active:opacity-60"
        >
          <Ionicons
            name={hideBalances ? "eye-off" : "eye"}
            size={18}
            color="rgba(255,255,255,0.9)"
          />
        </Pressable>
      </View>

      <Text className="mt-1 text-4xl font-extrabold text-white">
        {hideBalances ? "••••••" : formatCurrency(totalBalance)}
      </Text>
      <Text className="mt-1 text-xs text-white/70">Across {accountCount} accounts</Text>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 flex-row items-center gap-2 rounded-2xl bg-white/15 px-3 py-2.5">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="arrow-down" size={14} color="#ffffff" />
          </View>
          <View>
            <Text className="text-[10px] text-white/70">Income</Text>
            <Text className="text-xs font-semibold text-white">
              {hideBalances ? "••••" : formatCurrency(income, { compact: true })}
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row items-center gap-2 rounded-2xl bg-white/15 px-3 py-2.5">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="arrow-up" size={14} color="#ffffff" />
          </View>
          <View>
            <Text className="text-[10px] text-white/70">Spending</Text>
            <Text className="text-xs font-semibold text-white">
              {hideBalances ? "••••" : formatCurrency(spending, { compact: true })}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}
