import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import helmet from 'helmet'
import { ConsoleLogger } from '@nestjs/common'
import { SanitizePipe } from './common/pipes/sanitize.pipe'
import { setupGracefulShutdown } from './common/shutdown.utils'
import { createSessionStore, getSessionConfig } from './common/session.config'
import { Application } from 'express'
import { getCorsConfig } from './common/cors.config'

async function bootstrap() {
  const nodeEnv = process.env.NODE_ENV || 'development'
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      timestamp: true,
    }),
  })

  app.use(helmet())
  app.useGlobalPipes(new SanitizePipe())

  const { sessionStore, pgPool } = createSessionStore(process.env.DATABASE_URL!)
  const expressApp = app.getHttpAdapter().getInstance() as Application
  expressApp.set('trust proxy', 1)
  app.use(session(getSessionConfig(sessionStore, process.env.SESSION_SECRET!, nodeEnv)))

  const corsConfig = getCorsConfig(nodeEnv)
  app.enableCors(corsConfig)

  await app.listen(3000)
  console.log('Server running on http://localhost:3000')
  setupGracefulShutdown(app, pgPool)
}

void bootstrap()
