import type { User, LoginDto, RegisterDto } from '@fullstack-monorepo/shared'
import { createContext } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginDto) => Promise<void>
  register: (data: RegisterDto) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
