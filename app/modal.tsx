import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function ModalScreen() {
  return (
    <View className="bg-background dark:bg-d-bg flex-1 items-center justify-center p-5">
      <Text className="text-foreground dark:text-d-fg text-2xl font-bold">This is a modal</Text>
      <Link href="/" dismissTo className="mt-4 py-4">
        <Text className="text-primary text-base font-medium">Go to home screen</Text>
      </Link>
    </View>
  )
}
