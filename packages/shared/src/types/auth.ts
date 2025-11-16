export interface User {
  id: number
  email: string
  name?: string
  createdAt: string
  updatedAt: string
}

export interface RegisterDto {
  email: string
  password: string
  name?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user: User
}
