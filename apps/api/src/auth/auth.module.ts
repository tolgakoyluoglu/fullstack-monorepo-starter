import { Module } from '@nestjs/common'
import { BetterAuthController } from './better-auth.controller'
import { RolesGuard } from './guards/roles.guard'
import { AuthService } from './auth.service'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule],
  controllers: [BetterAuthController],
  providers: [AuthService, RolesGuard],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
