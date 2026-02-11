FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy backend app
COPY apps/api ./apps/api

# Install all dependencies with legacy-peer-deps
RUN npm install --legacy-peer-deps

# Build backend
RUN npm run build --workspace=apps/api

# Expose port
EXPOSE 3001

# Start backend
CMD ["node", "apps/api/dist/index.js"]
