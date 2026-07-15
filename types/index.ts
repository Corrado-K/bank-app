export type Theme = "light" | "dark" | "system"

export type AccountType = "checking" | "savings" | "business" | "credit"

export interface Account {
  id: string
  name: string
  type: AccountType
  last4: string
  balance: number
  /** For credit accounts, the total limit. */
  creditLimit?: number
  color: string
}

export type CardNetwork = "Visa" | "Mastercard"
export type CardType = "debit" | "credit"

export interface Card {
  id: string
  accountId: string
  holder: string
  last4: string
  expiry: string
  network: CardNetwork
  type: CardType
  frozen: boolean
  /** Monthly spending limit control. */
  spendingLimit: number
  gradient: [string, string]
}

export type TransactionCategory =
  | "income"
  | "transfer"
  | "food"
  | "shopping"
  | "transport"
  | "bills"
  | "entertainment"
  | "health"
  | "investment"
  | "other"

export type TransactionStatus = "completed" | "pending"

export interface Transaction {
  id: string
  accountId: string
  title: string
  /** Optional descriptive subtitle, e.g. "Monthly subscription". */
  note?: string
  category: TransactionCategory
  /** Positive = money in, negative = money out. */
  amount: number
  date: string // ISO string
  status: TransactionStatus
}

export interface Payee {
  id: string
  name: string
  bank: string
  last4: string
  color: string
}

export interface Biller {
  id: string
  name: string
  category: string
  icon: string // Ionicons name
  accountRef: string
  color: string
}
