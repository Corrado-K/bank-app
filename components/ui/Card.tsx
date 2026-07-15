import { ReactNode } from "react"
import { View } from "react-native"

interface CardProps {
  children: ReactNode
  className?: string
  /** Removes inner padding for lists that manage their own row padding. */
  flush?: boolean
}

/** Surface container with consistent radius, border and background. */
export function Card({ children, className, flush }: CardProps) {
  return (
    <View
      className={`overflow-hidden rounded-2xl border border-border bg-surface dark:border-d-border dark:bg-d-surface ${
        flush ? "" : "p-4"
      } ${className ?? ""}`}
    >
      {children}
    </View>
  )
}
