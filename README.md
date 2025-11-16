# Fullstack Monorepo Starter

A full-stack monorepo application with authentication.

## Stack

- **Frontend:** React + Vite + TypeScript
- **Backend:** NestJS + TypeScript
- **Database:** PostgreSQL
- **Session:** express-session with PostgreSQL store
- **ORM:** Drizzle

## Project Structure

```
├── apps/
│   ├── client/          # React frontend
│   └── api/             # NestJS backend
├── packages/
│   └── shared/          # Shared types and DTOs
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (for PostgreSQL)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # API environment
   cp apps/api/.env.example apps/api/.env

   # Client environment
   cp apps/client/.env.example apps/client/.env
   ```

3. **Generate a secure session secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copy the output and replace `SESSION_SECRET` in `apps/api/.env`

4. **Start database**
   ```bash
   npm run db
   ```

5. **Push database schema**
   ```bash
   cd apps/api
   npm run db:push
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Available Scripts

### Root Commands

- `npm run dev` - Start both client and API in development mode
- `npm run build` - Build all workspaces
- `npm run format` - Format all code with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db` - Start PostgreSQL database
- `npm run db:stop` - Stop database
- `npm run db:logs` - View database logs

### API Commands (in apps/api)

- `npm run start:dev` - Start API in development mode
- `npm run build` - Build API
- `npm run db:generate` - Generate Drizzle migration files (for production)
- `npm run db:push` - Push schema directly to database (for development)
- `npm run db:studio` - Open Drizzle Studio

### Client Commands (in apps/client)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build client for production

## Features

### Authentication & Security
- User authentication (register/login/logout)
- HTTP-only session cookies
- Role-based access control (USER/ADMIN)
- Session storage in PostgreSQL
- Helmet.js security headers
- Rate limiting (10 req/min)
- DTO validation with class-validator

### Code Quality
- Pre-commit hooks (Husky + lint-staged)
- Auto-formatting with Prettier
- ESLint with TypeScript
- Shared types between client and API

### Developer Experience
- TypeScript monorepo with npm workspaces
- Path aliases (@/ imports)
- CSS Modules for styling
- Global exception filter with logging
- Health check endpoint
