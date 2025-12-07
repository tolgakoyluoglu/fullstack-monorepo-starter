import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import type { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import type { User } from '@fullstack-monorepo/shared'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const session = request.session

    if (!session || !session.userId) {
      throw new UnauthorizedException('Not authenticated')
    }

    const user = (await this.prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as User | null

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    request.user = user
    return true
  }
}
