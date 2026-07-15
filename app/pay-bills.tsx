import { MoneyFlowScaffold } from "@/components/flows/MoneyFlowScaffold"
import { AccountPicker, BillerPicker } from "@/components/flows/pickers"
import { SelectorField } from "@/components/flows/SelectorField"
import { Avatar } from "@/components/ui/Avatar"
import { parseAmount } from "@/components/ui/AmountKeypad"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import { accountAvailable, useBankStore } from "@/store/useBankStore"
import { useState } from "react"

export default function PayBillsScreen() {
  const accounts = useBankStore((s) => s.accounts)
  const billers = useBankStore((s) => s.billers)
  const payBill = useBankStore((s) => s.payBill)

  const sourceAccounts = accounts.filter((a) => a.type !== "credit")
  const [fromId, setFromId] = useState(sourceAccounts[0].id)
  const [billerId, setBillerId] = useState(billers[0].id)
  const [amount, setAmount] = useState("")
  const [picker, setPicker] = useState<"from" | "biller" | null>(null)

  const from = accounts.find((a) => a.id === fromId)!
  const biller = billers.find((b) => b.id === billerId)!

  return (
    <>
      <MoneyFlowScaffold
        title="Pay bills"
        amount={amount}
        onAmountChange={setAmount}
        available={accountAvailable(from)}
        reviewRows={[
          { label: "Biller", value: biller.name },
          { label: "Category", value: biller.category },
          { label: "Account", value: biller.accountRef },
          { label: "From", value: `${from.name} ${formatAccountNumber(from.last4)}` },
          { label: "Amount", value: formatCurrency(parseAmount(amount)), highlight: true },
        ]}
        confirmLabel="Pay bill"
        successTitle="Bill paid"
        successMessage={`Paid ${biller.name}`}
        onConfirm={() => payBill({ fromAccountId: fromId, billerId, amount: parseAmount(amount) })}
      >
        <SelectorField
          label="Biller"
          value={biller.name}
          caption={`${biller.category} • ${biller.accountRef}`}
          left={<Avatar icon={biller.icon as never} color={biller.color} size={40} />}
          onPress={() => setPicker("biller")}
        />
        <SelectorField
          label="From"
          value={from.name}
          caption={`${formatAccountNumber(from.last4)} • ${formatCurrency(from.balance)}`}
          left={<Avatar icon="wallet" color={from.color} size={40} />}
          onPress={() => setPicker("from")}
        />
      </MoneyFlowScaffold>

      <BillerPicker
        visible={picker === "biller"}
        onClose={() => setPicker(null)}
        billers={billers}
        selectedId={billerId}
        onSelect={setBillerId}
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
