import { MoneyFlowScaffold } from "@/components/flows/MoneyFlowScaffold"
import { AccountPicker } from "@/components/flows/pickers"
import { SelectorField } from "@/components/flows/SelectorField"
import { Avatar } from "@/components/ui/Avatar"
import { parseAmount } from "@/components/ui/AmountKeypad"
import { Sheet } from "@/components/ui/Sheet"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useThemeColors } from "@/hooks/useThemeColors"
import { useLocalSearchParams } from "expo-router"
import { Pressable, Text, View } from "react-native"
import { useState } from "react"

const METHODS = [
  { id: "transfer", label: "Bank Transfer", icon: "business-outline" as const },
  { id: "card", label: "Debit Card", icon: "card-outline" as const },
  { id: "check", label: "Mobile Check", icon: "camera-outline" as const },
]

export default function DepositScreen() {
  const params = useLocalSearchParams<{ account?: string }>()
  const colors = useThemeColors()
  const accounts = useBankStore((s) => s.accounts)
  const deposit = useBankStore((s) => s.deposit)

  const targets = accounts.filter((a) => a.type !== "credit")
  const initial =
    params.account && targets.some((a) => a.id === params.account) ? params.account : targets[0].id
  const [toId, setToId] = useState(initial)
  const [methodId, setMethodId] = useState(METHODS[0].id)
  const [amount, setAmount] = useState("")
  const [picker, setPicker] = useState<"to" | "method" | null>(null)

  const to = accounts.find((a) => a.id === toId)!
  const method = METHODS.find((m) => m.id === methodId)!

  return (
    <>
      <MoneyFlowScaffold
        title="Add money"
        amount={amount}
        onAmountChange={setAmount}
        reviewRows={[
          { label: "To", value: `${to.name} ${formatAccountNumber(to.last4)}` },
          { label: "Method", value: method.label },
          { label: "Amount", value: formatCurrency(parseAmount(amount)), highlight: true },
        ]}
        confirmLabel="Add money"
        successTitle="Money added"
        successMessage={`Added to ${to.name}`}
        onConfirm={() =>
          deposit({
            accountId: toId,
            amount: parseAmount(amount),
            source: `${method.label} Deposit`,
          })
        }
      >
        <SelectorField
          label="Deposit to"
          value={to.name}
          caption={`${formatAccountNumber(to.last4)} • ${formatCurrency(to.balance)}`}
          left={<Avatar icon="wallet" color={to.color} size={40} />}
          onPress={() => setPicker("to")}
        />
        <SelectorField
          label="Method"
          value={method.label}
          left={<Avatar icon={method.icon} color={colors.primary} size={40} />}
          onPress={() => setPicker("method")}
        />
      </MoneyFlowScaffold>

      <AccountPicker
        visible={picker === "to"}
        onClose={() => setPicker(null)}
        accounts={targets}
        selectedId={toId}
        onSelect={setToId}
        title="Deposit to"
      />

      <Sheet visible={picker === "method"} onClose={() => setPicker(null)} title="Deposit method">
        {METHODS.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => {
              setMethodId(m.id)
              setPicker(null)
            }}
            className="mb-2 flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 active:opacity-70 dark:border-d-border dark:bg-d-surface"
          >
            <Avatar icon={m.icon} color={colors.primary} size={40} />
            <Text className="flex-1 text-sm font-semibold text-foreground dark:text-d-fg">
              {m.label}
            </Text>
            {m.id === methodId ? (
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            ) : (
              <View className="h-5 w-5 rounded-full border border-border dark:border-d-border" />
            )}
          </Pressable>
        ))}
      </Sheet>
    </>
  )
}
