# Stage 1: build the static site
FROM node:24-trixie-slim AS builder

WORKDIR /app

# Install dependencies first so this layer is cached between source changes
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve it with nginx
FROM nginx:stable-alpine AS production

# SPA routing, caching, security headers and the Open Graph origin rewrite
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
