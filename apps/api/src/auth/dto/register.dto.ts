import { createZodDto } from 'nestjs-zod'
import { RegisterDtoSchema } from '@fullstack-monorepo/shared'

export class RegisterDto extends createZodDto(RegisterDtoSchema) {}
