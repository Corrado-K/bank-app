import { PayeePicker } from "@/components/flows/pickers"
import { AppHeader } from "@/components/ui/AppHeader"
import { Avatar } from "@/components/ui/Avatar"
import { Card } from "@/components/ui/Card"
import { Screen } from "@/components/ui/Screen"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useThemeColors } from "@/hooks/useThemeColors"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

const ACTIONS: { icon: IoniconName; label: string; sub: string; route: string; color: string }[] = [
  {
    icon: "swap-horizontal",
    label: "Transfer",
    sub: "Between your accounts",
    route: "/transfer",
    color: "#6366f1",
  },
  {
    icon: "paper-plane",
    label: "Send",
    sub: "To a person or bank",
    route: "/send",
    color: "#ff7c28",
  },
  {
    icon: "receipt",
    label: "Pay Bills",
    sub: "Utilities & subscriptions",
    route: "/pay-bills",
    color: "#f59e0b",
  },
  {
    icon: "add-circle",
    label: "Add Money",
    sub: "Deposit to an account",
    route: "/deposit",
    color: "#16a34a",
  },
  { icon: "cash", label: "Withdraw", sub: "ATM & cash out", route: "/withdraw", color: "#0ea5e9" },
  { icon: "qr-code", label: "Scan QR", sub: "Pay by QR code", route: "/send", color: "#a855f7" },
]

export default function PayScreen() {
  const router = useRouter()
  const colors = useThemeColors()
  const payees = useBankStore((s) => s.payees)
  const [pickPayee, setPickPayee] = useState(false)

  function go(route: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(route as never)
  }

  return (
    <Screen edges={["top"]}>
      <AppHeader title="Pay & Transfer" large />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {ACTIONS.map((a) => (
            <Pressable
              key={a.label}
              onPress={() => go(a.route)}
              style={{ width: "48.5%" }}
              className="rounded-2xl border border-border bg-surface p-4 active:opacity-70 dark:border-d-border dark:bg-d-surface"
            >
              <Avatar icon={a.icon} color={a.color} size={44} />
              <Text className="mt-3 text-sm font-semibold text-foreground dark:text-d-fg">
                {a.label}
              </Text>
              <Text className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary">
                {a.sub}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-3">
          <SectionHeader title="Recipients" actionLabel="Send" onAction={() => go("/send")} />
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => setPickPayee(true)}
              className="items-center active:opacity-70"
              style={{ width: 64 }}
            >
              <View className="h-14 w-14 items-center justify-center rounded-full border border-dashed border-border dark:border-d-border">
                <Ionicons name="add" size={24} color={colors.foregroundSecondary} />
              </View>
              <Text className="mt-1.5 text-center text-[11px] text-foreground-secondary dark:text-d-fg-secondary">
                New
              </Text>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-4">
                {payees.map((p) => (
                  <Pressable
                    key={p.id}
                    onPress={() => go("/send")}
                    className="items-center active:opacity-70"
                    style={{ width: 64 }}
                  >
                    <Avatar name={p.name} color={p.color} size={56} />
                    <Text
                      className="mt-1.5 text-center text-[11px] text-foreground dark:text-d-fg"
                      numberOfLines={1}
                    >
                      {p.name.split(" ")[0]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <View className="gap-3">
          <SectionHeader title="Scheduled" />
          <Card>
            <View className="flex-row items-center gap-3">
              <Avatar icon="calendar" color={colors.info} size={40} />
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground dark:text-d-fg">
                  No upcoming payments
                </Text>
                <Text className="mt-0.5 text-xs text-foreground-secondary dark:text-d-fg-secondary">
                  Schedule a bill to see it here
                </Text>
              </View>
              <Pressable onPress={() => go("/pay-bills")} hitSlop={8}>
                <Text className="text-sm font-semibold text-primary">Add</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </ScrollView>

      <PayeePicker
        visible={pickPayee}
        onClose={() => setPickPayee(false)}
        payees={payees}
        onSelect={() => {
          setPickPayee(false)
          go("/send")
        }}
      />
    </Screen>
  )
}
