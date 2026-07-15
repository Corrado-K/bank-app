import { Card } from "@/components/ui/Card"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useThemeColors } from "@/hooks/useThemeColors"
import { monthLabel, spendingByCategory } from "@/lib/analytics"
import { formatCurrency } from "@/lib/format"
import { useBankStore } from "@/store/useBankStore"
import { useRouter } from "expo-router"
import React, { useMemo } from "react"
import { Text, View } from "react-native"
import Svg, { Circle, G } from "react-native-svg"

const CHART_SIZE = 128
const STROKE_WIDTH = 16
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function DoughnutChart({
  segments,
  total,
  trackColor,
}: {
  segments: { color: string; amount: number }[]
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
          {segments.map((seg, i) => {
            const percentage = total > 0 ? seg.amount / total : 0
            const dash = `${CIRCUMFERENCE * percentage} ${CIRCUMFERENCE * (1 - percentage)}`
            const offset = -CIRCUMFERENCE * accumulated
            accumulated += percentage
            return (
              <Circle
                key={i}
                cx={CHART_SIZE / 2}
                cy={CHART_SIZE / 2}
                r={RADIUS}
                stroke={seg.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={dash}
                strokeDashoffset={offset}
                strokeLinecap="butt"
                fill="none"
              />
            )
          })}
        </G>
      </Svg>
      <View className="absolute items-center">
        <Text className="text-[10px] text-foreground-muted dark:text-d-fg-muted">Spent</Text>
        <Text className="text-base font-bold text-foreground dark:text-d-fg">
          {formatCurrency(total, { compact: true })}
        </Text>
      </View>
    </View>
  )
}

export default function ExpenseAnalytics() {
  const router = useRouter()
  const colors = useThemeColors()
  const transactions = useBankStore((s) => s.transactions)

  const { total, categories } = useMemo(() => spendingByCategory(transactions), [transactions])

  // Show the top 4 categories individually and roll the rest into "Other" so the
  // ring always fills completely and the legend percentages sum to 100%.
  const display = useMemo(() => {
    const base = categories.slice(0, 4).map((c) => ({
      key: c.category as string,
      label: c.label,
      color: c.color,
      amount: c.amount,
    }))
    const restTotal = categories.slice(4).reduce((sum, c) => sum + c.amount, 0)
    if (restTotal > 0) {
      base.push({ key: "__other", label: "Other", color: "#94a3b8", amount: restTotal })
    }
    return base
  }, [categories])

  return (
    <View className="gap-3">
      <SectionHeader
        title="Spending"
        actionLabel="Details"
        onAction={() => router.push("/transactions")}
      />
      <Card>
        <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
          {monthLabel()}
        </Text>
        {total === 0 ? (
          <View className="items-center py-8">
            <Text className="text-sm text-foreground-secondary dark:text-d-fg-secondary">
              No spending recorded this month
            </Text>
          </View>
        ) : (
          <View className="mt-3 flex-row items-center">
            <DoughnutChart segments={display} total={total} trackColor={colors.doughnutTrack} />
            <View className="ml-5 flex-1 gap-3">
              {display.map((c) => {
                const pct = total > 0 ? ((c.amount / total) * 100).toFixed(0) : "0"
                return (
                  <View key={c.key} className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <View
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <Text className="text-xs text-foreground dark:text-d-fg">{c.label}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-foreground-secondary dark:text-d-fg-secondary">
                        {formatCurrency(c.amount, { compact: true })}
                      </Text>
                      <Text className="w-8 text-right text-xs font-medium text-foreground-muted dark:text-d-fg-muted">
                        {pct}%
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        )}
      </Card>
    </View>
  )
}
