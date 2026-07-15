# Fidelity — Mobile Banking (Expo)

A polished, Chase-inspired mobile banking app built with Expo Router, NativeWind
and Zustand. All data is mocked in-app; every feature works end-to-end within a
session (transfers, payments, deposits and card controls actually move balances).

## Get started

```bash
npm install
npx expo start
```

Open in the iOS simulator, Android emulator, or Expo Go.

## Architecture

- **`app/`** — file-based routes (Expo Router).
  - `(tabs)/` — Home, Inbox, **Pay** (center), Cards, More
  - Flow screens — `transfer`, `send`, `pay-bills`, `deposit`, `withdraw`
  - Detail screens — `account/[id]`, `card/[id]`, `transaction/[id]`,
    `transactions`, `profile`, `settings`, `about`
- **`store/`**
  - `useBankStore` — the mock data layer: accounts, cards, transactions,
    payees, billers, plus money-movement actions with balance validation.
    In-memory (re-seeded each launch with fresh relative dates); reset from
    Settings → Data.
  - `useAppStore` — persisted preferences (theme, hide balances, biometrics,
    notifications).
- **`components/`**
  - `ui/` — the design system (`Screen`, `AppHeader`, `Card`, `ListRow`,
    `Button`, `Avatar`, `Sheet`, `AmountKeypad`, `SectionHeader`, `EmptyState`).
  - `flows/` — shared money-movement scaffold (`MoneyFlowScaffold`) and pickers.
  - `home/` — dashboard widgets.
- **`lib/`** — `format` (currency/dates), `analytics` (spending breakdown).
- **`constants/categories.ts`** — transaction category metadata (icon/color/label).

## Theming

Colors are defined once in `tailwind.config.js` and mirrored for imperative use
in `hooks/useThemeColors.ts`. Light mode uses a soft-gray app background with
white, lifted cards; dark mode is a near-black surface set. Brand color is
`#ff7c28`.

## Quality

```bash
npx tsc --noEmit   # strict typecheck
npx expo lint      # eslint + prettier
```
