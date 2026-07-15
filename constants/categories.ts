import type { TransactionCategory } from "@/types"
import type Ionicons from "@expo/vector-icons/Ionicons"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

export interface CategoryMeta {
  label: string
  icon: IoniconName
  color: string
}

export const CATEGORY_META: Record<TransactionCategory, CategoryMeta> = {
  income: { label: "Income", icon: "arrow-down-circle", color: "#16a34a" },
  transfer: { label: "Transfer", icon: "swap-horizontal", color: "#6366f1" },
  food: { label: "Food & Dining", icon: "restaurant", color: "#ff7c28" },
  shopping: { label: "Shopping", icon: "bag-handle", color: "#ec4899" },
  transport: { label: "Transport", icon: "car-sport", color: "#0ea5e9" },
  bills: { label: "Bills & Utilities", icon: "receipt", color: "#f59e0b" },
  entertainment: { label: "Entertainment", icon: "film", color: "#a855f7" },
  health: { label: "Health", icon: "fitness", color: "#ef4444" },
  investment: { label: "Investment", icon: "trending-up", color: "#10b981" },
  other: { label: "Other", icon: "ellipsis-horizontal-circle", color: "#64748b" },
}

export function categoryMeta(category: TransactionCategory): CategoryMeta {
  return CATEGORY_META[category] ?? CATEGORY_META.other
}
