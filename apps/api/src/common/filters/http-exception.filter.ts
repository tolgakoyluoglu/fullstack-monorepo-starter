import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

interface HttpExceptionResponse {
  message: string | string[]
  error?: string
  statusCode?: number
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    let message: string
    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse
    } else {
      const errorResponse = exceptionResponse as HttpExceptionResponse
      message = Array.isArray(errorResponse.message)
        ? errorResponse.message.join(', ')
        : errorResponse.message
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    }

    this.logger.error(`${request.method} ${request.url} - ${status} - ${message}`)

    response.status(status).json(errorResponse)
  }
}
