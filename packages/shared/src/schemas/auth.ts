import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
  name: z.string(),
})

export const LoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type User = z.infer<typeof UserSchema>
export type RegisterDto = z.infer<typeof RegisterDtoSchema>
export type LoginDto = z.infer<typeof LoginDtoSchema>
