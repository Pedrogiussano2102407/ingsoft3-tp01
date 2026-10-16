# ---- Etapa 1: dependencias de producción ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Etapa 2: tests (con las dependencias de desarrollo: jest) ----
FROM node:20-alpine AS test
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENTRYPOINT ["npm", "run", "test:ci"]

# ---- Etapa 3: imagen final (la que se publica; tiene que quedar ÚLTIMA) ----
FROM node:20-alpine AS final
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "./bin/www"]