import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export function getCorsOrigins(nodeEnv: string): string[] {
  const corsOrigins: string[] = []

  if (nodeEnv === 'development') {
    corsOrigins.push('http://localhost:5173')
  } else if (nodeEnv === 'staging') {
    corsOrigins.push('http://localhost:5173')
  } else if (nodeEnv === 'production') {
    corsOrigins.push('http://localhost:5173')
  }

  return corsOrigins
}

export function getCorsConfig(nodeEnv: string): CorsOptions {
  return {
    origin: getCorsOrigins(nodeEnv),
    credentials: true,
  }
}
