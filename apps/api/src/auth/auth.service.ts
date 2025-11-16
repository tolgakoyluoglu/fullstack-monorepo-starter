import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  async register({ email, password, name }: RegisterDto) {
    const existingUser = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      throw new UnauthorizedException('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser] = await this.dbService.db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning({ id: users.id, email: users.email, name: users.name })

    return newUser
  }

  async login({ email, password }: LoginDto) {
    const [user] = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async getUserById(id: number) {
    const [user] = await this.dbService.db.select().from(users).where(eq(users.id, id)).limit(1)

    if (!user) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
