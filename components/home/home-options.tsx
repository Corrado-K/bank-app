import React from "react"
import { View } from "react-native"

import AccountInfo from "./account-info"
import CardCarousel from "./card-carousel"
import QuickActions from "./quick-actions"

export default function HomeOptions() {
  return (
    <View className="border-border dark:border-d-border bg-surface dark:bg-d-surface rounded-2xl border">
      <AccountInfo />
      <CardCarousel />
      <QuickActions />
    </View>
  )
}
