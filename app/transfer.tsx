import { MoneyFlowScaffold } from "@/components/flows/MoneyFlowScaffold"
import { AccountPicker } from "@/components/flows/pickers"
import { SelectorField } from "@/components/flows/SelectorField"
import { Avatar } from "@/components/ui/Avatar"
import { parseAmount } from "@/components/ui/AmountKeypad"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { accountAvailable, useBankStore } from "@/store/useBankStore"
import { useLocalSearchParams } from "expo-router"
import { useMemo, useState } from "react"

export default function TransferScreen() {
  const params = useLocalSearchParams<{ from?: string }>()
  const accounts = useBankStore((s) => s.accounts)
  const transfer = useBankStore((s) => s.transfer)

  // Money can only move OUT of a deposit account; the destination can be any
  // account (including the credit card, to pay it down).
  const sources = useMemo(() => accounts.filter((a) => a.type !== "credit"), [accounts])
  const initialFrom =
    params.from && sources.some((a) => a.id === params.from) ? params.from : sources[0].id
  const [fromId, setFromId] = useState(initialFrom)
  const [toId, setToId] = useState(accounts.find((a) => a.id !== initialFrom)!.id)
  const [amount, setAmount] = useState("")
  const [picker, setPicker] = useState<"from" | "to" | null>(null)

  const from = accounts.find((a) => a.id === fromId)!
  const to = accounts.find((a) => a.id === toId)!

  return (
    <>
      <MoneyFlowScaffold
        title="Transfer"
        amount={amount}
        onAmountChange={setAmount}
        available={accountAvailable(from)}
        canContinue={fromId !== toId}
        reviewRows={[
          { label: "From", value: `${from.name} ${formatAccountNumber(from.last4)}` },
          { label: "To", value: `${to.name} ${formatAccountNumber(to.last4)}` },
          { label: "Amount", value: formatCurrency(parseAmount(amount)), highlight: true },
          { label: "When", value: "Now" },
        ]}
        confirmLabel="Confirm transfer"
        successTitle="Transfer complete"
        successMessage={`Moved to ${to.name}`}
        onConfirm={() =>
          transfer({ fromAccountId: fromId, toAccountId: toId, amount: parseAmount(amount) })
        }
      >
        <SelectorField
          label="From"
          value={from.name}
          caption={`${formatAccountNumber(from.last4)} • ${formatCurrency(from.balance)}`}
          left={<Avatar icon="wallet" color={from.color} size={40} />}
          onPress={() => setPicker("from")}
        />
        <SelectorField
          label="To"
          value={to.name}
          caption={`${formatAccountNumber(to.last4)} • ${formatCurrency(to.balance)}`}
          left={<Avatar icon="wallet" color={to.color} size={40} />}
          onPress={() => setPicker("to")}
        />
      </MoneyFlowScaffold>

      <AccountPicker
        visible={picker === "from"}
        onClose={() => setPicker(null)}
        accounts={sources}
        selectedId={fromId}
        disabledIds={[toId]}
        onSelect={setFromId}
        title="Transfer from"
      />
      <AccountPicker
        visible={picker === "to"}
        onClose={() => setPicker(null)}
        accounts={accounts}
        selectedId={toId}
        disabledIds={[fromId]}
        onSelect={setToId}
        title="Transfer to"
      />
    </>
  )
}
