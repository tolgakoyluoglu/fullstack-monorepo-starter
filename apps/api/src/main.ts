import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { AppModule } from './app.module'
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
    new SanitizePipe(),
  )
  app.useGlobalFilters(new HttpExceptionFilter())

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  logger.log(`🚀 Server running on http://localhost:${port}`)
}
void bootstrap()
