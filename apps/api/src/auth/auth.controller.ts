import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { Request } from 'express'
import { SessionGuard } from './guards/session.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const { email, password, name } = dto
    const user = await this.authService.register({ email, password, name })

    req.session.userId = user.id
    return {
      message: 'Registration successful',
      user,
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const { email, password } = dto
    const user = await this.authService.login({ email, password })

    req.session.userId = user.id
    return {
      message: 'Login successful',
      user,
    }
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  async logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err: Error | null) => {
        if (err) {
          reject(new UnauthorizedException('Could not log out'))
        } else {
          resolve({ message: 'Logout successful' })
        }
      })
    })
  }

  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    if (!req.session.userId) {
      return null
    }

    const user = await this.authService.getUserById(req.session.userId)

    if (!user) {
      return null
    }

    return user
  }
}
