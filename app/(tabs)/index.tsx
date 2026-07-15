import AccountsList from "@/components/home/accounts-list"
import BalanceHero from "@/components/home/balance-hero"
import CardCarousel from "@/components/home/card-carousel"
import ExpenseAnalytics from "@/components/home/expense-analytics"
import QuickActions from "@/components/home/quick-actions"
import RecentTransactions from "@/components/home/recent-transactions"
import { Avatar } from "@/components/ui/Avatar"
import { Screen } from "@/components/ui/Screen"
import { ACCOUNT_HOLDER } from "@/store/useBankStore"
import { useRouter } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export default function HomeScreen() {
  const router = useRouter()
  const firstName = ACCOUNT_HOLDER.split(" ")[0]

  return (
    <Screen edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-1">
        <View>
          <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
            {greeting()},
          </Text>
          <Text className="text-xl font-bold text-foreground dark:text-d-fg">{firstName}</Text>
        </View>
        <Pressable onPress={() => router.push("/profile")} className="active:opacity-70">
          <Avatar name={ACCOUNT_HOLDER} color="#ff7c28" size={42} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5 pb-28 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <BalanceHero />
        <QuickActions />
        <AccountsList />
        <CardCarousel />
        <RecentTransactions />
        <ExpenseAnalytics />
      </ScrollView>
    </Screen>
  )
}
