import { Avatar } from "@/components/ui/Avatar"
import { AppHeader } from "@/components/ui/AppHeader"
import { Card } from "@/components/ui/Card"
import { ListRow } from "@/components/ui/ListRow"
import { Screen } from "@/components/ui/Screen"
import { useThemeColors } from "@/hooks/useThemeColors"
import { ACCOUNT_HOLDER } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import React from "react"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface Item {
  icon: IoniconName
  color: string
  name: string
  description: string
  route?: string
}

const GROUPS: { label: string; items: Item[] }[] = [
  {
    label: "Banking",
    items: [
      {
        icon: "card-outline",
        color: "#6366f1",
        name: "Cards",
        description: "Manage debit & credit cards",
        route: "/cards",
      },
      {
        icon: "receipt-outline",
        color: "#16a34a",
        name: "Transactions",
        description: "Full activity history",
        route: "/transactions",
      },
      {
        icon: "people-outline",
        color: "#ec4899",
        name: "Recipients",
        description: "Saved transfer payees",
        route: "/send",
      },
      {
        icon: "document-text-outline",
        color: "#0ea5e9",
        name: "Statements",
        description: "Download account statements",
      },
    ],
  },
  {
    label: "Preferences",
    items: [
      {
        icon: "settings-outline",
        color: "#64748b",
        name: "Settings",
        description: "App preferences",
        route: "/settings",
      },
      {
        icon: "shield-checkmark-outline",
        color: "#16a34a",
        name: "Security",
        description: "Password, biometrics & 2FA",
        route: "/settings",
      },
      {
        icon: "notifications-outline",
        color: "#f59e0b",
        name: "Notifications",
        description: "Push & email alerts",
        route: "/settings",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        icon: "help-circle-outline",
        color: "#a855f7",
        name: "Help & Support",
        description: "FAQs and contact support",
      },
      {
        icon: "information-circle-outline",
        color: "#ff7c28",
        name: "About",
        description: "App version & legal",
        route: "/about",
      },
    ],
  },
]

export default function MoreScreen() {
  const router = useRouter()
  const colors = useThemeColors()

  const open = (item: Item) => {
    if (item.route) router.push(item.route as never)
    else Alert.alert(item.name, "This feature isn't available in the demo yet.")
  }

  return (
    <Screen edges={["top"]}>
      <AppHeader title="More" large />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.push("/profile")}
          className="mb-2 flex-row items-center gap-3 rounded-2xl border border-border bg-surface p-4 active:opacity-70 dark:border-d-border dark:bg-d-surface"
        >
          <Avatar name={ACCOUNT_HOLDER} color={colors.primary} size={48} />
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground dark:text-d-fg">
              {ACCOUNT_HOLDER}
            </Text>
            <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
              View profile
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.chevronInactive} />
        </Pressable>

        {GROUPS.map((group) => (
          <View key={group.label}>
            <Text className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
              {group.label}
            </Text>
            <Card flush>
              {group.items.map((item, index) => (
                <ListRow
                  key={item.name}
                  left={
                    <View
                      className="h-9 w-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color + "22" }}
                    >
                      <Ionicons name={item.icon} size={18} color={item.color} />
                    </View>
                  }
                  title={item.name}
                  subtitle={item.description}
                  onPress={() => open(item)}
                  showChevron
                  divider={index < group.items.length - 1}
                />
              ))}
            </Card>
          </View>
        ))}

        <Text className="mt-8 text-center text-xs text-foreground-muted dark:text-d-fg-muted">
          Fidelity • v1.0.0
        </Text>
      </ScrollView>
    </Screen>
  )
}
