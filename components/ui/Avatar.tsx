import Ionicons from "@expo/vector-icons/Ionicons"
import { Text, View } from "react-native"

import { initials } from "@/lib/format"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface AvatarProps {
  /** Provide a name to render initials, or an icon. */
  name?: string
  icon?: IoniconName
  color?: string
  /** Background uses a soft tint of `color`; icon/text uses `color`. */
  tinted?: boolean
  size?: number
}

/** Circular avatar: initials from a name, or an icon glyph. */
export function Avatar({ name, icon, color = "#ff7c28", tinted = true, size = 40 }: AvatarProps) {
  const inner = size * 0.42

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: tinted ? color + "22" : color,
      }}
    >
      {icon ? (
        <Ionicons name={icon} size={inner} color={tinted ? color : "#ffffff"} />
      ) : (
        <Text
          className="font-semibold"
          style={{ color: tinted ? color : "#ffffff", fontSize: size * 0.36 }}
        >
          {name ? initials(name) : "?"}
        </Text>
      )}
    </View>
  )
}
