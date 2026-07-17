# Voltanet

Define and manage custom domains for your local network.

Voltanet is a monorepo-based local network domain management system designed for home labs. It provides a web interface for managing Nginx reverse proxy configurations and DNSMasq DNS server settings.

## Features

- **Proxy Host Management**: Configure reverse proxy rules for local domains
- **DNS Management**: Custom DNS rewrite rules, upstream servers, and block lists
- **Access Control**: IP-based access rules for your services
- **Certificate Management**: Upload and manage SSL certificates
- **Single Container Deployment**: All services (GUI, Nginx, DNSMasq) in one Docker container
- **Type-Safe API**: End-to-end type safety with oRPC
- **Modern UI**: Built with React 19, Mantine, and TanStack Router

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Mantine, TanStack Router/Query, oRPC Client, Jotai
- **Backend**: Hono, oRPC Server, Better Auth, Drizzle ORM, SQLite, Bun
- **Services**: Nginx (reverse proxy), DNSMasq (DNS server)
- **Tooling**: Turbo, Bun, Biome, Docker

## Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) for containerized deployment
- [Bun](https://bun.com/docs/installation) for local development (optional)

### Installation

```sh
# Create data directory
mkdir -p ./data/voltanet

# Start the container
docker run -d \
  --name voltanet \
  -p 80:80 -p 53:53 -p 8000:8000 \
  -v ./data/voltanet:/app/data \
  -e AUTH_SECRET=<your-secret-key> \
  voltanet/voltanet:latest
```

Then open http://localhost:8000 in your browser.

For a Docker Compose example, see [docker/compose.yml](docker/compose.yml)

### Data Persistence

All configuration data is stored in the `/app/data` directory inside the container:
- Database: `/app/data/db.sqlite`
- Nginx configs: `/app/data/nginx.d/`
- DNSMasq configs: `/app/data/dnsmasq.d/`
- SSL certificates: `/app/data/certs/`
- Extra resources: `/app/data/resources/`

### Default Credentials

After first start, you can log in with:
- Username: `admin` or Email `admin@localhost`
- Password: `changeme`

**Important**: Use your own `AUTH_SECRET` and change the default password after first login.

## Development

```sh
# Clone the repository
git clone https://github.com/voltanet/voltanet.git
cd voltanet

# Install dependencies
bun install

# Generate types from database schema
bun turbo db:generate
mkdir -p ./packages/database/data
bun turbo db:migrate

# Servers
bun turbo dev          # Development servers
bun turbo build        # Build all packages
bun turbo start        # Start the last build

# Code quality
bun turbo check        # Lint code
bun turbo format       # Format files
bun turbo type-check   # Check typescript types

# More database operations
bun turbo db:seed      # Apply database defaults
bun turbo db:studio    # Open Drizzle Studio
```

See [architecture.md](docs/architecture.md) and [roadmap.md](docs/roadmap.md) for more details.

## License

MIT — see [LICENSE](LICENSE).
