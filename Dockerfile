# Production image for AWS (EC2 / Lightsail / ECS / App Runner).
# Build from repo root (NEXT_PUBLIC_* must be set at build time for Next.js client bundle):
#   docker build -t autocarship-new ./web \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain \
#     --build-arg NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-uuid
# Run (secrets at runtime only; do not bake API keys into the image):
#   docker run -d -p 80:3000 --restart unless-stopped \
#     -e RESEND_API_KEY=... -e QUOTE_NOTIFY_EMAIL=... \
#     --name autocarship autocarship-new

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
# Next.js inlines NEXT_PUBLIC_* at `next build`; runtime `docker run -e` is too late for the browser bundle.
ARG NEXT_PUBLIC_SITE_URL=
ARG NEXT_PUBLIC_CRISP_WEBSITE_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_CRISP_WEBSITE_ID=$NEXT_PUBLIC_CRISP_WEBSITE_ID
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
