# Stage 1: Builder
FROM oven/bun:1.3.4-alpine AS builder

# Set working directory
WORKDIR /build

# Copy lock files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the source code
COPY . .

# Build client
WORKDIR /build/apps/client
RUN bun run build

# Build server
WORKDIR /build/apps/server
RUN bun run compile

# Generate migrations
WORKDIR /build/packages/database
RUN bun run db:generate

# Stage 2: Production Image
FROM alpine:3.22

# Image info
ARG IMAGE_VERSION=1.0.0
LABEL org.opencontainers.image.title="Voltanet" \
  org.opencontainers.image.description="Define and manage custom domains for your local network." \
  org.opencontainers.image.author="Ibrahim Megahed <codjix@gmail.com>" \
  org.opencontainers.image.source="https://github.com/voltanet/voltanet.git" \
  org.opencontainers.image.url="https://voltanet.github.io" \
  org.opencontainers.image.version="${IMAGE_VERSION}" \
  org.opencontainers.image.vendor="voltanet" \
  org.opencontainers.image.licenses="MIT" \
  bun.version="1.3.4"

# Install bun runtime requirements
RUN apk add --no-cache libgcc libstdc++

# Copy builds from builder
COPY --from=builder --chown=bun:bun /build/apps/server/dist /app
COPY --from=builder --chown=bun:bun /build/apps/client/dist /app/client
COPY --from=builder --chown=bun:bun /build/packages/database/migrations /app/migrations

# Create bun user
RUN addgroup -g 1001 bun && \
  adduser -u 1001 -G bun -s /bin/sh -D bun && \
  chown -R bun:bun /app/data

# Set working directory and environment variables
WORKDIR /app
ENV NODE_ENV=production \
  HOSTNAME=0.0.0.0 \
  PORT=8000

# Final configurations
USER bun
EXPOSE ${PORT}
STOPSIGNAL SIGTERM
VOLUME [ "/app/data" ]

# Start the server
CMD [ "/app/server" ]