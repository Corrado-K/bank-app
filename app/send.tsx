import { MoneyFlowScaffold } from "@/components/flows/MoneyFlowScaffold"
import { AccountPicker, PayeePicker } from "@/components/flows/pickers"
import { SelectorField } from "@/components/flows/SelectorField"
import { Avatar } from "@/components/ui/Avatar"
import { parseAmount } from "@/components/ui/AmountKeypad"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { accountAvailable, useBankStore } from "@/store/useBankStore"
import { useState } from "react"

export default function SendScreen() {
  const accounts = useBankStore((s) => s.accounts)
  const payees = useBankStore((s) => s.payees)
  const send = useBankStore((s) => s.send)

  // Money can only be sent from asset accounts, not the credit line.
  const sourceAccounts = accounts.filter((a) => a.type !== "credit")
  const [fromId, setFromId] = useState(sourceAccounts[0].id)
  const [payeeId, setPayeeId] = useState(payees[0].id)
  const [amount, setAmount] = useState("")
  const [picker, setPicker] = useState<"from" | "payee" | null>(null)

  const from = accounts.find((a) => a.id === fromId)!
  const payee = payees.find((p) => p.id === payeeId)!

  return (
    <>
      <MoneyFlowScaffold
        title="Send money"
        amount={amount}
        onAmountChange={setAmount}
        available={accountAvailable(from)}
        reviewRows={[
          { label: "To", value: payee.name },
          { label: "Bank", value: `${payee.bank} ${formatAccountNumber(payee.last4)}` },
          { label: "From", value: `${from.name} ${formatAccountNumber(from.last4)}` },
          { label: "Amount", value: formatCurrency(parseAmount(amount)), highlight: true },
        ]}
        confirmLabel="Send now"
        successTitle="Money sent"
        successMessage={`Sent to ${payee.name}`}
        onConfirm={() => send({ fromAccountId: fromId, payeeId, amount: parseAmount(amount) })}
      >
        <SelectorField
          label="Recipient"
          value={payee.name}
          caption={`${payee.bank} • ${formatAccountNumber(payee.last4)}`}
          left={<Avatar name={payee.name} color={payee.color} size={40} />}
          onPress={() => setPicker("payee")}
        />
        <SelectorField
          label="From"
          value={from.name}
          caption={`${formatAccountNumber(from.last4)} • ${formatCurrency(from.balance)}`}
          left={<Avatar icon="wallet" color={from.color} size={40} />}
          onPress={() => setPicker("from")}
        />
      </MoneyFlowScaffold>

      <PayeePicker
        visible={picker === "payee"}
        onClose={() => setPicker(null)}
        payees={payees}
        selectedId={payeeId}
        onSelect={setPayeeId}
      />
      <AccountPicker
        visible={picker === "from"}
        onClose={() => setPicker(null)}
        accounts={sourceAccounts}
        selectedId={fromId}
        onSelect={setFromId}
        title="Pay from"
      />
    </>
  )
}
