import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, handleMutationError } from '@/lib/api'
import type { LoginDto, RegisterDto, AuthResponse } from '@fullstack-monorepo/shared'

export const useLogin = (
  onSuccess?: () => void | Promise<void>,
  onError?: (error: string) => void,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginDto) => {
      const response = await api.post<AuthResponse>('/auth/login', credentials)
      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      if (onSuccess) await onSuccess()
    },
    onError: (error) => {
      const errorMessage = handleMutationError(error, 'Login failed, please try again')
      if (onError) onError(errorMessage)
    },
  })
}

export const useRegister = (
  onSuccess?: () => void | Promise<void>,
  onError?: (error: string) => void,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: RegisterDto) => {
      const response = await api.post<AuthResponse>('/auth/register', userData)
      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      if (onSuccess) await onSuccess()
    },
    onError: (error) => {
      const errorMessage = handleMutationError(error, 'Registration failed, please try again')
      if (onError) onError(errorMessage)
    },
  })
}
