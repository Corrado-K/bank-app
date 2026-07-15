import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable, Text, View } from "react-native"

import { Avatar } from "@/components/ui/Avatar"
import { Sheet } from "@/components/ui/Sheet"
import { useThemeColors } from "@/hooks/useThemeColors"
import { formatAccountNumber, formatCurrency } from "@/lib/format"
import type { Account, Biller, Payee } from "@/types"

function RowShell({
  selected,
  onPress,
  children,
}: {
  selected: boolean
  onPress: () => void
  children: React.ReactNode
}) {
  const colors = useThemeColors()
  return (
    <Pressable
      onPress={onPress}
      className="mb-2 flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 active:opacity-70 dark:border-d-border dark:bg-d-surface"
    >
      {children}
      {selected ? (
        <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
      ) : (
        <View className="h-5 w-5 rounded-full border border-border dark:border-d-border" />
      )}
    </Pressable>
  )
}

export function AccountPicker({
  visible,
  onClose,
  accounts,
  selectedId,
  onSelect,
  title = "Select account",
  /** Account ids that cannot be chosen (e.g. the transfer source). */
  disabledIds = [],
}: {
  visible: boolean
  onClose: () => void
  accounts: Account[]
  selectedId?: string
  onSelect: (id: string) => void
  title?: string
  disabledIds?: string[]
}) {
  return (
    <Sheet visible={visible} onClose={onClose} title={title}>
      {accounts.map((a) => {
        const disabled = disabledIds.includes(a.id)
        return (
          <View key={a.id} className={disabled ? "opacity-40" : ""}>
            <RowShell
              selected={a.id === selectedId}
              onPress={() => {
                if (disabled) return
                onSelect(a.id)
                onClose()
              }}
            >
              <Avatar icon="wallet" color={a.color} size={40} />
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground dark:text-d-fg">
                  {a.name}
                </Text>
                <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
                  {formatAccountNumber(a.last4)} • {formatCurrency(a.balance)}
                </Text>
              </View>
            </RowShell>
          </View>
        )
      })}
    </Sheet>
  )
}

export function PayeePicker({
  visible,
  onClose,
  payees,
  selectedId,
  onSelect,
}: {
  visible: boolean
  onClose: () => void
  payees: Payee[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Select recipient">
      {payees.map((p) => (
        <RowShell
          key={p.id}
          selected={p.id === selectedId}
          onPress={() => {
            onSelect(p.id)
            onClose()
          }}
        >
          <Avatar name={p.name} color={p.color} size={40} />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground dark:text-d-fg">{p.name}</Text>
            <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
              {p.bank} • {formatAccountNumber(p.last4)}
            </Text>
          </View>
        </RowShell>
      ))}
    </Sheet>
  )
}

export function BillerPicker({
  visible,
  onClose,
  billers,
  selectedId,
  onSelect,
}: {
  visible: boolean
  onClose: () => void
  billers: Biller[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Select biller">
      {billers.map((b) => (
        <RowShell
          key={b.id}
          selected={b.id === selectedId}
          onPress={() => {
            onSelect(b.id)
            onClose()
          }}
        >
          <Avatar icon={b.icon as never} color={b.color} size={40} />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground dark:text-d-fg">{b.name}</Text>
            <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
              {b.category} • {b.accountRef}
            </Text>
          </View>
        </RowShell>
      ))}
    </Sheet>
  )
}
