import { All, Controller, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { toNodeHandler } from 'better-auth/node'
import { AuthService } from './auth.service'

@Controller('api/auth')
export class BetterAuthController {
  constructor(private authService: AuthService) {}

  @All('*path')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(this.authService.auth)(req, res)
  }
}
