import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

import type { Theme } from "@/types"

interface AppState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Onboarding
  hasOnboarded: boolean
  setHasOnboarded: (value: boolean) => void

  // Preferences (surfaced in Settings)
  hideBalances: boolean
  setHideBalances: (value: boolean) => void
  biometricsEnabled: boolean
  setBiometricsEnabled: (value: boolean) => void
  pushNotifications: boolean
  setPushNotifications: (value: boolean) => void
  transactionAlerts: boolean
  setTransactionAlerts: (value: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),

      hasOnboarded: false,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),

      hideBalances: false,
      setHideBalances: (value) => set({ hideBalances: value }),

      biometricsEnabled: true,
      setBiometricsEnabled: (value) => set({ biometricsEnabled: value }),

      pushNotifications: true,
      setPushNotifications: (value) => set({ pushNotifications: value }),

      transactionAlerts: true,
      setTransactionAlerts: (value) => set({ transactionAlerts: value }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
