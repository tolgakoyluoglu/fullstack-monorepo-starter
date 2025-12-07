import 'express-session'
import type { User } from '@fullstack-monorepo/shared'

declare module 'express-session' {
  interface Session {
    userId?: string
    csrfToken?: string | null
  }
}

declare module 'express' {
  interface Request {
    user?: User
  }
}
