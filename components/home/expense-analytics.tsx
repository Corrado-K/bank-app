import Dropdown from "@/components/ui/dropdown"
import { useThemeColors } from "@/hooks/useThemeColors"
import React, { useState } from "react"
import { Text, View } from "react-native"
import Svg, { Circle, G } from "react-native-svg"

const MONTHS = [
  { id: "2026-04", label: "Apr 2026" },
  { id: "2026-03", label: "Mar 2026" },
  { id: "2026-02", label: "Feb 2026" },
  { id: "2026-01", label: "Jan 2026" },
  { id: "2025-12", label: "Dec 2025" },
  { id: "2025-11", label: "Nov 2025" },
]

const EXPENSES: Record<string, { category: string; amount: number; color: string }[]> = {
  "2026-04": [
    { category: "Food", amount: 1240, color: "#ff7c28" },
    { category: "Investment", amount: 3500, color: "#4ade80" },
    { category: "Clothes", amount: 680, color: "#60a5fa" },
    { category: "Others", amount: 420, color: "#a78bfa" },
  ],
  "2026-03": [
    { category: "Food", amount: 980, color: "#ff7c28" },
    { category: "Investment", amount: 2800, color: "#4ade80" },
    { category: "Clothes", amount: 520, color: "#60a5fa" },
    { category: "Others", amount: 350, color: "#a78bfa" },
  ],
}

const DEFAULT_EXPENSES = [
  { category: "Food", amount: 0, color: "#ff7c28" },
  { category: "Investment", amount: 0, color: "#4ade80" },
  { category: "Clothes", amount: 0, color: "#60a5fa" },
  { category: "Others", amount: 0, color: "#a78bfa" },
]

const CHART_SIZE = 120
const STROKE_WIDTH = 14
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function DoughnutChart({
  expenses,
  total,
  trackColor,
}: {
  expenses: { category: string; amount: number; color: string }[]
  total: number
  trackColor: string
}) {
  let accumulated = 0

  return (
    <View className="items-center justify-center">
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <G rotation="-90" origin={`${CHART_SIZE / 2}, ${CHART_SIZE / 2}`}>
          <Circle
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            r={RADIUS}
            stroke={trackColor}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {expenses.map((expense) => {
            const percentage = total > 0 ? expense.amount / total : 0
            const strokeDasharray = `${CIRCUMFERENCE * percentage} ${CIRCUMFERENCE * (1 - percentage)}`
            const strokeDashoffset = -CIRCUMFERENCE * accumulated
            accumulated += percentage

            return (
              <Circle
                key={expense.category}
                cx={CHART_SIZE / 2}
                cy={CHART_SIZE / 2}
                r={RADIUS}
                stroke={expense.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            )
          })}
        </G>
      </Svg>
      <View className="absolute items-center">
        <Text className="text-foreground dark:text-d-fg text-base font-bold">
          ${total.toLocaleString("en-US")}
        </Text>
        <Text className="text-foreground-muted dark:text-d-fg-muted text-[9px]">Total</Text>
      </View>
    </View>
  )
}

export default function ExpenseAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0])
  const colors = useThemeColors()

  const expenses = EXPENSES[selectedMonth.id] ?? DEFAULT_EXPENSES
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <View className="border-border dark:border-d-border bg-surface dark:bg-d-surface rounded-2xl border p-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-foreground dark:text-d-fg text-sm font-semibold">Analytics</Text>
        <Dropdown items={MONTHS} selected={selectedMonth} onSelect={setSelectedMonth} />
      </View>

      <View className="mt-4 flex flex-row">
        <View className="items-center justify-center">
          <DoughnutChart expenses={expenses} total={total} trackColor={colors.doughnutTrack} />
        </View>

        <View className="ml-4 flex-1 justify-center gap-3">
          {expenses.map((expense) => {
            const percentage = total > 0 ? ((expense.amount / total) * 100).toFixed(1) : "0.0"
            return (
              <View key={expense.category} className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-2">
                  <View
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: expense.color }}
                  />
                  <View>
                    <Text className="text-foreground dark:text-d-fg text-xs">
                      {expense.category}
                    </Text>
                    <Text className="text-foreground-muted dark:text-d-fg-muted text-[10px]">
                      ${expense.amount.toLocaleString("en-US")}
                    </Text>
                  </View>
                </View>
                <Text className="text-foreground-secondary dark:text-d-fg-secondary text-xs font-medium">
                  {percentage}%
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
