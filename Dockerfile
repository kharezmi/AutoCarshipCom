# Production image for AWS (EC2 / Lightsail / ECS / App Runner).
# Build from repo root:  docker build -t autocarship-web ./web
# Run (set env vars in the console or compose; never bake secrets into the image):
#   docker run -p 3000:3000 \
#     -e RESEND_API_KEY=... \
#     -e QUOTE_NOTIFY_EMAIL=... \
#     -e RESEND_FROM_EMAIL="AutoCarShip <onboarding@resend.dev>" \
#     -e NEXT_PUBLIC_SITE_URL=https://your-demo-url \
#     autocarship-web

FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Standalone output omits /data; blogs read data/blogs.json at runtime.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data
COPY --from=builder --chown=nextjs:nodejs /app/data/blogs.json ./data/blogs.json

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
