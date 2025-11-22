import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserRole, User } from '@fullstack-monorepo/shared'
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
    const headers = new Headers()
    Object.entries(request.headers).forEach(([key, value]) => {
      if (value) {
        headers.set(key, Array.isArray(value) ? value[0] : value)
      }
    })

    const session = await this.authService.auth.api.getSession({ headers })
    if (!session) {
      throw new UnauthorizedException('Not authenticated')
    }

    const user = session.user as User
    const hasRole = requiredRoles.includes(user.role)
    if (!hasRole) {
      throw new UnauthorizedException('Insufficient permissions')
    }

    return true
  }
}
