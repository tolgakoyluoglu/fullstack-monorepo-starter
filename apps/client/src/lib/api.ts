import axios from 'axios'
import type { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const handleMutationError = (
  error: unknown,
  fallback = 'Something went wrong, please try again later',
): string => {
  if (import.meta.env.DEV) {
    console.error('Mutation error:', error)
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    const status = axiosError.response?.status

    if (status === 429) {
      return 'Too many requests, please try again in a moment'
    }

    // Client errors with safe messages
    const safeStatusCodes = [400, 401, 403, 404, 409, 422]
    if (status && safeStatusCodes.includes(status) && axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
  }

  return fallback
}
