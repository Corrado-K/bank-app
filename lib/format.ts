/**
 * Formatting helpers for currency, dates and account/card numbers.
 * The app is USD-only for the mock, but currency is parameterised so it is
 * easy to extend later.
 */

export function formatCurrency(
  amount: number,
  options: { showSign?: boolean; compact?: boolean; currency?: string } = {},
): string {
  const { showSign = false, compact = false, currency = "USD" } = options

  if (compact && Math.abs(amount) >= 10000) {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Math.abs(amount))
    return signPrefix(amount, showSign) + formatted
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))

  return signPrefix(amount, showSign) + formatted
}

function signPrefix(amount: number, showSign: boolean): string {
  if (amount < 0) return "-"
  if (showSign && amount > 0) return "+"
  return ""
}

/** Splits a currency string into the whole part and the ".xx" decimal part. */
export function splitCurrency(amount: number): { whole: string; decimal: string } {
  const formatted = formatCurrency(Math.abs(amount))
  const [whole, decimal] = formatted.split(".")
  return { whole, decimal: decimal ?? "00" }
}

const RELATIVE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
const FULL = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
})
const TIME = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" })

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

/** "Today" / "Yesterday" / "Mar 4" — for section headers and rows. */
export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso)
  const diffDays = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000)
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays > 1 && diffDays < 7)
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
  return RELATIVE.format(date)
}

export function formatFullDate(iso: string): string {
  return FULL.format(new Date(iso))
}

export function formatTime(iso: string): string {
  return TIME.format(new Date(iso))
}

/** "Today at 9:41 AM" style label for transaction detail. */
export function formatDateTime(iso: string, now: Date = new Date()): string {
  return `${formatRelativeDate(iso, now)} at ${formatTime(iso)}`
}

export function maskCardNumber(last4: string): string {
  return `•••• •••• •••• ${last4}`
}

export function formatAccountNumber(last4: string): string {
  return `•••• ${last4}`
}

/** Initials from a display name, e.g. "Whole Foods Market" -> "WF". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
