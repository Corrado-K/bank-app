import { create } from "zustand"

import type { Account, Biller, Card, Payee, Transaction, TransactionCategory } from "@/types"

/* -------------------------------------------------------------------------- */
/*  Seed data                                                                  */
/* -------------------------------------------------------------------------- */

// The account holder used throughout the mock.
export const ACCOUNT_HOLDER = "Kebede Fola"

function iso(daysAgo: number, hour = 12, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

function seedAccounts(): Account[] {
  return [
    {
      id: "acc-checking",
      name: "Everyday Checking",
      type: "checking",
      last4: "4821",
      balance: 12480.52,
      color: "#ff7c28",
    },
    {
      id: "acc-savings",
      name: "Savings",
      type: "savings",
      last4: "7735",
      balance: 48250.0,
      color: "#10b981",
    },
    {
      id: "acc-business",
      name: "Business",
      type: "business",
      last4: "2019",
      balance: 8720.75,
      color: "#6366f1",
    },
    {
      id: "acc-credit",
      name: "Rewards Credit",
      type: "credit",
      last4: "9043",
      balance: -1240.18,
      creditLimit: 10000,
      color: "#0f1115",
    },
  ]
}

function seedCards(): Card[] {
  return [
    {
      id: "card-1",
      accountId: "acc-checking",
      holder: ACCOUNT_HOLDER,
      last4: "4821",
      expiry: "09/28",
      network: "Visa",
      type: "debit",
      frozen: false,
      spendingLimit: 5000,
      gradient: ["#ff7c28", "#c2570f"],
    },
    {
      id: "card-2",
      accountId: "acc-credit",
      holder: ACCOUNT_HOLDER,
      last4: "9043",
      expiry: "03/27",
      network: "Mastercard",
      type: "credit",
      frozen: false,
      spendingLimit: 10000,
      gradient: ["#1f2937", "#0f1115"],
    },
    {
      id: "card-3",
      accountId: "acc-business",
      holder: ACCOUNT_HOLDER,
      last4: "2019",
      expiry: "12/26",
      network: "Visa",
      type: "debit",
      frozen: true,
      spendingLimit: 15000,
      gradient: ["#6366f1", "#4338ca"],
    },
  ]
}

function seedTransactions(): Transaction[] {
  const t = (
    id: string,
    accountId: string,
    title: string,
    category: TransactionCategory,
    amount: number,
    daysAgo: number,
    hour: number,
    minute: number,
    note?: string,
    status: Transaction["status"] = "completed",
  ): Transaction => ({
    id,
    accountId,
    title,
    category,
    amount,
    date: iso(daysAgo, hour, minute),
    status,
    note,
  })

  return [
    // Today
    t("t1", "acc-checking", "Netflix", "entertainment", -15.99, 0, 9, 41, "Monthly subscription"),
    t("t2", "acc-checking", "Blue Bottle Coffee", "food", -6.5, 0, 8, 12),
    t("t3", "acc-credit", "Amazon", "shopping", -64.2, 0, 7, 5, "Order #114-2288", "pending"),
    // Yesterday
    t("t4", "acc-checking", "Acme Corp", "income", 4200.0, 1, 0, 1, "Payroll deposit"),
    t("t5", "acc-checking", "Whole Foods Market", "food", -87.23, 1, 18, 30),
    t("t6", "acc-credit", "Shell", "transport", -52.4, 1, 15, 20, "Fuel"),
    t("t7", "acc-checking", "Spotify", "entertainment", -10.99, 1, 11, 0),
    // Earlier this week
    t("t8", "acc-checking", "Uber", "transport", -24.5, 2, 22, 10, "Ride to JFK"),
    t("t9", "acc-savings", "Interest Payment", "income", 42.18, 3, 0, 5),
    t("t10", "acc-checking", "Transfer to Savings", "transfer", -500.0, 3, 8, 0),
    t("t11", "acc-savings", "Transfer from Checking", "transfer", 500.0, 3, 8, 0),
    t("t12", "acc-credit", "Apple", "shopping", -129.0, 4, 14, 45, "App Store"),
    t("t13", "acc-checking", "Trader Joe's", "food", -63.87, 5, 17, 12),
    t("t14", "acc-checking", "Con Edison", "bills", -142.3, 6, 9, 0, "Electricity bill"),
    // Last couple weeks
    t("t15", "acc-checking", "Equinox", "health", -215.0, 8, 7, 30, "Membership"),
    t("t16", "acc-business", "Client Payment", "income", 3500.0, 9, 13, 0, "Invoice #1042"),
    t("t17", "acc-credit", "Delta Air Lines", "transport", -412.6, 11, 10, 15),
    t("t18", "acc-checking", "Verizon", "bills", -89.99, 12, 9, 0, "Phone plan"),
    t("t19", "acc-savings", "Vanguard", "investment", -1000.0, 14, 8, 0, "Index fund"),
    t("t20", "acc-checking", "Target", "shopping", -156.44, 16, 16, 20),
    t("t21", "acc-checking", "Acme Corp", "income", 4200.0, 16, 0, 1, "Payroll deposit"),
    t("t22", "acc-credit", "Chipotle", "food", -18.75, 18, 12, 30),
    t("t23", "acc-checking", "Rent", "bills", -2400.0, 20, 9, 0, "Monthly rent"),
    t("t24", "acc-checking", "CVS Pharmacy", "health", -34.12, 22, 11, 45),
    t("t25", "acc-business", "AWS", "bills", -284.5, 24, 3, 0, "Cloud services"),
  ]
}

function seedPayees(): Payee[] {
  return [
    { id: "p1", name: "Sarah Chen", bank: "Chase", last4: "1187", color: "#ec4899" },
    { id: "p2", name: "Marcus Johnson", bank: "Bank of America", last4: "5520", color: "#0ea5e9" },
    { id: "p3", name: "Amara Okafor", bank: "Wells Fargo", last4: "3390", color: "#8b5cf6" },
    { id: "p4", name: "David Kim", bank: "Fidelity", last4: "7742", color: "#f59e0b" },
  ]
}

function seedBillers(): Biller[] {
  return [
    {
      id: "b1",
      name: "Con Edison",
      category: "Electricity",
      icon: "flash",
      accountRef: "•••• 4410",
      color: "#f59e0b",
    },
    {
      id: "b2",
      name: "Verizon",
      category: "Phone & Internet",
      icon: "wifi",
      accountRef: "•••• 8821",
      color: "#ef4444",
    },
    {
      id: "b3",
      name: "State Water",
      category: "Water",
      icon: "water",
      accountRef: "•••• 6033",
      color: "#0ea5e9",
    },
    {
      id: "b4",
      name: "Geico",
      category: "Insurance",
      icon: "shield-checkmark",
      accountRef: "•••• 1290",
      color: "#16a34a",
    },
    {
      id: "b5",
      name: "Netflix",
      category: "Streaming",
      icon: "tv",
      accountRef: "•••• 9921",
      color: "#dc2626",
    },
  ]
}

/* -------------------------------------------------------------------------- */
/*  Store                                                                       */
/* -------------------------------------------------------------------------- */

let txCounter = 0
function newTxId(): string {
  txCounter += 1
  return `tx-${Date.now()}-${txCounter}`
}

export interface TransferInput {
  fromAccountId: string
  toAccountId: string
  amount: number
  note?: string
}

export interface SendInput {
  fromAccountId: string
  payeeId: string
  amount: number
  note?: string
}

export interface BillInput {
  fromAccountId: string
  billerId: string
  amount: number
}

export interface CashInput {
  accountId: string
  amount: number
  source?: string
}

interface BankState {
  accounts: Account[]
  cards: Card[]
  transactions: Transaction[]
  payees: Payee[]
  billers: Biller[]

  // Selectors
  getAccount: (id: string) => Account | undefined
  getCard: (id: string) => Card | undefined
  transactionsForAccount: (id: string) => Transaction[]
  totalBalance: () => number

  // Money movement — each returns the id(s) of the created transaction(s)
  transfer: (input: TransferInput) => { ok: boolean; error?: string }
  send: (input: SendInput) => { ok: boolean; error?: string }
  payBill: (input: BillInput) => { ok: boolean; error?: string }
  deposit: (input: CashInput) => { ok: boolean; error?: string }
  withdraw: (input: CashInput) => { ok: boolean; error?: string }

  // Payees
  addPayee: (payee: Omit<Payee, "id">) => string

  // Card controls
  toggleFreeze: (cardId: string) => void
  setSpendingLimit: (cardId: string, limit: number) => void

  resetDemo: () => void
}

function availableBalance(account: Account): number {
  if (account.type === "credit") {
    // balance is negative when money is owed; available = limit + balance
    return (account.creditLimit ?? 0) + account.balance
  }
  return account.balance
}

export const useBankStore = create<BankState>((set, get) => ({
  accounts: seedAccounts(),
  cards: seedCards(),
  transactions: seedTransactions(),
  payees: seedPayees(),
  billers: seedBillers(),

  getAccount: (id) => get().accounts.find((a) => a.id === id),
  getCard: (id) => get().cards.find((c) => c.id === id),

  transactionsForAccount: (id) =>
    get()
      .transactions.filter((t) => t.accountId === id)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)),

  totalBalance: () =>
    get()
      .accounts.filter((a) => a.type !== "credit")
      .reduce((sum, a) => sum + a.balance, 0),

  transfer: ({ fromAccountId, toAccountId, amount, note }) => {
    if (!(amount > 0)) return { ok: false, error: "Enter an amount greater than $0." }
    if (fromAccountId === toAccountId) return { ok: false, error: "Choose two different accounts." }
    const from = get().getAccount(fromAccountId)
    const to = get().getAccount(toAccountId)
    if (!from || !to) return { ok: false, error: "Account not found." }
    if (from.type === "credit")
      return { ok: false, error: "Transfers must come from a deposit account." }
    if (availableBalance(from) < amount) return { ok: false, error: "Insufficient funds." }

    const now = new Date().toISOString()
    const outTx: Transaction = {
      id: newTxId(),
      accountId: fromAccountId,
      title: `Transfer to ${to.name}`,
      category: "transfer",
      amount: -amount,
      date: now,
      status: "completed",
      note,
    }
    const inTx: Transaction = {
      id: newTxId(),
      accountId: toAccountId,
      title: `Transfer from ${from.name}`,
      category: "transfer",
      amount,
      date: now,
      status: "completed",
      note,
    }

    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === fromAccountId
          ? { ...a, balance: a.balance - amount }
          : a.id === toAccountId
            ? { ...a, balance: a.balance + amount }
            : a,
      ),
      transactions: [outTx, inTx, ...state.transactions],
    }))
    return { ok: true }
  },

  send: ({ fromAccountId, payeeId, amount, note }) => {
    if (!(amount > 0)) return { ok: false, error: "Enter an amount greater than $0." }
    const from = get().getAccount(fromAccountId)
    const payee = get().payees.find((p) => p.id === payeeId)
    if (!from || !payee) return { ok: false, error: "Recipient not found." }
    if (availableBalance(from) < amount) return { ok: false, error: "Insufficient funds." }

    const tx: Transaction = {
      id: newTxId(),
      accountId: fromAccountId,
      title: payee.name,
      // External P2P payments are real outflows, so they count toward spending
      // analytics (unlike "transfer", which is reserved for internal moves).
      category: "other",
      amount: -amount,
      date: new Date().toISOString(),
      status: "completed",
      note: note || `Sent to ${payee.bank} ${payee.last4}`,
    }
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === fromAccountId ? { ...a, balance: a.balance - amount } : a,
      ),
      transactions: [tx, ...state.transactions],
    }))
    return { ok: true }
  },

  payBill: ({ fromAccountId, billerId, amount }) => {
    if (!(amount > 0)) return { ok: false, error: "Enter an amount greater than $0." }
    const from = get().getAccount(fromAccountId)
    const biller = get().billers.find((b) => b.id === billerId)
    if (!from || !biller) return { ok: false, error: "Biller not found." }
    if (availableBalance(from) < amount) return { ok: false, error: "Insufficient funds." }

    const tx: Transaction = {
      id: newTxId(),
      accountId: fromAccountId,
      title: biller.name,
      category: "bills",
      amount: -amount,
      date: new Date().toISOString(),
      status: "completed",
      note: `${biller.category} • ${biller.accountRef}`,
    }
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === fromAccountId ? { ...a, balance: a.balance - amount } : a,
      ),
      transactions: [tx, ...state.transactions],
    }))
    return { ok: true }
  },

  deposit: ({ accountId, amount, source }) => {
    if (!(amount > 0)) return { ok: false, error: "Enter an amount greater than $0." }
    const acc = get().getAccount(accountId)
    if (!acc) return { ok: false, error: "Account not found." }

    const tx: Transaction = {
      id: newTxId(),
      accountId,
      title: source || "Mobile Deposit",
      category: "income",
      amount,
      date: new Date().toISOString(),
      status: "completed",
      note: "Added to balance",
    }
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === accountId ? { ...a, balance: a.balance + amount } : a,
      ),
      transactions: [tx, ...state.transactions],
    }))
    return { ok: true }
  },

  withdraw: ({ accountId, amount, source }) => {
    if (!(amount > 0)) return { ok: false, error: "Enter an amount greater than $0." }
    const acc = get().getAccount(accountId)
    if (!acc) return { ok: false, error: "Account not found." }
    if (availableBalance(acc) < amount) return { ok: false, error: "Insufficient funds." }

    const tx: Transaction = {
      id: newTxId(),
      accountId,
      title: source || "ATM Withdrawal",
      category: "other",
      amount: -amount,
      date: new Date().toISOString(),
      status: "completed",
      note: "Cash withdrawal",
    }
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === accountId ? { ...a, balance: a.balance - amount } : a,
      ),
      transactions: [tx, ...state.transactions],
    }))
    return { ok: true }
  },

  addPayee: (payee) => {
    const id = `p-${Date.now()}`
    set((state) => ({ payees: [...state.payees, { ...payee, id }] }))
    return id
  },

  toggleFreeze: (cardId) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === cardId ? { ...c, frozen: !c.frozen } : c)),
    })),

  setSpendingLimit: (cardId, limit) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === cardId ? { ...c, spendingLimit: limit } : c)),
    })),

  resetDemo: () =>
    set({
      accounts: seedAccounts(),
      cards: seedCards(),
      transactions: seedTransactions(),
      payees: seedPayees(),
      billers: seedBillers(),
    }),
}))

/** Available spend for an account (handles credit lines). */
export function accountAvailable(account: Account): number {
  return availableBalance(account)
}
