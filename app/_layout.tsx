import "@/global.css"
import { useThemeColors } from "@/hooks/useThemeColors"
import { AppProviders } from "@/providers/AppProviders"
import { useAppStore } from "@/store/useAppStore"
import { useFonts } from "@expo-google-fonts/bricolage-grotesque"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import { Appearance } from "react-native"
import "react-native-reanimated"

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

function RootContent() {
  const { theme } = useAppStore()
  const { colorScheme, setColorScheme } = useColorScheme()
  const colors = useThemeColors()
  const isDark = colorScheme === "dark"

  useEffect(() => {
    if (theme === "system") {
      const deviceScheme = Appearance.getColorScheme() || "dark"
      setColorScheme(deviceScheme)
    } else {
      setColorScheme(theme)
    }
  }, [theme, setColorScheme])

  useEffect(() => {
    if (theme !== "system") return
    const subscription = Appearance.addChangeListener(({ colorScheme: scheme }) => {
      setColorScheme(scheme || "dark")
    })
    return () => subscription.remove()
  }, [theme, setColorScheme])

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: "#ff7c28",
      background: colors.background,
      card: colors.surface,
      text: colors.foreground,
      border: colors.border,
      notification: "#ff7c28",
    },
  }

  return (
    <ThemeProvider value={navTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="transaction/[id]" options={{ presentation: "modal" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  )
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_200ExtraLight: require("@expo-google-fonts/bricolage-grotesque/200ExtraLight/BricolageGrotesque_200ExtraLight.ttf"),
    BricolageGrotesque_300Light: require("@expo-google-fonts/bricolage-grotesque/300Light/BricolageGrotesque_300Light.ttf"),
    BricolageGrotesque_400Regular: require("@expo-google-fonts/bricolage-grotesque/400Regular/BricolageGrotesque_400Regular.ttf"),
    BricolageGrotesque_500Medium: require("@expo-google-fonts/bricolage-grotesque/500Medium/BricolageGrotesque_500Medium.ttf"),
    BricolageGrotesque_600SemiBold: require("@expo-google-fonts/bricolage-grotesque/600SemiBold/BricolageGrotesque_600SemiBold.ttf"),
    BricolageGrotesque_700Bold: require("@expo-google-fonts/bricolage-grotesque/700Bold/BricolageGrotesque_700Bold.ttf"),
    BricolageGrotesque_800ExtraBold: require("@expo-google-fonts/bricolage-grotesque/800ExtraBold/BricolageGrotesque_800ExtraBold.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <AppProviders>
      <RootContent />
    </AppProviders>
  )
}
