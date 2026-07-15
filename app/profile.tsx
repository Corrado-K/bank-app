import { Avatar } from "@/components/ui/Avatar"
import { AppHeader } from "@/components/ui/AppHeader"
import { Card } from "@/components/ui/Card"
import { ListRow } from "@/components/ui/ListRow"
import { Screen } from "@/components/ui/Screen"
import { useThemeColors } from "@/hooks/useThemeColors"
import { ACCOUNT_HOLDER } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { Alert, ScrollView, Text, View } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

function IconBadge({ icon, color }: { icon: IoniconName; color: string }) {
  return <Avatar icon={icon} color={color} size={38} />
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
      {children}
    </Text>
  )
}

export default function ProfileScreen() {
  const router = useRouter()
  const colors = useThemeColors()
  const email = "kebede.fola@fidelity.app"

  const notReady = (feature: string) => () =>
    Alert.alert(feature, "This feature isn't available in the demo yet.")

  return (
    <Screen edges={["top"]}>
      <AppHeader title="Profile" showBack />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center py-6">
          <Avatar name={ACCOUNT_HOLDER} color={colors.primary} size={84} />
          <Text className="mt-4 text-xl font-bold text-foreground dark:text-d-fg">
            {ACCOUNT_HOLDER}
          </Text>
          <Text className="mt-0.5 text-sm text-foreground-secondary dark:text-d-fg-secondary">
            {email}
          </Text>
          <View className="mt-3 flex-row items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <Ionicons name="shield-checkmark" size={13} color={colors.primary} />
            <Text className="text-xs font-medium text-primary">Verified • Member since 2021</Text>
          </View>
        </View>

        <SectionLabel>Account</SectionLabel>
        <Card flush>
          <ListRow
            left={<IconBadge icon="person-outline" color="#ff7c28" />}
            title="Personal information"
            subtitle="Name, phone, address"
            onPress={notReady("Personal information")}
            showChevron
            divider
          />
          <ListRow
            left={<IconBadge icon="card-outline" color="#6366f1" />}
            title="Cards & accounts"
            subtitle="Manage your cards"
            onPress={() => router.push("/cards")}
            showChevron
            divider
          />
          <ListRow
            left={<IconBadge icon="receipt-outline" color="#16a34a" />}
            title="Transactions"
            subtitle="Full activity history"
            onPress={() => router.push("/transactions")}
            showChevron
          />
        </Card>

        <SectionLabel>Security</SectionLabel>
        <Card flush>
          <ListRow
            left={<IconBadge icon="lock-closed-outline" color="#0ea5e9" />}
            title="Password & security"
            subtitle="Password, biometrics & 2FA"
            onPress={() => router.push("/settings")}
            showChevron
            divider
          />
          <ListRow
            left={<IconBadge icon="settings-outline" color="#64748b" />}
            title="Preferences"
            subtitle="Theme, notifications"
            onPress={() => router.push("/settings")}
            showChevron
          />
        </Card>

        <SectionLabel>Support</SectionLabel>
        <Card flush>
          <ListRow
            left={<IconBadge icon="help-circle-outline" color="#f59e0b" />}
            title="Help & support"
            onPress={notReady("Help & support")}
            showChevron
            divider
          />
          <ListRow
            left={<IconBadge icon="information-circle-outline" color="#a855f7" />}
            title="About"
            onPress={() => router.push("/about")}
            showChevron
          />
        </Card>

        <View className="mt-6">
          <Card flush>
            <ListRow
              left={<IconBadge icon="log-out-outline" color="#dc2626" />}
              title="Log out"
              danger
              onPress={() =>
                Alert.alert("Log out", "Are you sure you want to log out?", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Log out",
                    style: "destructive",
                    onPress: () =>
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
                  },
                ])
              }
            />
          </Card>
        </View>
      </ScrollView>
    </Screen>
  )
}
