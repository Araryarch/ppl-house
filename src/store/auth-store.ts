import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  color: string
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "1",
    name: "Jordan",
    email: "jordan@example.com",
    avatar: "😊",
    color: "#A78BFA",
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
