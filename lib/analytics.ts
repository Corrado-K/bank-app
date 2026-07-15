import { categoryMeta } from "@/constants/categories"
import type { Transaction, TransactionCategory } from "@/types"

export interface CategorySpend {
  category: TransactionCategory
  label: string
  color: string
  amount: number
}

function isSameMonth(iso: string, ref: Date): boolean {
  const d = new Date(iso)
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()
}

/** Total money spent (positive number) grouped by category for a given month. */
export function spendingByCategory(
  transactions: Transaction[],
  ref: Date = new Date(),
): { total: number; categories: CategorySpend[] } {
  const map = new Map<TransactionCategory, number>()

  for (const t of transactions) {
    if (!isSameMonth(t.date, ref)) continue
    if (t.amount >= 0) continue // only outflows
    if (t.category === "transfer") continue // exclude internal moves
    map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount))
  }

  const categories: CategorySpend[] = [...map.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      label: categoryMeta(category).label,
      color: categoryMeta(category).color,
    }))
    .sort((a, b) => b.amount - a.amount)

  const total = categories.reduce((sum, c) => sum + c.amount, 0)
  return { total, categories }
}

/** Income vs. spending totals for a given month (both positive numbers). */
export function monthCashflow(
  transactions: Transaction[],
  ref: Date = new Date(),
): { income: number; spending: number } {
  let income = 0
  let spending = 0
  for (const t of transactions) {
    if (!isSameMonth(t.date, ref)) continue
    if (t.category === "transfer") continue
    if (t.amount >= 0) income += t.amount
    else spending += Math.abs(t.amount)
  }
  return { income, spending }
}

export function monthLabel(ref: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(ref)
}
