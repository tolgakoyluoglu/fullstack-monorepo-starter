import { INestApplication, Logger } from '@nestjs/common'
import { Pool } from 'pg'

export function setupGracefulShutdown(app: INestApplication, pgPool: Pool) {
  const logger = new Logger('Shutdown')

  const shutdown = async (signal: string) => {
    logger.log(`${signal} received, shutting down gracefully...`)
    try {
      await pgPool.end()
      await app.close()
      process.exit(0)
    } catch (error) {
      logger.error(`Error during shutdown: ${error}`)
      process.exit(1)
    }
  }

  process.on('SIGTERM', () => void shutdown('SIGTERM'))
  process.on('SIGINT', () => void shutdown('SIGINT'))
}
