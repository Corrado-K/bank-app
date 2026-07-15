import { BankCard } from "@/components/BankCard"
import { AppHeader } from "@/components/ui/AppHeader"
import { Card } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/EmptyState"
import { Screen } from "@/components/ui/Screen"
import { Sheet } from "@/components/ui/Sheet"
import { useThemeColors } from "@/hooks/useThemeColors"
import { SCREEN_WIDTH } from "@/lib/utils"
import { formatCurrency } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

const LIMIT_OPTIONS = [1000, 2500, 5000, 10000, 15000]

function ControlRow({
  icon,
  label,
  description,
  value,
  onValueChange,
  divider,
}: {
  icon: IoniconName
  label: string
  description?: string
  value: boolean
  onValueChange: (v: boolean) => void
  divider?: boolean
}) {
  const colors = useThemeColors()
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3 ${divider ? "border-b border-border-light dark:border-d-border-light" : ""}`}
    >
      <View className="h-9 w-9 items-center justify-center rounded-full bg-subtle dark:bg-d-subtle">
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-medium text-foreground dark:text-d-fg">{label}</Text>
        {description ? (
          <Text className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary">
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={(v) => {
          Haptics.selectionAsync()
          onValueChange(v)
        }}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#ffffff"
        ios_backgroundColor={colors.border}
      />
    </View>
  )
}

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const colors = useThemeColors()
  const card = useBankStore((s) => s.cards.find((c) => c.id === id))
  const account = useBankStore((s) => s.accounts.find((a) => a.id === card?.accountId))
  const toggleFreeze = useBankStore((s) => s.toggleFreeze)
  const setSpendingLimit = useBankStore((s) => s.setSpendingLimit)

  const [contactless, setContactless] = useState(true)
  const [onlinePayments, setOnlinePayments] = useState(true)
  const [details, setDetails] = useState(false)
  const [limitSheet, setLimitSheet] = useState(false)

  if (!card) {
    return (
      <Screen edges={["top"]}>
        <AppHeader title="Card" showBack />
        <EmptyState icon="alert-circle-outline" title="Card not found" />
      </Screen>
    )
  }

  return (
    <Screen edges={["top"]}>
      <AppHeader
        title={`${card.network} ${card.type === "credit" ? "Credit" : "Debit"}`}
        showBack
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-5 px-5 pb-12 pt-2"
      >
        <View className="items-center">
          <BankCard card={card} width={SCREEN_WIDTH - 40} />
        </View>

        {details ? (
          <Card>
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
                Card number
              </Text>
              <Text className="text-sm font-medium text-foreground dark:text-d-fg">
                4539 8842 1190 {card.last4}
              </Text>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
                Expiry / CVV
              </Text>
              <Text className="text-sm font-medium text-foreground dark:text-d-fg">
                {card.expiry} / 823
              </Text>
            </View>
          </Card>
        ) : null}

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              toggleFreeze(card.id)
            }}
            className={`flex-1 items-center gap-1.5 rounded-2xl border py-4 active:opacity-70 ${card.frozen ? "border-info bg-info/10" : "border-border bg-surface dark:border-d-border dark:bg-d-surface"}`}
          >
            <Ionicons name="snow" size={22} color={card.frozen ? colors.info : colors.foreground} />
            <Text className="text-xs font-medium text-foreground dark:text-d-fg">
              {card.frozen ? "Unfreeze" : "Freeze"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync()
              setDetails((d) => !d)
            }}
            className="flex-1 items-center gap-1.5 rounded-2xl border border-border bg-surface py-4 active:opacity-70 dark:border-d-border dark:bg-d-surface"
          >
            <Ionicons name={details ? "eye-off" : "eye"} size={22} color={colors.foreground} />
            <Text className="text-xs font-medium text-foreground dark:text-d-fg">
              {details ? "Hide" : "Details"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLimitSheet(true)}
            className="flex-1 items-center gap-1.5 rounded-2xl border border-border bg-surface py-4 active:opacity-70 dark:border-d-border dark:bg-d-surface"
          >
            <Ionicons name="options" size={22} color={colors.foreground} />
            <Text className="text-xs font-medium text-foreground dark:text-d-fg">Limit</Text>
          </Pressable>
        </View>

        <View>
          <Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
            Linked account
          </Text>
          <Card>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
                {account?.name ?? "Account"}
              </Text>
              <Text className="text-sm font-semibold text-foreground dark:text-d-fg">
                {account ? formatCurrency(account.balance) : "—"}
              </Text>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
                Monthly limit
              </Text>
              <Text className="text-sm font-semibold text-foreground dark:text-d-fg">
                {formatCurrency(card.spendingLimit)}
              </Text>
            </View>
          </Card>
        </View>

        <View>
          <Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
            Controls
          </Text>
          <Card flush>
            <ControlRow
              icon="wifi"
              label="Contactless payments"
              description="Tap to pay in stores"
              value={contactless}
              onValueChange={setContactless}
              divider
            />
            <ControlRow
              icon="globe"
              label="Online payments"
              description="E-commerce and in-app"
              value={onlinePayments}
              onValueChange={setOnlinePayments}
            />
          </Card>
        </View>

        <Pressable
          onPress={() =>
            Alert.alert("Report card", "Report this card as lost or stolen?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Report",
                style: "destructive",
                onPress: () => {
                  if (!card.frozen) toggleFreeze(card.id)
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                  Alert.alert("Card frozen", "Your card has been frozen and a replacement ordered.")
                },
              },
            ])
          }
          className="flex-row items-center justify-center gap-2 rounded-2xl border border-danger/30 py-3.5 active:opacity-70"
        >
          <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
          <Text className="text-sm font-semibold text-danger-light">Report lost or stolen</Text>
        </Pressable>
      </ScrollView>

      <Sheet
        visible={limitSheet}
        onClose={() => setLimitSheet(false)}
        title="Monthly spending limit"
      >
        {LIMIT_OPTIONS.map((limit) => (
          <Pressable
            key={limit}
            onPress={() => {
              Haptics.selectionAsync()
              setSpendingLimit(card.id, limit)
              setLimitSheet(false)
            }}
            className="mb-2 flex-row items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5 active:opacity-70 dark:border-d-border dark:bg-d-surface"
          >
            <Text className="text-sm font-semibold text-foreground dark:text-d-fg">
              {formatCurrency(limit)}
            </Text>
            {card.spendingLimit === limit ? (
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            ) : (
              <View className="h-5 w-5 rounded-full border border-border dark:border-d-border" />
            )}
          </Pressable>
        ))}
      </Sheet>
    </Screen>
  )
}
