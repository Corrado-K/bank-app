import { MoneyFlowScaffold } from "@/components/flows/MoneyFlowScaffold"
import { AccountPicker } from "@/components/flows/pickers"
import { SelectorField } from "@/components/flows/SelectorField"
import { Avatar } from "@/components/ui/Avatar"
import { parseAmount } from "@/components/ui/AmountKeypad"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { accountAvailable, useBankStore } from "@/store/useBankStore"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"

export default function WithdrawScreen() {
  const params = useLocalSearchParams<{ account?: string }>()
  const accounts = useBankStore((s) => s.accounts)
  const withdraw = useBankStore((s) => s.withdraw)

  const sources = accounts.filter((a) => a.type !== "credit")
  const initial =
    params.account && sources.some((a) => a.id === params.account) ? params.account : sources[0].id
  const [fromId, setFromId] = useState(initial)
  const [amount, setAmount] = useState("")
  const [picker, setPicker] = useState(false)

  const from = accounts.find((a) => a.id === fromId)!

  return (
    <>
      <MoneyFlowScaffold
        title="Withdraw"
        amount={amount}
        onAmountChange={setAmount}
        available={accountAvailable(from)}
        reviewRows={[
          { label: "From", value: `${from.name} ${formatAccountNumber(from.last4)}` },
          { label: "Method", value: "ATM Withdrawal" },
          { label: "Amount", value: formatCurrency(parseAmount(amount)), highlight: true },
        ]}
        confirmLabel="Withdraw"
        successTitle="Withdrawal complete"
        successMessage={`From ${from.name}`}
        onConfirm={() => withdraw({ accountId: fromId, amount: parseAmount(amount) })}
      >
        <SelectorField
          label="Withdraw from"
          value={from.name}
          caption={`${formatAccountNumber(from.last4)} • ${formatCurrency(from.balance)}`}
          left={<Avatar icon="wallet" color={from.color} size={40} />}
          onPress={() => setPicker(true)}
        />
      </MoneyFlowScaffold>

      <AccountPicker
        visible={picker}
        onClose={() => setPicker(false)}
        accounts={sources}
        selectedId={fromId}
        onSelect={setFromId}
        title="Withdraw from"
      />
    </>
  )
}
