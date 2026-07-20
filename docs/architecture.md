# Voltanet Architecture

## Overview
Voltanet is a monorepo-based local network domain management system designed for home labs. It provides a web interface for managing Nginx reverse proxy configurations and DNSMasq DNS server settings.

## System Architecture

### Monorepo Structure
```
voltanet/
├── apps/
│   ├── client/          # React frontend (Vite + Mantine)
│   └── server/          # Hono backend API
├── packages/
│   ├── database/        # Drizzle ORM + SQLite
│   └── shared/          # Shared types, validation, constants
└── docker/
    └── Dockerfile       # Single container deployment
```

### Technology Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, TypeScript, Vite, Mantine, TanStack Router, TanStack Query, oRPC Client, Jotai |
| Backend | Hono, oRPC Server, Better Auth, Drizzle ORM, SQLite, Bun |
| Services | Nginx (reverse proxy), DNSMasq (DNS server) |
| Tooling | Turbo, Bun, Biome, Docker |


## Component Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│  main.tsx (Entry Point)                 │
│  ├─ Router setup (TanStack Router)      │
│  ├─ Auth session management             │
│  └─ Provider initialization             │
├─────────────────────────────────────────┤
│  Route Structure                        │
│  ├─ __root.tsx (Layout + Auth)          │
│  ├─ / (Dashboard)                       │
│  ├─ /(proxy)/* (Proxy routes)           │
│  ├─ /(dns)/* (DNS routes)               │
│  ├─ /auth/* (Authentication)            │
│  └─ /settings/* (Settings)              │
├─────────────────────────────────────────┤
│  Feature Modules                        │
│  ├─ auth/ (Login, logout, sessions)     │
│  ├─ proxy-* (Proxy management)          │
│  ├─ dns-* (DNS management)              │
│  ├─ settings/ (UI preferences)          │
│  └─ const/ (App configuration)          │
├─────────────────────────────────────────┤
│  Shared Components                      │
│  ├─ layout/ (Layout, navbar, header)    │
│  ├─ providers/ (Theme, query client)    │
│  └─ overlay/ (Error, loading states)    │
└─────────────────────────────────────────┘
```

### Backend Architecture

```
┌─────────────────────────────────────────┐
│              Web Server                 │
├─────────────────────────────────────────┤
│  server.ts (Entry Point)                │
│  ├─ CORS configuration                  │
│  ├─ Static file serving                 │
│  ├─ Logger middleware                   │
│  ├─ Auth handler (/api/auth/*)          │
│  └─ API router (/api/*)                 │
├─────────────────────────────────────────┤
│  oRPC Router                            │
│  ├─ base.ts (Base procedures)           │
│  │   ├─ publicRoute (no auth)           │
│  │   └─ safeRoute (with auth)           │
│  ├─ router.ts (Route aggregation)       │
│  └─ Sub-routers:                        │
│      ├─ core/ (Health check)            │
│      ├─ proxy-host/ (Domain management) │
│      ├─ access-control/ (IP rules)      │
│      ├─ block-list/ (DNS blocking)      │
│      ├─ certificate/ (SSL certs)        │
│      ├─ dns-rewrite/ (DNS rules)        │
│      └─ dns-upstream/ (DNS servers)     │
├─────────────────────────────────────────┤
│  Middlewares                            │
│  ├─ auth.middleware (Session validation)│
│  └─ db.middleware (Database injection)  │
├─────────────────────────────────────────┤
│  Utilities                              │
│  ├─ auth/ (Better Auth instance)        │
│  ├─ count-block-list.ts                 │
│  └─ handle-file.ts                      │
└─────────────────────────────────────────┘
```

### Database Architecture

```
┌─────────────────────────────────────────┐
│         SQLite Database                 │
├─────────────────────────────────────────┤
│  Core Tables                            │
│  ├─ user (User accounts)                │
│  ├─ session (Auth sessions)             │
│  ├─ account (OAuth accounts)            │
│  └─ verification (Email verification)   │
├─────────────────────────────────────────┤
│  Network Configuration Tables           │
│  ├─ proxy_host (Domain routing)         │
│  ├─ access_control (IP rules)           │
│  ├─ certificate (SSL certificates)      │
│  ├─ dns_rewrite (DNS rewrite rules)     │
│  ├─ dns_upstream (DNS servers)          │
│  └─ block_list (DNS blocking lists)     │
├─────────────────────────────────────────┤
│  Relationships                          │
│  proxy_host → access_control (optional) │
│  proxy_host → certificate (optional)    │
│  user → session (one-to-many)           │
│  user → account (one-to-many)           │
└─────────────────────────────────────────┘
```

### Single Container Setup

```
┌─────────────────────────────────────────┐
│         Single Docker Container         │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │       Voltanet Application        │  │
│  ├───────────────────────────────────┤  │
│  │                                   │  │
│  │         ┌──────────────┐          │  │
│  │         │    GUI App   │          │  │
│  │         │   Port 8000  │          │  │
│  │         │    (Hono)    │          │  │
│  │         └──────────────┘          │  │
│  │                                   │  │
│  │         ┌──────────────┐          │  │
│  │         │     Nginx    │          │  │
│  │         │    Port 80   │          │  │
│  │         │              │          │  │
│  │         └──────────────┘          │  │
│  │                                   │  │
│  │         ┌──────────────┐          │  │
│  │         │    DNSMasq   │          │  │
│  │         │    Port 53   │          │  │
│  │         │              │          │  │
│  │         └──────────────┘          │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## Design Principles

### Type Safety
- **oRPC**: End-to-end type safety between client and server
- **Zod**: Runtime validation shared across frontend and backend
- **Drizzle**: Type-safe database queries with TypeScript inference
- **TanStack Router**: Type-safe routing with params and search

### Authentication
- **Better Auth**: Flexible auth solution with Drizzle adapter
- **Session-based**: Token-based session management
- **Single admin**: Simplified for home lab use case
- **Email/username**: Primary authentication methods

### State Management
- **Client state**: Jotai for UI state
- **Server state**: TanStack Query for API data
- **Form state**: Mantine Form with Zod validation

### Code Organization
- **Feature-based**: UI organized by domain features
- **Shared packages**: Common code extracted to packages
- **Monorepo**: Turbo for efficient builds and caching

### Security
- Session-based authentication
- CORS configuration
- SQL injection prevention (Drizzle ORM)
- Input validation (Zod schemas)
- Future: Rate limiting, HTTPS enforcement, secure headers, IP-based access control

### Performance
- **Database**: SQLite for simplicity and single-user scale, connection pooling via Drizzle, indexed queries
- **Frontend**: Code splitting via TanStack Router, lazy loading of route components, optimistic updates with TanStack Query
- **Backend**: Hono for minimal overhead, efficient middleware chain, static file serving optimization

## Development Workflow

### Local Development
```sh
# Install dependencies
bun install

# Start development servers
bun turbo dev

# Type checking
bun turbo check:types

# Linting/Formatting
bun turbo check:code
bun turbo format
```

### Database Operations
```sh
# Generate migrations
bun turbo db:generate

# Run migrations
mkdir -p packages/database/data
bun turbo db:migrate

# Seed database
bun turbo db:seed

# Open Drizzle Studio
bun turbo db:studio
```

### Adding New Features
1. Create database schema in `packages/database/schema/`
2. Add validation schemas in `packages/shared/validation/`
3. Build UI components in `apps/client/src/features/`
4. Create API routes in `apps/server/router/`
5. Add routes to TanStack Router

This architecture provides a solid foundation for the v1.0 release while maintaining flexibility for future enhancements.
