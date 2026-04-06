import ExpenseAnalytics from "@/components/home/expense-analytics"
import HomeOptions from "@/components/home/home-options"
import Ionicons from "@expo/vector-icons/Ionicons"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-background dark:bg-d-bg flex-1" edges={["top", "bottom"]}>
      <View className="flex flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="text-foreground dark:text-d-fg font-medium">Welcome back, Kebede!</Text>
          <Text className="text-foreground-secondary dark:text-d-fg-secondary mt-1 text-sm">
            How can I help you today?
          </Text>
        </View>
        <View>
          <Ionicons name="person-circle" size={40} color="#ff7c28" />
        </View>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-6 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <HomeOptions />
        <ExpenseAnalytics />
      </ScrollView>
    </SafeAreaView>
  )
}
