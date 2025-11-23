import { createContext, useContext, type ReactNode } from 'react'
import type { User } from '@fullstack-monorepo/shared'
import { useCurrentUser, useLogout } from '@/hooks/useAuth'

interface UserContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useCurrentUser()
  const { mutate: logout } = useLogout()

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
