import { useThemeColors } from "@/hooks/useThemeColors"
import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"

interface DropdownItem {
  id: string
  label: string
}

interface DropdownProps {
  items: DropdownItem[]
  selected: DropdownItem
  onSelect: (item: DropdownItem) => void
}

export default function Dropdown({ items, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const colors = useThemeColors()

  return (
    <>
      {open && (
        <Pressable
          className="absolute bottom-0 left-0 right-0 top-0 z-40"
          onPress={() => setOpen(false)}
        />
      )}

      <View className="z-50">
        <Pressable
          className="flex flex-row items-center gap-1"
          onPress={() => setOpen(!open)}
        >
          <Text className="text-foreground-secondary dark:text-d-fg-secondary text-xs">{selected.label}</Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={12}
            color={colors.foregroundSecondary}
          />
        </Pressable>

        {open && (
          <View className="border-border dark:border-d-border bg-surface dark:bg-d-surface absolute left-0 top-full z-50 mt-1 rounded-xl border py-1 shadow-lg">
            {items.map((item) => (
              <Pressable
                key={item.id}
                className={`px-4 py-2.5 ${selected.id === item.id ? "bg-subtle dark:bg-d-subtle" : ""}`}
                onPress={() => {
                  onSelect(item)
                  setOpen(false)
                }}
              >
                <Text className="text-foreground dark:text-d-fg text-sm">{item.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </>
  )
}
