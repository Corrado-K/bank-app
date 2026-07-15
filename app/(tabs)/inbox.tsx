import { AppHeader } from "@/components/ui/AppHeader"
import { Avatar } from "@/components/ui/Avatar"
import { EmptyState } from "@/components/ui/EmptyState"
import { Screen } from "@/components/ui/Screen"
import { categoryMeta } from "@/constants/categories"
import { formatCurrency, formatRelativeDate, formatTime } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { useMemo, useState } from "react"
import { FlatList, Pressable, SectionList, Text, View } from "react-native"

type ItemType = "message" | "alert" | "transaction"
type FilterType = "all" | ItemType
type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface InboxItem {
  id: string
  type: ItemType
  title: string
  body: string
  date: string // ISO
  icon: IoniconName
  color: string
  unread: boolean
  transactionId?: string
  amount?: number
}

function daysAgoIso(days: number, hour: number, minute: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

const STATIC_ITEMS: InboxItem[] = [
  {
    id: "m1",
    type: "alert",
    title: "Login from a new device",
    body: "A new sign-in was detected on iPhone 16 Pro in New York.",
    date: daysAgoIso(0, 8, 15),
    icon: "shield-checkmark",
    color: "#ff7c28",
    unread: true,
  },
  {
    id: "m2",
    type: "message",
    title: "Fidelity Support",
    body: "Your dispute for transaction #TXN-8821 has been resolved in your favor.",
    date: daysAgoIso(0, 7, 2),
    icon: "chatbubble-ellipses",
    color: "#3b82f6",
    unread: true,
  },
  {
    id: "m3",
    type: "alert",
    title: "Credit limit reminder",
    body: "You've used 62% of your Rewards Credit limit this cycle.",
    date: daysAgoIso(1, 18, 30),
    icon: "notifications",
    color: "#f59e0b",
    unread: false,
  },
  {
    id: "m4",
    type: "message",
    title: "Fidelity Rewards",
    body: "You've earned 240 points on recent purchases. Redeem them for cashback.",
    date: daysAgoIso(2, 15, 18),
    icon: "gift",
    color: "#a855f7",
    unread: false,
  },
  {
    id: "m5",
    type: "alert",
    title: "Statement ready",
    body: "Your latest account statement is now available to download.",
    date: daysAgoIso(4, 9, 0),
    icon: "document-text",
    color: "#0ea5e9",
    unread: false,
  },
]

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "message", label: "Messages" },
  { key: "alert", label: "Alerts" },
  { key: "transaction", label: "Transactions" },
]

function groupByDate(items: InboxItem[]) {
  const sorted = [...items].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const map = new Map<string, InboxItem[]>()
  for (const it of sorted) {
    const key = formatRelativeDate(it.date)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(it)
  }
  return [...map.entries()].map(([title, data]) => ({ title, data }))
}

function InboxRow({ item, onPress }: { item: InboxItem; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-start gap-3 px-5 py-3.5 active:opacity-60"
    >
      <Avatar icon={item.icon} color={item.color} size={42} />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 pr-2 text-sm font-semibold text-foreground dark:text-d-fg"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[11px] text-foreground-muted dark:text-d-fg-muted">
              {formatTime(item.date)}
            </Text>
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
            className={`mt-1 text-sm font-semibold ${item.amount > 0 ? "text-success-light" : "text-foreground dark:text-d-fg"}`}
          >
            {formatCurrency(item.amount, { showSign: true })}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

export default function InboxScreen() {
  const router = useRouter()
  const transactions = useBankStore((s) => s.transactions)
  const [filter, setFilter] = useState<FilterType>("all")
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  const items = useMemo<InboxItem[]>(() => {
    const txItems: InboxItem[] = [...transactions]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, 8)
      .map((t) => {
        const meta = categoryMeta(t.category)
        return {
          id: `tx-alert-${t.id}`,
          type: "transaction" as const,
          title: t.title,
          body:
            t.amount > 0
              ? "Money received in your account"
              : `Payment ${t.status === "pending" ? "pending" : "completed"}`,
          date: t.date,
          icon: meta.icon,
          color: meta.color,
          unread: false,
          transactionId: t.id,
          amount: t.amount,
        }
      })
    return [...STATIC_ITEMS, ...txItems]
  }, [transactions])

  const sections = useMemo(() => {
    const filtered = filter === "all" ? items : items.filter((i) => i.type === filter)
    return groupByDate(filtered.map((i) => ({ ...i, unread: i.unread && !readIds.has(i.id) })))
  }, [items, filter, readIds])

  const unreadCount = items.filter((i) => i.unread && !readIds.has(i.id)).length

  function openItem(item: InboxItem) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setReadIds((prev) => new Set(prev).add(item.id))
    if (item.transactionId) router.push(`/transaction/${item.transactionId}` as never)
  }

  return (
    <Screen edges={["top"]}>
      <AppHeader
        title="Inbox"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
        large
        right={
          unreadCount > 0 ? (
            <Pressable
              onPress={() => {
                Haptics.selectionAsync()
                setReadIds(new Set(items.map((i) => i.id)))
              }}
              hitSlop={8}
              className="active:opacity-60"
            >
              <Text className="text-sm font-semibold text-primary">Mark all read</Text>
            </Pressable>
          ) : undefined
        }
      />

      <View className="pb-1">
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 4 }}
          renderItem={({ item }) => {
            const active = filter === item.key
            return (
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync()
                  setFilter(item.key)
                }}
                className={`rounded-full px-4 py-2 ${
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

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InboxRow item={item} onPress={() => openItem(item)} />}
        renderSectionHeader={({ section }) => (
          <View className="bg-background px-5 pb-1 pt-3 dark:bg-d-bg">
            <Text className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary dark:text-d-fg-secondary">
              {section.title}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="mx-5 border-b border-border-light dark:border-d-border-light" />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="mail-open-outline"
            title="Nothing here"
            message="No items match this filter."
          />
        }
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}
