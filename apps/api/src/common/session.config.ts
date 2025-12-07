import * as session from 'express-session'
import * as connectPgSimple from 'connect-pg-simple'
import { Pool } from 'pg'
import { randomBytes } from 'crypto'
import { Logger } from '@nestjs/common'

export function createSessionStore(databaseUrl: string) {
  const logger = new Logger('SessionStore')

  const pgPool = new Pool({
    connectionString: databaseUrl,
  })

  pgPool.on('error', (err) => {
    logger.error('PostgreSQL Pool Error:', err)
  })

  pgPool.on('connect', () => {
    logger.log('PostgreSQL Pool Connected')
  })

  const PgSession = connectPgSimple(session)
  const sessionStore = new PgSession({
    pool: pgPool,
    tableName: 'session',
    createTableIfMissing: false,
    pruneSessionInterval: 60 * 60, // Clean up expired sessions every hour (in seconds)
  })

  return { sessionStore, pgPool }
}

export function getSessionConfig(
  sessionStore: session.Store,
  sessionSecret: string,
  nodeEnv: string,
): session.SessionOptions {
  return {
    store: sessionStore,
    secret: sessionSecret,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      sameSite: nodeEnv === 'development' ? 'lax' : 'none',
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: nodeEnv !== 'development',
    },
    name: 'sessionId',
    genid: () => {
      return randomBytes(32).toString('hex')
    },
  }
}
