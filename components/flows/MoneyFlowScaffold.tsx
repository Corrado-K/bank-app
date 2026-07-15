import { AppHeader } from "@/components/ui/AppHeader"
import { Button } from "@/components/ui/Button"
import { Screen } from "@/components/ui/Screen"
import { AmountKeypad, parseAmount } from "@/components/ui/AmountKeypad"
import { useThemeColors } from "@/hooks/useThemeColors"
import { formatCurrency } from "@/lib/format"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import * as Haptics from "expo-haptics"
import { ReactNode, useState } from "react"
import { Text, View } from "react-native"

export interface ReviewRow {
  label: string
  value: string
  highlight?: boolean
}

interface MoneyFlowScaffoldProps {
  title: string
  amount: string
  onAmountChange: (v: string) => void
  /** Source available balance — shown under the amount and used to validate. */
  available?: number
  availableLabel?: string
  /** Selector fields shown above the amount on the entry step. */
  children?: ReactNode
  /** Whether the entry step can advance (selections valid). */
  canContinue?: boolean
  reviewRows: ReviewRow[]
  confirmLabel: string
  successTitle: string
  successMessage: string
  /** Performs the mutation; return ok:false with an error to stay on review. */
  onConfirm: () => { ok: boolean; error?: string }
}

function displayAmount(value: string): string {
  if (value === "" || value === ".") return "0"
  const [intPart, decimals] = value.split(".")
  const withCommas = Number(intPart || "0").toLocaleString("en-US")
  return decimals !== undefined ? `${withCommas}.${decimals}` : withCommas
}

export function MoneyFlowScaffold({
  title,
  amount,
  onAmountChange,
  available,
  availableLabel = "Available",
  children,
  canContinue = true,
  reviewRows,
  confirmLabel,
  successTitle,
  successMessage,
  onConfirm,
}: MoneyFlowScaffoldProps) {
  const router = useRouter()
  const colors = useThemeColors()
  const [step, setStep] = useState<"entry" | "review" | "success">("entry")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const numericAmount = parseAmount(amount)
  const overLimit = available !== undefined && numericAmount > available
  const entryValid = numericAmount > 0 && canContinue && !overLimit

  function handleBack() {
    if (step === "review") {
      setStep("entry")
      return
    }
    if (router.canGoBack()) router.back()
  }

  function goReview() {
    if (!entryValid) return
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setError(null)
    setStep("review")
  }

  function confirm() {
    setSubmitting(true)
    const result = onConfirm()
    setSubmitting(false)
    if (result.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setStep("success")
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      setError(result.error ?? "Something went wrong. Please try again.")
    }
  }

  if (step === "success") {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-success/15">
            <Ionicons name="checkmark" size={44} color={colors.success} />
          </View>
          <Text className="text-center text-2xl font-bold text-foreground dark:text-d-fg">
            {successTitle}
          </Text>
          <Text className="mt-2 text-center text-sm text-foreground-secondary dark:text-d-fg-secondary">
            {successMessage}
          </Text>
          <Text className="mt-6 text-4xl font-extrabold text-foreground dark:text-d-fg">
            {formatCurrency(numericAmount)}
          </Text>
        </View>
        <View className="px-5 pb-4">
          <Button title="Done" onPress={() => router.back()} />
        </View>
      </Screen>
    )
  }

  if (step === "review") {
    return (
      <Screen>
        <AppHeader title={`Review ${title}`} showBack onBack={handleBack} />
        <View className="flex-1 px-5">
          <View className="items-center py-8">
            <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
              Amount
            </Text>
            <Text className="mt-1 text-4xl font-extrabold text-foreground dark:text-d-fg">
              {formatCurrency(numericAmount)}
            </Text>
          </View>
          <View className="overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
            {reviewRows.map((row, i) => (
              <View
                key={row.label}
                className={`flex-row items-center justify-between px-4 py-3.5 ${i < reviewRows.length - 1 ? "border-b border-border-light dark:border-d-border-light" : ""}`}
              >
                <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
                  {row.label}
                </Text>
                <Text
                  className={`ml-4 flex-1 text-right text-sm font-semibold ${row.highlight ? "text-primary" : "text-foreground dark:text-d-fg"}`}
                  numberOfLines={1}
                >
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
          {error ? (
            <View className="mt-4 flex-row items-center gap-2 rounded-xl bg-danger/10 px-4 py-3">
              <Ionicons name="alert-circle" size={18} color={colors.danger} />
              <Text className="flex-1 text-sm text-danger-light">{error}</Text>
            </View>
          ) : null}
        </View>
        <View className="gap-3 px-5 pb-4">
          <Button title={confirmLabel} onPress={confirm} loading={submitting} />
          <Button title="Cancel" variant="ghost" onPress={handleBack} haptic={false} />
        </View>
      </Screen>
    )
  }

  // entry
  return (
    <Screen>
      <AppHeader title={title} showBack onBack={handleBack} />
      <View className="flex-1 px-5">
        {children ? <View className="gap-3">{children}</View> : null}

        <View className="flex-1 items-center justify-center py-6">
          <View className="flex-row items-start">
            <Text className="mt-2 text-2xl font-bold text-foreground-secondary dark:text-d-fg-secondary">
              $
            </Text>
            <Text className="text-6xl font-extrabold text-foreground dark:text-d-fg">
              {displayAmount(amount)}
            </Text>
          </View>
          {available !== undefined ? (
            <Text
              className={`mt-3 text-xs ${overLimit ? "text-danger-light" : "text-foreground-secondary dark:text-d-fg-secondary"}`}
            >
              {overLimit
                ? "Amount exceeds available balance"
                : `${availableLabel} ${formatCurrency(available)}`}
            </Text>
          ) : null}
        </View>

        <AmountKeypad value={amount} onChange={onAmountChange} />
      </View>
      <View className="px-5 pb-4 pt-2">
        <Button title="Continue" onPress={goReview} disabled={!entryValid} />
      </View>
    </Screen>
  )
}
