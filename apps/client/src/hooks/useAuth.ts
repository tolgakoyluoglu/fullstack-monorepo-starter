import { useMutation } from '@tanstack/react-query'
import { signIn, signUp } from '@/lib/auth'
import type { LoginDto, RegisterDto } from '@fullstack-monorepo/shared'

export const useLogin = (
  onSuccess?: () => void | Promise<void>,
  onError?: (error: string) => void,
) => {
  return useMutation({
    mutationFn: async (credentials: LoginDto) => {
      const result = await signIn.email({
        email: credentials.email,
        password: credentials.password,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      return result
    },
    onSuccess: async () => {
      if (onSuccess) await onSuccess()
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Login failed, please try again'
      if (onError) onError(errorMessage)
    },
  })
}

export const useRegister = (
  onSuccess?: () => void | Promise<void>,
  onError?: (error: string) => void,
) => {
  return useMutation({
    mutationFn: async (userData: RegisterDto) => {
      const result = await signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      return result
    },
    onSuccess: async () => {
      if (onSuccess) await onSuccess()
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed, please try again'
      if (onError) onError(errorMessage)
    },
  })
}
