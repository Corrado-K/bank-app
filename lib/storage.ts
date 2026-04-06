import AsyncStorage from "@react-native-async-storage/async-storage"

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error(`Failed to save ${key} to storage`)
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {
      console.error(`Failed to remove ${key} from storage`)
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch {
      console.error("Failed to clear storage")
    }
  },
}
