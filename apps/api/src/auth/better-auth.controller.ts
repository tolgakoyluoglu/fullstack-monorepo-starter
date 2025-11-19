import { All, Controller, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { auth } from '../lib/auth'
import { toNodeHandler } from 'better-auth/node'

@Controller('api/auth')
export class BetterAuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(auth)(req, res)
  }
}
