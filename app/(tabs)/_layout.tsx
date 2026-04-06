import { CustomTabBar } from "@/components/CustomTabBar"
import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Tabs } from "expo-router"
import React from "react"

export default function TabLayout() {
  const colors = useThemeColors()

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontFamily: "BricolageGrotesque_600SemiBold" },
        headerTintColor: colors.foreground,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "file-tray-full" : "file-tray-full-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "cash" : "cash-outline"} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="ellipsis-horizontal-circle-outline" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
