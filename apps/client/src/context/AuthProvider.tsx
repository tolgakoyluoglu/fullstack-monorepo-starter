import type { ReactNode } from 'react'
import { useSession, signOut } from '@/lib/auth'
import type { User } from '@fullstack-monorepo/shared'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession()

  const value = {
    user: (session?.user as User | undefined) ?? null,
    loading: isPending,
    logout: async () => await signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
