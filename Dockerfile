# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* deno.json* ./

RUN corepack enable && npm ci

COPY src/ src/

RUN npm run build

# Production stage
FROM node:22-alpine

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/src/lib/games.json ./src/lib/games.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
