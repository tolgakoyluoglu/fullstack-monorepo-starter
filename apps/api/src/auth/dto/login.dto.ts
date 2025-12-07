import { createZodDto } from 'nestjs-zod'
import { LoginDtoSchema } from '@fullstack-monorepo/shared'

export class LoginDto extends createZodDto(LoginDtoSchema) {}
