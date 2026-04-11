import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import * as Haptics from "expo-haptics"
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColors } from "@/hooks/useThemeColors"
import TabBarBackground, { NOTCH_RADIUS, TAB_BAR_HEIGHT } from "./ui/tab-bar-background"

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const colors = useThemeColors()

  return (
    <View
      style={[styles.wrapper, { backgroundColor: colors.tabBar, paddingBottom: insets.bottom }]}
      pointerEvents="box-none"
    >
      <TabBarBackground width={width} />
      <View style={styles.tabRow} pointerEvents="box-none">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const isFinance = route.name === "finance"

          const onPress = () => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          if (isFinance) {
            return (
              <View key={route.key} style={styles.centerButtonWrapper}>
                <View style={styles.centerButton}>
                  <Pressable onPress={onPress} style={styles.centerButtonPressable}>
                    {options.tabBarIcon?.({
                      focused: isFocused,
                      color: "#ffffff",
                      size: 26,
                    })}
                  </Pressable>
                </View>
              </View>
            )
          }

          const label = typeof options.title === "string" ? options.title : route.name

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tab}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? "#ff7c28" : "#6b7280",
                size: 18,
              })}
              <Text style={[styles.labelText, { color: isFocused ? "#ff7c28" : "#6b7280" }]}>
                {label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "visible",
  },
  tabRow: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
    overflow: "visible",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 2,
  },
  labelText: {
    fontSize: 10,
    fontFamily: "BricolageGrotesque_500Medium",
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: -(NOTCH_RADIUS / 2),
    zIndex: 10,
    overflow: "visible",
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff7c28",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButtonPressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
})
