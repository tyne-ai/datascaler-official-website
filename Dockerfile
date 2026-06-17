# syntax=docker/dockerfile:1
# Build context: this app directory (apps/marketing-next).
# Self-contained: no pnpm workspace file is present in the context, so pnpm
# installs only this app's dependencies.

# ── Stage 1: dependencies ──────────────────────────────
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod=false --ignore-workspace

# ── Stage 2: build ─────────────────────────────────────
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Dummy values so `next build` can initialise Payload without a live DB/secret.
ENV NEXT_TELEMETRY_DISABLED=1
RUN PAYLOAD_SECRET=build-time-placeholder-secret DATABASE_URI=file:./build.db pnpm run build && rm -f build.db

# ── Stage 3: runtime ───────────────────────────────────
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3200
ENV DATABASE_URI=file:/app/data/payload.db

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/data /app/media \
  && chown -R nextjs:nodejs /app

# Next standalone output bundles the minimal server + node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3200

# Persist DB + uploaded media across redeploys.
VOLUME ["/app/data", "/app/media"]

CMD ["node", "server.js"]
