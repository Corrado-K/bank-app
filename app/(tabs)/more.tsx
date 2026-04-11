import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import React from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"]

const OPTIONS: { icon: IoniconsName; name: string; description: string; route?: string }[] = [
  {
    icon: "settings-outline",
    name: "Settings",
    description: "Manage your app preferences",
    route: "/settings",
  },
  { icon: "shield-checkmark-outline", name: "Security", description: "Password, biometrics & 2FA" },
  {
    icon: "notifications-outline",
    name: "Notifications",
    description: "Manage push & email alerts",
  },
  { icon: "card-outline", name: "Cards", description: "Manage your debit & credit cards" },
  { icon: "people-outline", name: "Beneficiaries", description: "Saved transfer recipients" },
  { icon: "document-text-outline", name: "Statements", description: "Download account statements" },
  { icon: "help-circle-outline", name: "Help & Support", description: "FAQs and contact support" },
  {
    icon: "information-circle-outline",
    name: "About",
    description: "App version & legal info",
    route: "/about",
  },
  { icon: "log-out-outline", name: "Log Out", description: "Sign out of your account" },
]

export default function MoreScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-d-bg" edges={["top", "bottom"]}>
      <Text className="px-6 py-4 text-lg font-semibold text-foreground dark:text-d-fg">More</Text>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
          {OPTIONS.map((option, index) => (
            <Pressable
              key={option.name}
              className={`flex flex-row items-center gap-3 px-4 py-3.5 ${index < OPTIONS.length - 1 ? "border-b border-border-light dark:border-d-border-light" : ""}`}
              onPress={() => option.route && router.push(option.route as never)}
            >
              <View className="h-9 w-9 items-center justify-center rounded-full bg-subtle dark:bg-d-subtle">
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={option.name === "Log Out" ? "#ef4444" : "#ff7c28"}
                />
              </View>
              <View className="flex-1">
                <Text
                  className={`text-sm font-medium ${option.name === "Log Out" ? "text-red-400" : "text-foreground dark:text-d-fg"}`}
                >
                  {option.name}
                </Text>
                <Text className="text-[11px] text-foreground-muted dark:text-d-fg-muted">
                  {option.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
