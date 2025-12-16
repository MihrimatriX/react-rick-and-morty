# Multi-stage build için Dockerfile
# Stage 1: Build stage
FROM node:lts-trixie-slim AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Tüm bağımlılıkları yükle (dev dependencies dahil)
RUN npm ci

# Kaynak kodları kopyala
COPY . .

# Vite build işlemini çalıştır
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Build edilmiş dosyaları nginx'in serve edeceği dizine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80'i expose et
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 