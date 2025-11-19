import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as postgres from 'postgres'

@Injectable()
export class DbService implements OnModuleInit {
  private _db: PostgresJsDatabase | null = null
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>('DATABASE_URL')
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables')
    }

    const client = postgres(connectionString)
    this._db = drizzle(client)
  }

  get db(): PostgresJsDatabase {
    if (!this._db) {
      throw new Error('Database not initialized')
    }
    return this._db
  }
}
