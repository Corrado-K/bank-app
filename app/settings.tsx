import { AppHeader } from "@/components/ui/AppHeader"
import { Card } from "@/components/ui/Card"
import { Screen } from "@/components/ui/Screen"
import { useThemeColors } from "@/hooks/useThemeColors"
import { useAppStore } from "@/store/useAppStore"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import React from "react"
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native"

const THEMES = [
  { value: "light" as const, label: "Light", icon: "sunny-outline" as const },
  { value: "dark" as const, label: "Dark", icon: "moon-outline" as const },
  { value: "system" as const, label: "System", icon: "phone-portrait-outline" as const },
]

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
      {children}
    </Text>
  )
}

function ToggleRow({
  icon,
  label,
  description,
  value,
  onValueChange,
  divider,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"]
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

export default function SettingsScreen() {
  const colors = useThemeColors()
  const {
    theme,
    setTheme,
    hideBalances,
    setHideBalances,
    biometricsEnabled,
    setBiometricsEnabled,
    pushNotifications,
    setPushNotifications,
    transactionAlerts,
    setTransactionAlerts,
  } = useAppStore()
  const resetDemo = useBankStore((s) => s.resetDemo)

  function confirmReset() {
    Alert.alert(
      "Reset demo data",
      "This restores all accounts, balances and transactions to their original demo state.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetDemo()
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            Alert.alert("Done", "Demo data has been reset.")
          },
        },
      ],
    )
  }

  return (
    <Screen>
      <AppHeader title="Settings" showBack />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <SectionLabel>Appearance</SectionLabel>
        <Card flush>
          {THEMES.map((item, index) => (
            <Pressable
              key={item.value}
              className={`flex-row items-center gap-3 px-4 py-3 active:opacity-60 ${index < THEMES.length - 1 ? "border-b border-border-light dark:border-d-border-light" : ""}`}
              onPress={() => {
                Haptics.selectionAsync()
                setTheme(item.value)
              }}
            >
              <View className="h-9 w-9 items-center justify-center rounded-full bg-subtle dark:bg-d-subtle">
                <Ionicons name={item.icon} size={18} color={colors.primary} />
              </View>
              <Text className="flex-1 text-sm font-medium text-foreground dark:text-d-fg">
                {item.label}
              </Text>
              {theme === item.value && (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </Card>

        <SectionLabel>Privacy & Security</SectionLabel>
        <Card flush>
          <ToggleRow
            icon="eye-off-outline"
            label="Hide balances"
            description="Mask amounts by default across the app"
            value={hideBalances}
            onValueChange={setHideBalances}
            divider
          />
          <ToggleRow
            icon="finger-print-outline"
            label="Biometric login"
            description="Use Face ID / Touch ID to unlock"
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
          />
        </Card>

        <SectionLabel>Notifications</SectionLabel>
        <Card flush>
          <ToggleRow
            icon="notifications-outline"
            label="Push notifications"
            description="Product updates and reminders"
            value={pushNotifications}
            onValueChange={setPushNotifications}
            divider
          />
          <ToggleRow
            icon="card-outline"
            label="Transaction alerts"
            description="Get notified on every purchase"
            value={transactionAlerts}
            onValueChange={setTransactionAlerts}
          />
        </Card>

        <SectionLabel>Data</SectionLabel>
        <Card flush>
          <Pressable
            onPress={confirmReset}
            className="flex-row items-center gap-3 px-4 py-3 active:opacity-60"
          >
            <View className="h-9 w-9 items-center justify-center rounded-full bg-subtle dark:bg-d-subtle">
              <Ionicons name="refresh-outline" size={18} color={colors.danger} />
            </View>
            <Text className="flex-1 text-sm font-medium text-danger-light">Reset demo data</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.chevronInactive} />
          </Pressable>
        </Card>
      </ScrollView>
    </Screen>
  )
}
