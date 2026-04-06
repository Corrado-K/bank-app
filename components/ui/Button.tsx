import { Pressable, Text, type PressableProps } from "react-native"
import * as Haptics from "expo-haptics"

interface ButtonProps extends PressableProps {
  title: string
  variant?: "primary" | "secondary" | "outline"
  haptic?: boolean
}

const variantStyles = {
  primary: {
    container: "bg-primary active:bg-primary-600",
    text: "text-white",
  },
  secondary: {
    container: "bg-secondary active:bg-primary-400",
    text: "text-white",
  },
  outline: {
    container: "border border-primary bg-transparent active:bg-primary/10",
    text: "text-primary",
  },
} as const

export function Button({
  title,
  variant = "primary",
  haptic = true,
  onPress,
  ...props
}: ButtonProps) {
  const styles = variantStyles[variant]

  const handlePress = (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress?.(event)
  }

  return (
    <Pressable
      className={`items-center justify-center rounded-xl px-6 py-3.5 ${styles.container}`}
      onPress={handlePress}
      {...props}
    >
      <Text className={`text-base font-semibold ${styles.text}`}>{title}</Text>
    </Pressable>
  )
}
