import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function FinanceScreen() {
  return (
    <SafeAreaView className="bg-background dark:bg-d-bg flex-1" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-foreground dark:text-d-fg text-lg font-semibold">Finance</Text>
        <Text className="text-foreground-secondary dark:text-d-fg-secondary mt-1 text-center text-sm">
          Manage your finances, budgets, and transactions.
        </Text>
      </View>
    </SafeAreaView>
  )
}
