import { useThemeColors } from "@/hooks/useThemeColors"
import { StyleSheet, View } from "react-native"
import Svg, { Path } from "react-native-svg"

const TAB_BAR_HEIGHT = 48
const NOTCH_RADIUS = 38
const CURVE_SPREAD = 22

export { TAB_BAR_HEIGHT, NOTCH_RADIUS }

export default function TabBarBackground({ width }: { width: number }) {
  const colors = useThemeColors()
  const mid = width / 2
  const left = mid - NOTCH_RADIUS - CURVE_SPREAD
  const right = mid + NOTCH_RADIUS + CURVE_SPREAD
  const totalHeight = TAB_BAR_HEIGHT + NOTCH_RADIUS

  const d = [
    `M0,${NOTCH_RADIUS}`,
    `L${left},${NOTCH_RADIUS}`,
    `C${left + CURVE_SPREAD},${NOTCH_RADIUS} ${mid - NOTCH_RADIUS},0 ${mid},0`,
    `C${mid + NOTCH_RADIUS},0 ${right - CURVE_SPREAD},${NOTCH_RADIUS} ${right},${NOTCH_RADIUS}`,
    `L${width},${NOTCH_RADIUS}`,
    `L${width},${totalHeight}`,
    `L0,${totalHeight}`,
    "Z",
  ].join(" ")

  return (
    <View style={[StyleSheet.absoluteFill, { top: -NOTCH_RADIUS }]}>
      <Svg width={width} height={totalHeight}>
        <Path d={d} fill={colors.tabBar} />
      </Svg>
    </View>
  )
}
