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

```bash
npm install
```

### Start Database

```bash
npm run db
```

### Push Database Schema

```bash
cd apps/api
npm run db:push
```

### Start Development Servers

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
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio

### Client Commands (in apps/client)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build client for production

## Features

- User authentication (register/login/logout)
- HTTP-only session cookies
- Protected routes
- Shared types between client and API
- CSS Modules for styling
