import Ionicons from "@expo/vector-icons/Ionicons"
import * as Haptics from "expo-haptics"
import { ActivityIndicator, Pressable, Text, View, type PressableProps } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger"

interface ButtonProps extends Omit<PressableProps, "children"> {
  title: string
  variant?: Variant
  size?: "sm" | "md" | "lg"
  haptic?: boolean
  loading?: boolean
  icon?: IoniconName
  fullWidth?: boolean
}

const variantStyles: Record<
  Variant,
  { container: string; text: string; spinner: string; icon: string }
> = {
  primary: {
    container: "bg-primary active:bg-primary-600",
    text: "text-white",
    spinner: "#ffffff",
    icon: "#ffffff",
  },
  secondary: {
    container: "bg-primary/10 active:bg-primary/20",
    text: "text-primary",
    spinner: "#ff7c28",
    icon: "#ff7c28",
  },
  outline: {
    container:
      "border border-border bg-transparent active:bg-surface dark:border-d-border dark:active:bg-d-surface",
    text: "text-foreground dark:text-d-fg",
    spinner: "#ff7c28",
    icon: "#ff7c28",
  },
  ghost: {
    container: "bg-transparent active:opacity-60",
    text: "text-primary",
    spinner: "#ff7c28",
    icon: "#ff7c28",
  },
  danger: {
    container: "bg-danger active:opacity-80",
    text: "text-white",
    spinner: "#ffffff",
    icon: "#ffffff",
  },
}

const sizeStyles = {
  sm: { container: "px-4 py-2 rounded-xl", text: "text-sm", icon: 16 },
  md: { container: "px-5 py-3.5 rounded-2xl", text: "text-base", icon: 18 },
  lg: { container: "px-6 py-4 rounded-2xl", text: "text-base", icon: 20 },
} as const

export function Button({
  title,
  variant = "primary",
  size = "md",
  haptic = true,
  loading = false,
  icon,
  fullWidth = true,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  const v = variantStyles[variant]
  const s = sizeStyles[size]
  const isDisabled = disabled || loading

  const handlePress = (event: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress?.(event)
  }

  return (
    <Pressable
      disabled={isDisabled}
      className={`flex-row items-center justify-center gap-2 ${s.container} ${v.container} ${
        fullWidth ? "w-full" : ""
      } ${isDisabled ? "opacity-50" : ""}`}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.spinner} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon ? <Ionicons name={icon} size={s.icon} color={v.icon} /> : null}
          <Text className={`font-semibold ${s.text} ${v.text}`}>{title}</Text>
        </View>
      )}
    </Pressable>
  )
}
