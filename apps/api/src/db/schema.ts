import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { UserRole } from '@fullstack-monorepo/shared'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  role: text('role', { enum: [UserRole.USER, UserRole.ADMIN] })
    .notNull()
    .default(UserRole.USER),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
