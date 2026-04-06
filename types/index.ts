export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  email: string
  username: string
}

export type Theme = "light" | "dark" | "system"
