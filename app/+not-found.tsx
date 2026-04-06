import { Link, Stack } from "expo-router"
import { View, Text } from "react-native"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-background dark:bg-d-bg px-6">
        <Text className="text-foreground dark:text-d-fg text-2xl font-bold">Page Not Found</Text>
        <Text className="text-foreground-secondary dark:text-d-fg-secondary mt-2 text-base">This screen does not exist.</Text>
        <Link href="/" className="mt-6">
          <Text className="text-base font-medium text-primary">Go to home screen</Text>
        </Link>
      </View>
    </>
  )
}
