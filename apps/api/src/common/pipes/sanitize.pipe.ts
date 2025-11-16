import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform<T>(value: T): T {
    if (typeof value === 'string') {
      if (this.containsHtml(value)) {
        throw new BadRequestException('HTML tags are not allowed')
      }
    }

    if (typeof value === 'object' && value !== null) {
      this.validateObject(value as Record<string, unknown>)
    }

    return value
  }

  private containsHtml(str: string): boolean {
    const htmlRegex = /<[^>]*>/g
    return htmlRegex.test(str)
  }

  private validateObject(obj: Record<string, unknown>): void {
    for (const key in obj) {
      const val = obj[key]
      if (typeof val === 'string') {
        if (this.containsHtml(val)) {
          throw new BadRequestException(`HTML tags are not allowed in ${key}`)
        }
      } else if (typeof val === 'object' && val !== null) {
        this.validateObject(val as Record<string, unknown>)
      }
    }
  }
}
