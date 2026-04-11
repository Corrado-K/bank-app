import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useState } from "react"
import { FlatList, Pressable, SectionList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type ItemType = "message" | "notification" | "transaction"
type FilterType = "all" | ItemType

interface InboxItem {
  id: string
  type: ItemType
  title: string
  body: string
  time: string
  date: string
  unread?: boolean
  amount?: number
  transactionType?: "credit" | "debit"
}

const INBOX_DATA: InboxItem[] = [
  // Today
  {
    id: "1",
    type: "transaction",
    title: "Netflix Subscription",
    body: "Monthly subscription charge",
    time: "9:41 AM",
    date: "Today",
    amount: -15.99,
    transactionType: "debit",
  },
  {
    id: "2",
    type: "notification",
    title: "Login from new device",
    body: "A new sign-in was detected on iPhone 16 Pro in New York.",
    time: "8:15 AM",
    date: "Today",
    unread: true,
  },
  {
    id: "3",
    type: "message",
    title: "Fidelity Support",
    body: "Your dispute for transaction #TXN-8821 has been resolved.",
    time: "7:02 AM",
    date: "Today",
    unread: true,
  },
  // Yesterday
  {
    id: "4",
    type: "transaction",
    title: "Salary Deposit",
    body: "Direct deposit from Acme Corp",
    time: "12:00 AM",
    date: "Yesterday",
    amount: 4200.0,
    transactionType: "credit",
    unread: true,
  },
  {
    id: "5",
    type: "notification",
    title: "Card limit reached",
    body: "You've used 90% of your credit card limit.",
    time: "6:30 PM",
    date: "Yesterday",
  },
  {
    id: "6",
    type: "message",
    title: "Fidelity Rewards",
    body: "You've earned 240 points on your last purchase. Redeem now.",
    time: "3:18 PM",
    date: "Yesterday",
  },
  {
    id: "7",
    type: "transaction",
    title: "Whole Foods Market",
    body: "Purchase at Whole Foods",
    time: "1:44 PM",
    date: "Yesterday",
    amount: -87.23,
    transactionType: "debit",
  },
  // Apr 8
  {
    id: "8",
    type: "transaction",
    title: "Uber",
    body: "Ride to JFK Airport",
    time: "11:20 PM",
    date: "Apr 8",
    amount: -34.5,
    transactionType: "debit",
  },
  {
    id: "9",
    type: "notification",
    title: "Statement ready",
    body: "Your March statement is now available. Total spend: $2,340.",
    time: "9:00 AM",
    date: "Apr 8",
  },
  {
    id: "10",
    type: "message",
    title: "Fidelity Support",
    body: "Your identity verification is complete. All features are now unlocked.",
    time: "2:05 PM",
    date: "Apr 8",
  },
  // Apr 7
  {
    id: "11",
    type: "transaction",
    title: "Transfer to Savings",
    body: "Scheduled transfer to Savings Account",
    time: "8:00 AM",
    date: "Apr 7",
    amount: -500.0,
    transactionType: "debit",
  },
  {
    id: "12",
    type: "notification",
    title: "New offer available",
    body: "Get 5% cashback on dining this weekend. Tap to activate.",
    time: "10:30 AM",
    date: "Apr 7",
  },
]

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "message", label: "Messages" },
  { key: "notification", label: "Notifications" },
  { key: "transaction", label: "Transactions" },
]

const TYPE_CONFIG: Record<
  ItemType,
  { icon: keyof typeof Ionicons.glyphMap; bg: string; color: string }
> = {
  message: { icon: "chatbubble-ellipses", bg: "#3b82f6", color: "#ffffff" },
  notification: { icon: "notifications", bg: "#ff7c28", color: "#ffffff" },
  transaction: { icon: "swap-horizontal", bg: "#10b981", color: "#ffffff" },
}

function groupByDate(items: InboxItem[]) {
  const map: Record<string, InboxItem[]> = {}
  for (const item of items) {
    if (!map[item.date]) map[item.date] = []
    map[item.date].push(item)
  }
  return Object.entries(map).map(([title, data]) => ({ title, data }))
}

function InboxRow({ item, onPress }: { item: InboxItem; onPress: () => void }) {
  const colors = useThemeColors()
  const config = TYPE_CONFIG[item.type]

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-start gap-3 px-4 py-3.5 active:opacity-70"
    >
      <View
        className="mt-0.5 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: config.bg }}
      >
        <Ionicons name={config.icon} size={18} color={config.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 pr-2 text-sm font-semibold text-foreground dark:text-d-fg"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xs text-foreground-muted dark:text-d-fg-muted">{item.time}</Text>
            {item.unread && <View className="h-2 w-2 rounded-full bg-primary" />}
          </View>
        </View>

        <Text
          className="mt-0.5 text-sm leading-5 text-foreground-secondary dark:text-d-fg-secondary"
          numberOfLines={2}
        >
          {item.body}
        </Text>

        {item.amount !== undefined && (
          <Text
            className="mt-1 text-sm font-semibold"
            style={{ color: item.transactionType === "credit" ? "#10b981" : colors.foreground }}
          >
            {item.transactionType === "credit" ? "+" : ""}
            {item.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

export default function InboxScreen() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  const filtered = filter === "all" ? INBOX_DATA : INBOX_DATA.filter((i) => i.type === filter)
  const sections = groupByDate(filtered)

  const unreadCount = INBOX_DATA.filter((i) => i.unread && !readIds.has(i.id)).length

  function markRead(item: InboxItem) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setReadIds((prev) => new Set([...prev, item.id]))
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-d-bg" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-4 pb-3 pt-2 dark:border-d-border">
        <View>
          <Text className="text-2xl font-bold text-foreground dark:text-d-fg">Inbox</Text>
          {unreadCount > 0 && (
            <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
              {unreadCount} unread
            </Text>
          )}
        </View>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            setReadIds(new Set(INBOX_DATA.map((i) => i.id)))
          }}
          className="rounded-full px-3 py-1.5 active:opacity-60"
        >
          <Text className="text-sm font-semibold text-primary">Mark all read</Text>
        </Pressable>
      </View>

      {/* Filter Pills */}
      <View className="border-b border-border dark:border-d-border">
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
          renderItem={({ item }) => {
            const active = filter === item.key
            return (
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  setFilter(item.key)
                }}
                className={`rounded-full px-4 py-1.5 ${
                  active
                    ? "bg-primary"
                    : "border border-border bg-surface dark:border-d-border dark:bg-d-surface"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${active ? "text-white" : "text-foreground-secondary dark:text-d-fg-secondary"}`}
                >
                  {item.label}
                </Text>
              </Pressable>
            )
          }}
        />
      </View>

      {/* List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InboxRow
            item={{ ...item, unread: item.unread && !readIds.has(item.id) }}
            onPress={() => markRead(item)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View className="bg-subtle px-4 py-2 dark:bg-d-subtle">
            <Text className="text-xs font-semibold uppercase tracking-wider text-foreground-muted dark:text-d-fg-muted">
              {section.title}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="mx-4 border-b border-border dark:border-d-border" />
        )}
        stickySectionHeadersEnabled
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  )
}
