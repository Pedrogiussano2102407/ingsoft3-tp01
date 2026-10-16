# ---- Etapa 1: build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
RUN npm run build

# ---- Etapa 2: tests (parte del build: ya tiene Node y las dependencias de desarrollo) ----
FROM builder AS test
ENTRYPOINT ["npm", "run", "test:ci"]

# ---- Etapa 3: imagen final (la que se publica; tiene que quedar ÚLTIMA) ----
FROM node:20-alpine AS final
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]