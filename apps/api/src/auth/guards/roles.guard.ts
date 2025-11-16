import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserRole } from '@fullstack-monorepo/shared'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { AuthService } from '../auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const userId = request.session.userId

    if (!userId) {
      throw new UnauthorizedException('Not authenticated')
    }

    const user = await this.authService.getUserById(userId)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const hasRole = requiredRoles.includes(user.role as UserRole)

    if (!hasRole) {
      throw new UnauthorizedException('Insufficient permissions')
    }

    return true
  }
}
