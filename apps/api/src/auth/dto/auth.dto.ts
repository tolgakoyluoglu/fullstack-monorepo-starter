import { IsEmail, IsString, MinLength } from 'class-validator'
import type { RegisterDto as IRegisterDto, LoginDto as ILoginDto } from '@fullstack-monorepo/shared'

export class RegisterDto implements IRegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  name: string
}

export class LoginDto implements ILoginDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}
