import { Module } from '@nestjs/common'
import { BetterAuthController } from './better-auth.controller'
import { RolesGuard } from './guards/roles.guard'

@Module({
  controllers: [BetterAuthController],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
