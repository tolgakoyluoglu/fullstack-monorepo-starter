import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'string') {
      return value.trim()
    }
    if (this.isRecord(value)) {
      return this.sanitizeObject(value)
    }
    return value
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  private sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
    for (const key in obj) {
      const val = obj[key]
      if (typeof val === 'string') {
        obj[key] = val.trim()
      } else if (this.isRecord(val)) {
        obj[key] = this.sanitizeObject(val)
      }
    }
    return obj
  }
}
