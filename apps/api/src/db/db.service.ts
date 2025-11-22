import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

@Injectable()
export class DbService implements OnModuleInit {
  private _db: NodePgDatabase<typeof schema> | null = null

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>('DATABASE_URL')
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables')
    }

    const pool = new Pool({
      connectionString,
    })
    this._db = drizzle({ client: pool, schema })
  }

  get db() {
    if (!this._db) {
      throw new Error('Database not initialized')
    }
    return this._db
  }
}
