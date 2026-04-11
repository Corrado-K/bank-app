import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import Constants from "expo-constants"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import * as Updates from "expo-updates"
import { useState } from "react"
import { Alert, Linking, Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0"
const BUILD_NUMBER =
  Constants.expoConfig?.ios?.buildNumber ?? Constants.expoConfig?.android?.versionCode ?? "1"

type UpdateStatus = "idle" | "checking" | "downloading" | "up-to-date" | "error"

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">{label}</Text>
      <Text className="text-sm font-medium text-foreground dark:text-d-fg">{value}</Text>
    </View>
  )
}

function Divider() {
  return <View className="mx-4 border-b border-border dark:border-d-border" />
}

function LinkRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"]
  label: string
  onPress: () => void
}) {
  const colors = useThemeColors()
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-60"
    >
      <View className="h-8 w-8 items-center justify-center rounded-full bg-subtle dark:bg-d-subtle">
        <Ionicons name={icon} size={16} color="#ff7c28" />
      </View>
      <Text className="flex-1 text-sm font-medium text-foreground dark:text-d-fg">{label}</Text>
      <Ionicons name="chevron-forward" size={14} color={colors.foregroundSecondary} />
    </Pressable>
  )
}

export default function AboutScreen() {
  const router = useRouter()
  const colors = useThemeColors()
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>("idle")

  async function checkForUpdate() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    if (!Updates.isEnabled) {
      Alert.alert("Development Build", "OTA updates are only available in production builds.")
      return
    }

    setUpdateStatus("checking")
    try {
      const result = await Updates.checkForUpdateAsync()
      if (!result.isAvailable) {
        setUpdateStatus("up-to-date")
        setTimeout(() => setUpdateStatus("idle"), 3000)
        return
      }

      Alert.alert(
        "Update Available",
        "A new version of Fidelity is ready to install. The app will restart after downloading.",
        [
          { text: "Later", style: "cancel", onPress: () => setUpdateStatus("idle") },
          {
            text: "Install Now",
            onPress: async () => {
              setUpdateStatus("downloading")
              try {
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
              } catch {
                setUpdateStatus("error")
                Alert.alert("Update Failed", "Could not download the update. Please try again.")
                setTimeout(() => setUpdateStatus("idle"), 3000)
              }
            },
          },
        ],
      )
    } catch {
      setUpdateStatus("error")
      Alert.alert("Check Failed", "Could not check for updates. Please try again later.")
      setTimeout(() => setUpdateStatus("idle"), 3000)
    }
  }

  const updateButtonLabel: Record<UpdateStatus, string> = {
    idle: "Check for Updates",
    checking: "Checking...",
    downloading: "Downloading...",
    "up-to-date": "You're up to date",
    error: "Try Again",
  }

  const updateButtonIcon: Record<UpdateStatus, React.ComponentProps<typeof Ionicons>["name"]> = {
    idle: "refresh-outline",
    checking: "sync-outline",
    downloading: "cloud-download-outline",
    "up-to-date": "checkmark-circle-outline",
    error: "alert-circle-outline",
  }

  const isLoading = updateStatus === "checking" || updateStatus === "downloading"

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-d-bg" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* App Identity */}
        <View className="items-center px-6 py-10">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-[22px] bg-primary shadow-lg">
            <Ionicons name="wallet" size={38} color="#ffffff" />
          </View>
          <Text className="text-2xl font-bold text-foreground dark:text-d-fg">Fidelity</Text>
          <Text className="mt-1 text-sm text-foreground-secondary dark:text-d-fg-secondary">
            Your modern banking companion
          </Text>
        </View>

        {/* Version Info */}
        <View className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
          <InfoRow label="Version" value={`${APP_VERSION}`} />
          <Divider />
          <InfoRow label="Build" value={`${BUILD_NUMBER}`} />
          <Divider />
          <InfoRow label="Platform" value="iOS / Android" />
          <Divider />
          <InfoRow label="Environment" value={Updates.channel ?? "development"} />
        </View>

        {/* Update Button */}
        <View className="mx-4 mb-4">
          <Pressable
            onPress={checkForUpdate}
            disabled={isLoading}
            className={`flex-row items-center justify-center gap-2 rounded-2xl py-4 ${
              updateStatus === "up-to-date"
                ? "bg-emerald-500"
                : updateStatus === "error"
                  ? "bg-red-500"
                  : "bg-primary"
            } ${isLoading ? "opacity-70" : "active:opacity-80"}`}
          >
            <Ionicons
              name={updateButtonIcon[updateStatus]}
              size={18}
              color="#ffffff"
            />
            <Text className="text-base font-semibold text-white">
              {updateButtonLabel[updateStatus]}
            </Text>
          </Pressable>
          {updateStatus === "idle" && (
            <Text className="mt-2 text-center text-xs text-foreground-muted dark:text-d-fg-muted">
              Last checked: just now
            </Text>
          )}
        </View>

        {/* Legal & Links */}
        <View className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
          <LinkRow
            icon="document-text-outline"
            label="Privacy Policy"
            onPress={() => Linking.openURL("https://fidelity.app/privacy")}
          />
          <Divider />
          <LinkRow
            icon="shield-outline"
            label="Terms of Service"
            onPress={() => Linking.openURL("https://fidelity.app/terms")}
          />
          <Divider />
          <LinkRow
            icon="lock-closed-outline"
            label="Cookie Policy"
            onPress={() => Linking.openURL("https://fidelity.app/cookies")}
          />
          <Divider />
          <LinkRow
            icon="newspaper-outline"
            label="Open Source Licenses"
            onPress={() => Alert.alert("Licenses", "Open source license information.")}
          />
        </View>

        {/* Support */}
        <View className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface">
          <LinkRow
            icon="mail-outline"
            label="Contact Support"
            onPress={() => Linking.openURL("mailto:support@fidelity.app")}
          />
          <Divider />
          <LinkRow
            icon="star-outline"
            label="Rate the App"
            onPress={() => Alert.alert("Rate Us", "Redirecting to App Store…")}
          />
        </View>

        {/* Footer */}
        <Text className="mt-4 text-center text-xs text-foreground-muted dark:text-d-fg-muted">
          © {new Date().getFullYear()} Fidelity Financial, Inc.{"\n"}All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
