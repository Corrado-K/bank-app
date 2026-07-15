import { Link, Stack } from "expo-router"
import { View, Text } from "react-native"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-background px-6 dark:bg-d-bg">
        <Text className="text-2xl font-bold text-foreground dark:text-d-fg">Page Not Found</Text>
        <Text className="mt-2 text-base text-foreground-secondary dark:text-d-fg-secondary">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-6">
          <Text className="text-base font-medium text-primary">Go to home screen</Text>
        </Link>
      </View>
    </>
  )
}
