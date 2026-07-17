# Voltanet Roadmap

## Overview

> This roadmap outlines the path to v1.0 public release.

Voltanet is a monorepo-based local network domain management system designed for home labs. It provides a web interface for managing Nginx reverse proxy configurations and DNSMasq DNS server settings.


## Technical Stack
- **Reverse Proxy**: Nginx
- **DNS Server**: DNSMasq
- **SSL Management**: Manual certificate upload (no automation)
- **Authentication**: Single admin user
- **Deployment**: Docker Compose
- **Ports**: 80 (Nginx), 53 (DNSMasq), 8000 (GUI)

---

## Roadmap

### Complete Management UI

- Proxy hosts CRUD interface
  - List/create/edit/delete proxy hosts
  - Domain management with validation
  - Certificate and access control selection
  - Form validation using Zod schemas

- DNS management UI
  - DNS rewrite rules interface
  - DNS upstream configuration UI
  - Block list management with sync functionality
  - Access control rules interface (IP ranges, allow/deny)

- Certificate management
  - Certificate upload UI (file upload + copy-paste)
  - Certificate list/edit/delete pages
  - Certificate validation and preview

---

### Configuration Generation

- Nginx configuration generator
  - Generate Nginx configs from proxy-host database
  - Include SSL certificate paths
  - Support WebSocket, force HTTPS, redirects
  - Access control integration
  - Configuration validation

- DNSMasq configuration generator
  - Generate DNSMasq configs from database
  - DNS rewrite rules implementation
  - Block list integration
  - Upstream DNS server configuration
  - Host file generation for local domains

- Configuration management
  - Config file validation
  - Certificate file management
  - Backup/restore functionality

---

### Service Integration

- Nginx integration
  - Config hot-reload mechanism
  - Health monitoring
  - Log aggregation

- DNSMasq integration
  - Config reload mechanism
  - Health monitoring
  - Log aggregation

- Docker containerization
  - Multi-container Docker Compose setup
  - Port configuration (80, 53, 8000)
  - Volume management for persistent data
  - Network configuration between containers
  - Startup ordering and health checks

---

### Production Ready

- Documentation
  - Docker deployment guide
  - User documentation for all features
  - Configuration reference
  - Troubleshooting guide

- Polish
  - Error handling improvements
  - Loading states and feedback
  - Mobile responsiveness
  - Performance optimization

- Release
  - Final testing in home lab environment
  - Release notes
  - v1.0.0 release

---

## Configuration Flow
1. User changes data in GUI → Database
2. GUI triggers config regeneration → Nginx/DNSMasq config files
3. GUI sends reload signal → Services reload configs
4. Changes applied immediately

## Current Status
- ✅ Backend API routes (all CRUD operations)
- ✅ Database schema and migrations
- ✅ Authentication system
- ✅ Basic UI structure (auth, settings)
- ❌ Feature-specific UI (proxy hosts, DNS, certificates)
- ❌ Configuration generators
- ❌ Service integration
- ❌ Docker setup
