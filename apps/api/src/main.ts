import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as ConnectPgSimple from 'connect-pg-simple'
import helmet from 'helmet'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { SanitizePipe } from './common/pipes/sanitize.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')

  app.use(helmet())
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalPipes(new SanitizePipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  const PgSession = ConnectPgSimple(session)

  app.use(
    session({
      store: new PgSession({
        conObject: {
          connectionString: process.env.DATABASE_URL,
        },
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    }),
  )

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  logger.log(`🚀 Server running on http://localhost:${port}`)
}
void bootstrap()
