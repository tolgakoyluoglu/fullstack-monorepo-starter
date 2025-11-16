export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface RegisterDto {
  email: string
  password: string
  name: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user: User
}
