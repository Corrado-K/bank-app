import ExpenseAnalytics from "@/components/home/expense-analytics"
import HomeOptions from "@/components/home/home-options"
import Ionicons from "@expo/vector-icons/Ionicons"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-d-bg" edges={["top", "bottom"]}>
      <View className="flex flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="font-medium text-foreground dark:text-d-fg">Welcome back, Kebede!</Text>
          <Text className="mt-1 text-sm text-foreground-secondary dark:text-d-fg-secondary">
            How can I help you today?
          </Text>
        </View>
        <View>
          <Ionicons name="person-circle" size={40} color="#ff7c28" />
        </View>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <HomeOptions />
        <ExpenseAnalytics />
      </ScrollView>
    </SafeAreaView>
  )
}
