import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginDto as ILoginDto } from '@fullstack-monorepo/shared';

export class LoginDto implements ILoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
