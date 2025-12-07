import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { SessionGuard } from './guards/session.guard'
import { User as UserDecorator } from './decorators/user.decorator'
import type { Request } from 'express'
import type { User } from '@fullstack-monorepo/shared'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Req() req: Request): Promise<User> {
    const user = await this.authService.register(dto)
    req.session.userId = user.id
    return user
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request): Promise<User> {
    const user = await this.authService.validateUser(dto)
    req.session.userId = user.id
    return user
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  async logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) return reject(new Error(String(err)))
        resolve({ message: 'Logged out successfully' })
      })
    })
  }

  @Get('me')
  @UseGuards(SessionGuard)
  me(@UserDecorator() user: User) {
    return user
  }
}
