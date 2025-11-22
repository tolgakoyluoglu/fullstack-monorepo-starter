import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { UserRole } from '@fullstack-monorepo/shared'
import { DbService } from '../db/db.service'
import { users, sessions, accounts, verifications } from '../db/schema'

@Injectable()
export class AuthService implements OnModuleInit {
  private _auth: ReturnType<typeof betterAuth> | null = null

  constructor(
    private configService: ConfigService,
    private dbService: DbService,
  ) {}

  onModuleInit() {
    const clientUrl = this.configService.get<string>('CLIENT_URL')
    if (!clientUrl) {
      throw new Error('CLIENT_URL is not defined in environment variables')
    }

    this._auth = betterAuth({
      database: drizzleAdapter(this.dbService.db, {
        provider: 'pg',
        schema: {
          user: users,
          session: sessions,
          account: accounts,
          verification: verifications,
        },
      }),
      emailAndPassword: {
        enabled: true,
      },
      user: {
        additionalFields: {
          role: {
            type: 'string',
            defaultValue: UserRole.USER,
            required: true,
          },
        },
      },
      session: {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24, // 1 day
      },
      trustedOrigins: [clientUrl],
    })
  }

  get auth() {
    if (!this._auth) {
      throw new Error('Auth not initialized')
    }
    return this._auth
  }
}
