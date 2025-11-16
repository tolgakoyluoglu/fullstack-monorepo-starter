import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { UserRole } from '@fullstack-monorepo/shared'
import { Roles } from './auth/decorators/roles.decorator'
import { RolesGuard } from './auth/guards/roles.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData() {
    return {
      message: 'This is admin-only data',
      timestamp: new Date().toISOString(),
    }
  }
}
