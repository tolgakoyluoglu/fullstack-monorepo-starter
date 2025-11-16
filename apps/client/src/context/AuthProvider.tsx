import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { api } from '@/lib/axios'
import { AuthContext } from './AuthContext'
import type { RegisterDto, LoginDto, User } from '@freelancers/shared'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: LoginDto) => {
    const response = await api.post('/auth/login', data)
    setUser(response.data.user)
  }

  const register = async (data: RegisterDto) => {
    const response = await api.post('/auth/register', data)
    setUser(response.data.user)
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
