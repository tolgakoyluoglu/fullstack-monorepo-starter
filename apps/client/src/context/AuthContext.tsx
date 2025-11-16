import type { User } from '@fullstack-monorepo/shared'
import { createContext } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
